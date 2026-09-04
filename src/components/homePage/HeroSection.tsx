import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { withBasePath } from "@/src/utils/basePath";

const HeroSection = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById("section2");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const posterRelative = "/images/home/moto_blue_black_background.webp";
  const videoRelative = "/videos/intro_video_background.mp4";
  const videoPoster = withBasePath("/images/home/homepagePoster.webp");
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
      {/* Imagem fundo mobile */}
      <picture className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img src={posterSrc} alt="" className="w-full h-full object-cover" />
      </picture>

      {/* Vídeo (apenas desktop) */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none hidden xl:block"
        muted
        autoPlay
        playsInline
        disablePictureInPicture
        poster={videoPoster}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

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
