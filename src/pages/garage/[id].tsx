import { useRouter } from "next/router";
import { useState } from "react";
import { cards, backgrounds } from "src/components/textContent/GarageSectionTexts";
import MyStatsChart from "src/components/garage/GarageStatsChart";
import MyChartToggleButtons from "src/components/garage/ChartToggleButtons";

export default function GarageDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const card = cards.find(card => card.id === id);
  const [showHistory, setShowHistory] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  if (!card) {
    return <p className="text-white text-center text-xl">Card not found</p>;
  }

  const motoBackgrounds = backgrounds[card.id] ?? [card.video];
  const currentVideo = motoBackgrounds[bgIndex];

  const toggleBackground = () => {
    if (motoBackgrounds.length > 1) {
      setBgIndex(i => (i + 1) % motoBackgrounds.length);
    }
  };

  return (
    <div className="relative h-screen w-screen md:overflow-hidden">
      <video
        key={`${card.id}-${bgIndex}`}
        src={currentVideo}
        className="absolute inset-0 min-w-full min-h-full object-cover z-0"
        autoPlay
        muted
        loop
        preload="auto"
        aria-hidden="true"
      />

      <div className="relative z-40 w-full h-full flex flex-col justify-end items-start box-border">
        <div
          className="
            w-full max-w-full sm:max-w-xl box-border
            px-4 sm:px-0
            self-start
            ml-0 sm:ml-4 md:ml-8 lg:ml-12
            transform lg:-translate-x-2
            min-w-0
            mb-6
          "
        >
          <MyStatsChart
            stats={card.stats}
            motoId={card.id}
            showHistory={showHistory}
            historyText={card.historyText}
          />
          <div className="mt-2 flex flex-wrap gap-3">
            <MyChartToggleButtons
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              motoId={card.id}
              toggleBackground={toggleBackground}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
