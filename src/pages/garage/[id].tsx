import type { GetStaticPaths, GetStaticProps } from "next";
import { useState, useEffect } from "react";
import { cards, backgrounds } from "src/components/textContent/GarageSectionTexts";
import MyStatsChart from "src/components/garage/GarageStatsChart";
import { motion } from "framer-motion";
import { withBasePath } from "@/src/utils/basePath";

type Card = (typeof cards)[number];

type GarageDetailPageProps = {
  card: Card;
};

export default function GarageDetailPage({ card }: GarageDetailPageProps) {
  const [showHistory] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const motoBackgrounds = backgrounds[card.id as keyof typeof backgrounds] ?? [card.video];
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
    <div className="relative h-screen w-screen overflow-hidden">
      {isMobile ? (
        <motion.img
          src={motoImage}
          alt={`${card.title} background`}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        <video
          key={`${card.id}-${bgIndex}`}
          src={currentVideo}
          className="absolute inset-0 min-w-full min-h-full object-cover object-[25%_100%] z-[0]"
          autoPlay
          muted
          preload="auto"
          aria-hidden="true"
        />
      )}

      <div className="relative z-40 w-full h-full flex flex-col justify-center items-start box-border p-2 sm:p-4 md:p-6">
        <div className="w-full mt-[40vh] sm:max-w-md md:max-w-lg lg:max-w-xl px-2 sm:px-4 md:px-0 ml-0 sm:ml-2 md:ml-4 lg:ml-8 xl:ml-12 transform lg:-translate-x-2 min-w-0 md:mt-[30vh]">
          <MyStatsChart
            stats={card.stats}
            motoId={card.id}
            showHistory={showHistory}
            historyText={card.historyText}
          />
        </div>

        {!isMobile && (
          <button
            onClick={toggleBackground}
            aria-label="Toggle theme/background"
            className="absolute top-20 right-8 sm:top-8 sm:right-8 md:top-12 md:right-12 xl:top-30 xl:right-20 z-50 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gray-800 text-white text-xs sm:text-sm shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Theme
          </button>
        )}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: cards.map(card => ({ params: { id: card.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ card: Card }> = async ({ params }) => {
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const card = id ? cards.find(cardItem => cardItem.id === id) : undefined;

  if (!card) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      card,
    },
  };
};
