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
  const pageLabel =
    visiblePage === 0 || visiblePage === realTotal
      ? `${Math.max(visiblePage, 1)} / ${realTotal}`
      : `${visiblePage}-${visiblePage + 1} / ${realTotal}`;

  const [pageWidth, setPageWidth] = useState(250);
  const pageHeight = (pageWidth * 7) / 5;

  const canGoPrev = visiblePage > 0;
  const canGoNext = visiblePage < pages.length - 2;

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

      if (ww < 1024) setPageWidth(ww * 0.4);
      else if (ww < 1280) setPageWidth(ww * 0.3);
      else if (ww < 1536) setPageWidth(ww * 0.25);
      else setPageWidth(ww * 0.2);
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
        const loadedPages = ["", ...pages];
        setRealTotal(loadedPages.length - 1); // doesn't count the blank pages

        // ensure even number of pages for correct display
        if (loadedPages.length % 2 !== 0) {
          loadedPages.push("");
        }

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
        className="relative bg-white rounded-3xl flex flex-col p-[2vw] lg:p-[1vw] shadow-2xl h-auto max-h-[95vh] w-[90vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[50vw]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white aspect-[1/1] w-10 lg:w-[4vw] xl:w-[3vw] 2xl:w-[2vw] rounded-full z-10 flex 
                     items-center justify-center hover:bg-red-600 transition 2xl:text-[0.7vw]"
        >
          ✕
        </button>

        <div className="flex flex-col items-center justify-center mb-[2vh] ml-[7vw] mr-[7vw] text-center md:flex-row md:justify-between">
          <h3 className="text-base md:text-xl 2xl:text-2xl font-bold text-slate-700 text-center">
            {newsletter.hover_title}
          </h3>
          <div className="text-sm md:text-xl 2xl:text-2xl text-slate-500 ">
            {pages.length > 0 && pageLabel}
          </div>
        </div>

        <div className="items-center justify-center" onWheel={handleWheel}>
          {pages.length === 0 ? (
            <p className="text-slate-500 h-full w-full flex items-center justify-center">
              {language === "pt" ? loadingText[0] : loadingText[1]}
            </p>
          ) : (
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
              usePortrait={false}
              startZIndex={0}
              autoSize={false}
              maxShadowOpacity={0.35}
              showCover={false}
              mobileScrollSupport={false}
              useMouseEvents
              swipeDistance={20}
              showPageCorners
              disableFlipByClick={false}
              onFlip={e => setVisiblePage(e.data)}
            >
              {pages.map((page, index) => (
                <FlipPage key={`${page}-${index}`} src={page} index={index} />
              ))}
            </HTMLFlipBook>
          )}
        </div>

        {pages.length > 0 && (
          <div className="flex items-center justify-center gap-[5vw] md:gap-[3vw] mt-[2vh]">
            <NavigationButton
              direction="prev"
              onClick={goPrev}
              disabled={!canGoPrev}
              ariaLabel="Previous slide"
            />
            <NavigationButton
              direction="next"
              onClick={goNext}
              disabled={!canGoNext}
              ariaLabel="Next slide"
            />
          </div>
        )}
      </div>
    </div>
  );
}
