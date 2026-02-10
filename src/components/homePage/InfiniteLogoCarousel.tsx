import React from "react";
import Image from "next/image";
import { sponsorInformation } from "../textContent/SponsorsSectionTexts";

interface Logo {
  name: string;
  src: string;
  alt: string;
}

interface CarouselTier {
  title: string;
  logos: Logo[];
  borderColor: string;
  glowColor: string;
  /** duration "120s", "140s" */
  speed: string;
  titleColor: string;
  lighterBg?: boolean;
}

type SponsorSource = { name: string; logo: string; link?: string };

const mapSponsors = (items: SponsorSource[]): Logo[] =>
  items.map(({ name, logo }) => ({ name, src: logo, alt: name }));

const carouselTiers: CarouselTier[] = [
  {
    title: "Diamond Partners",
    logos: mapSponsors(sponsorInformation.diamond),
    borderColor: "border-diamond-tier",
    glowColor: "shadow-diamond",
    speed: "120s",
    titleColor: "#43a5be",
    lighterBg: true,
  },
  {
    title: "Gold Partners",
    logos: mapSponsors(sponsorInformation.gold),
    borderColor: "border-gold-tier",
    glowColor: "shadow-gold",
    speed: "120s",
    titleColor: "#ffb13c",
    lighterBg: true,
  },
  {
    title: "Silver Partners",
    logos: mapSponsors(sponsorInformation.silver),
    borderColor: "border-silver-tier",
    glowColor: "shadow-silver",
    speed: "140s",
    titleColor: "#a3a3a3",
    lighterBg: true,
  },
  {
    title: "Bronze Partners",
    logos: mapSponsors(sponsorInformation.bronze),
    borderColor: "border-bronze-tier",
    glowColor: "shadow-bronze",
    speed: "160s",
    titleColor: "#b87333",
    lighterBg: true,
  },
  {
    title: "Copper Partners",
    logos: mapSponsors(sponsorInformation.copper),
    borderColor: "border-copper-tier",
    glowColor: "shadow-copper",
    speed: "180s",
    titleColor: "#8a1b1b",
    lighterBg: true,
  },
  {
    title : "Partners",
    logos: mapSponsors(sponsorInformation.partners),
    borderColor: "border-partner-tier",
    glowColor: "shadow-partner",
    speed: "200s",
    titleColor: "#ffffff", // TODO - change to match sponsors 
    lighterBg: true,
  }
];

interface LogoItemProps {
  logo: Logo;
  large?: boolean;
}

const LogoItem: React.FC<LogoItemProps> = ({ logo, large }) => (
  <div
    className={`flex-shrink-0 mx-6 ${
      large ? "h-16 md:h-20" : "h-14 md:h-16"
    } flex items-center justify-center`}
  >
    <Image
      src={logo.src}
      alt={logo.alt}
      width={large ? 170 : 140}
      height={large ? 85 : 70}
      loading="lazy"
      draggable={false}
      className="h-full w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300"
    />
  </div>
);

interface CarouselRowProps {
  tier: CarouselTier;
}

const CarouselRow: React.FC<CarouselRowProps> = ({ tier }) => {
  const isStatic = tier.logos.length <= 6;
  const duplicatedLogos = isStatic
    ? tier.logos
    : [...tier.logos, ...tier.logos, ...tier.logos, ...tier.logos];

  const isDiamond = tier.title === "Diamond Partners";

  return (
    <div className="w-full py-6 relative">
      {tier.lighterBg && (
        <div className="absolute inset-0 bg-white/18 backdrop-blur-[1px] rounded-md ring-1 ring-black/10 pointer-events-none z-0" />
      )}

      <div className="relative z-10">
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-current to-transparent text-electric opacity-50 mb-4" />

        <div className="text-center mb-6">
          <h3
            className="tracking-wide text-[2rem] md:text-[2.375rem] font-bold inline-block rounded-sm px-3 py-1 border border-black/50 bg-black/40 backdrop-blur-[2px] ring-1 ring-black/30 shadow-sm"
            style={{ color: tier.titleColor }}
          >
            {tier.title}
          </h3>
        </div>

        <div className={`relative overflow-hidden ${isStatic ? "" : "sponsor-marquee"}`}>
          {isStatic ? (
            <div className="flex justify-center items-center flex-wrap">
              {tier.logos.map((logo, index) => (
                <LogoItem key={`${logo.name}-${index}`} logo={logo} large={isDiamond} />
              ))}
            </div>
          ) : (
            <div
              className="sponsor-track inline-flex items-center"
              style={{ animationDuration: tier.speed }}
              aria-hidden="true"
            >
              {duplicatedLogos.map((logo, index) => (
                <LogoItem key={`${logo.name}-${index}`} logo={logo} large={isDiamond} />
              ))}
            </div>
          )}
        </div>

        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-current to-transparent text-electric opacity-50 mt-4" />
      </div>
    </div>
  );
};

export const InfiniteLogoCarousel: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/4 via-white/9 to-white/4 backdrop-blur-[4px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="space-y-8">
          {carouselTiers.map((tier, index) => (
            <div
              key={tier.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CarouselRow tier={tier} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t pointer-events-none" />

      <style jsx global>{`
        .sponsor-marquee {
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }
        .sponsor-track {
          min-width: max-content;
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          animation-name: sponsor-scroll-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
        }
        .sponsor-marquee:hover .sponsor-track {
          animation-play-state: paused;
        }
        @keyframes sponsor-scroll-right {
          from {
            transform: translate3d(-50%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sponsor-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default InfiniteLogoCarousel;
