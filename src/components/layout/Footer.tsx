import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTiktok,
  IoLogoYoutube,
} from "react-icons/io5";

const SOCIALS = [
  {
    href: "https://www.facebook.com/tlmotostudent",
    Icon: IoLogoFacebook,
    label: "Facebook",
    hover: "hover:text-blue-500",
  },
  {
    href: "https://www.instagram.com/tlmotostudent",
    Icon: IoLogoInstagram,
    label: "Instagram",
    hover: "hover:text-pink-500",
  },
  {
    href: "https://www.linkedin.com/company/tlmoto",
    Icon: IoLogoLinkedin,
    label: "LinkedIn",
    hover: "hover:text-blue-700",
  },
  {
    href: "https://www.tiktok.com/@tlmoto",
    Icon: IoLogoTiktok,
    label: "TikTok",
    hover: "hover:text-purle-300",
  },
  {
    href: "https://www.youtube.com/@tlmoto689",
    Icon: IoLogoYoutube,
    label: "YouTube",
    hover: "hover:text-red-600",
  },
];

export default function MyFooter() {
  return (
    <footer
      id="section_footer"
      className="absolute bottom-0 left-0 w-full text-white py-[2vh] px-[2vw] z-30 [body.popup-open_&]:hidden"
      aria-label="Site Footer"
    >
      <div className="flex flex-col justify-between items-center gap-[0.5vh] md:flex-row">
        {/* Texto da esquerda */}
        <div className="text-center md:text-left">
          <p className="tracking-widest font-semibold uppercase text-[4vw] sm:text-[1.5vw] md:text-[1.7vw] lg:text-[1.5vw] xl:text-[1.2vw]">
            RACING TOWARDS THE FUTURE
          </p>
        </div>
        {/* Icons à direita */}
        <div className="flex justify-center gap-[3vw] md:gap-[1.5vw] md:justify-end md:items-center">
          {SOCIALS.map(({ href, Icon, label, hover }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`transition-colors duration-200 ${hover}`}
            >
              <Icon className="w-[7vw] h-auto sm:w-[5vw] md:w-[4vw] lg:w-[3vw] xl:w-[2vw]" />
              {/* sm: >= 640px, md: >= 768px, lg: >= 1024px, xl: >= 1280px, 2xl: >= 1536px */}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
