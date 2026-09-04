import MyGarageCards from "@/src/components/garage/GarageCards";
import SeoHead from "@/src/components/layout/SeoHead";

export default function Garage() {
  return (
    <>
      <SeoHead
        title="Garage"
        description="Explore the prototypes in TLMOTO's garage, each with its unique features and performance stats."
      />
      <MyGarageCards />;
    </>
  );
}
