import AboutSection from "../components/homePage/AboutSection";
import CompetitionsSection from "../components/homePage/CompetitionSection";
import HeroSection from "../components/homePage/HeroSection";
import { PrototypesSection } from "../components/homePage/PrototypeSection";
import SponsorSection from "../components/homePage/SponsorSection";
import SeoHead from "@/src/components/layout/SeoHead";

export default function Home() {
  return (
    <>
      <SeoHead title={`Homepage`} description={`Welcome to the TLMOTO homepage!`} />
      <div id="home-scroll-marker" />
      <div className="flex">
        <div className="w-full">
          <HeroSection />
          <AboutSection />
          <CompetitionsSection />
          <PrototypesSection />
          <SponsorSection />
        </div>
      </div>
    </>
  );
}
