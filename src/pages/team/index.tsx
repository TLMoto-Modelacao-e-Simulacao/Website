import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAvailableYears } from "../../components/utils/FetchFolderImages";

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
      router.replace(`/team/${years[0]}`); 
    }
  }, [years, router]);

  return null;
}
