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
import { withBasePath } from "@/src/utils/basePath";

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
  "tracking-[.17em] h-auto flex flex-col justify-center items-center pt-10 pb-10 px-10 sm:pt-8 sm:pb-20 sm:min-h-[100vh] relative";

const AboutSection: React.FC = () => {
  const stats = [
    { icon: <Zap />, title: "Members", to: 70, suffix: "+", delay: 0 },
    { icon: <Target />, title: "Competitions", to: 10, suffix: "+", delay: 0.2 },
    { icon: <Lightbulb />, title: "Prototypes", to: 4, suffix: "+", delay: 0.4 },
  ] as const;

  const backgroundRelative = "/images/home/team_background.webp";
  const backgroundSrc = withBasePath(backgroundRelative);

  return (
    <motion.section
      id="section2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.35 }}
      className={`bg-no-repeat bg-cover bg-center ${sectionStyle}`}
    >
      <div
        className={`
          absolute inset-0
          bg-cover bg-center
          filter
          -z-10
        `}
        style={{ backgroundImage: `url('${backgroundSrc}')` }}
      />
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />

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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.h2
            className="text-center text-6xl sm:text-8xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-8xl mb-8 text-[#39a6ff]"
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
              text-2xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-3xl 2xl:text-4xl
              text-white text-muted-foreground
              mx-auto text-center leading-snug
              max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl
              mb-14 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 2xl:mb-32
            "
            variants={itemVariants}
          >
            We are a passionate team of engineering students from the University of Lisbon,
            committed to advancing electric motorcycle technology.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-10 sm:gap-6 md:gap-3 lg:gap-4 xl:gap-12 2xl:gap-10 mt-14 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 2xl:mt-10 mb-6 sm:mb-8 md:mb-12 lg:mb-5 xl:mb-12 2xl:-mb-4">
          {stats.map(({ title, to, suffix, delay }) => (
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
                <div className="flex justify-center items-end gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <AnimatedCounter
                    to={to}
                    delay={delay}
                    className="text-6xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-semibold text-[#39a6ff] text-tlmoto-cyan tlmoto-glow"
                  />
                  <span className="text-5xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-6xl 2xl:text-6xl font-semibold text-[#39a6ff] text-tlmoto-cyan tlmoto-glow align-top">
                    {suffix}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-2 sm:mb-3 lg:mb-2 text-[#39a6ff] uppercase tracking-[.20em]">
                  {title}
                </h3>

                <p className="text-white/80 text-lg sm:text-base md:text-sm lg:text-base xl:text-base 2xl:text-2xl">
                  {title === "Members" && "Dedicated teammates and collaborators"}
                  {title === "Competitions" && "Racing and engineering challenges"}
                  {title === "Prototypes" && "Iterating toward peak performance"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
