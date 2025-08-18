import { headlineText, secHeadlineText } from "../textContent/SponsorsSectionTexts";

export default function MajorSponsorSection() {
  return (
    <div className="text-center mb-[2.5%] w-[80vw] mt-[17vh] mx-[10vw]">
      <p className="text-[2.2rem] xl:text-[3rem] w-full mx-auto mb-[30px] text-white tracking-[0.1vh]">
        {headlineText}
      </p>
      <p className="text-[1.8rem] xl:text-[2.2rem] w-full mx-auto mb-[30px] text-white tracking-[0.1vh]">
        {secHeadlineText}
      </p>
    </div>
  );
}
