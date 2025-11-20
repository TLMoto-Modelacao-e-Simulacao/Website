import { useEffect, useRef, useState } from "react";
import { cards } from "src/components/textContent/GarageSectionTexts";
import { TransitionLink } from "../utils/TransitionLink";
import { motion } from "framer-motion";
import { withBasePath } from "@/src/utils/basePath";

export default function MyGarageCards() {
  const DESKTOP_VISIBLE = 3;
  const GAP_PX = 16;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const desiredVisible = isMobile ? 1 : DESKTOP_VISIBLE;
  const visibleCount = Math.min(desiredVisible, cards.length);
  const maxIndex = Math.max(0, cards.length - visibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq: MediaQueryList = window.matchMedia("(max-width: 639px)");

    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile((e as MediaQueryList).matches);
    };

    setIsMobile(mq.matches);

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler as EventListener);
    } else if (typeof (mq as MediaQueryList).addListener === "function") {
      (mq as MediaQueryList).addListener(handler);
    }

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handler as EventListener);
      } else if (typeof (mq as MediaQueryList).removeListener === "function") {
        (mq as MediaQueryList).removeListener(handler);
      }
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      } else {
        setContainerWidth(0);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    setCurrentIndex(prev => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const prevSlide = () => {
    if (cards.length <= visibleCount) return;
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    if (cards.length <= visibleCount) return;
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const totalGaps = Math.max(0, visibleCount - 1) * GAP_PX;

  const itemWidthPx =
    containerWidth > 0 ? Math.floor((containerWidth - totalGaps) / visibleCount) : null;

  const translatePx = itemWidthPx !== null ? currentIndex * (itemWidthPx + GAP_PX) : 0;

  const stepPercent = 100 / visibleCount;
  const translatePercent = currentIndex * stepPercent;

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay muted className="fixed top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src={withBasePath("/videos/garage/garage_menu.mp4")} type="video/mp4" />
      </video>

      <div className="relative w-full max-w-6xl p-6">
        <div
          ref={containerRef}
          className="overflow-hidden h-[26rem] sm:h-auto"
          aria-roledescription="carousel container"
        >
          <div
            className={`flex gap-4 flex-row transition-transform duration-500 ease-in-out`}
            style={
              itemWidthPx !== null
                ? { transform: `translateX(-${translatePx}px)` }
                : { transform: `translateX(-${translatePercent}%)` }
            }
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex justify-center"
                ref={index === 0 ? itemRef : null}
                style={
                  itemWidthPx !== null
                    ? { flex: `0 0 ${itemWidthPx}px` }
                    : !isMobile
                      ? { flex: `0 0 ${100 / visibleCount}%` }
                      : { flex: "0 0 100%" }
                }
                aria-hidden={index < currentIndex || index >= currentIndex + visibleCount}
              >
                <TransitionLink
                  href={card.detailsLink}
                  className="w-full block perspective-[1000px] group focus:outline-none"
                >
                  <div
                    className={`relative w-[300px] h-[26rem] mx-auto rounded-lg shadow-lg [transform-style:preserve-3d] transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)] will-change-transform`}
                    role="button"
                    aria-label={`${card.title} — ver detalhes`}
                  >
                    <div className="absolute inset-0 rounded-lg overflow-hidden [backface-visibility:hidden] bg-gray-800">
                      <motion.img
                        src={card.imageSrc}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 rounded-lg overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gray-900 flex flex-col justify-center items-center p-6 text-center">
                      <h3 className="text-white text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-200 mt-">{card.description}</p>
                      <span className="mt-auto text-sm text-blue-300 underline">Ver detalhes</span>
                    </div>
                  </div>
                </TransitionLink>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition disabled:opacity-40"
          aria-label="Previous Slide"
          disabled={cards.length <= visibleCount}
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition disabled:opacity-40"
          aria-label="Next Slide"
          disabled={cards.length <= visibleCount}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
