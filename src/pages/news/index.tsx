import { useState, useEffect } from "react";
import SubscribePopup from "@/src/components/utils/SubscribePopup";
import NewsCoverflowEffect from "@/src/components/news/NewsCoverflowEffect";
import MyDefaultPage from "@/src/components/DefaultPage";
import LanguageSelector from "@/src/components/news/LanguageSelector";
import NewsletterViewer from "@/src/components/news/NewsletterViewer";
import { WorkerNewsletter } from "@/src/components/utils/FetchNewsletters";
import SeoHead from "@/src/components/layout/SeoHead";

export default function News() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState<WorkerNewsletter | null>(null);

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  // detects the user's browser language and sets the default language accordingly
  useEffect(() => {
    if (navigator.language.startsWith("en")) setLanguage("en");
  }, []);

  return (
    <>
      <SeoHead
        title={`News`}
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
              onSubscribeClick={handleSubscribeClick}
              onNewsletterClick={setSelectedNewsletter}
            />
          </div>
        </div>
        {selectedNewsletter && (
          <NewsletterViewer
            language={language}
            newsletter={selectedNewsletter}
            onClose={() => setSelectedNewsletter(null)}
          />
        )}
        <SubscribePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </MyDefaultPage>
    </>
  );
}
