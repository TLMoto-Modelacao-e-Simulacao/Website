import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

const MotorbikeCarousel = dynamic(() => import('./MotorbikeCarousel'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 350 }}>Loading…</div>,
});

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const sectionStyle =
  "tracking-[.17em] h-auto flex flex-col justify-center items-center pt-16 pb-10 px-4 " +
  "sm:pt-24 sm:pb-20 sm:min-h-[100vh] " +
  "md:pt-36 md:pb-28 md:min-h-[90vh] " +
  "lg:pt-24 lg:pb-28 lg:min-h-[100vh] " +
  "xl:pt-16 xl:pb-20 xl:min-h-[100vh] " +
  "relative";

export const PrototypesSection = () => {
  return (
    <motion.section
      id="section4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      className={`bg-no-repeat bg-cover bg-center ${sectionStyle}`}
      style={{ backgroundImage: `url('/images/home/prototype_background.webp')` }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-6 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-0 text-center space-y-4 lg:space-y-6"
          variants={containerVariants}
        >
          <motion.h2
            className="text-5xl sm:text-7xl md:text-6xl lg:text-8xl xl:text-7xl 2xl:text-8xl text-[#39a6ff]"
            variants={itemVariants}
          >
            Our <span className="text-[#39a6ff] text-glow">Prototypes</span>
          </motion.h2>
          <motion.div
            className="w-18 h-1 mx-auto -mb-2 bg-gradient-to-r from-electric to-electric-glow"
            variants={itemVariants}
          />
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-2xl 2xl:text-4xl text-white text-muted-foreground max-w-4xl md:max-w-6xl mx-auto leading-relaxed mb-6 md:mb-10"
            variants={itemVariants}
          >
            From our first combustion prototype to our latest electric racing machines,
            explore the evolution of TLMoto's engineering excellence.
          </motion.p>
        </motion.div>
        <MotorbikeCarousel />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-24 z-20 pointer-events-none"
        style={{
          background: 
            "linear-gradient(to top, #000 20%, rgba(0,0,0,0) 80%)"
        }}
      />
    </motion.section>
  );
};

export default PrototypesSection;
