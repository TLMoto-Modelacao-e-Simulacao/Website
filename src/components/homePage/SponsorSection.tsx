import React from "react";
import InfiniteLogoCarousel from "./InfiniteLogoCarousel";
import { withBasePath } from "@/src/utils/basePath";

const SponsorsCarousel: React.FC = () => {
  const backgroundRelative = "/images/home/aragon_background.webp";
  const backgroundSrc = withBasePath(backgroundRelative);

  return (
    <section
      className="py-20 relative overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundSrc}')` }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none z-0"
        style={{
          height: "12%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 80%, #000 98%, #000 100%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl 2xl:text-8xl text-[#39a6ff]">
            <span className="text-[#39a6ff] text-glow">SPONSORS</span>
          </h2>
          <div className="w-18 h-1 bg-gradient-to-r from-electric to-electric-glow mx-auto mt-3" />
          <p className="text-blue-100/90 text-lg 2xl:text-4xl max-w-2xl mx-auto mt-4">
            Powering innovation and excellence in motorsport technology
          </p>
        </div>
        <InfiniteLogoCarousel />
      </div>
    </section>
  );
};

export default SponsorsCarousel;
