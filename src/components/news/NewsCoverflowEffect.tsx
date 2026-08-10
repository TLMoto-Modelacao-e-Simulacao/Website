import React, { useState, useMemo, useEffect, useRef } from "react";
import { WorkerNewsletter, getNewsletters } from "@/src/components/utils/FetchNewsletters";
import NavigationButton from "@/src/components/news/NavigationButton";
import Image from "next/image";

const MONTHS = {
  pt: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const TEXTS = {
  pt: {
    mainTitle: (month: string) =>
      `A newsletter de ${month} está repleta das mais recentes informações, entrevistas e dicas técnicas, sendo uma leitura obrigatória para te manteres atualizado. Não percas as futuras edições e fica a conhecer todo o trabalho realizado pela nossa equipa.`,
    subscribeButton: "Subscreva a nossa Newsletter",
    allNewsletters: "Todas as Newsletters",
    clickToView: "Click para visualizar",
  },
  en: {
    mainTitle: (month: string) =>
      `The ${month} newsletter is packed with the latest insights, interviews, and expert tips, it's a must-read to stay ahead. Don't miss out on future editions and stay updated on all the work done by the team.`,
    subscribeButton: "Subscribe to our Newsletter",
    allNewsletters: "All Newsletters",
    clickToView: "Click to view",
  },
};

const text_size = "text-[4vw] sm:text-[3.5vw] md:text-[2.5vw] lg:text-[2vw] 2xl:text-[1.5vw]";

const SubscribeBtn = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}) => (
  <button
    onClick={onClick}
    type="button"
    className={`bg-blue-800 hover:bg-blue-900 text-white ${text_size} rounded-lg transition-all 
                    duration-300 shadow-lg hover:shadow-xl hover:scale-105 py-4 px-10`}
  >
    {text}
  </button>
);

