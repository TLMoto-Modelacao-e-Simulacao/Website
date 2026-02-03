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

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {isMobile ? (
            <motion.img
              key={motoImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={motoImage}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.video
              key={`${card.id}-${bgIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={currentVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30 z-[1]" />
      </div>

      {/* 2. UI CONTENT LAYER */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end items-start p-6 md:p-12 lg:p-20">
        {/* Back Button */}
        <div className="mb-20 md:mb-40">
          <Link
            href="/garage"
            className="text-white hover:text-[#39a6ff] transition-colors inline-block"
            aria-label="Voltar"
          >
            <ArrowLeft size={32} strokeWidth={3} />
          </Link>
        </div>

        <div className="w-full max-w-2xl">
          {/* Bike Navigation Menu */}
          <nav className="mb-8 w-full">
            <div className="flex overflow-x-auto no-scrollbar gap-8 md:gap-12 items-end">
              {cards.map(moto => {
                const isActive = moto.id === card.id;
                const motoColor = themeColors[moto.id as keyof typeof themeColors] || "255,255,255";

                return (
                  <Link
                    key={moto.id}
                    href={`/garage/${moto.id}`}
                    className={`flex-shrink-0 transition-all duration-300 group ${
                      isActive ? "scale-110" : "opacity-40 hover:opacity-100"
                    }`}
                  >
                    <span
                      className="text-lg md:text-2xl font-black italic uppercase tracking-tighter"
                      style={{ color: isActive ? `rgb(${motoColor})` : "white" }}
                    >
                      {moto.title}
                    </span>
                    <div
                      className={`h-1 mt-1 transition-all duration-500 ${
                        isActive ? "w-full" : "w-0 group-hover:w-1/2"
                      }`}
                      style={{ backgroundColor: `rgb(${motoColor})` }}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Stats Chart */}
          <div className="w-full transform transition-all duration-700 ease-out">
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
