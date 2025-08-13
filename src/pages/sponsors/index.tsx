import MySponsorsBox from "../../components/sponsors/SponsorsBox"
import MyMajorSponsorSection from '../../components/sponsors/MajorSponsorSection';
//import defaultPage from '@/styles/DefaultPage.module.scss';

// Define SponsorType if not imported from elsewhere
type SponsorType = 'diamond' | 'gold' | 'silver' | 'bronze' | 'copper' | 'partners';

export default function Sponsors() {
  return (
    <div className="relative min-h-screen overflow-y-auto z-[1] mb-20 mt-30">
      <div className="w-full min-h-screen fixed top-0 left-0 bg-[url('/images/blue_black_background.webp')] bg-no-repeat bg-center bg-cover bg-fixed z-[-1000] "></div>
      <MyMajorSponsorSection />
      {(['diamond', 'gold', 'silver', 'bronze', 'copper', 'partners'] as SponsorType[]).map(type => (
        <MySponsorsBox key={type} type={type} />
      ))}
    </div>
  );
}