/* main component */
export default function MyNewsCoverflowEffect({
  language,
  workerNewsletters,
  onSubscribeClick,
  onNewsletterClick,
}: {
  language: "pt" | "en";
  workerNewsletters: WorkerNewsletter[];
  onSubscribeClick: (e: React.MouseEvent) => void;
  onNewsletterClick: (newsletter: WorkerNewsletter) => void;
}) {
  const t = TEXTS[language];

  const [selectedYearIndex, setSelectedYearIndex] = useState(0); // selected year index
  const [mobileIndex, setMobileIndex] = useState(0); // centered newsletter index
  const touchStartX = useRef(0); // used to detect swipe navigation on mobile

  // determines the available years from the worker's newsletters sorted in descending order
  const availableYears = useMemo(() => {
    const years = new Set(
      workerNewsletters.map(newsletter => new Date(newsletter.date).getFullYear().toString())
    );

    return Array.from(years).sort((a, b) => Number(b) - Number(a));
    // ex: ["2024", "2023", "2022"]
  }, [workerNewsletters]);

  const selectedYear = availableYears[selectedYearIndex] ?? null;

  // determines the month of the latest newsletter
  const latestMonth = useMemo(() => {
    if (workerNewsletters.length === 0) return "";

    const monthIndex = new Date(workerNewsletters[0].date).getMonth();
    return MONTHS[language][monthIndex];
  }, [workerNewsletters, language]);

  // newsletters filtered by selected year for mobile view
  const mobileNewsletters = useMemo(() => {
    if (!selectedYear) {
      return [];
    }

    return workerNewsletters.filter(newsletter => newsletter.date.startsWith(selectedYear));
  }, [selectedYear, workerNewsletters]);

  // year navigation for mobile view
  const navigateYear = (dir: "prev" | "next") => {
    if (!selectedYear) return;

    if (dir === "prev" && selectedYearIndex < availableYears.length - 1) {
      setSelectedYearIndex(selectedYearIndex + 1);
    }
    if (dir === "next" && selectedYearIndex > 0) {
      setSelectedYearIndex(selectedYearIndex - 1);
    }
    setMobileIndex(0);
  };

  return (
    <div className="flex flex-col items-center text-white md:mb-[10vh] md:gap-[6vh]">
      {/* DESKTOP - latest newsletter */}
      {workerNewsletters.length > 0 && (
        <div className="hidden md:flex max-w-6xl lg:max-w-[85vw] px-[3vw] lg:px-0 gap-[8vw] items-center justify-between">
          {/* text + subscribe button */}
          <div className="flex-1">
            <h1 className="text-3xl lg:text-[3vw] xl:text-[2.5vw] 2xl:text-[2vw] font-bold mb-[5vh]">
              {t.mainTitle(latestMonth)}
            </h1>
            <SubscribeBtn text={t.subscribeButton} onClick={onSubscribeClick} />
          </div>

          {/* newsletter cover */}
          <div
            className="relative w-[40vw] lg:w-[30vw] xl:w-[25vw] 2xl:w-[20vw] aspect-[5/7] cursor-pointer hover:scale-105 transition hover:shadow-2xl"
            onClick={() => onNewsletterClick(workerNewsletters[0])}
          >
            <Image src={workerNewsletters[0].cover_url} alt="Latest" fill priority />
          </div>
        </div>
      )}

      {/* DESKTOP - grid */}
      <div className="hidden md:flex flex-col max-w-[85vw] gap-[4vh]">
        <div className="hidden md:block w-full pt-[4vh] border-t-2 border-gray-600/50 text-center">
          <h3 className={`${text_size} font-bold`}>{t.allNewsletters}</h3>
        </div>

        <div className="hidden md:grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10vw] lg:gap-[3vw]">
          {workerNewsletters.map(newsletter => (
            <div
              key={newsletter.file_key}
              className="relative w-[35vw] lg:w-[25vw] xl:w-[19vw] aspect-[5/7] group cursor-pointer hover:scale-105 transition"
              onClick={() => onNewsletterClick(newsletter)}
            >
              <Image src={newsletter.cover_url} alt={newsletter.hover_title} fill priority />
              <div
                className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center ${text_size}`}
              >
                <span className="font-bold block">{t.clickToView}</span>
                <span>{newsletter.hover_title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE - year navigation */}
      {selectedYear && (
        <div className="flex md:hidden items-center justify-center gap-[5vw]">
          <NavigationButton
            direction="prev"
            onClick={() => navigateYear("prev")}
            disabled={selectedYearIndex === availableYears.length - 1}
            ariaLabel="Previous year"
            variant="default"
          />
          <div className="text-2xl font-bold min-w-[5rem] text-center">{selectedYear}</div>
          <NavigationButton
            direction="next"
            onClick={() => navigateYear("next")}
            disabled={selectedYearIndex === 0}
            ariaLabel="Next year"
            variant="default"
          />
        </div>
      )}

      {/* MOBILE - newsletters display */}
      <div className="block md:hidden w-full relative mb-[5vh]">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "80vw", perspective: "900px" }}
          /**
           * .clientX: horizontal position of the touch event, in pixels, relative to the viewport's left edge
           * touches: list of all touch points currently in contact with the surface
           * changedTouches: list of all touch points that have changed since the last event
           */
          onTouchStart={e => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx < -40)
              setMobileIndex(i => Math.min(i + 1, mobileNewsletters.length - 1)); // swipe left = next newsletter
            else if (dx > 40) setMobileIndex(i => Math.max(i - 1, 0)); // swipe right = previous newsletter
          }}
        >
          {mobileNewsletters.map((newsletter, idx) => {
            const offset = idx - mobileIndex;
            const abs = Math.abs(offset);
            if (abs >= 2) return null; // only render the closest newsletters on each side (previous, centered, next)

            return (
              <div
                key={`${newsletter.file_key}-${idx}`}
                className="absolute top-1/2 left-1/2 cursor-pointer w-[50vw] aspect-[5/7] shadow-lg"
                style={{
                  transform: `translate(-50%, -50%) 
                              translateX(${offset === 0 ? 0 : offset * 110}px)
                              scale(${abs === 0 ? 1 : 0.75}) 
                              rotateY(${offset === 0 ? 0 : offset < 0 ? 40 : -40}deg)`,
                  zIndex: abs === 0 ? 100 : 40,
                  transition: "all 0.5s ease",
                }}
                // onClick centers the newsletter if it's not centered, otherwise opens the newsletter viewer
                onClick={() => (offset !== 0 ? setMobileIndex(idx) : onNewsletterClick(newsletter))}
              >
                <Image src={newsletter.cover_url} alt={newsletter.hover_title} fill priority />
              </div>
            );
          })}
        </div>

        {/* navigation dots */}
        <div className="flex justify-center gap-[3vw]">
          {mobileNewsletters.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setMobileIndex(idx)}
              className={`rounded-full transition-all w-[2vw] h-[2vw] ${idx === mobileIndex ? "bg-white scale-110" : "bg-gray-500"}`}
            />
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <SubscribeBtn text={t.subscribeButton} onClick={onSubscribeClick} />
      </div>
    </div>
  );
}
