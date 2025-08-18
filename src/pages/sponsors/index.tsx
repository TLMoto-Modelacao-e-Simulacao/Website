import MySponsorsBox from "../../components/sponsors/SponsorsBox";
import MyMajorSponsorSection from "../../components/sponsors/MajorSponsorSection";
import MyDefaultPage from "@/src/components/DefaultPage";

// Define SponsorType if not imported from elsewhere
type SponsorType = "diamond" | "gold" | "silver" | "bronze" | "copper" | "partners";

export default function Sponsors() {
  return (
    <MyDefaultPage>
      <MyMajorSponsorSection />
      {(["diamond", "gold", "silver", "bronze", "copper", "partners"] as SponsorType[]).map(
        type => (
          <MySponsorsBox key={type} type={type} />
        )
      )}
    </MyDefaultPage>
  );
}
