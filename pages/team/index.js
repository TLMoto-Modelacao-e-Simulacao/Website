import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAvailableYears } from '@/components/utils/FetchFolderImages';

export async function getStaticProps() {
    const years = getAvailableYears(); // Ensure this works without async if using static export

    return {
        props: { years },
    };
}

export default function TeamIndex({ years }) {
    const router = useRouter();

    useEffect(() => {
        if (years.length > 0) {
            router.push(`/team/${years[0]}`); // Redirect to the latest year
        }
    }, [years, router]);

    return <p>Redirecting...</p>; // Optional: Show a message while redirecting
}
