import Image from "next/image";

const FLAGS: { lang: "pt" | "en"; src: string; alt: string }[] = [
  { lang: "pt", src: "/images/newsletter/flags/flagPortugal.png", alt: "PT" },
  { lang: "en", src: "/images/newsletter/flags/flagUK.png", alt: "EN" },
];

/* Single flag button */
const FlagButton = ({
  flag,
  isSelected,
  onClick,
}: {
  flag: (typeof FLAGS)[number];
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`transition hover:scale-110 rounded-sm ${isSelected ? "opacity-100 scale-110 ring-2 ring-white" : "opacity-70"}`}
  >
    <Image
      src={flag.src}
      alt={flag.alt}
      width={50}
      height={40}
      className="rounded-sm shadow-lg w-[10vw] md:w-[6vw] lg:w-[5vw] xl:w-[4vw] 2xl:w-[3vw]"
    />
  </button>
);

/* Language selector component, used to switch between different languages */
export default function LanguageSelector({
  language,
  onChange,
}: {
  language: "pt" | "en";
  onChange: (lang: "pt" | "en") => void;
}) {
  return (
    <div className="z-50 flex gap-[3vw] md:gap-[2vw] xl:gap-[1vw] items-center justify-center">
      {FLAGS.map(flag => (
        <FlagButton
          key={flag.lang}
          flag={flag}
          isSelected={language === flag.lang}
          onClick={() => onChange(flag.lang)}
        />
      ))}
    </div>
  );
}
