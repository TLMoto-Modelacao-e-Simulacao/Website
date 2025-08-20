import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Newsletter {
  name: string;
  month: number;
  link: string;
  linkPt?: string;
  year?: string;
  fullPath?: string;
}

interface MyNewsCoverflowEffectProps {
  onSubscribeClick?: (e: React.MouseEvent) => void;
}

const availableYears = ["Complete Archive", "2021", "2022", "2023", "2024", "2025"];

export default function MyNewsCoverflowEffect({ onSubscribeClick }: MyNewsCoverflowEffectProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  // Estados do carrossel apenas para mobile
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Years visible to user (excluding Complete Archive for now)
  const visibleYears = availableYears.filter(year => year !== "Complete Archive");

  // Textos em português e inglês
  const texts = {
    pt: {
      mainTitle: "A newsletter de Março está repleta das mais recentes informações, entrevistas e dicas técnicas, sendo uma leitura obrigatória para te manteres atualizado. Não percas as futuras edições e fica a conhecer todo o trabalho realizado pela nossa equipa.",
      subscribeButton: "Subscrever a nossa Newsletter",
      allNewsletters: "Todas as Newsletters",
      completeArchive: "Arquivo completo organizado por ano",
      clickToView: "Click para visualizar",
      tapToView: "Toque para visualizar",
      latestNewsletter: "Newsletter Mais Recente",
      newsletter: "Newsletter",
      closeModal: "Fechar modal"
    },
    en: {
      mainTitle: "The March 2025 newsletter is packed with the latest insights, interviews, and expert tips, it's a must-read to stay ahead. Don't miss out on future editions and stay updated on all the work done by the team.",
      subscribeButton: "Subscribe to our Newsletter",
      allNewsletters: "All Newsletters",
      completeArchive: "Complete archive organized by year",
      clickToView: "Click to view",
      tapToView: "Tap to view",
      latestNewsletter: "Latest Newsletter",
      newsletter: "Newsletter",
      closeModal: "Close modal"
    }
  };

  // Estados para o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // Função para combinar todas as newsletters
  const combineAllNewsletters = (): Newsletter[] => {
    const newsletterData: { [key: string]: { name: string; month: number; link: string; linkPt?: string }[] } = {
      2021: [
        {
          name: "january.png",
          month: 1,
          link: "https://online.pubhtml5.com/rzzqg/jggt/",
          linkPt: "https://online.pubhtml5.com/rzzqg/mrmn/",
        },
        {
          name: "may.png",
          month: 5,
          link: "https://online.pubhtml5.com/rzzqg/pdtr/",
          linkPt: "https://online.pubhtml5.com/rzzqg/lrhz/",
        },
        {
          name: "august.png",
          month: 8,
          link: "https://online.pubhtml5.com/rzzqg/swnv/",
          linkPt: "https://online.pubhtml5.com/rzzqg/xdfz/",
        },
        {
          name: "november.png",
          month: 11,
          link: "https://online.pubhtml5.com/rzzqg/rfgg/",
          linkPt: "https://online.pubhtml5.com/rzzqg/kjkg/",
        },
      ],
      2022: [
        {
          name: "february.png",
          month: 2,
          link: "https://online.pubhtml5.com/rzzqg/sytw/",
          linkPt: "https://online.pubhtml5.com/rzzqg/ooky/",
        },
        {
          name: "may.png",
          month: 5,
          link: "https://online.pubhtml5.com/rzzqg/vpnh/",
          linkPt: "https://online.pubhtml5.com/rzzqg/ynqz/",
        },
        {
          name: "august.png",
          month: 8,
          link: "https://online.pubhtml5.com/rzzqg/wpko/",
          linkPt: "https://online.pubhtml5.com/rzzqg/gwde/",
        },
        {
          name: "november.png",
          month: 11,
          link: "https://online.pubhtml5.com/rzzqg/whql/",
          linkPt: "https://online.pubhtml5.com/rzzqg/aafy/",
        },
      ],
      2023: [
        {
          name: "march.png",
          month: 3,
          link: "https://online.pubhtml5.com/rzzqg/lzir/",
          linkPt: "https://online.pubhtml5.com/rzzqg/khio/",
        },
        {
          name: "june.png",
          month: 6,
          link: "https://online.pubhtml5.com/rzzqg/jjgo/",
          linkPt: "https://online.pubhtml5.com/rzzqg/yikm/",
        },
        {
          name: "october.png",
          month: 10,
          link: "https://online.pubhtml5.com/rzzqg/mctf/",
          linkPt: "https://online.pubhtml5.com/rzzqg/lsxd/",
        },
        {
          name: "december.png",
          month: 12,
          link: "https://online.pubhtml5.com/rzzqg/xzpj/",
          linkPt: "https://online.pubhtml5.com/rzzqg/puhg/",
        },
      ],
      2024: [
        {
          name: "march.png",
          month: 3,
          link: "https://online.pubhtml5.com/ffstg/javr/",
          linkPt: "https://online.pubhtml5.com/ffstg/aqvm/",
        },
        {
          name: "june.png",
          month: 6,
          link: "https://online.pubhtml5.com/qlvfj/teux/",
          linkPt: "https://online.pubhtml5.com/qlvfj/prrj/",
        },
        {
          name: "september.png",
          month: 9,
          link: "https://online.pubhtml5.com/qlvfj/svrs/",
          linkPt: "https://online.pubhtml5.com/qlvfj/xaiw/",
        },
        {
          name: "december.jpg",
          month: 12,
          link: "https://online.pubhtml5.com/qlvfj/gzzc/",
          linkPt: "https://online.pubhtml5.com/qlvfj/zffw/",
        },
      ],
      2025: [
        {
          name: "march.jpg",
          month: 3,
          link: "https://online.pubhtml5.com/qlvfj/ccjc/",
          linkPt: "https://online.pubhtml5.com/qlvfj/sjsg/",
        },
      ],
    };

    if (selectedYear === "Complete Archive") {
      const allNewsletters: Newsletter[] = [];
      Object.keys(newsletterData).forEach(year => {
        newsletterData[year].forEach(newsletter => {
          allNewsletters.push({
            ...newsletter,
            year: year,
            fullPath: `/images/newsletter/${year}/${newsletter.name}`,
            link: newsletter.link, // Usar o link específico de cada newsletter
          });
        });
      });

      // Ordenar por ano (mais recente primeiro) e depois por mês (mais recente primeiro)
      return allNewsletters.sort((a, b) => {
        if (a.year !== b.year) {
          return parseInt(b.year!) - parseInt(a.year!);
        }
        return b.month - a.month;
      });
    } else {
      return (newsletterData[selectedYear] || []).map(newsletter => ({
        ...newsletter,
        year: selectedYear,
        fullPath: `/images/newsletter/${selectedYear}/${newsletter.name}`,
        link: newsletter.link, // Usar o link específico de cada newsletter
      }));
    }
  };

  // Funções do modal
  const openModal = (imagePath: string, title: string) => {
    setModalImage(imagePath);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
    setModalTitle("");
  };

  // Sistema de cliques (simples, duplo, ctrl+click)
  const handleImageClick = (newsletter: Newsletter, event: React.MouseEvent) => {
    // Determinar qual link usar baseado no idioma
    const linkToUse = language === "pt" && newsletter.linkPt ? newsletter.linkPt : newsletter.link;
    
    if (event.ctrlKey || event.metaKey) {
      // Ctrl+Click ou Cmd+Click - abre diretamente em nova aba
      window.open(linkToUse, "_blank");
      return;
    }

    // Armazenar referência segura do elemento
    const targetElement = event.currentTarget as HTMLElement;

    // Click simples - abre modal (com delay para detectar duplo-click)
    const timer = setTimeout(() => {
      const title =
        selectedYear === "Complete Archive"
          ? `${texts[language].newsletter} ${newsletter.year} - ${getMonthName(newsletter.month)}`
          : `${texts[language].newsletter} ${selectedYear}`;
      openModal(newsletter.fullPath!, title);
    }, 200);

    // Duplo-click - cancela o timer e abre em nova aba
    const handleDoubleClick = () => {
      clearTimeout(timer);
      window.open(linkToUse, "_blank");
    };

    // Adiciona listener temporário para duplo-click
    if (targetElement) {
      targetElement.addEventListener("dblclick", handleDoubleClick, { once: true });

      // Remove o listener após 300ms se não houver duplo-click
      setTimeout(() => {
        if (targetElement && targetElement.removeEventListener) {
          targetElement.removeEventListener("dblclick", handleDoubleClick);
        }
      }, 300);
    }
  };

  // Função auxiliar para nomes dos meses
  const getMonthName = (monthNumber: number) => {
    const months: Record<"pt" | "en", Record<number, string>> = {
      pt: {
        1: "JAN",
        2: "FEV",
        3: "MAR",
        4: "ABR",
        5: "MAI",
        6: "JUN",
        7: "JUL",
        8: "AGO",
        9: "SET",
        10: "OUT",
        11: "NOV",
        12: "DEZ",
      },
      en: {
        1: "JAN",
        2: "FEB",
        3: "MAR",
        4: "APR",
        5: "MAY",
        6: "JUN",
        7: "JUL",
        8: "AUG",
        9: "SEP",
        10: "OCT",
        11: "NOV",
        12: "DEC",
      },
    };
    return months[language][monthNumber] || "";
  };

  // Função para navegar entre anos (mobile)
  const navigateYear = (direction: "prev" | "next") => {
    const currentIndex = visibleYears.indexOf(selectedYear);
    if (direction === "prev" && currentIndex > 0) {
      setSelectedYear(visibleYears[currentIndex - 1]);
    } else if (direction === "next" && currentIndex < visibleYears.length - 1) {
      setSelectedYear(visibleYears[currentIndex + 1]);
    }
  };

  // Detectar tamanho da tela
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        // Forçar re-render para evitar problemas de layout
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 100);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  // Função para obter todas as newsletters (desktop) ou por ano (mobile)
  const getAllNewslettersForDisplay = useCallback((): Newsletter[] => {
    if (!isMobile) {
      // Desktop: mostrar todas as newsletters organizadas por ano (mais recente → mais antiga)
      const newsletterData: { [key: string]: { name: string; month: number; link: string; linkPt?: string }[] } = {
        2025: [
          {
            name: "march.jpg",
            month: 3,
            link: "https://online.pubhtml5.com/qlvfj/ccjc/",
            linkPt: "https://online.pubhtml5.com/qlvfj/sjsg/",
          },
        ],
        2024: [
          {
            name: "march.png",
            month: 3,
            link: "https://online.pubhtml5.com/ffstg/javr/",
            linkPt: "https://online.pubhtml5.com/ffstg/aqvm/",
          },
          {
            name: "june.png",
            month: 6,
            link: "https://online.pubhtml5.com/qlvfj/teux/",
            linkPt: "https://online.pubhtml5.com/qlvfj/prrj/",
          },
          {
            name: "september.png",
            month: 9,
            link: "https://online.pubhtml5.com/qlvfj/svrs/",
            linkPt: "https://online.pubhtml5.com/qlvfj/xaiw/",
          },
          {
            name: "december.jpg",
            month: 12,
            link: "https://online.pubhtml5.com/qlvfj/gzzc/",
            linkPt: "https://online.pubhtml5.com/qlvfj/zffw/",
          },
        ],
        2023: [
          {
            name: "march.png",
            month: 3,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_23_03.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_23_03.pdf",
          },
          {
            name: "june.png",
            month: 6,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_23_06.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_23_06.pdf",
          },
          {
            name: "october.png",
            month: 10,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_23_10.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_23_10.pdf",
          },
          {
            name: "december.png",
            month: 12,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_23_12.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_23_12.pdf",
          },
        ],
        2022: [
          {
            name: "february.png",
            month: 2,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_22_02.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_22_02.pdf",
          },
          {
            name: "may.png",
            month: 5,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_22_05.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_22_05.pdf",
          },
          {
            name: "august.png",
            month: 8,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_22_08.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_22_08.pdf",
          },
          {
            name: "november.png",
            month: 11,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_22_11.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_22_11.pdf",
          },
        ],
        2021: [
          {
            name: "january.png",
            month: 1,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_21_01.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_21_01.pdf",
          },
          {
            name: "may.png",
            month: 5,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_21_05.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_21_05.pdf",
          },
          {
            name: "august.png",
            month: 8,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_21_08.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_21_08.pdf",
          },
          {
            name: "november.png",
            month: 11,
            link: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_EN_21_11.pdf",
            linkPt: "https://tlmoto.tecnico.ulisboa.pt/newsletter/news/NEWSLETTER_PT_21_11.pdf",
          },
        ],
      };

      const allNewsletters: Newsletter[] = [];
      // Ordenar anos de mais recente para mais antigo (2025, 2024, 2023, 2022, 2021)
      const sortedYears = Object.keys(newsletterData).sort((a, b) => parseInt(b) - parseInt(a));
      
      sortedYears.forEach(year => {
        // Dentro de cada ano, ordenar por mês (mais recente primeiro)
        const yearNewsletters = newsletterData[year]
          .sort((a, b) => b.month - a.month)
          .map(newsletter => ({
            ...newsletter,
            year: year,
            fullPath: `/images/newsletter/${year}/${newsletter.name}`,
            link: newsletter.link,
            linkPt: newsletter.linkPt,
          }));
        allNewsletters.push(...yearNewsletters);
      });

      return allNewsletters;
    } else {
      // Mobile: usar a função original por ano
      return combineAllNewsletters();
    }
  }, [isMobile, selectedYear]);

  // Carregar newsletters quando o ano muda (mobile) ou quando o isMobile muda
  useEffect(() => {
    const newsletters = getAllNewslettersForDisplay();
    setNewsletters(newsletters);
    setCurrentSlide(0);
  }, [selectedYear, isMobile, language, getAllNewslettersForDisplay]);

  // Navigation functions for mobile carousel only
  const navigateSlide = useCallback((direction: "prev" | "next") => {
    if (!isMobile || isTransitioning || newsletters.length === 0) return;

    setIsTransitioning(true);

    if (direction === "prev") {
      setCurrentSlide(prev => (prev === 0 ? newsletters.length - 1 : prev - 1));
    } else {
      setCurrentSlide(prev => (prev === newsletters.length - 1 ? 0 : prev + 1));
    }

    setTimeout(() => setIsTransitioning(false), 500);
  }, [isMobile, isTransitioning, newsletters.length]);

  const goToSlide = useCallback((index: number) => {
    if (!isMobile || isTransitioning || index === currentSlide || index < 0 || index >= newsletters.length)
      return;

    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isMobile, isTransitioning, currentSlide, newsletters.length]);

  // Reset slide when newsletters change
  useEffect(() => {
    setCurrentSlide(0);
  }, [newsletters]);

  // Keyboard navigation for mobile only
  useEffect(() => {
    if (!isMobile) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (newsletters.length === 0) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateSlide("prev");
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateSlide("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile, newsletters.length, navigateSlide]);

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(var(--vh)*100)] text-white pt-0">
      {/* Language Selector - Flags */}
      <div className="absolute top-34 left-1/2 transform -translate-x-1/2 z-50 flex gap-3">
        <button
          onClick={() => setLanguage("pt")}
          className={`transition-all duration-300 hover:scale-110 ${
            language === "pt" ? "opacity-100 scale-110" : "opacity-70"
          }`}
          title="Português"
        >
          <Image
            src="/images/newsletter/flags/flagPortugal.png"
            alt="Português"
            width={32}
            height={22}
            className="rounded-sm shadow-lg"
          />
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`transition-all duration-300 hover:scale-110 ${
            language === "en" ? "opacity-100 scale-110" : "opacity-70"
          }`}
          title="English"
        >
          <Image
            src="/images/newsletter/flags/flagUK.png"
            alt="English"
            width={32}
            height={22}
            className="rounded-sm shadow-lg"
          />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 w-screen h-screen bg-black/85 backdrop-blur-sm z-[1001] flex justify-center items-center p-5"
          onClick={closeModal}
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="relative bg-white rounded-3xl w-[85vw] h-[85vh] max-w-5xl max-h-[800px] flex flex-col p-8 shadow-[0_25px_50px_rgba(0,0,0,0.5)] mt-16 animate-modal-appear md:w-[90vw] md:h-[85vh] md:p-5 md:mt-20 sm:w-[95vw] sm:h-[80vh] sm:p-4 sm:mt-24"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white border-none rounded-full w-10 h-10 cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 p-0 sm:w-9 sm:h-9"
              onClick={closeModal}
              aria-label={texts[language].closeModal}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 className="text-3xl font-bold text-slate-700 mb-5 text-center md:text-2xl sm:text-xl">
              {modalTitle}
            </h3>
            <div className="flex-1 flex justify-center items-center overflow-hidden rounded-xl">
              <img
                src={modalImage}
                alt={modalTitle}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Year Selection - Mobile */}
      {isMobile && (
        <div className="flex items-center justify-center gap-4 mt-26 px-4">
          <button
            onClick={() => navigateYear("prev")}
            disabled={visibleYears.indexOf(selectedYear) === 0}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              visibleYears.indexOf(selectedYear) === 0
                ? "border-gray-300 text-gray-300 cursor-not-allowed"
                : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <div className="font-bold text-2xl text-white text-center">{selectedYear}</div>

          <button
            onClick={() => navigateYear("next")}
            disabled={visibleYears.indexOf(selectedYear) === visibleYears.length - 1}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              visibleYears.indexOf(selectedYear) === visibleYears.length - 1
                ? "border-gray-300 text-gray-300 cursor-not-allowed"
                : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
      )}

      {/* Featured Newsletter - Desktop Only */}
      {!isMobile && newsletters.length > 0 && (
        <div className="relative w-full max-w-7xl mx-auto mt-55 mb-16 px-8">
          <div className="flex items-center justify-between gap-16">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-3xl font-bold text-white mb-8 leading-tight">
                {texts[language].mainTitle}
              </h1>
              
              {onSubscribeClick && (
                <button
                  onClick={onSubscribeClick}
                  className="group border-2 border-blue-500 text-blue-500 font-semibold py-4 px-10 rounded-lg text-lg tracking-wide transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-xl hover:scale-105"
                  type="button"
                >
                  {texts[language].subscribeButton}
                </button>
              )}
              </div>

              {/* Right Newsletter */}
              <div className="flex-shrink-0">
                <div
                  className="relative w-[350px] h-[490px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                  onClick={e => handleImageClick(newsletters[0], e)}
                  title={`${texts[language].latestNewsletter} ${newsletters[0].year} - ${getMonthName(newsletters[0].month)} • ${texts[language].clickToView} • Duplo-click para abrir • Ctrl+Click para link direto`}
                >
                  {/* Newsletter Image */}
                  <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl bg-gray-100">
                    <Image
                      src={newsletters[0].fullPath!}
                      alt={`${texts[language].latestNewsletter} ${newsletters[0].year} - ${getMonthName(newsletters[0].month)}`}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/newsletter/placeholder.jpg";
                      }}
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-6">
                      <h3 className="text-xl font-bold mb-2 text-center">
                        {getMonthName(newsletters[0].month)} {newsletters[0].year}
                      </h3>
                      <div className="text-blue-300 underline cursor-pointer hover:text-blue-200">
                        {texts[language].clickToView}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}

      {/* Divider Line */}
      {!isMobile && newsletters.length > 0 && (
        <div className="w-full max-w-6xl mx-auto mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          <div className="text-center mt-8">
            <h3 className="text-2xl font-bold text-white mb-2">{texts[language].allNewsletters}</h3>
            <p className="text-gray-300">{texts[language].completeArchive}</p>
          </div>
        </div>
      )}

      {/* Newsletter Grid - Desktop */}
      {!isMobile && (
        <div className="relative w-full max-w-7xl mx-auto mt-8 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 gap-12 place-items-center">
            {newsletters.map((newsletter, index) => (
              <div
                key={index}
                className="relative w-[280px] h-[392px] overflow-hidden rounded-xl shadow-xl group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gray-100"
                onClick={e => handleImageClick(newsletter, e)}
                title={`${texts[language].newsletter} ${newsletter.year} - ${getMonthName(newsletter.month)} • ${texts[language].clickToView} • Duplo-click para abrir • Ctrl+Click para link direto`}
              >
                <Image
                  src={newsletter.fullPath!}
                  alt={`${texts[language].newsletter} ${newsletter.year} - ${getMonthName(newsletter.month)}`}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/newsletter/placeholder.jpg";
                  }}
                />

                {/* Overlay effect on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-6">
                  <h3 className="text-lg font-bold mb-2 text-center">
                    {texts[language].newsletter} {newsletter.year}
                  </h3>
                  <p className="text-sm text-center mb-4">
                    {getMonthName(newsletter.month)} {newsletter.year}
                  </p>
                  <div className="text-blue-300 underline cursor-pointer hover:text-blue-200 text-sm">
                    {texts[language].clickToView}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Subscribe Button */}
      {!isMobile && onSubscribeClick && (
        <div className="flex justify-center mt-6.5 mb-8 px-4">
          <button
            className="bg-blue-800 hover:bg-blue-900 text-white text-xl py-4 px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-medium tracking-wide hover:scale-105 transform hover:-translate-y-1"
            onClick={onSubscribeClick}
            type="button"
          >
            {texts[language].subscribeButton}
          </button>
        </div>
      )}

      {/* Newsletter Carousel - Mobile */}
      {isMobile && (
        <div className="relative w-full px-4 mt-4">
          {/* Main Mobile Carousel Container */}
          <div className="relative h-[330px] overflow-hidden rounded-lg">
            {/* Mobile Carousel Track */}
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {newsletters.map((newsletter, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex justify-center items-center px-4"
                >
                  <div
                    className="relative w-[220px] h-[308px] overflow-hidden rounded-xl shadow-xl group cursor-pointer transition-all duration-300 hover:scale-105 bg-gray-100"
                    onClick={e => handleImageClick(newsletter, e)}
                    title={
                      selectedYear === "Complete Archive"
                        ? `${texts[language].tapToView} • Duplo-toque para abrir`
                        : `${texts[language].tapToView} • Duplo-toque para abrir diretamente`
                    }
                  >
                    <Image
                      src={newsletter.fullPath!}
                      alt={
                        selectedYear === "Complete Archive"
                          ? `${texts[language].newsletter} ${newsletter.year} - ${getMonthName(newsletter.month)}`
                          : `${texts[language].newsletter} ${selectedYear}`
                      }
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/newsletter/placeholder.jpg";
                      }}
                    />

                    {/* Mobile Overlay effect */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                      <h3 className="text-lg font-bold mb-2 text-center">
                        {selectedYear === "Complete Archive"
                          ? `${texts[language].newsletter} ${newsletter.year}`
                          : `${texts[language].newsletter} ${selectedYear}`}
                      </h3>
                      <p className="text-sm text-center mb-3">
                        {getMonthName(newsletter.month)}
                        {selectedYear === "Complete Archive" && ` ${newsletter.year}`}
                      </p>
                      <div className="text-blue-300 underline cursor-pointer hover:text-blue-200 text-sm">
                        {texts[language].tapToView}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <button
            onClick={() => navigateSlide("prev")}
            className="absolute left-2 top-2/5 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-20 hover:scale-110"
            aria-label="Previous Slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <button
            onClick={() => navigateSlide("next")}
            className="absolute right-2 top-2/5 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-20 hover:scale-110"
            aria-label="Next Slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

          {/* Mobile Pagination Dots */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {newsletters.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                  idx === currentSlide ? "bg-white scale-125" : "bg-gray-400 hover:bg-gray-300"
                }`}
                onClick={() => goToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Subscribe Button */}
          {onSubscribeClick && (
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-800 hover:bg-blue-900 text-white text-lg py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-medium tracking-wide hover:scale-105"
                onClick={onSubscribeClick}
                type="button"
              >
                {texts[language].subscribeButton}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}