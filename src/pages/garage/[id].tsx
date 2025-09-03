import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { cards, backgrounds } from "src/components/textContent/GarageSectionTexts";
import MyStatsChart from "src/components/garage/GarageStatsChart";

export default function GarageDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const card = cards.find(card => card.id === id);
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

  if (!card) {
    return <p className="text-white text-center text-xl">Card not found</p>;
  }

  const motoBackgrounds = backgrounds[card.id as keyof typeof backgrounds] ?? [card.video];
  const currentVideo = motoBackgrounds[bgIndex];


  const motoImage =
    typeof id === "string" ? `/images/garage/${id.replace("m", "").padStart(2, "0")}.webp` : "";

  const toggleBackground = () => {
    if (motoBackgrounds.length > 1) {
      setBgIndex(i => (i + 1) % motoBackgrounds.length);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {isMobile ? (
        <img
          src={motoImage}
          alt={`${card.title} background`}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        <video
          key={`${card.id}-${bgIndex}`}
          src={currentVideo}
          className="absolute inset-0 min-w-full min-h-full object-cover z-[-1000]"
          autoPlay
          muted
          preload="auto"
          aria-hidden="true"
        />
      )}

      <div className="relative z-40 w-full h-full flex flex-col justify-end items-start box-border p-2 sm:p-4 md:p-6">
        <div className="w-full mb-25 sm:max-w-md md:max-w-lg lg:max-w-xl px-2 sm:px-4 md:px-0 ml-0 sm:ml-2 md:ml-4 lg:ml-8 xl:ml-12 transform lg:-translate-x-2 min-w-0 mb-4 sm:mb-6 md:mb-8 lg:mb-25">
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
