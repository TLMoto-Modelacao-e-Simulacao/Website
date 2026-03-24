import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { withBasePath } from "@/src/utils/basePath";

const PLACEHOLDER_IMAGE = withBasePath("/images/newsletter/placeholder.jpg");

// Helper para construir caminhos
const buildPath = (year: string, name: string) =>
  withBasePath(`/images/newsletter/${year}/${name}`);

// Tipos
interface NewsletterItem {
  name: string;
  namePt?: string;
  month: number;
  link: string;
  linkPt?: string;
}

interface Newsletter extends NewsletterItem {
  year: string;
  fullPath: string;
}

const NEWSLETTER_DATA: Record<string, NewsletterItem[]> = {
  "2025": [
    {
      name: "march.jpg",
      namePt: "marco25.jpg",
      month: 3,
      link: "https://online.pubhtml5.com/qlvfj/ccjc/",
      linkPt: "https://online.pubhtml5.com/qlvfj/sjsg/",
    },
    {
      name: "june.jpg",
      namePt: "junho25.jpg",
      month: 6,
      link: "https://pubhtml5.com/ssrma/hdmv/",
      linkPt: "https://pubhtml5.com/ssrma/sxzj/",
    },
    {
      name: "september.jpg",
      namePt: "setembro25.png",
      month: 9,
      link: "https://pubhtml5.com/ofgde/vknm/",
      linkPt: "https://pubhtml5.com/ofgde/lumw/",
    },{
      name: "december25.jpg",
      namePt: "dezembro25.jpg",
      month: 12,
      link: "https://pubhtml5.com/qlvfj/ptvf/",
      linkPt: "https://pubhtml5.com/qlvfj/gzlv/",
    },
  ],
  "2024": [
    {
      name: "march.png",
      namePt: "marco24.jpg",
      month: 3,
      link: "https://online.pubhtml5.com/ffstg/javr/",
      linkPt: "https://online.pubhtml5.com/ffstg/aqvm/",
    },
    {
      name: "june.png",
      namePt: "junho24.png",
      month: 6,
      link: "https://online.pubhtml5.com/qlvfj/teux/",
      linkPt: "https://online.pubhtml5.com/qlvfj/prrj/",
    },
    {
      name: "september.png",
      namePt: "setembro24.png",
      month: 9,
      link: "https://online.pubhtml5.com/qlvfj/svrs/",
      linkPt: "https://online.pubhtml5.com/qlvfj/xaiw/",
    },
    {
      name: "december.jpg",
      namePt: "dezembro24.jpg",
      month: 12,
      link: "https://online.pubhtml5.com/qlvfj/gzzc/",
      linkPt: "https://online.pubhtml5.com/qlvfj/zffw/",
    },
  ],
  /*"2023": [
    {
      name: "march.png",
      namePt: "marco23.jpg",
      month: 3,
      link: "https://online.pubhtml5.com/rzzqg/lzir/",
      linkPt: "https://online.pubhtml5.com/rzzqg/khio/",
    },
    {
      name: "june.png",
      namePt: "junho23.png",
      month: 6,
      link: "https://online.pubhtml5.com/rzzqg/jjgo/",
      linkPt: "https://online.pubhtml5.com/rzzqg/yikm/",
    },
    {
      name: "october.png",
      namePt: "outubro23.png",
      month: 10,
      link: "https://online.pubhtml5.com/rzzqg/mctf/",
      linkPt: "https://online.pubhtml5.com/rzzqg/lsxd/",
    },
    {
      name: "december.png",
      namePt: "dezembro23.png",
      month: 12,
      link: "https://online.pubhtml5.com/rzzqg/xzpj/",
      linkPt: "https://online.pubhtml5.com/rzzqg/puhg/",
    },
  ],
  "2022": [
    {
      name: "february.png",
      namePt: "fevereiro22.jpg",
      month: 2,
      link: "https://online.pubhtml5.com/rzzqg/sytw/",
      linkPt: "https://online.pubhtml5.com/rzzqg/ooky/",
    },
    {
      name: "may.png",
      namePt: "maio22.png",
      month: 5,
      link: "https://online.pubhtml5.com/rzzqg/vpnh/",
      linkPt: "https://online.pubhtml5.com/rzzqg/ynqz/",
    },
    {
      name: "august.png",
      namePt: "agosto22.png",
      month: 8,
      link: "https://online.pubhtml5.com/rzzqg/wpko/",
      linkPt: "https://online.pubhtml5.com/rzzqg/gwde/",
    },
    {
      name: "november.png",
      namePt: "novembro22.png",
      month: 11,
      link: "https://online.pubhtml5.com/rzzqg/whql/",
      linkPt: "https://online.pubhtml5.com/rzzqg/aafy/",
    },
  ],
  "2021": [
    {
      name: "january.png",
      namePt: "janeiro21.jpg",
      month: 1,
      link: "https://online.pubhtml5.com/rzzqg/jggt/",
      linkPt: "https://online.pubhtml5.com/rzzqg/mrmn/",
    },
    {
      name: "may.png",
      namePt: "maio21.jpg",
      month: 5,
      link: "https://online.pubhtml5.com/rzzqg/pdtr/",
      linkPt: "https://online.pubhtml5.com/rzzqg/lrhz/",
    },
    {
      name: "august.png",
      namePt: "agosto21.jpg",
      month: 8,
      link: "https://online.pubhtml5.com/rzzqg/swnv/",
      linkPt: "https://online.pubhtml5.com/rzzqg/xdfz/",
    },
    {
      name: "november.png",
      namePt: "novembro21.jpg",
      month: 11,
      link: "https://online.pubhtml5.com/rzzqg/rfgg/",
      linkPt: "https://online.pubhtml5.com/rzzqg/kjkg/",
    },
  ],*/
};

