import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trophy, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TransitionLink } from "../utils/TransitionLink";

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
  "tracking-[.17em] h-auto min-h-[100svh] flex flex-col items-center pt-16 pb-10 px-10 " +
  "sm:pt-24 sm:pb-20 sm:min-h-[100svh] " +
  "md:pt-36 md:pb-28 md:min-h-[90vh] " +
  "lg:pt-24 lg:pb-28 lg:min-h-[100vh] " +
  "xl:pt-16 xl:pb-20 xl:min-h-[100vh] " +
  "relative";

const CompetitionsSection = () => {
  const competitions = [
    {
      name: "MotoStudent",
      location: "Aragon, Spain",
      type: "International",
      description:
        "An engineering competition where university teams develop electric motorcycles and compete in various challenges, including MS1 (project evaluation) and MS2 (prototype testing) phases.",
      achievements: ["Debut in 2014", "Electric category focus", "Continuous participation"],
      status: "Annual",
      icon: <Trophy className="w-6 h-6" />,
    },
    {
      name: "CNV",
      location: "Portugal",
      type: "National",
      description:
        "A professional racing competition that takes place in Portugal, where we test our prototypes against established racing teams.",
      achievements: ["Professional level", "Real-world testing", "Performance validation"],
      status: "Seasonal",
      icon: <MapPin className="w-6 h-6" />,
    },
  ];

  return (
    <motion.section
      id="section3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className={`bg-no-repeat bg-cover bg-center ${sectionStyle}`}
      style={{ backgroundImage: `url('/images/home/aragon_background.webp')` }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
      <div
        className="
          absolute left-0 right-0 bottom-0 z-10 pointer-events-none
        "
        style={{
          height: "12%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 80%, #000 98%, #000 100%)",
        }}
      />
      <div className="max-w-[95rem] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-6">
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-0 text-center space-y-4 lg:space-y-6 2xl:space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.h2
            className="text-5xl sm:text-7xl md:text-6xl lg:text-8xl xl:text-7xl 2xl:text-7xl text-[#39a6ff]"
            variants={itemVariants}
          >
            <span className="hero-text">COMPETITIONS</span>
          </motion.h2>
          <motion.div
            className="w-18 h-1 bg-gradient-to-r from-electric to-electric-glow mx-auto -mb-2"
            variants={itemVariants}
          />
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-2xl 2xl:text-3xl text-white text-muted-foreground 2xl:max-w-full max-w-4xl md:max-w-6xl mx-auto leading-relaxed mb-6 md:mb-10 2xl:mb-6"
            variants={itemVariants}
          >
            The TLMoto is involved in major competitions that challenge our engineering skills and
            validate our electric motorcycle technologies against the best in the world.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:gap-6 items-center mb-12 2xl:mb-10">
          <div className="animate-slide-in-left">
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src="/images/home/aragon_background.webp"
                width={600}
                height={500}
                alt="Racing Competition"
                className="w-full h-64 sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                quality={60}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <TransitionLink href="/history">
                  <Button
                    variant="ghost"
                    className="2xl:text-2xl w-full justify-between text-base text-gray-200 hover:text-[#39a6ff] hover:text-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Button>
                </TransitionLink>
              </div>
            </div>
          </div>

          {/* Competition Details */}
          <div className="animate-slide-in-right space-y-6 md:space-y-8 2xl:space-y-6">
            {competitions.map(competition => (
              <Card
                key={competition.name}
                className="bg-gradient-to-br from-[#111827]/90 via-[#1e293b]/80 to-[#0a192f]/80 backdrop-blur-md border border-[#39a6ff]/10 hover:border-[#39a6ff]/40 shadow-xl transition-all duration-300 group hover:scale-[1.02]"
              >
                <CardContent className="p-6 sm:p-8 md:p-6 lg:p-8 xl:p-8 2xl:p-7 text-center lg:text-left">
                  <div className="flex items-start justify-between mb-4 2xl:mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 2xl:w-9 2xl:h-9 bg-gradient-to-b from-[#39a6ff] to-deepskyblue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#39a6ff]/20">
                        {competition.icon}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl 2xl:text-xl font-bold text-[#39a6ff]">
                          {competition.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-blue-300/80 mt-1 space-y-1 sm:space-y-0">
                          <span className="flex items-center space-x-1 2xl:text-base">
                            <MapPin className="w-4 h-4 text-[#39a6ff]" />
                            <span>{competition.location}</span>
                          </span>
                          <span className="flex items-center space-x-1 2xl:text-base">
                            <Calendar className="w-4 h-4 text-deepskyblue" />
                            <span>{competition.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <Users className="w-6 h-6 2xl:w-5 2xl:h-5 text-blue-400/60" />
                  </div>

                  <p className="text-blue-100 mb-8 2xl:mb-6 leading-relaxed text-base 2xl:text-base">
                    {competition.description}
                  </p>

                  <div className="space-y-4 2xl:space-y-3">
                    <h4 className="text-xl sm:text-2xl 2xl:text-2xl font-semibold bg-gradient-to-r from-[#39a6ff] to-deepskyblue bg-clip-text text-transparent">
                      Key Achievements:
                    </h4>
                    <div className="flex flex-wrap gap-3 2xl:gap-2">
                      {competition.achievements.map((ach, idx) => (
                        <span
                          key={idx}
                          className="2xl:text-sm px-2 py-1 bg-gradient-to-r from-[#39a6ff]/20 to-deepskyblue/20 border border-[#39a6ff]/30 rounded-full text-sm text-blue-300/90 hover:border-[#39a6ff]/50 transition-colors duration-200"
                        >
                          {ach}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competition Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 2xl:gap-5 mb-8 md:mb-10 2xl:mb-8 mt-2">
          {[
            ["2014", "First Competition"],
            ["5", "International Events"],
            ["2", "Major Championships"],
            ["3", "Racing Prototypes"],
          ].map(([num, label], idx) => (
            <div
              key={idx}
              className="text-center p-4 2xl:p-3 bg-[#16263c]/70 backdrop-blur-sm rounded-lg border border-[#39a6ff]/25 hover:border-[#39a6ff]/60 transition-all duration-300 hover:scale-105 shadow-lg shadow-black/30"
            >
              <div className="lg:text-3xl md:text-4xl xl:text-2xl 2xl:text-xl text-white mb-1 2xl:mb-0.5 drop-shadow">
                {num}
              </div>
              <div className="lg:text-base xl:text-base 2xl:text-sm md:text-1xl text-blue-100">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CompetitionsSection;
