import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { getNewsletterPages, WorkerNewsletter } from "@/src/components/utils/FetchNewsletters";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import NavigationButton from "@/src/components/news/NavigationButton";

const loadingText = ["A carregar páginas...", "Loading pages..."];

/**
 * Single page component used by react-pageflip.
 * The forwarded ref gives the library direct access to the page element for rendering and animations
 */
const FlipPage = forwardRef<HTMLDivElement, { src: string; index: number }>(
  ({ src, index }, ref) => (
    <div ref={ref} className="bg-white overflow-hidden">
      {src && (
        <Image
          src={src}
          width={250}
          height={350}
          alt={index === 0 ? "Capa" : `Página ${index + 1}`}
          className="h-full w-full shadow"
          draggable={false}
        />
      )}
    </div>
  )
);

FlipPage.displayName = "FlipPage";

/* main component */
export default function NewsletterModal({
  language,
  newsletter,
  onClose,
}: {
  language: "pt" | "en";
  newsletter: WorkerNewsletter | null;
  onClose: () => void;
}) {
  const isMobile = window.innerWidth < 768;

  const [pages, setPages] = useState<string[]>([]); // array of urls
  const [visiblePage, setVisiblePage] = useState(0); // index for the currently visible left page (0-based, even numbers only)
  const [realTotal, setRealTotal] = useState(0);

  // handles navigation between pages, including mouse wheel and keyboard events
  type FlipBookRef = {
    pageFlip: () => {
      flipPrev: (corner?: string) => void;
      flipNext: (corner?: string) => void;
    };
  };

  const bookRef = useRef<FlipBookRef | null>(null);
  const wheelLockRef = useRef(0);

  // label for page counter, shows current page and total pages
  const getPageLabel = () => {
    if (visiblePage === 0) {
      return `1 / ${realTotal}`;
    }

    if (visiblePage === realTotal - 1) {
      return `${realTotal} / ${realTotal}`;
    }

    if (isMobile) {
      return `${visiblePage + 1} / ${realTotal}`;
    }

    return `${visiblePage + 1}-${visiblePage + 2} / ${realTotal}`;
  };

  const pageLabel = getPageLabel();

  const [pageWidth, setPageWidth] = useState(250);
  const pageHeight = (pageWidth * 7) / 5;

  const canGoPrev = visiblePage > 0;
  const canGoNext = isMobile ? visiblePage < pages.length - 1 : visiblePage < pages.length - 2;

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;

    bookRef.current?.pageFlip?.()?.flipPrev("top");
  }, [canGoPrev]);

  const goNext = useCallback(() => {
    if (!canGoNext) return;

    bookRef.current?.pageFlip?.()?.flipNext("top");
  }, [canGoNext]);

  // handles wheel events for navigation
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

    // ignore small scrolls
    if (Math.abs(delta) < 15) return;

    // prevent rapid scrolling by locking wheel events for a short duration
    const now = Date.now();
    if (now - wheelLockRef.current < 500) return;
    wheelLockRef.current = now;

    if (delta > 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  // handles keyboard navigation
  useEffect(() => {
    if (!newsletter) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Escape") return;
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        goPrev();
      } else {
        goNext();
      }
    };

    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [newsletter, goPrev, goNext, onClose]);

  // determines page dimensions based on window width and updates on resize
  useEffect(() => {
    const update = () => {
      const ww = window.innerWidth;

      if (ww < 768) setPageWidth(ww * 0.8);
      else if (ww < 1024) setPageWidth(ww * 0.45);
      else if (ww < 1280) setPageWidth(ww * 0.35);
      else if (ww < 1536) setPageWidth(ww * 0.3);
      else setPageWidth(ww * 0.25);
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  // fetches newsletter pages and adds blank pages for correct display
  useEffect(() => {
    if (!newsletter) return;

    setPages([]);
    setVisiblePage(0);

    getNewsletterPages(newsletter.pages_url)
      .then(pages => {
        // add a blank page at the beginning to ensure the first page is displayed on the right side
        const loadedPages = [...pages];
        setRealTotal(loadedPages.length); // doesn't count the blank pages
        setPages(loadedPages);
      })
      .catch(console.error);
  }, [newsletter]);

  // block scrolling and hide navbar/footer when modal is open to avoid overlapping
  useEffect(() => {
    if (!newsletter) return;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("popup-open");

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("popup-open");
    };
  }, [newsletter]);

  if (!newsletter) return null;

  return (
    <div
      className="fixed inset-0 bg-black/85 z-[1001] flex justify-center items-center"
      onClick={onClose} /* clicking outside the modal closes it */
    >
      <div
        className="relative bg-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col w-auto max-w-[95vw] h-auto max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center border-b border-zinc-900 bg-zinc-800 px-[2vw] py-[1vh]">
          <div className="flex flex-col">
            <h3 className="text-lg md:text-xl font-bold text-slate-300">
              {newsletter.hover_title}
            </h3>

            <span className="mt-1 text-sm md:text-base text-slate-400">
              {pages.length > 0 && pageLabel}
            </span>
          </div>

          {/* Navigation buttons */}
          <div className="justify-self-center flex items-center gap-4">
            <NavigationButton
              direction="prev"
              onClick={goPrev}
              disabled={!canGoPrev}
              ariaLabel="Previous slide"
              variant="modal"
            />

            <NavigationButton
              direction="next"
              onClick={goNext}
              disabled={!canGoNext}
              ariaLabel="Next slide"
              variant="modal"
            />
          </div>

          <div className="justify-self-end">
            <button
              onClick={onClose}
              className="flex items-center justify-center text-3xl text-slate-300 transition hover:text-slate-400"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Newsletter display */}
        <div
          className="relative z-10 flex-1 flex items-center justify-center px-[5vw] py-[2vh]"
          onWheel={handleWheel}
        >
          {pages.length === 0 ? (
            <p className="text-slate-500">{language === "pt" ? loadingText[0] : loadingText[1]}</p>
          ) : (
            <div className="flex items-center justify-center gap-6 w-full h-full">
              <HTMLFlipBook
                key={`spread-${pageWidth}x${pageHeight}-${pages.length}`}
                ref={bookRef}
                startPage={visiblePage}
                width={pageWidth}
                height={pageHeight}
                minWidth={pageWidth}
                maxWidth={pageWidth}
                minHeight={pageHeight}
                maxHeight={pageHeight}
                drawShadow
                flippingTime={700}
                usePortrait={isMobile}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={0.35}
                showCover={true}
                mobileScrollSupport={false}
                useMouseEvents
                swipeDistance={20}
                showPageCorners
                disableFlipByClick={false}
                onFlip={e => {
                  console.log("Flip:", e.data);
                  setVisiblePage(e.data);
                }}
              >
                {pages.map((page, index) => (
                  <FlipPage key={`${page}-${index}`} src={page} index={index} />
                ))}
              </HTMLFlipBook>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
