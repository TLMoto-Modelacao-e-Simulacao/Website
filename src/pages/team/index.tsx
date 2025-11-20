import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAvailableYears } from "../../components/utils/FetchFolderImages";
import { resolveInternalHref } from "../../utils/useInternalHref";

export async function getStaticProps() {
  const years = await getAvailableYears();
  return {
    props: { years },
  };
}

interface TeamIndexProps {
  years: string[];
}

export default function TeamIndex({ years }: TeamIndexProps) {
  const router = useRouter();

  useEffect(() => {
    if (years.length > 0) {
      const { href, isFileProtocol } = resolveInternalHref(`/team/${years[0]}`);

      if (isFileProtocol) {
        window.location.href = href;
      } else {
        router.replace(href);
      }
    }
  }, [years, router]);

  return null;
}
