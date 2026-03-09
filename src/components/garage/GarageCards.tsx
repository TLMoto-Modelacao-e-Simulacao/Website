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
  // Distância mínima em píxeis para considerar um deslize válido
  const minSwipeDistance = 50;

  // Detecção de Mobile/Desktop
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

  // Medição da largura
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

  // Resetar o flip ao mudar de slide
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

  // --- Lógica de Gestos (Swipe) ---
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Limpar deslize anterior
    setTouchStart(e.targetTouches[0].clientX); // Guardar posição inicial
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX); // Atualizar posição enquanto o dedo arrasta
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Arrastou para a esquerda -> Mota Seguinte
      nextSlide();
    } else if (isRightSwipe) {
      // Arrastou para a direita -> Mota Anterior
      prevSlide();
    }
  };
  // --------------------------------

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    // Se for mobile e a carta ainda NÃO estiver virada, prevenimos a navegação e viramos a carta
    if (isMobile && flippedIndex !== index) {
      e.preventDefault();
      setFlippedIndex(index);
    }
    // Se estiver virada ou for desktop, o Link (TransitionLink) processa o clique normalmente.
  };

  const totalGaps = Math.max(0, visibleCount - 1) * GAP_PX;
  const itemWidthPx =
    containerWidth > 0 ? Math.floor((containerWidth - totalGaps) / visibleCount) : null;
  const translatePx = itemWidthPx !== null ? currentIndex * (itemWidthPx + GAP_PX) : 0;
  const stepPercent = 100 / visibleCount;
  const translatePercent = currentIndex * stepPercent;

  return (
    // h-[100dvh] garante que ocupa o ecrã todo corretamente em mobile browsers
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1] pointer-events-none"
      >
        <source src={withBasePath("/videos/garage/garage_menu.mp4")} type="video/mp4" />
      </video>

      {/* Container Principal */}
      <div className="relative w-full max-w-6xl p-6 flex flex-col justify-center h-full">
        <div
          ref={containerRef}
          // ALTURA RESPONSIVA: Mobile ocupa h-[75vh], Desktop ocupa altura normal
          className="overflow-hidden h-[75vh] md:h-[28rem] py-4"
          aria-roledescription="carousel container"
          // Eventos de Toque aplicados aqui
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex gap-4 flex-row transition-transform duration-500 ease-in-out h-full"
            style={
              itemWidthPx !== null
                ? { transform: `translateX(-${translatePx}px)` }
                : { transform: `translateX(-${translatePercent}%)` }
            }
          >
            {sortedCards.map((card, index) => {
              // Lógica de rotação: Mobile usa state, Desktop usa hover
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
                    className="w-full h-full block perspective-[1000px] group focus:outline-none"
                    onClick={e => handleCardClick(e, index)}
                  >
                    <div
                      // LARGURA DO CARTÃO: Mobile com w-[90vw]
                      className={`relative w-[90vw] md:w-[300px] h-full md:h-[26rem] mx-auto rounded-lg shadow-lg [transform-style:preserve-3d] transition-transform duration-700 ease-in-out ${rotationClass} will-change-transform`}
                      role="button"
                      aria-label={`${card.title} — ver detalhes`}
                    >
                      {/* Frente do Card */}
                      <div className="absolute inset-0 rounded-lg overflow-hidden [backface-visibility:hidden] bg-gray-800 pointer-events-none">
                        <motion.img
                          src={card.imageSrc}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Dica visual apenas em mobile */}
                        {isMobile && !isFlippedMobile && (
                          <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-white text-[10px] backdrop-blur-sm pointer-events-none uppercase tracking-wide">
                            Tap info
                          </div>
                        )}
                      </div>

                      {/* Verso do Card */}
                      <div className="absolute inset-0 rounded-lg overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gray-900 flex flex-col justify-center items-center p-6 text-center border border-white/10 pointer-events-none">
                        <h3 className="text-white text-xl font-bold mb-2 shrink-0">{card.title}</h3>

                        {/* Scroll interno para o texto não sair para fora */}
                        <div className="overflow-y-auto flex-1 w-full mb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-1 pointer-events-auto">
                          <p className="text-sm text-gray-200">{card.description}</p>
                        </div>

                        {/* Botão de ação explícito */}
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

        {/* Botões de Navegação do Carrossel (Visíveis e funcionais para quem preferir tocar em vez de deslizar) */}
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
