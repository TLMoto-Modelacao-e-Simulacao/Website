import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/src/utils/basePath";

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        setShowVideo(true);
      } else {
        const onLoad = () => setShowVideo(true);
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
      }
    }
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("section2");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const posterRelative = "/images/home/moto_blue_black_background.webp";
  const videoRelative = "/videos/intro_video_background.mp4";
  const posterSrc = withBasePath(posterRelative);
  const videoSrc = withBasePath(videoRelative);

  return (
    <motion.section
      id="section1"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.7 }}
      className="relative bg-black h-screen text-white flex flex-col justify-center items-center overflow-hidden"
    >
      {showVideo ? (
        <video
          className="hidden xl:block absolute inset-0 w-full h-full object-cover filter z-0"
          muted
          autoPlay
          playsInline
          disablePictureInPicture
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="hidden xl:block absolute inset-0 w-full h-full z-0">
          <Image
            src={posterRelative}
            alt="TLMoto background"
            fill
            style={{ objectFit: "cover" }}
            quality={70}
            sizes="80vw"
            className="filter"
          />
        </div>
      )}
      <div
        className="block xl:hidden absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: `url('${posterSrc}')` }}
      />
      {/* Main content */}
      <button
        onClick={scrollToNext}
        className="
          tracking-[.15em]
          absolute left-1/2 transform -translate-x-1/2 
          z-10 text-tlmoto-cyan hover:text-tlmoto-cyan-light 
          transition-all duration-300 animate-bounce
          text-lg md:text-xl font-semibold
          px-4 md:px-4 py-2 md:py-4
          rounded-full flex flex-col items-center
          bottom-20 md:bottom-8
        "
        aria-label="Scroll Down"
      >
        <span className="mb-1">Scroll Down</span>
        <ChevronDown className="w-8 h-8 md:w-14 md:h-14" />
      </button>
    </motion.section>
  );
};

export default HeroSection;
