import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  getTeamMembersWithLinkedIn,
  getAvailableYears,
} from "../../components/utils/FetchFolderImages";
import MyDefaultPage from "../../components/DefaultPage";
import { motion } from "framer-motion";
import { resolveInternalHref } from "../../utils/useInternalHref";
import SeoHead from "@/src/components/layout/SeoHead";

// --- DATA FETCHING ---

export async function getStaticProps({ params }: { params: { year: string } }) {
  const { year } = params;
  const teamData = getTeamMembersWithLinkedIn(year);
  // Get the actual list of years from your folder structure
  const allYears = getAvailableYears();

  return { props: { teamData, year, allYears } };
}

export async function getStaticPaths() {
  const years = getAvailableYears();

  const paths = years.map((year: string) => ({
    params: { year },
  }));

  return { paths, fallback: false };
}

// --- TYPES ---

interface TeamMember {
  name: string;
  image: string;
  cardImage: string;
  linkedin?: string;
}

interface TeamCategory {
  name: string;
  members: TeamMember[];
}

interface TeamData {
  data: TeamCategory[];
  team: string;
}

interface TeamProps {
  teamData: TeamData;
  year: string;
  allYears: string[]; // Added to props
}

// --- COMPONENT ---

export default function Team({ teamData, year, allYears }: TeamProps) {
  const router = useRouter();
  const [focusedImage, setFocusedImage] = useState<string | null>(null);
  const [focusedCardImage, setFocusedCardImage] = useState<string | null>(null);
  const [focusedMember, setFocusedMember] = useState<TeamMember | null>(null);
  const [mobilePopupOpen, setMobilePopupOpen] = useState(false);

  // DYNAMIC LOGIC: Instead of hardcoding [2022, 2025], we use the props
  // We sort them to ensure the order is 2022 -> 2024 -> 2025
  const AVAILABLE_YEARS = allYears.map(y => parseInt(y, 10)).sort((a, b) => a - b);

  const currentYear = parseInt(year, 10);
  const currentIndex = AVAILABLE_YEARS.indexOf(currentYear);

  const handleYearChange = (direction: "prev" | "next") => {
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < AVAILABLE_YEARS.length) {
      const newYear = AVAILABLE_YEARS[newIndex];
      const { href, isFileProtocol } = resolveInternalHref(`/team/${newYear}`);

      if (isFileProtocol) {
        window.location.href = href;
        return;
      }

      router.push(href);
    }
  };

  useEffect(() => {
    setFocusedCardImage(teamData.team);
    setMobilePopupOpen(true);
  }, [teamData]);

  // Prevent background scrolling and footer overlap when mobile popup is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    // popup only exists on mobile
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    if (mobilePopupOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("popup-open");
    } else {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("popup-open");
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("popup-open");
    };
  }, [mobilePopupOpen]);

  return (
    <>
      <SeoHead
        title={`Team ${year}`}
        description={`Get to know the TLMOTO team of ${year}, the people responsible for driving our success in student motorsport.`}
      />
      <MyDefaultPage>
        {/* pt-24 -> 10vh */}
        <div className="relative min-h-screen pt-[6vh] xl:pt-[10vh] mb-[3vh] lg:mb-0">
          {/* Navigation Header - py-8 -> 3.5vh */}
          <div className="flex items-center justify-center py-[3.5vh] h-[27vh] ">
            <button
              onClick={() => handleYearChange("prev")}
              className={`px-[1vw] py-[1vh] text-white text-[9vw] font-semibold uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg sm:text-[9vw] md:text-[6vw] lg:text-[4vw] ${
                currentIndex <= 0 ? "invisible" : ""
              }`}
            >
              {"<"}
            </button>

            {/* Font sizes: 3xl-6xl translated to 2.5vw-5vw */}
            <h1 className="mx-[2vw] text-[9vw] sm:text-[9vw] md:text-[6vw] lg:text-[4vw] font-bold uppercase tracking-wider">
              <span className="text-white">Team </span>
              <span className="text-blue-500">{year}</span>
            </h1>

            <button
              onClick={() => handleYearChange("next")}
              className={`px-[1vw] py-[1vh] text-white text-[9vw] font-semibold uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg sm:text-[9vw] md:text-[6vw] lg:text-[4vw] ${
                currentIndex >= AVAILABLE_YEARS.length - 1 ? "invisible" : ""
              }`}
            >
              {">"}
            </button>
          </div>

          {/* Content Area - mt-8 -> 4vh */}
          <div className="relative flex mt-[4vh]">
            <div className="w-full lg:max-w-[57.5vw] px-[2vw] sm:pl-[4vw] md:pl-[6vw] lg:pl-[8vw]">
              {teamData.data.length === 0 ? (
                <p className="text-white text-center text-[1.5vw]">No data available for {year}</p>
              ) : (
                teamData.data.map(({ name, members }) => (
                  <div key={name} className="mb-[10vh]">
                    {/* -mt-12 -> -5vh */}
                    <div className="flex items-center justify-center lg:justify-start pl-0 rounded-[1vw] transition-all duration-300 -mt-[5vh]">
                      <Image
                        src="/images/team/raio.webp"
                        alt="Team Icon"
                        width={40}
                        height={40}
                        className="w-[6vw] h-[6vh] mr-[1vw] object-contain sm:w-[6vw] md:w-[3vw] lg:w-[3vw] sm:h-[6vh] md:h-[3vh] lg:h-[3vh]"
                      />
                      <h2 className="text-white text-[5vw] font-bold uppercase tracking-[0.2vw] mb-0 sm:text-[5vw] md:text-[3vw] lg:text-[2vw]">
                        {name}
                      </h2>
                    </div>

                    {/* gap-4 -> 1.5vw, mt-1 -> 0.5vh */}
                    <div className="flex flex-wrap gap-[1.5vw] mt-[0.5vh] justify-center lg:justify-start">
                      {members.map((member, index) => (
                        <div
                          key={`${member.image}-${index}`}
                          /* className="text-center flex-shrink-0 w-[25vw] sm:w-[20vw] md:w-[3vw] lg:w-[9vw]" */
                          className="text-center flex-shrink-0 w-[25vw] sm:w-[20vw] md:w-[15vw] lg:w-[9vw]"
                        >
                          <motion.img
                            src={member.image}
                            alt={member.name}
                            loading="lazy"
                            className={`w-full cursor-pointer transition-all duration-300 rounded-[1.5vw] hover:scale-105 aspect-square object-cover ${
                              focusedImage === member.image ? "border-[0.2vw] border-red-800" : ""
                            }`}
                            onClick={() => {
                              setFocusedImage(member.image);
                              setFocusedCardImage(member.cardImage);
                              setFocusedMember(member);
                              setMobilePopupOpen(true);
                            }}
                          />
                          <div className="mt-[1vh] text-center">
                            <p className="text-white text-[4vw] sm:text-[2vw] md:text-[2.5vw] lg:text-[1.5vw] font-bold mb-[0.5vh] tracking-wide break-words">
                              {member.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Preview Card */}
            {focusedCardImage && (
              <>
                <div className="hidden lg:flex fixed top-[30vh] right-[5vw] lg:right-[10vw] flex-col items-center z-10">
                  <motion.img
                    src={focusedCardImage}
                    alt="Focused Image"
                    loading="lazy"
                    className="border-[0.3vw] border-black w-[25vh] md:w-[30vh] lg:w-[35vh] xl:w-[40vh] max-w-[35vw] object-contain shadow-[0_0_2vw_0.5vw_rgba(6,90,123,1)]"
                  />
                  <div className="mt-[2vh] text-center h-[6vh] flex items-center justify-center">
                    {focusedMember && focusedMember.linkedin ? (
                      <a
                        href={focusedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-[2vw] py-[1.5vh] bg-[#0077b5] text-white text-[0.9vw] font-semibold rounded-[0.5vw] transition-all duration-300 hover:bg-[#005885] hover:-translate-y-[0.2vh] hover:shadow-lg"
                      >
                        LinkedIn
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Mobile Popup */}
                {mobilePopupOpen && focusedCardImage && (
                  <div className="lg:hidden fixed inset-0 backdrop-blur-lg bg-black/30 flex items-center justify-center z-50 p-[4vw]">
                    <div className="relative flex flex-col items-center ">
                      <motion.img
                        src={focusedCardImage}
                        alt="Focused Image"
                        loading="lazy"
                        className="h-[80vw] sm:h-[60vw] md:h-[50vw] max-h-[70vh] object-contain border-[0.3vw] border-black"
                      />

                      <div
                        className={`flex w-full mt-[2vh] px-[2vw] ${
                          focusedMember ? "justify-between" : "justify-center"
                        }`}
                      >
                        <button
                          onClick={() => {
                            setFocusedImage(null);
                            setFocusedMember(null);
                            setMobilePopupOpen(false);
                          }}
                          className="px-[4vw] py-[1.5vh] bg-gray-600 text-white font-medium text-[3.5vw] rounded-[1.5vw] transition-all duration-300 hover:bg-gray-500"
                        >
                          Close
                        </button>
                        {focusedMember && focusedMember.linkedin && (
                          <a
                            href={focusedMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-[4vw] py-[1.5vh] bg-[#0077b5] text-white font-medium text-[3.5vw] rounded-[1.5vw] transition-all duration-300 hover:bg-[#005885]"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </MyDefaultPage>
    </>
  );
}
