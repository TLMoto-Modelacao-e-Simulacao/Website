import { getImages } from "../../components/utils/FetchFolderImages";
import { timelineData, TimelineDataItem } from "@/src/components/textContent/TimelineSectionTexts";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SeoHead from "@/src/components/layout/SeoHead";
import Timeline from "@/src/components/history/Timeline";
import TiltedCard from "@/src/components/extras/TiltedCard";
import MyDefaultPage from "../../components/DefaultPage";

type TimelineEventWithImages = TimelineDataItem & { images: string[] };

export async function getStaticProps({ params }: { params: { year: string } }) {
  const { year } = params;

  const events: TimelineEventWithImages[] = (timelineData[year] || []).map(event => ({
    ...event,
    images: getImages(event.imageFolder),
  }));

  return { props: { events, selectedYear: year } };
}

export async function getStaticPaths() {
  const years = Object.keys(timelineData)
    .map(String)
    .sort((a, b) => Number(a) - Number(b));

  const paths = years.map(year => ({
    params: { year },
  }));

  return { paths, fallback: false };
}

export default function History({
  events,
  selectedYear,
}: {
  events: TimelineEventWithImages[];
  selectedYear: string;
}) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Reset fullscreen image when the selected year changes
  useEffect(() => {
    setFullscreenImage(null);
  }, [selectedYear]);

  const safeEvents = Array.isArray(events) ? events : [];

  const years = useMemo(() => {
    const uniqueYears = new Set<string>(Object.keys(timelineData).map(String));
    uniqueYears.add(selectedYear);

    return Array.from(uniqueYears).sort((a, b) => Number(a) - Number(b));
  }, [selectedYear]);

  const selectedIndex = useMemo(() => {
    const index = years.indexOf(selectedYear);

    if (index !== -1) {
      return index;
    }

    return years.length > 0 ? years.length - 1 : -1;
  }, [years, selectedYear]);

  // Prevent background scrolling and footer overlap when mobile popup is open (same as in team page)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    if (fullscreenImage) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("popup-open");
    } else {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("popup-open");
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("popup-open");
    };
  }, [fullscreenImage]);

  return (
    <>
      <SeoHead
        title={`History ${selectedYear}`}
        description={`Explore the key events and milestones of TLMOTO in ${selectedYear}, showcasing our journey, achievements, and growth.`}
      />

      <MyDefaultPage>
        <div className="flex flex-col mb-[10vh] md:mb-[5vh]">
          <Timeline
            selectedYear={selectedYear}
            selectedIndex={selectedIndex}
            timelineData={timelineData}
          />

          {/* White Box for Events */}
          <motion.div
            className="relative w-[85vw] bg-white/85 text-black px-6 py-2 rounded-lg shadow-lg mx-auto text-center animate-fadeIn mb-[7.5vh] md:mt-[5vh] md:w-[65vw]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {safeEvents.map(item => {
              const galleryImages = Array.isArray(item.images) ? item.images : [];

              return (
                <div key={item.title} className="mt-[2.5vh] mb-[3vh] outline-pink-500">
                  <h3 className="text-[4.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] 2xl:text-[1.5vw] font-bold mb-[0.125vh]">
                    {item.title}
                  </h3>
                  <p className="text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw] mb-[2vh]">
                    {item.description}
                  </p>
                  <div className="grid grid-cols-2 gap-y-[2vh] gap-x-[4vw] md:gap-x-[4vw] md:gap-y-[3vh] md:grid-cols-[repeat(auto-fit,minmax(16vw,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(10vw,1fr))]">
                    {galleryImages.map(element => (
                      <div
                        key={element}
                        className="w-full aspect-square"
                        onClick={() => setFullscreenImage(element)}
                      >
                        <TiltedCard
                          imageSrc={element}
                          containerWidth="100%"
                          containerHeight="100%"
                          rotateAmplitude={12}
                          showMobileWarning={false}
                          showTooltip={false}
                          displayOverlayContent={true}
                          overlayContent=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
          <AnimatePresence>
            {fullscreenImage && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFullscreenImage(null)}
              >
                <motion.img
                  src={fullscreenImage}
                  alt="Fullscreen"
                  className="max-w-[80vw] max-h-[80vh] rounded-lg object-contain cursor-default"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  onClick={e => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MyDefaultPage>
    </>
  );
}
