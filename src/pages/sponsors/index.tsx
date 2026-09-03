import MySponsorsBox from "../../components/sponsors/SponsorsBox";
import MyMajorSponsorSection from "../../components/sponsors/MajorSponsorSection";
import MyDefaultPage from "@/src/components/DefaultPage";
import SeoHead from "@/src/components/layout/SeoHead";

// Define SponsorType if not imported from elsewhere
type SponsorType = "main" | "gold" | "silver" | "bronze" | "copper" | "partners";

export default function Sponsors() {
  return (
    <>
      <SeoHead
        title="Sponsors"
        description={`Discover the sponsors that power TLMOTO's journey in student motorsport, from major sponsors to valued partners.`}
      />
      <MyDefaultPage>
        <MyMajorSponsorSection />
        <div className="mb-[10vh]">
          {(["main", "gold", "silver", "bronze", "copper", "partners"] as SponsorType[]).map(
            type => (
              <MySponsorsBox key={type} type={type} />
            )
          )}
        </div>
      </MyDefaultPage>
    </>
  );
}
