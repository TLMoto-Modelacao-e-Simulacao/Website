import { getImages } from "../../components/utils/FetchFolderImages";
import MyDefaultPage from "../../components/DefaultPage";
import { timelineData, TimelineDataItem } from "@/src/components/textContent/TimelineSectionTexts";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { resolveInternalHref } from "../../utils/useInternalHref";
import TiltedCard from "@/src/components/extras/TiltedCard";
import { motion, AnimatePresence } from "framer-motion";

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
  const router = useRouter();
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
  const previousYear = selectedIndex > 0 ? years[selectedIndex - 1] : undefined;
  const nextYear =
    selectedIndex !== -1 && selectedIndex < years.length - 1 ? years[selectedIndex + 1] : undefined;

  const timelineRef = useRef<HTMLDivElement | null>(null);

  const navigateToYear = (year?: string) => {
    if (!year) {
      return;
    }

    const { href, isFileProtocol } = resolveInternalHref(`/history/${year}`);

    if (isFileProtocol) {
      window.location.href = href;
      return;
    }

    router.push(href);
  };
  return (
    <MyDefaultPage>
      <div className="flex flex-col mb-[5%]">
        {/* Timeline Years */}
        <div
          ref={timelineRef}
          className="hidden md:flex items-center mt-[10%] relative w-2/3 mx-auto"
        >
          {/* Horizontal line on top */}
          <div className="absolute top-0 left-0 w-full h-[0.5vh] bg-sky-400 z-50" />

          {years.length > 0 && (
            <div className="grid grid-cols-11 items-start w-full">
              {/* Prev year (col 1) */}
              <div className="flex justify-center">
                <motion.button
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => navigateToYear(previousYear)}
                >
                  {previousYear ? (
                    <>
                      <div className="w-[0.5vh] h-[7.5vh] bg-sky-400 group-hover:bg-sky-400 transition-colors" />
                      <motion.div
                        className="mt-2 text-xl font-bold tracking-wide text-white opacity-60
              group-hover:text-sky-400 group-hover:opacity-100 transition-all"
                      >
                        {previousYear}
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <div className="w-[0.5vh] h-[7.5vh] opacity-0" />
                      <span className="mt-2 text-xl font-bold opacity-0">-</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Ticks col 2 */}
              <div className="flex justify-center">
                {previousYear ? (
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[0.5vh] h-[5vh] bg-sky-500 opacity-50" />
                  </div>
                ) : (
                  <div className="h-20" /> // placeholder
                )}
              </div>

              {/* Ticks col 3 */}
              <div className="flex justify-center">
                {previousYear ? (
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[0.5vh] h-[5vh] bg-sky-500 opacity-50" />
                  </div>
                ) : (
                  <div className="h-20" />
                )}
              </div>

              {/* Ticks col 4 */}
              <div className="flex justify-center">
                {previousYear ? (
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[0.5vh] h-[5vh] bg-sky-500 opacity-50" />
                  </div>
                ) : (
                  <div className="h-20" /> // placeholder
                )}
              </div>

              {/* Ticks col 5 */}
              <div className="flex justify-center">
                {previousYear ? (
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[0.5vh] h-[5vh] bg-sky-500 opacity-50" />
                  </div>
                ) : (
                  <div className="h-20" /> // placeholder
                )}
              </div>

              {/* Current year (col 6) */}
              <div className="flex justify-center">
                <motion.div className="flex flex-col items-center">
                  <div className="w-[0.5vh] h-[10vh] bg-sky-400" />
                  <motion.div className="mt-2 text-xl font-bold tracking-wide text-sky-400 scale-125">
                    {selectedIndex !== -1 ? years[selectedIndex] : selectedYear}
                  </motion.div>
                </motion.div>
              </div>

              {/* Ticks col 7 */}
              <div className="flex justify-center">
                {nextYear ? (
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[0.5vh] h-[5vh] bg-sky-500 opacity-50" />
                  </div>
                ) : (
                  <div className="h-20" />
                )}
              </div>

              {/* Ticks col 8 */}
              <div className="flex justify-center">
                {nextYear ? (
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[0.5vh] h-[5vh] bg-sky-500 opacity-50" />
                  </div>
                ) : (
                  <div className="h-20" />
                )}
              </div>

              {/* Ticks col 9 */}
              <div className="flex justify-center">
                {nextYear ? (
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[0.5vh] h-[5vh] bg-sky-500 opacity-50" />
                  </div>
                ) : (
                  <div className="h-20" />
                )}
              </div>

              {/* Ticks col 10 */}
              <div className="flex justify-center">
                {nextYear ? (
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="w-[0.5vh] h-[5vh] bg-sky-500 opacity-50" />
                  </div>
                ) : (
                  <div className="h-20" />
                )}
              </div>

              {/* Next year (col 11) */}
              <div className="flex justify-center">
                <motion.button
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => navigateToYear(nextYear)}
                >
                  {nextYear ? (
                    <>
                      <div className="w-[0.5vh] h-[7.5vh] bg-sky-400 group-hover:bg-sky-400 transition-colors" />
                      <motion.div
                        className="mt-2 text-xl font-bold tracking-wide text-white opacity-60
              group-hover:text-sky-400 group-hover:opacity-100 transition-all"
                      >
                        {nextYear}
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <div className="w-[0.5vh] h-[7.5vh] opacity-0" />
                      <span className="mt-2 text-xl font-bold opacity-0">-</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Timeline Years - Mobile */}
        <div className="flex items-center text-white text-5xl justify-center gap-4 my-4 mt-35 md:hidden">
          {/* Previous Year */}
          <button
            onClick={() => navigateToYear(previousYear)}
            disabled={!previousYear}
            className="disabled:opacity-40"
          >
            &lt;
          </button>

          <div className="relative">
            <text>{selectedIndex !== -1 ? years[selectedIndex] : selectedYear}</text>
          </div>

          {/* Next Year */}
          <button
            onClick={() => navigateToYear(nextYear)}
            disabled={!nextYear}
            className="disabled:opacity-40"
          >
            &gt;
          </button>
        </div>

        {/* White Box for Events */}
        <motion.div
          className="relative w-[85%] bg-white/85 text-black px-6 py-2 rounded-lg shadow-lg mx-auto text-center animate-fadeIn mb-[7.5vh] md:mt-[5vh] md:w-[65%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {safeEvents.map(item => {
            const galleryImages = Array.isArray(item.images) ? item.images : [];

            return (
              <div key={item.title} className="mt-[2.5vh] mb-[2.5vh] lg:mb-[0vh] xl:mb-[10vh]">
                <h3 className="text-4xl font-bold mb-[0.125vh]">{item.title}</h3>
                <p className="text-xl mb-[2vh]">{item.description}</p>
                <div className="grid grid-cols-2 gap-y-[1.5vh] justify-items-center md:grid-cols-3 lg:gap-x-[1.5vw] lg:gap-y-[1.5vh] lg:grid-cols-4 xl:gap-x-[2vw] xl:gap-y-[2vh]">
                  {galleryImages.map(element => (
                    <div key={element} onClick={() => setFullscreenImage(element)}>
                      <TiltedCard
                        imageSrc={element}
                        containerHeight="clamp(125px, 35vw, 200px)"
                        containerWidth="clamp(125px, 35vw, 200px)"
                        imageHeight="clamp(125px, 35vw, 200px)"
                        imageWidth="clamp(125px, 35vw, 200px)"
                        rotateAmplitude={12}
                        scaleOnHover={1.5}
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullscreenImage(null)}
            >
              <motion.img
                src={fullscreenImage}
                alt="Fullscreen"
                className="max-h-screen max-w-[85] rounded-lg object-contain mt-[10vh]"
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
  );
}
