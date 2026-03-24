import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const allCards = [...cards].sort((a, b) => b.id.localeCompare(a.id));

  useEffect(() => {
    if (navRef.current) {
      const activeItem = navRef.current.querySelector('[data-active="true"]');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [card.id]);

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-black">
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
              playsInline
              preload="auto"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 pb-32 md:px-12 md:pb-10 lg:px-20 lg:pb-12">
        <div className="w-full max-w-4xl flex flex-col gap-8 md:gap-6">
          <div className="flex flex-row items-center w-full md:gap-8 overflow-hidden">
            <Link
              href="/garage"
              className="hidden md:flex flex-shrink-0 text-white hover:text-[#39a6ff] transition-colors p-2 -ml-2 rounded-full hover:bg-white/10 z-10"
              aria-label="Voltar à garagem"
            >
              <ArrowLeft size={32} strokeWidth={3} />
            </Link>

            <nav className="flex-1 min-w-0 w-full pointer-events-auto">
              <div
                ref={navRef}
                className="flex overflow-x-auto overflow-y-hidden no-scrollbar gap-8 items-center pb-2 w-full pr-8 md:pr-0 scroll-smooth"
              >
                {allCards.map(moto => {
                  const isActive = moto.id === card.id;

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
                      data-active={isActive}
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

          <div className="w-full transform transition-all duration-700 ease-out origin-bottom-left max-h-[50vh] overflow-y-auto no-scrollbar pointer-events-auto">
            <MyStatsChart stats={card.stats} motoId={card.id} />
          </div>
        </div>

        {!isMobile && motoBackgrounds.length > 1 && card.id !== "m03" && card.id !== "03" && (
          <button
            onClick={toggleBackground}
            className="absolute top-12 right-12 z-50 rounded-full px-4 py-2 bg-gray-800/80 text-white text-sm backdrop-blur-md hover:bg-gray-700 transition-all border border-white/10 pointer-events-auto"
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
        }xs
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
