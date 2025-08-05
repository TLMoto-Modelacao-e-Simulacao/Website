import { motion } from "framer-motion";
import Image from "next/image";

const sectionStyle =
  "h-auto flex flex-col justify-center items-center pt-16 pb-10 px-4 min-h-[120vh] relative overflow-hidden";

export const SponsorSection = () => {
  return (
    <motion.section
      id="section-sponsors"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
      className={sectionStyle}
      style={{
        backgroundColor: "#000",
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/blue_black_background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(" +
            "to bottom, " +
            "#000 0%, " +
            "#000 1%, " +
            "rgba(0,0,0,0.5) 8%, " +
            "rgba(0,0,0,0) 85%" +
            ")",
        }}
      />

      <Image
        src="/images/home/sponsors_background.webp"
          alt="Sponsors"
          className="
            absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[95vw] max-w-2xl 
            sm:max-w-3xl
            md:max-w-4xl
            lg:max-w-5xl
            xl:max-w-6xl
            2xl:max-w-7xl
            h-auto
            pointer-events-none select-none z-20
          "
          width={1920}
          height={1080}
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
          draggable={false}
        />

      <div
        className="absolute inset-x-0 bottom-0 h-24 z-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(" +
            "to top, " +
            "#000 0%, " +
            "rgba(0,0,0,0) 80%" +
            ")",
        }}
      />
    </motion.section>
  );
};

export default SponsorSection;
