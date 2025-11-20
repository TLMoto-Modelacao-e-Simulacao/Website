import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { timelineData } from "@/src/components/textContent/TimelineSectionTexts";
import { resolveInternalHref } from "../../utils/useInternalHref";

export default function HistoryIndex() {
  const router = useRouter();
  const years = useMemo(
    () =>
      Object.keys(timelineData)
        .map(String)
        .sort((a, b) => Number(b) - Number(a)),
    []
  );

  useEffect(() => {
    if (years.length > 0) {
      const latestYear = years[0];
      const { href, isFileProtocol } = resolveInternalHref(`/history/${latestYear}`);

      if (isFileProtocol) {
        window.location.href = href;
      } else {
        router.replace(href);
      }
    }
  }, [years, router]);

  return null;
}
