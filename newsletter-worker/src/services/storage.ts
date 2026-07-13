/* Storage services for managing newsletter files in R2 */

// Cloudflare Workers Bindings
type Bindings = {
	R2: R2Bucket;
};

export async function savePdf(env: Bindings, file: File) {
	await env.R2.put(file.name, file.stream(), {
		httpMetadata: { contentType: 'application/pdf', contentDisposition: 'inline' },
	});
}

export async function savePageImage(env: Bindings, key: string, file: File) {
	await env.R2.put(key, file.stream(), {
		httpMetadata: { contentType: 'image/jpeg' },
	});
}

/* Delete newsletter files (PDF and page images) from R2 storage */
export async function deleteNewsletterFiles(env: Bindings, fileName: string, numPages: number) {
	const pageKeys = Array.from({ length: numPages }, (_, i) => fileName.replace('.pdf', `-p${i + 1}.jpg`));

	await env.R2.delete([fileName, ...pageKeys]);
}

/* Get any file from R2 storage */
export async function getFile(env: Bindings, fileName: string) {
	return env.R2.get(fileName);
}
