import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { WorkerNewsletter, getNewsletters } from "@/src/components/utils/FetchNewsletters";
import SubscribePopup from "@/src/components/utils/SubscribePopup";
import NewsCoverflowEffect from "@/src/components/news/NewsCoverflowEffect";
import MyDefaultPage from "@/src/components/DefaultPage";
import LanguageSelector from "@/src/components/news/LanguageSelector";
import NewsletterViewer from "@/src/components/news/NewsletterViewer";
import SeoHead from "@/src/components/layout/SeoHead";

export default function News() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // all newsletters from the worker - initially empty
  const [workerNewsletters, setWorkerNewsletters] = useState<WorkerNewsletter[]>([]);

  const router = useRouter();
  const selectedNewsletter = workerNewsletters.find(n => n.slug === router.query.newsletter);

  const openNewsletter = (newsletter: WorkerNewsletter) => {
    // updates the URL with the selected newsletter's slug without reloading the page
    router.push(
      {
        pathname: "/news",
        query: {
          newsletter: newsletter.slug,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  // detects the user's browser language and sets the default language accordingly
  useEffect(() => {
    if (navigator.language.startsWith("en")) setLanguage("en");
  }, []);

  // fetches newsletters from the worker based on the selected language
  useEffect(() => {
    const controller = new AbortController();
    getNewsletters(language, controller.signal)
      .then(setWorkerNewsletters)
      .catch(err => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [language]);

  return (
    <>
      <SeoHead
        title="News"
        description={`Discover the latest news and updates from TLMOTO, your favorite student motorsport team.`}
      />
      <MyDefaultPage>
        {/* mantém informação da língua selecionada */}
        <div className="flex flex-col mt-[14vh] xl:mt-[17vh] gap-[5vh]">
          <div>
            <LanguageSelector language={language} onChange={setLanguage} />
          </div>
          <div>
            <NewsCoverflowEffect
              language={language}
              workerNewsletters={workerNewsletters}
              onSubscribeClick={handleSubscribeClick}
              onNewsletterClick={openNewsletter}
            />
          </div>
        </div>
        {selectedNewsletter && (
          <NewsletterViewer
            language={language}
            newsletter={selectedNewsletter}
            onClose={() =>
              // updates the URL to remove the newsletter query parameter
              router.push("/news", undefined, {
                shallow: true,
              })
            }
          />
        )}
        <SubscribePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </MyDefaultPage>
    </>
  );
}
