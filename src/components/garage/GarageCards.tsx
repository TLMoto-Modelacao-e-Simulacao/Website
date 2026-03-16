import { useEffect, useRef, useState } from "react";
import { cards } from "src/components/textContent/GarageSectionTexts";
import { TransitionLink } from "../utils/TransitionLink";
import { motion } from "framer-motion";
import { withBasePath } from "@/src/utils/basePath";

export default function MyGarageCards() {
  const sortedCards = [...cards].reverse();

  const DESKTOP_VISIBLE = 3;
  const GAP_PX = 16;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const desiredVisible = isMobile ? 1 : DESKTOP_VISIBLE;
  const visibleCount = Math.min(desiredVisible, sortedCards.length);
  const maxIndex = Math.max(0, sortedCards.length - visibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estados para capturar o "Swipe" (deslizar o dedo) no ecrã
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq: MediaQueryList = window.matchMedia("(max-width: 639px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile((e as MediaQueryList).matches);
    };

    setIsMobile(mq.matches);

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler as EventListener);
    } else {
      (mq as MediaQueryList).addListener(handler);
    }

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handler as EventListener);
      } else {
        (mq as MediaQueryList).removeListener(handler);
      }
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    setCurrentIndex(prev => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    setFlippedIndex(null);
  }, [currentIndex]);

  const prevSlide = () => {
    if (sortedCards.length <= visibleCount) return;
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    if (sortedCards.length <= visibleCount) return;
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    if (isMobile && flippedIndex !== index) {
      e.preventDefault();
      setFlippedIndex(index);
    }
  };

  const totalGaps = Math.max(0, visibleCount - 1) * GAP_PX;
  const itemWidthPx =
    containerWidth > 0 && !isMobile ? Math.floor((containerWidth - totalGaps) / visibleCount) : null;
  
  const translateStyle = isMobile 
    ? { transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * GAP_PX}px))` }
    : { transform: `translateX(-${itemWidthPx !== null ? currentIndex * (itemWidthPx + GAP_PX) : currentIndex * (100 / visibleCount)}px)` };

  return (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1] pointer-events-none"
      >
        <source src={withBasePath("/videos/garage/garage_menu.mp4")} type="video/mp4" />
      </video>

      <div className="relative w-full max-w-6xl p-6 flex flex-col justify-center h-full">
        <div
          ref={containerRef}
          className="overflow-hidden h-[50vh] md:h-[28rem] py-4"
          aria-roledescription="carousel container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex gap-4 flex-row transition-transform duration-500 ease-in-out h-full"
            style={translateStyle}
          >
            {sortedCards.map((card, index) => {
              const isFlippedMobile = isMobile && flippedIndex === index;
              const rotationClass = isFlippedMobile
                ? "[transform:rotateY(180deg)]"
                : "group-hover:[transform:rotateY(180deg)]";

              return (
                <div
                  key={index}
                  className="flex-shrink-0 flex justify-center h-full"
                  ref={index === 0 ? itemRef : null}
                  style={
                    itemWidthPx !== null && !isMobile
                      ? { flex: `0 0 ${itemWidthPx}px` }
                      : { flex: "0 0 100%" }
                  }
                  aria-hidden={index < currentIndex || index >= currentIndex + visibleCount}
                >
                  <TransitionLink
                    href={card.detailsLink}
                    className="w-full h-full block perspective-[1000px] group focus:outline-none"
                    onClick={e => handleCardClick(e, index)}
                  >
                    <div
                      className={`relative w-[80vw] md:w-[300px] h-full md:h-[26rem] mx-auto rounded-lg shadow-lg [transform-style:preserve-3d] transition-transform duration-700 ease-in-out ${rotationClass} will-change-transform`}
                      role="button"
                      aria-label={`${card.title} — ver detalhes`}
                    >
                      <div className="absolute inset-0 rounded-lg overflow-hidden [backface-visibility:hidden] bg-gray-800 pointer-events-none">
                        <motion.img
                          src={card.imageSrc}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {isMobile && !isFlippedMobile && (
                          <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-white text-[10px] backdrop-blur-sm pointer-events-none uppercase tracking-wide">
                            Tap info
                          </div>
                        )}
                      </div>

                      <div className="absolute inset-0 rounded-lg overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gray-900 flex flex-col justify-center items-center p-6 text-center border border-white/10 pointer-events-none">
                        <h3 className="text-white text-xl font-bold mb-2 shrink-0">{card.title}</h3>
                        <div className="overflow-y-auto flex-1 w-full mb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-1 pointer-events-auto">
                          <p className="text-sm text-gray-200">{card.description}</p>
                        </div>
                        <div className="mt-auto pt-2 shrink-0 pointer-events-auto">
                          <span className="inline-block px-4 py-2 bg-blue-600/20 text-blue-300 rounded hover:bg-blue-600/40 transition-colors text-sm font-semibold">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </TransitionLink>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="fixed left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition disabled:opacity-40 z-20"
          aria-label="Previous Slide"
          disabled={sortedCards.length <= visibleCount}
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="fixed right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition disabled:opacity-40 z-20"
          aria-label="Next Slide"
          disabled={sortedCards.length <= visibleCount}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}