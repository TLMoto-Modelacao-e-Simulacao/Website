/* template for rendering each newsletter in the list */
const newsletterTemplate = /* html */ `
<li class="flex justify-between items-center py-2 border-b border-gray-300">

    <!-- LEFT -->
    <div class="flex gap-[1vw] items-center">
        <!-- newsletter title -->
        <div class="flex flex-col">
            <strong class="text-white">\${n.hover_title}</strong>
            <small class="text-gray-400">\${n.file_key} (\${n.lang})</small>
        </div>

        <!-- download -->
        <div class="flex items-center">
            <a
                href="\${n.file_url}"
                download="\${n.file_key}"
                title="Download PDF"
                class="text-blue-400 hover:text-blue-300"
            >
                <!-- Heroicons Download -->
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/>
                </svg>
            </a>
        </div>
    </div>

    <!-- RIGHT -->
    <div class="flex gap-[3vw] items-center">
        <!-- delete -->
        <button 
            class="text-red-600 hover:text-red-500"
            onclick="del('\${n.file_key}')"
        >
            Eliminar
        </button>

        <!-- hide -->
        <button 
            class="\${n.hidden ? 'text-green-600 hover:text-green-500' : 'text-yellow-500 hover:text-yellow-400'}"
            onclick="toggleVisibility('\${n.file_key}')"
        >
            \${n.hidden ? "Mostrar" : "Ocultar"}
        </button>
    </div>

</li>
`;

/* Function to render the list of newsletters */
export const renderNewsletterList = `
    renderNewsletter = (n) => \`${newsletterTemplate}\`;
`;

/* Functions used in the admin interface for managing newsletters */
export const uploadFunctions = /* js */ `

    // loads the list of newsletters
    async function load() {
        const lang = document.getElementById("langFilter").value;

        // Fetch all newsletters from the server
        const res = await fetch("/newsletters?lang=" + lang + "&visible=all");
        const data = await res.json();

        const list = document.getElementById("list");
        list.innerHTML = "";

        // renders each newsletter and appends it to the list
        data.forEach(n => {
            const li = document.createElement("li");
            li.innerHTML = renderNewsletter(n);

            list.appendChild(li);
        });
    }

    async function del(fileKey) {
        if (!confirm("Eliminar " + fileKey + "?")) return;

        const res = await fetch("/delete/" + fileKey, {
            method: "DELETE"
        });

        const result = await res.json();

        if (!result.success) {
            alert("Erro ao eliminar");
            return;
        }

        load();
    }

    async function toggleVisibility(fileKey) {
        const res = await fetch("/visibility/" + fileKey, {
            method: "PATCH"
        });

        const result = await res.json();

        if (!result.success) {
            alert("Erro ao alterar visibilidade");
            return;
        }

        load();
    }

    // uploads the PDF selected by the admin
    async function upload() {
        const file = document.getElementById("pdf").files[0];
        const status = document.getElementById("status");

        if (!file) return alert("Escolhe um PDF");

        status.innerText = "A enviar PDF...";

        const formData = new FormData();
        formData.append("pdf", file);

        // uploads the pdf
        const pdfRes = await fetch("/upload-pdf", {
            method: "POST",
            body: formData
        });

        const pdfData = await pdfRes.json();
        if (!pdfData.success) {
            status.innerText = "Erro ao enviar PDF";
            alert(pdfData.error);
            return 
        }

        const data = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data }).promise;

        // converts each page of the PDF to an image
        for (let i = 1; i <= pdf.numPages; i++) {
            status.innerText = "A processar página " + i + " / " + pdf.numPages;

            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2 });

            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const ctx = canvas.getContext("2d");

            await page.render({ canvasContext: ctx, viewport }).promise;

            // converts the canvas to a blob in JPEG format
            const blob = await new Promise(r =>
                canvas.toBlob(r, "image/jpeg", 0.9)
            );

            const pageFd = new FormData();
            pageFd.append("pdf_name", file.name);
            pageFd.append("page_num", i);
            pageFd.append("page", blob, "page.jpg");

            // uploads each page image
            await fetch("/upload-page", {
                method: "POST",
                body: pageFd
            });
        }

        // updates DB info
        await fetch("/upload-finish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pdf_name: file.name,
                num_pages: pdf.numPages
            })
        });

        status.innerText = "Concluído ✔";

        load();
    }

    // once the page is loaded, run load()
    window.addEventListener("DOMContentLoaded", load);
`;

/* Sets the worker source for pdf.js to load the PDF worker script from a CDN */
export const pdfFunctions = /* js */ `
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
`;
