/*
 * Cloudflare Worker
 * manages newsletter files and metadata and provides API endpoints for the frontend to interact with the newsletters
 * the /admin, /delete and all /upload-* routes are protected by Cloudflare Access and require authentication
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { hasValidName, parseFileName, getMonthName } from './utils';
import { adminRoutes } from './admin/admin';
import * as storage from './services/storage';
import * as database from './services/database';

const app = new Hono<{
	Bindings: {
		R2: R2Bucket;
		DB: D1Database;
	};
}>();

// Middleware for CORS - allows all origins, methods and headers
app.use(
	'*',
	cors({
		origin: '*',
		allowHeaders: ['Content-Type'],
		allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
	}),
);

// ---------------------------- ADMIN INTERFACE ---------------------------
/**
 * Admin interface route - serves the admin interface for managing newsletters
 */
app.route('/admin', adminRoutes);

// -------------------------------- ROUTES --------------------------------

/**
 * upload PDF route - used to upload a new newsletter PDF to R2 storage
 * reveives the PDF file as a parameter
 */
app.post('/upload-pdf', async (c) => {
	const formData = await c.req.formData();
	const pdf_file = formData.get('pdf') as File;

	if (!pdf_file || !hasValidName(pdf_file.name)) {
		return c.json({ error: 'Invalid file. Expected a PDF named in the format MM-YYYY-lang.pdf (e.g. 03-2024-pt.pdf)' }, 400);
	}

	// saves the PDF file to R2 storage with the file name as the key
	await storage.savePdf(c.env, pdf_file);

	return c.json({ success: true, file: pdf_file.name });
});

/**
 * upload page route - used to upload each page of the PDF as a separate image (jpg)
 * receives as parameters the PDF file name, the page number and the page image file
 */
app.post('/upload-page', async (c) => {
	const formData = await c.req.formData();
	const pdf_name = formData.get('pdf_name') as string;
	const page_num = parseInt(formData.get('page_num') as string);
	const page_file = formData.get('page') as File;

	if (!pdf_name || !hasValidName(pdf_name) || !page_file || isNaN(page_num)) {
		return c.json({ error: 'Invalid parameters.' }, 400);
	}

	// saves the page image to R2 storage with a key in the format "pdfName-pX.jpg" (e.g. "03-2024-pt-p1.jpg")
	const pageKey = pdf_name.replace('.pdf', `-p${page_num}.jpg`);
	await storage.savePageImage(c.env, pageKey, page_file);

	return c.json({ success: true, page: page_num });
});

/**
 * upload finish route - finishes the upload process by saving the newsletter metadata to the D1 database
 * receives as parameters the PDF file name and the number of pages in the PDF
 */
app.post('/upload-finish', async (c) => {
	const { pdf_name, num_pages } = await c.req.json<{ pdf_name: string; num_pages: number }>();

	if (!pdf_name || !hasValidName(pdf_name) || isNaN(num_pages)) {
		return c.json({ error: 'Invalid parameters.' }, 400);
	}

	const parsed = parseFileName(pdf_name);
	if (!parsed) return c.json({ error: 'Could not parse filename.' }, 400);

	const { month, year, lang, date } = parsed;

	await database.insertNewsletter(c.env, {
		hover_title: `${getMonthName(month, lang)} ${year}`,
		date: date.toISOString().split('T')[0],
		fileKey: pdf_name,
		slug: pdf_name.replace(/\.pdf$/i, ''),
		num_pages,
		lang,
	});

	return c.json({ success: true, file: pdf_name, pages: num_pages });
});

/**
 * delete newsletter route - deletes a newsletter and its associated files from R2 and D1
 * receives as a parameter the PDF file name of the newsletter to be deleted
 */
app.delete('/delete/:filename', async (c) => {
	const filename = c.req.param('filename');

	if (!hasValidName(filename)) {
		return c.json({ error: 'Invalid filename.' }, 400);
	}

	// retrieves the number of pages for the newsletter from the database to know which files to delete from R2
	const result = (await database.getNewsletterPagesNum(c.env, filename)) as any;

	if (!result) return c.json({ error: 'Newsletter not found.' }, 404);

	// batch delete
	await storage.deleteNewsletterFiles(c.env, filename, result.num_pages);

	// deletes the newsletter metadata from the database
	await database.deleteNewsletterRow(c.env, filename);

	return c.json({ success: true, file: filename });
});

/**
 * get file route - retrieves a specific file (PDF or page image) from R2 storage
 * receives as a parameter the file name (ex: 03-2024-pt.pdf or 03-2024-pt-p1.jpg)
 */
app.get('/file/:filename', async (c) => {
	const fileName = c.req.param('filename');

	const object = await storage.getFile(c.env, fileName);
	if (!object) return c.text(`File not found: ${fileName}`, 404);

	const headers = new Headers();

	// copies the HTTP metadata from the R2 object to the response headers
	object.writeHttpMetadata(headers);

	// other headers for serving a file
	headers.set('Cache-Control', 'public, max-age=604800');
	headers.set('Accept-Ranges', 'bytes');
	headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

	if (object.size) headers.set('Content-Length', object.size.toString());

	return new Response(object.body, { headers });
});

/**
 * get pages urls route - lists all page images urls for a specific newsletter
 * receives as a parameter the PDF file name
 */
app.get('/pages/:filename', async (c) => {
	const fileName = c.req.param('filename');

	if (!hasValidName(fileName)) return c.json({ error: 'Invalid file' }, 400);

	const result = (await database.getNewsletterPagesNum(c.env, fileName)) as any;

	// retrieves the number of pages for the newsletter from the database
	const numPages = result?.num_pages ?? 0;
	const origin = new URL(c.req.url).origin;

	// generates the URLs for each page image based on the PDF file name and the number of pages
	const pages = Array.from({ length: numPages }, (_, i) => `${origin}/file/${fileName.replace('.pdf', `-p${i + 1}.jpg`)}`);

	return c.json({ num_pages: numPages, pages });
});

/**
 * list newsletters route - lists all D1 database entries for newsletters, enriched with URLs for the pdf, cover and page
 * receives an optional query parameter "lang" to filter newsletters by language (pt or en) and an optional query parameter "visible" to filter by visibility (true or false)
 */
app.get('/newsletters', async (c) => {
	const lang = c.req.query('lang');
	const visible = c.req.query('visible');

	const result = (await database.listNewsletters(c.env, lang, visible)) as any;

	const origin = new URL(c.req.url).origin;
	const enriched = (result.results ?? []).map((n: any) => ({
		...n,
		file_url: `${origin}/file/${n.file_key}`, // URL to the PDF file
		cover_url: `${origin}/file/${n.file_key.replace('.pdf', '-p1.jpg')}`, // URL to the cover image
		pages_url: `${origin}/pages/${n.file_key}`, // URL to the list of page urls
	}));

	return c.json(enriched);
});

/**
 * patch visibility route - updates the visibility of a specific newsletter
 * receives as a parameter the PDF file name
 */
app.patch('/visibility/:filename', async (c) => {
	const fileName = c.req.param('filename');

	if (!hasValidName(fileName)) {
		return c.json({ error: 'Invalid filename.' }, 400);
	}

	// deletes the newsletter metadata from the database
	await database.toggleNewsletterVisibility(c.env, fileName);

	return c.json({ success: true, file: fileName });
});

export default app;
