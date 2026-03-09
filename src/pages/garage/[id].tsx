import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Components & Data
import { cards, backgroundData, themeColors } from "src/components/textContent/GarageSectionTexts";
import MyStatsChart from "src/components/garage/GarageStatsChart";
import { withBasePath } from "@/src/utils/basePath";

type Card = (typeof cards)[number];

type GarageDetailPageProps = {
  card: Card;
};

export default function GarageDetailPage({ card }: GarageDetailPageProps) {
  const [bgIndex, setBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Handle Responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Background Logic
  const motoBackgrounds = backgroundData[card.id as keyof typeof backgroundData] ?? [card.video];
  const currentVideo = motoBackgrounds[bgIndex];
  const motoImage = withBasePath(
    `/images/garage/${card.id.replace("m", "").padStart(2, "0")}.webp`
  );

  const toggleBackground = () => {
    if (motoBackgrounds.length > 1) {
      setBgIndex(i => (i + 1) % motoBackgrounds.length);
    }
  };

  // Lógica de Janela de 3 Botões (Ordem Decrescente)
  const descendingCards = [...cards].sort((a, b) => b.id.localeCompare(a.id));
  const currentIndex = descendingCards.findIndex(c => c.id === card.id);
  // Garante que mostramos sempre 3 elementos sem rebentar os limites do array
  const startIndex = Math.max(0, Math.min(currentIndex - 1, descendingCards.length - 3));
  const visibleCards = descendingCards.slice(startIndex, startIndex + 3);

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-black">
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {isMobile ? (
            <motion.img
              key={motoImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={motoImage}
              alt={card.title}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          ) : (
            <motion.video
              key={`${card.id}-${bgIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={currentVideo}
              className="w-full h-full object-cover pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />
      </div>

      {/* 2. UI CONTENT LAYER */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 pb-32 md:px-12 md:pb-10 lg:px-20 lg:pb-12">
        {/* Contentor para alinhar Nav e Seta à esquerda, Chart em baixo */}
        <div className="w-full max-w-4xl flex flex-col gap-8 md:gap-6">
          {/* BLOCO DE NAVEGAÇÃO: SETA + BOTÕES DAS MOTAS */}
          <div className="flex flex-row items-center w-full md:gap-8">
            {/* Seta de Voltar (Oculta em mobile com "hidden", visível em desktop com "md:flex") */}
            <Link
              href="/garage"
              className="hidden md:flex flex-shrink-0 text-white hover:text-[#39a6ff] transition-colors p-2 -ml-2 rounded-full hover:bg-white/10 z-10"
              aria-label="Voltar à garagem"
            >
              <ArrowLeft size={32} strokeWidth={3} />
            </Link>

            {/* Barra de Navegação das Motas */}
            <nav className="flex-1 min-w-0 w-full">
              {/* justify-center no mobile centra os números, md:justify-start alinha à esquerda no desktop */}
              <div className="flex justify-center md:justify-start overflow-x-auto no-scrollbar gap-8 items-center pb-2 w-full">
                {visibleCards.map(moto => {
                  const isActive = moto.id === card.id;

                  // Proteção para o problema da mota 03
                  const rawColor = themeColors[moto.id as keyof typeof themeColors];
                  const fallbackColor =
                    moto.id === "m03" || moto.id === "03" ? "255,0,0" : "255,255,255";
                  const finalColorRaw = rawColor || fallbackColor;
                  const safeCssColor = finalColorRaw.includes(",")
                    ? `rgb(${finalColorRaw})`
                    : finalColorRaw;

                  return (
                    <Link
                      key={moto.id}
                      href={`/garage/${moto.id}`}
                      className={`
                        flex-shrink-0 transition-all duration-300 group select-none relative
                        ${isActive ? "scale-105 opacity-100" : "opacity-60 hover:opacity-100"}
                      `}
                    >
                      <span
                        className="text-lg md:text-xl lg:text-2xl font-black italic uppercase tracking-tighter whitespace-nowrap block"
                        style={{
                          color: isActive ? safeCssColor : "#ffffff",
                          WebkitTextStroke: "none",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                        }}
                      >
                        {moto.title}
                      </span>
                      {/* Linha sublinhada animada */}
                      <div
                        className={`h-[3px] mt-1 transition-all duration-500 absolute bottom-[-6px] left-0 rounded-full ${
                          isActive ? "w-full" : "w-0 group-hover:w-1/2"
                        }`}
                        style={{ backgroundColor: safeCssColor }}
                      />
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Stats Chart */}
          <div className="w-full transform transition-all duration-700 ease-out origin-bottom-left max-h-[50vh] overflow-y-auto no-scrollbar">
            <MyStatsChart stats={card.stats} motoId={card.id} />
          </div>
        </div>

        {/* Theme Toggle Button (Desktop Only) */}
        {!isMobile && motoBackgrounds.length > 1 && (
          <button
            onClick={toggleBackground}
            className="absolute top-12 right-12 z-50 rounded-full px-4 py-2 bg-gray-800/80 text-white text-sm backdrop-blur-md hover:bg-gray-700 transition-all border border-white/10"
          >
            Switch Theme
          </button>
        )}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// --- DATA FETCHING (Keep from Original for SEO/Performance) ---

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: cards.map(card => ({ params: { id: card.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ card: Card }> = async ({ params }) => {
  const id = params?.id as string;
  const card = cards.find(cardItem => cardItem.id === id);

  if (!card) return { notFound: true };

  return {
    props: { card },
  };
};