const AVAILABLE_YEARS = ["Complete Archive", "2021", "2022", "2023", "2024", "2025"];
const VISIBLE_YEARS = AVAILABLE_YEARS.filter(year => year !== "Complete Archive");

//textos
const TEXTS = {
  pt: {
    mainTitle:
      "A newsletter de Setembro está repleta das mais recentes informações, entrevistas e dicas técnicas, sendo uma leitura obrigatória para te manteres atualizado. Não percas as futuras edições e fica a conhecer todo o trabalho realizado pela nossa equipa.",
    subscribeButton: "Subscreva a nossa Newsletter",
    allNewsletters: "Todas as Newsletters",
    completeArchive: "Arquivo completo organizado por ano",
    clickToView: "Click para visualizar",
    tapToView: "Toque para visualizar",
    latest: "Newsletter Mais Recente",
    close: "Fechar modal",
    newsletter: "Newsletter",
  },
  en: {
    mainTitle:
      "The September newsletter is packed with the latest insights, interviews, and expert tips, it's a must-read to stay ahead. Don't miss out on future editions and stay updated on all the work done by the team.",
    subscribeButton: "Subscribe to our Newsletter",
    allNewsletters: "All Newsletters",
    completeArchive: "Complete archive organized by year",
    clickToView: "Click to view",
    tapToView: "Tap to view",
    latest: "Latest Newsletter",
    close: "Close modal",
    newsletter: "Newsletter",
  },
};

const getMonthName = (month: number, lang: "pt" | "en") => {
  const date = new Date();
  date.setMonth(month - 1);
  return date.toLocaleString(lang === "pt" ? "pt-PT" : "en-US", { month: "short" }).toUpperCase();
};

