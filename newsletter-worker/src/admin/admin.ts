import { Hono } from 'hono';
import { renderNewsletterList, uploadFunctions, pdfFunctions } from './fragments';

export const adminRoutes = new Hono();

adminRoutes.get('/', (c) => {
	// Set headers to prevent indexing and caching since this is an admin page
	c.header('X-Robots-Tag', 'noindex, nofollow');
	c.header('Cache-Control', 'no-store, no-cache');

	// Render the admin page with the necessary scripts and styles
	return c.html(/* html */ `
<!doctype html>

<html>
    <head>
        <meta charset="utf-8" />
        <title>Newsletter Admin</title>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>

    <body class="bg-neutral-600 text-white font-sans p-10">

        <h1 class="mb-10 text-3xl font-bold text-center">
            Gestão de Newsletters
        </h1>

        <div class="flex flex-col gap-[5vh] lg:flex-row lg:gap-[5vw]">
            <!-- UPLOAD -->
            <div class="flex flex-col flex-1 p-20 border border-white rounded-lg gap-[3vh]">
                <h2 class="text-2xl font-bold mb-[2vh] text-center">
                    Upload
                </h2>

                <input type="file" id="pdf" accept="application/pdf" />

                <div class="items-center justify-center flex">
                    <button onclick="upload()" class="bg-gray-300 hover:bg-gray-400 text-black py-1 px-4 rounded">
                        Enviar PDF
                    </button>
                </div>
                
                <!-- status message -->
                <p id="status"></p>
            </div>

            <!-- LIST -->
            <div class="flex flex-col flex-1 p-20 border border-white rounded-lg gap-[3vh]">
                <h2 class="text-2xl font-bold mb-[2vh] text-center">
                    Newsletters atuais
                </h2>

                <div class="flex justify-center">
                    <!-- language dropdown -->
                    <select id="langFilter" onchange="load()" class="text-black rounded px-2 py-1 bg-gray-300">

                        <option value="pt" selected>Português</option>
                        <option value="en">Inglês</option>

                    </select>
                </div>

                <!-- uses a template to render each element in the list -->
                <ul id="list" class="p-0"></ul>
            </div>
        </div>

        <script>

            ${renderNewsletterList}

            ${uploadFunctions}

            ${pdfFunctions}

        </script>

    </body>
</html>
`);
});
