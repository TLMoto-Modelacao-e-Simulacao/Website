import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { TransitionLink } from "../utils/TransitionLink";

interface MotorbikeData {
  id: number;
  name: string;
  model: string;
  year: string;
  description: string;
  image: string;
  specs: {
    power: string;
    weight: string;
    topSpeed: string;
  };
}

const motorbikesData: MotorbikeData[] = [
  {
    id: 1,
    name: "TLM01i",
    model: "Combustion Prototype",
    year: "2014",
    description:
      "Our first prototype, a combustion-powered racing motorcycle that marked the beginning of our journey in competitive motorsports.",
    image: "/images/garage/01.webp",
    specs: { power: "39 HP", weight: "100 kg", topSpeed: "192 km/h" },
  },
  {
    id: 2,
    name: "TLM02e",
    model: "Electric Prototype",
    year: "2018",
    description:
      "The transition to electric power. This prototype represents our commitment to sustainable racing technology and innovation.",
    image: "/images/garage/02.webp",
    specs: { power: "39 kW", weight: "152 kg", topSpeed: "160 km/h" },
  },
  {
    id: 3,
    name: "TLM03e",
    model: "Advanced Electric",
    year: "2021",
    description:
      "Born in the midst of the pandemic, the TLM03e was a milestone of resilience and innovation, debuting the first carbon fairings made in-house by TLMoto.",
    image: "/images/garage/03.webp",
    specs: { power: "36 kW", weight: "150 kg", topSpeed: "178 km/h" },
  },
  {
    id: 4,
    name: "TLM04e",
    model: "Advanced Electric",
    year: "2023",
    description:
      "The TLM04e marked a new era at TLMoto with the implementation of the first Battery Pack entirely developed by the team itself.",
    image: "/images/garage/04.webp",
    specs: { power: "57 kW", weight: "160 kg", topSpeed: "204 km/h" },
  },
  {
    id: 5,
    name: "TLM05e",
    model: "Advanced Electric",
    year: "2025",
    description:
      "The TLM05e is the team's latest prototype, introduced in 2025, securing a place in the global top 20 at MotoStudent 2025.",
    image: "/images/garage/05.webp",
    specs: { power: "40 kW", weight: "150 kg", topSpeed: "201 km/h" },
  },
];

// --- CHANGE: Reverse the order here so it starts from 2025 ---
const motorbikes = [...motorbikesData].reverse();

export const MotorbikeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === motorbikes.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? motorbikes.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // --- Swipe Logic ---
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd to avoid false positives
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-[100%] xl:max-w-6xl 2xl:max-w-5xl mx-auto"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111827]/90 via-[#1e293b]/80 to-[#0a192f]/80 border border-[#39a6ff]/10">
        <div
          className="flex transition-transform duration-500 ease-electric"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {motorbikes.map(motorbike => (
            <div key={motorbike.id} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 p-4 sm:p-6 lg:p-10 2xl:p-8">
                {/* Image Section */}
                <div className="relative w-full max-w-[240px] lg:max-w-[280px] mx-auto group">
                  <div className="relative w-[240px] h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-xl bg-transparent flex items-center justify-center">
                    <Image
                      src={motorbike.image}
                      alt={motorbike.name}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 80vw, 240px"
                      quality={60}
                      loading="lazy"
                      className="transition-transform duration-700 group-hover:scale-105 rounded-2xl"
                    />
                  </div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:-left-11 md:text-3xl md:left-15 2xl:left-15 bg-[#39a6ff]/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {motorbike.year}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center items-center lg:items-start space-y-6 text-base md:text-lg lg:text-xl 2xl:text-lg text-center lg:text-left">
                  <div>
                    <h3 className="text-4xl lg:text-4xl 2xl:text-5xl font-bold text-[#39a6ff] mb-2">
                      {motorbike.name}
                    </h3>
                    <p className="text-blue-300 text-2xl 2xl:text-2xl font-medium mb-4">
                      {motorbike.model}
                    </p>
                    <p className="text-blue-100 leading-relaxed text-xl 2xl:text-2xl">
                      {motorbike.description}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="flex justify-center">
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full md:w-auto 2xl:w-[30vw]">
                      {Object.entries(motorbike.specs).map(([label, value]) => (
                        <div
                          key={label}
                          className="bg-[#16263c]/70 backdrop-blur-sm rounded-lg p-2 sm:p-4 2xl:p-3 border border-[#39a6ff]/25 text-center flex flex-col justify-between"
                        >
                          <div className="flex-1 flex items-center justify-center">
                            <div className="text-blue-300 sm:text-sm lg:text-2xl font-medium uppercase">
                              {label.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <div className="text-lg sm:text-lg 2xl:text-xl font-bold text-white">
                              {value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <TransitionLink href="/garage">
                    <Button
                      variant="outline"
                      className="w-fit border-[#39a6ff] bg-blue-1520 backdrop-blur-sm text-xl text-white hover:bg-[#39a6ff] hover:text-white transition-all duration-300 mt-5 cursor-pointer"
                    >
                      Learn More
                    </Button>
                  </TransitionLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="group absolute left-2 sm:left-4 2xl:left-2 top-[40%] sm:top-1/2 -translate-y-1/2 bg-[#16263c]/80 backdrop-blur-sm border border-[#39a6ff]/25 hover:bg-[#39a6ff] hover:text-white transition-all duration-300 z-10"
        >
          <ChevronLeft className="h-6 w-6 text-[#39a6ff] group-hover:text-white transition-colors duration-200" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="group absolute right-2 sm:right-4 top-[40%] sm:top-1/2 -translate-y-1/2 bg-[#16263c]/80 backdrop-blur-sm border border-[#39a6ff]/25 hover:bg-[#39a6ff] hover:text-white transition-all duration-300 z-10"
        >
          <ChevronRight className="h-6 w-6 text-[#39a6ff] group-hover:text-white transition-colors duration-200" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-3 mt-6">
        {motorbikes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#39a6ff] shadow-md shadow-[#39a6ff]/40"
                : "bg-blue-200/30 hover:bg-[#39a6ff]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MotorbikeCarousel;
