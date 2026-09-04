import type { GetStaticPaths, GetStaticProps } from "next";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SeoHead from "@/src/components/layout/SeoHead";
import Link from "next/link";
import { cards, backgroundData, themeColors } from "src/components/textContent/GarageSectionTexts";
import MyStatsChart from "src/components/garage/GarageStatsChart";
import { withBasePath } from "@/src/utils/basePath";

type Card = (typeof cards)[number];

type GarageDetailPageProps = {
  card: Card;
};

export default function GarageDetailPage({ card }: GarageDetailPageProps) {
  //const [bgIndex, setBgIndex] = useState(0);
  const bgIndex = 0;
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
    <>
      <SeoHead
        title={`${card.title}`}
        description={`Get to know the prototype ${card.title}, its specifications, performance stats, and the story behind its development in TLMOTO's garage.`}
      />
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

        <div className="relative z-10 w-full h-full flex flex-col justify-end">
          <div className="flex flex-col gap-8 lg:max-w-[60vw] md:gap-6 mb-[9vh] lg:mb-[7vh] ml-[5vw] mr-[5vw] lg:mr-0">
            {/* menu para mudar de prototipo */}
            <div className="flex flex-row items-center w-full md:gap-[1vw] overflow-hidden">
              <Link
                href="/garage"
                className="flex flex-shrink-0 text-white hover:text-[#39a6ff] transition-colors p-2 -ml-2 mr-2 lg:mr-0 rounded-full lg:hover:bg-white/10 z-10"
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
                        className={`flex-shrink-0 transition-all duration-300 group select-none relative ${isActive ? "scale-105 opacity-100" : "opacity-60 hover:opacity-100"}`}
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

            <div className="w-full transform transition-all duration-700 ease-out origin-bottom-left overflow-y-auto no-scrollbar pointer-events-auto">
              <MyStatsChart stats={card.stats} motoId={card.id} />
            </div>
          </div>
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
    </>
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
