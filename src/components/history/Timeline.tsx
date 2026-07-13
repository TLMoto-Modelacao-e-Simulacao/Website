import { useMemo, useRef } from "react";
import { resolveInternalHref } from "../../utils/useInternalHref";
import { useRouter } from "next/router";
import { TimelineDataItem } from "@/src/components/textContent/TimelineSectionTexts";
import { Tick } from "./Tick";

export default function Timeline({
  selectedYear,
  selectedIndex,
  timelineData,
}: {
  selectedYear: string;
  selectedIndex: number;
  timelineData: Record<string, TimelineDataItem[]>;
}) {
  const router = useRouter();

  const navigateToYear = (year?: string) => {
    if (!year) return;

    const { href, isFileProtocol } = resolveInternalHref(`/history/${year}`);

    if (isFileProtocol) {
      window.location.href = href;
      return;
    }

    router.push(href);
  };

  const timelineRef = useRef<HTMLDivElement | null>(null);

  const years = useMemo(() => {
    return Object.keys(timelineData).sort((a, b) => Number(a) - Number(b));
  }, [timelineData]);

  const twoYearsAgo = selectedIndex > 1 ? years[selectedIndex - 2] : undefined;
  const previousYear = selectedIndex > 0 ? years[selectedIndex - 1] : undefined;
  const nextYear =
    selectedIndex !== -1 && selectedIndex < years.length - 1 ? years[selectedIndex + 1] : undefined;
  const twoYearsFuture =
    selectedIndex !== -1 && selectedIndex < years.length - 2 ? years[selectedIndex + 2] : undefined;

  const closerTickHeights = [8, 9, 10];
  const furtherTickHeights = [4, 5, 6];

  return (
    <div>
      {/* Timeline Years - Desktop */}
      <div
        ref={timelineRef}
        className="hidden md:flex items-center mt-[15vh] xl:mt-[18vh] relative w-2/3 mx-auto"
      >
        {/* Horizontal line on top */}
        <div className="absolute top-0 left-0 w-full h-[0.5vh] bg-sky-400 z-50" />

        {years.length > 0 && (
          <div className="grid grid-cols-17 items-start w-full">
            {/* 2 years ago (cols 1 to 4) */}
            <Tick
              year={twoYearsAgo}
              height={3}
              visible={!!twoYearsAgo}
              onClick={() => navigateToYear(twoYearsAgo)}
            />

            {furtherTickHeights.map(height => (
              <Tick key={height} height={height} visible={!!twoYearsAgo} />
            ))}

            {/* Previous year (cols 5 to 8) */}
            <Tick
              year={previousYear}
              height={7}
              visible={!!previousYear}
              onClick={() => navigateToYear(previousYear)}
            />

            {closerTickHeights.map(height => (
              <Tick key={height} height={height} visible={!!previousYear} />
            ))}

            {/* Current year (col 9) */}
            <Tick
              year={selectedIndex !== -1 ? years[selectedIndex] : selectedYear}
              height={12}
              current
            />

            {/* Next year (cols 10 to 13) */}
            {[...closerTickHeights].reverse().map(height => (
              <Tick key={height} height={height} visible={!!nextYear} />
            ))}

            <Tick
              year={nextYear}
              height={7}
              visible={!!nextYear}
              onClick={() => navigateToYear(nextYear)}
            />

            {/* 2 years future (cols 14 to 17) */}
            {[...furtherTickHeights].reverse().map(height => (
              <Tick key={height} height={height} visible={!!twoYearsFuture} />
            ))}

            <Tick
              year={twoYearsFuture}
              height={3}
              visible={!!twoYearsFuture}
              onClick={() => navigateToYear(twoYearsFuture)}
            />
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
    </div>
  );
}
