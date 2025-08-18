import AboutSection from "../components/homePage/AboutSection";
import CompetitionsSection from "../components/homePage/CompetitionSection";
import HeroSection from "../components/homePage/HeroSection";
import { PrototypesSection } from "../components/homePage/PrototypeSection";
import { SponsorSection } from "../components/homePage/SponsorSection";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-full h-screen">
        <HeroSection />
        <AboutSection />
        <CompetitionsSection />
        <PrototypesSection />
        <SponsorSection />
      </div>
    </div>
  );
}
