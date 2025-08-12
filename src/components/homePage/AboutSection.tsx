import React from "react";
import { Card, CardContent } from "../ui/card";
import { Zap, Target, Lightbulb } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  animate,
} from "framer-motion";

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

const AnimatedCounter: React.FC<{
  to: number;
  duration?: number;
  delay?: number;
  start?: number;
  replayOnView?: boolean;
  className?: string;
}> = ({ to, duration = 2, delay = 1, start = 0, replayOnView = false, className }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: !replayOnView, margin: "-20% 0px -20% 0px" });

  const mv = useMotionValue(start);
  const rounded = useTransform(mv, v => Math.floor(v));
  const [display, setDisplay] = React.useState(start);

  useMotionValueEvent(rounded, "change", v => setDisplay(v as number));

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, delay, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, mv, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

const sectionStyle =
  "tracking-[.17em] h-auto flex flex-col justify-center items-center pt-16 pb-10 px-10 sm:pt-24 sm:pb-20 sm:min-h-[100vh] relative";

const AboutSection: React.FC = () => {
  return (
    <motion.section
      id="section2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.35 }}
      className={`bg-no-repeat bg-cover bg-center ${sectionStyle}`}
    >
      {/* background */}
      <div
        className="
          absolute inset-0
          bg-[url('/images/home/team_background.webp')]
          bg-cover bg-center
          filter
          -z-10
        "
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />

      {/* content */}
      <div
        className="
          relative z-10
          w-full
          px-6 xl:px-12 2xl:px-6
          pt-6 sm:pt-10 md:pt-8 lg:pt-18 xl:pt-14 2xl:pt-16
          pb-6 sm:pb-10 md:pb-8 lg:pb-18 xl:pb-14 2xl:pb-16
          max-w-6xl sm:max-w-4xl md:max-w-3xl lg:max-w-6xl xl:max-w-full 2xl:max-w-400
        "
      >
        {/* Animated Hero Area */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.h2
            className="text-center text-5xl sm:text-8xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-7xl mb-8 text-[#39a6ff]"
            variants={itemVariants}
          >
            ABOUT <span className="hero-text">US</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-electric to-electric-glow mx-auto -mb-1 xl:-mb-2"
            variants={itemVariants}
          />
          <motion.p
            className="
              text-lg sm:text-2xl md:text-2xl lg:text-4xl xl:text-3xl 2xl:text-3xl
              text-white text-muted-foreground
              mx-auto text-center leading-snug
              max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-6xl
              mb-3 sm:mb-5 md:mb-4 lg:mb-50 xl:mb-8 2xl:mb-6
            "
            variants={itemVariants}
          >
            We are a passionate team of engineering students from the University of Lisbon,
            committed to advancing electric motorcycle technology.
          </motion.p>
        </motion.div>

        {/* feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-10 sm:gap-6 md:gap-3 lg:gap-4 xl:gap-12 2xl:gap-8 mb-6 sm:mb-8 md:mb-12 lg:mb-5 xl:mb-12 2xl:mb-10 mt-10 sm:mt-12 md:mt-10 lg:mt-8">
          {[
            { icon: <Zap />, title: "Innovation", text: "Pushing the boundaries" },
            { icon: <Target />, title: "Competition", text: "Competing at the highest level" },
            { icon: <Lightbulb />, title: "Education", text: "Learning through hands-on" },
          ].map(({ icon, title, text }) => (
            <Card
              key={title}
              className="
                bg-[#16263c]/70
                border border-[#39a6ff]/25 hover:border-[#39a6ff]/60
                shadow-lg shadow-black/30
                backdrop-blur-sm
                transition-all duration-300
                group hover:scale-[1.04]
              "
            >
              <CardContent className="p-6 sm:p-8 md:p-6 lg:p-8 xl:p-10 2xl:p-8 text-center">
                <div
                  className="
                    w-14 h-14 sm:w-16 sm:h-16 md:w-14 md:h-14 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-16 2xl:h-16
                    bg-gradient-to-b from-[#39a6ff] to-[#19376d]
                    rounded-full flex items-center justify-center
                    mx-auto mb-5 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-4
                    group-hover:scale-105 transition-transform duration-300 shadow
                  "
                >
                  {icon}
                </div>
                <h3 className="text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-2 text-[#39a6ff]">
                  {title}
                </h3>
                <p className="text-white text-sm sm:text-base md:text-sm lg:text-base xl:text-base 2xl:text-lg">
                  {text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 md:gap-10 lg:gap-10 xl:gap-32 2xl:gap-24 pt-1 sm:pt-3 md:pt-2 lg:pt-1 xl:pt-2 2xl:pt-3 max-w-4xl xl:max-w-full 2xl:max-w-full mx-auto mb-8 xl:mb-8 2xl:mb-6">
          {[
            { to: 70, suffix: "+", label: "MEMBERS", delay: 0 },
            { to: 10, suffix: "+", label: "COMPETITIONS", delay: 0.2 },
            { to: 4, suffix: "+", label: "PROTOTYPES", delay: 0.4 },
          ].map(({ to, suffix, label, delay }, i) => (
            <div
              key={label}
              className={`text-center ${i === 0 ? "animate-slide-in-left" : "animate-fade-in"}`}
              style={{ animationDelay: `${delay}s` }}
            >
              <div className="flex justify-center space-x-1 sm:space-x-2 md:space-x-1 lg:space- x-2 xl:space-x-3 2xl:space-x-2 mb-1 sm:mb-2 lg:mb-1 xl:mb-4 2xl:mb-3">
                <AnimatedCounter
                  to={to}
                  delay={delay}
                  className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-6xl font-semibold text-[#39a6ff] text-tlmoto-cyan tlmoto-glow"
                />
                <span className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-6xl 2xl:text-5xl font-semibold text-[#39a6ff] text-tlmoto-cyan tlmoto-glow align-top">
                  {suffix}
                </span>
              </div>
              <div className="text-lg sm:text-xl md:text-xl lg:text-3xl xl:text-3xl 2xl:text-2xl text-white mt-1 sm:mt-2 lg:mt-1 xl:mt-4 2xl:mt-3 tracking-[.20em]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