//subcomponentes
const SubscribeBtn = ({
  text,
  onClick,
  className = "",
}: {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    type="button"
    className={`bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${className}`}
  >
    {text}
  </button>
);

//componente principal

export default function MyNewsCoverflowEffect({
  onSubscribeClick,
}: {
  onSubscribeClick?: (e: React.MouseEvent) => void;
}) {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [currentSlide, setCurrentSlide] = useState(0);

  //estado do modal
  const [modal, setModal] = useState({ isOpen: false, image: "", title: "" });

  //ref para o timer do duplo clique
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  //detetar língua do browser
  useEffect(() => {
    const userLang = navigator.language;
    if (userLang && userLang.startsWith("en")) setLanguage("en");
  }, []);

  //processar newsletters para exibição
  const displayedNewsletters = useMemo(() => {
    const processItem = (year: string, item: NewsletterItem): Newsletter => ({
      ...item,
      year,
      fullPath: buildPath(year, language === "pt" && item.namePt ? item.namePt : item.name),
      link: language === "pt" && item.linkPt ? item.linkPt : item.link,
    });

    let allItems: Newsletter[] = [];
    const sortedYears = Object.keys(NEWSLETTER_DATA).sort((a, b) => parseInt(b) - parseInt(a));

    sortedYears.forEach(year => {
      const items = NEWSLETTER_DATA[year]
        .sort((a, b) => b.month - a.month)
        .map(item => processItem(year, item));
      allItems = [...allItems, ...items];
    });

    return allItems;
  }, [language]);

  //filtrar para mobile
  const mobileNewsletters = useMemo(() => {
    if (selectedYear === "Complete Archive") return displayedNewsletters;
    return displayedNewsletters.filter(n => n.year === selectedYear);
  }, [selectedYear, displayedNewsletters]);

  //logica de clique para link newsletter
  const handleImageClick = (newsletter: Newsletter, event: React.MouseEvent) => {
    window.open(newsletter.link, "_blank");
  };

  const navigateYear = (dir: "prev" | "next") => {
    const idx = VISIBLE_YEARS.indexOf(selectedYear);
    if (dir === "prev" && idx > 0) setSelectedYear(VISIBLE_YEARS[idx - 1]);
    if (dir === "next" && idx < VISIBLE_YEARS.length - 1) setSelectedYear(VISIBLE_YEARS[idx + 1]);
  };

  const closeModal = () => setModal({ ...modal, isOpen: false });

  return (
    <div className="flex flex-col items-center min-h-screen text-white pt-0 pb-10">
      {/* Language Flags */}
      <div className="absolute top-30 md:top-34 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        <button
          onClick={() => setLanguage("pt")}
          //logica de ring
          className={`transition hover:scale-110 rounded-sm ${language === "pt" ? "opacity-100 scale-110 ring-2 ring-white" : "opacity-70"}`}
        >
          <Image
            src="/images/newsletter/flags/flagPortugal.png"
            alt="PT"
            width={50}
            height={40}
            className="rounded-sm shadow-lg"
          />
        </button>
        <button
          onClick={() => setLanguage("en")}
          //logica de ring
          className={`transition hover:scale-110 rounded-sm ${language === "en" ? "opacity-100 scale-110 ring-2 ring-white" : "opacity-70"}`}
        >
          <Image
            src="/images/newsletter/flags/flagUK.png"
            alt="EN"
            width={50}
            height={40}
            className="rounded-sm shadow-lg"
          />
        </button>
      </div>

      {/* Modal Global */}
      {modal.isOpen && (
        <div
          className="fixed inset-0 bg-black/85 z-[1001] flex justify-center items-center p-5"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-3xl w-full max-w-2xl h-auto max-h-[85vh] flex flex-col p-6 shadow-2xl mt-12 animate-modal-appear"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 z-10 flex items-center justify-center hover:bg-red-600 transition"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-slate-700 mb-4 text-center">{modal.title}</h3>
            <div className="flex-1 overflow-hidden flex justify-center items-center">
              <img
                src={modal.image}
                alt={modal.title}
                className="max-w-full max-h-[65vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE VIEW */}
      <div className="flex md:hidden items-center gap-4 mt-30 mb-4 px-4">
        <button
          onClick={() => navigateYear("prev")}
          disabled={VISIBLE_YEARS.indexOf(selectedYear) === 0}
          className="p-2 border rounded-full disabled:opacity-30"
        >
          ←
        </button>
        <div className="text-2xl font-bold">{selectedYear}</div>
        <button
          onClick={() => navigateYear("next")}
          disabled={VISIBLE_YEARS.indexOf(selectedYear) === VISIBLE_YEARS.length - 1}
          className="p-2 border rounded-full disabled:opacity-30"
        >
          →
        </button>
      </div>

      {/* DESKTOP VIEW */}
      {displayedNewsletters.length > 0 && (
        <div className="hidden md:flex w-full max-w-7xl mx-auto mt-48 mb-8 px-8 items-center justify-between gap-16">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">{TEXTS[language].mainTitle}</h1>
            {onSubscribeClick && (
              <SubscribeBtn
                text={TEXTS[language].subscribeButton}
                onClick={onSubscribeClick}
                className="py-4 px-10 text-lg"
              />
            )}
          </div>
          <div
            className="relative w-[350px] h-[490px] cursor-pointer hover:scale-105 transition hover:shadow-2xl"
            onClick={e => handleImageClick(displayedNewsletters[0], e)}
          >
            <Image
              src={displayedNewsletters[0].fullPath}
              alt="Latest"
              fill
              priority
              className="object-contain "
            />
          </div>
        </div>
      )}

      <div className="hidden md:block w-full max-w-6xl mx-auto mb-12 border-t border-gray-600/50 pt-8 text-center">
        <h3 className="text-2xl font-bold">{TEXTS[language].allNewsletters}</h3>
      </div>

      <div className="hidden md:grid w-full max-w-7xl mx-auto grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 px-4 place-items-center">
        {displayedNewsletters.map((newsletter, idx) => (
          <div
            key={`${newsletter.year}-${newsletter.month}`}
            className="relative w-[280px] h-[392px] group cursor-pointer hover:scale-105 transition"
            onClick={e => handleImageClick(newsletter, e)}
          >
            <Image
              src={newsletter.fullPath}
              alt={newsletter.name}
              fill
              className="object-contain "
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center rounded-xl p-4 text-center">
              <span className="font-bold text-lg block mb-2">{TEXTS[language].clickToView}</span>
              <span className="text-sm">
                {getMonthName(newsletter.month, language)} {newsletter.year}
              </span>
            </div>
          </div>
        ))}
      </div>

      {onSubscribeClick && (
        <div className="hidden md:flex justify-center mt-12">
          <SubscribeBtn
            text={TEXTS[language].subscribeButton}
            onClick={onSubscribeClick}
            className="py-4 px-10 text-xl"
          />
        </div>
      )}

      {/* MOBILE CAROUSEL */}
      <div className="block md:hidden w-full px-4 relative mt-4">
        <div className="overflow-hidden rounded-lg h-[330px] relative">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {mobileNewsletters.map((newsletter, idx) => (
              <div key={idx} className="flex-shrink-0 w-full flex justify-center items-center">
                <div
                  className="relative w-[220px] h-[308px]"
                  onClick={e => handleImageClick(newsletter, e)}
                >
                  <Image src={newsletter.fullPath} alt="Cover" fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {mobileNewsletters.length > 1 && (
          <>
            <button
              onClick={() => setCurrentSlide(p => (p === 0 ? mobileNewsletters.length - 1 : p - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentSlide(p => (p === mobileNewsletters.length - 1 ? 0 : p + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
            >
              →
            </button>
          </>
        )}

        {onSubscribeClick && (
          <div className="flex justify-center mt-8">
            <SubscribeBtn
              text={TEXTS[language].subscribeButton}
              onClick={onSubscribeClick}
              className="py-3 px-6 text-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
