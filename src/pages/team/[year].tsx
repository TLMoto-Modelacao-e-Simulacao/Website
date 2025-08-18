import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  getTeamMembersWithLinkedIn,
  getAvailableYears,
} from "../../components/utils/FetchFolderImages";
import MyDefaultPage from "../../components/DefaultPage";
import { motion } from "framer-motion";

export async function getStaticProps({ params }: { params: { year: string } }) {
  const { year } = params;
  const teamData = getTeamMembersWithLinkedIn(year);

  return { props: { teamData, year } };
}

export async function getStaticPaths() {
  const years = getAvailableYears();

  const paths = years.map((year: string) => ({
    params: { year },
  }));

  return { paths, fallback: false };
}

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
}

export default function Team({ teamData, year }: TeamProps) {
  const router = useRouter();
  const [focusedImage, setFocusedImage] = useState<string | null>(null);
  const [focusedCardImage, setFocusedCardImage] = useState<string | null>(null);
  const [focusedMember, setFocusedMember] = useState<TeamMember | null>(null);
  const [mobilePopupOpen, setMobilePopupOpen] = useState(false);

  const AVAILABLE_YEARS = [2022, 2024]; // Anos disponíveis (excluindo 2023)
  const currentYear = parseInt(year, 10);
  const currentIndex = AVAILABLE_YEARS.indexOf(currentYear);

  const handleYearChange = (direction: "prev" | "next") => {
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < AVAILABLE_YEARS.length) {
      const newYear = AVAILABLE_YEARS[newIndex];
      return router.push(`/team/${newYear}`);
    }
  };

  useEffect(() => {
    setFocusedCardImage(teamData.team);
    setMobilePopupOpen(true);
  }, [teamData]);
  return (
    <MyDefaultPage>
      <div className="relative min-h-screen pt-24">
        <div className="flex items-center justify-center py-8">
          <button
            onClick={() => handleYearChange("prev")}
            className={`px-4 py-2 text-white text-5xl font-semibold uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              currentIndex <= 0 ? "invisible" : ""
            }`}
          >
            {"<"}
          </button>

          <h1 className="mx-4 sm:mx-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
            <span className="text-white">Team </span>
            <span className="text-blue-500">{year}</span>
          </h1>

          <button
            onClick={() => handleYearChange("next")}
            className={`px-4 py-2 text-white text-5xl font-semibold uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              currentIndex >= AVAILABLE_YEARS.length - 1 ? "invisible" : ""
            }`}
          >
            {">"}
          </button>
        </div>

        <div className="relative flex mt-8">
          <div className="w-full lg:max-w-[57.5%] px-4 sm:pl-8 md:pl-12 lg:pl-16">
            {teamData.data.length === 0 ? (
              <p className="text-white text-center">No data available for {year}</p>
            ) : (
              teamData.data.map(({ name, members }) => (
                <div key={name} className="mb-20">
                  <div className="flex items-center pl-0 sm:pl-2 lg:pl-2 rounded-xl transition-all duration-300 -mt-12">
                    <Image
                      src="/images/team/raio.webp"
                      alt="Team Icon"
                      width={40}
                      height={40}
                      className="w-10 h-10 mr-4 object-contain -translate-y-2"
                    />
                    <h2 className="text-white text-2xl font-bold uppercase tracking-[2.5px] mb-4">
                      {name}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 lg:gap-4 mt-1 justify-center sm:justify-start">
                    {members.map((member, index) => (
                      <div
                        key={`${member.image}-${index}`}
                        className="text-center flex-shrink-0"
                        style={{
                          width: "clamp(80px, 12vw, 120px)",
                        }}
                      >
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          width={125}
                          height={125}
                          loading="lazy"
                          className={`cursor-pointer transition-all duration-300 rounded-2xl hover:scale-105 w-full aspect-square object-cover ${
                            focusedImage === member.image ? "border-4 border-red-800" : ""
                          }`}
                          onClick={() => {
                            setFocusedImage(member.image);
                            setFocusedCardImage(member.cardImage);
                            setFocusedMember(member);
                            setMobilePopupOpen(true);
                          }}
                        />
                        <div className="mt-3 text-center">
                          <p className="text-white text-sm sm:text-base font-medium mb-1 tracking-wide break-words">
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
          {focusedCardImage && (
            <>
              <div className="hidden lg:flex fixed left-[65%] bottom-[10%] flex-col items-center z-10">
                <motion.img
                  style={{ height: "50vh", width: "300px" }}
                  src={focusedCardImage}
                  alt="Focused Image"
                  loading="lazy"
                  className="border-4 border-black h-[50vh] shadow-[0_0_30px_10px_rgba(6,90,123,1)]"
                />
                <div className="mt-4 text-center h-12 flex items-center justify-center">
                  {focusedMember && focusedMember.linkedin ? (
                    <a
                      href={focusedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-[#0077b5] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#005885] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(0,119,181,0.3)]"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </div>
              {mobilePopupOpen && focusedCardImage && (
                <div className="lg:hidden fixed inset-0 backdrop-blur-lg bg-black/30 flex items-center justify-center z-50 p-4">
                  <div className="relative flex flex-col items-center">
                    <motion.img
                      style={{ height: "80vh", width: "90vw" }}
                      src={focusedCardImage}
                      alt="Focused Image"
                      loading="lazy"
                      className="w-full h-auto max-h-[45vh] max-w-[70vw] object-contain"
                    />

                    <div
                      className={`flex w-full mt-3 px-2 ${
                        focusedMember ? "justify-between" : "justify-center"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setFocusedImage(null);
                          setFocusedMember(null);
                          setMobilePopupOpen(false);
                        }}
                        className="px-4 py-2 bg-gray-600 text-white font-medium text-sm rounded-lg transition-all duration-300 hover:bg-gray-500"
                      >
                        Close
                      </button>
                      {focusedMember && focusedMember.linkedin && (
                        <a
                          href={focusedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#0077b5] text-white font-medium text-sm rounded-lg transition-all duration-300 hover:bg-[#005885]"
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
  );
}
