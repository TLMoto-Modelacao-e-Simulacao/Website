// Structure of a newsletter as returned by the worker
export type WorkerNewsletter = {
  hover_title: string;
  date: string;
  file_key: string;
  num_pages: number;
  lang: string;
  file_url: string;
  cover_url: string;
  pages_url: string;
};

// Structure of the response when fetching newsletter pages from the worker
type NewsletterPagesResponse = {
  num_pages: number;
  pages: string[];
};

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL;

/**
 * Fetches newsletters from the worker to display on the website based on the selected language
 * Only newsletters marked as visible are returned
 */
export async function getNewsletters(
  language: "pt" | "en",
  signal?: AbortSignal
): Promise<WorkerNewsletter[]> {
  const res = await fetch(`${WORKER_URL}/newsletters?lang=${language}&visible=visible`, { signal });

  if (!res.ok) throw new Error(`Failed to fetch newsletters: ${res.status}`);

  return res.json();
}

/* Fetches the pages urls of a specific newsletter from the worker */
export async function getNewsletterPages(
  pagesUrl: string,
  signal?: AbortSignal
): Promise<string[]> {
  const res = await fetch(pagesUrl, { signal });

  if (!res.ok) throw new Error(`Failed to fetch pages: ${res.status}`);

  const data: NewsletterPagesResponse = await res.json();

  return data.pages;
}
