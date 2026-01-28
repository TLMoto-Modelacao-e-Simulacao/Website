import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

import { cards, backgroundData, themeColors } from "src/components/textContent/GarageSectionTexts";
import MyStatsChart from "src/components/garage/GarageStatsChart";
import { ArrowLeft } from "lucide-react";

export default function GarageDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const card = cards.find(card => card.id === id);
  const [bgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!card) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
        Mota não encontrada
      </div>
    );
  }

  // Lógica de Background
  const motoBackgrounds = backgroundData[card.id as keyof typeof backgroundData] ?? [card.video];
  const currentVideo = motoBackgrounds[bgIndex];
  const motoImage =
    typeof id === "string" ? `/images/garage/${id.replace("m", "").padStart(2, "0")}.webp` : "";

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* 1. BACKGROUND LAYER (Ocupa tudo e fica por baixo) */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <img src={motoImage} alt={card.title} className="w-full h-full object-cover" />
        ) : (
          <video
            key={currentVideo} // Força o reload quando o vídeo muda
            src={currentVideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        )}
        {/* Overlay escuro para garantir leitura do texto */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end items-start p-6 md:p-12 lg:p-20">
        {/* botão voltar para trás */}
        <div className="mb-40">
          <Link
            href="/garage"
            className="hover:text-[#39a6ff] transition-colors inline-block"
            aria-label="Voltar"
          >
            <ArrowLeft size={32} strokeWidth={3} />
          </Link>
        </div>

        <div className="w-full max-w-2xl">
          {/* barra de navegação entre motas */}
          <nav className="mb-5 w-full">
            <div className="flex overflow-x-auto no-scrollbar gap-12 items-end">
              {cards.map(moto => {
                const isActive = moto.id === id;
                const motoColor = themeColors[moto.id as keyof typeof themeColors] || "255,255,255";

                return (
                  <Link
                    key={moto.id}
                    href={`/garage/${moto.id}`}
                    className={`
                      flex-shrink-0 transition-all duration-300 group
                      ${isActive ? "scale-110" : "opacity-40 hover:opacity-100"}
                    `}
                  >
                    <span
                      className="text-lg md:text-2xl font-black italic uppercase tracking-tighter"
                      style={{ color: isActive ? `rgb(${motoColor})` : "white" }}
                    >
                      {moto.title}
                    </span>
                    <div
                      className={`h-1 mt-1 transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-1/2"}`}
                      style={{ backgroundColor: `rgb(${motoColor})` }}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* stats */}
          <div className="w-full transform transition-all duration-700 ease-out">
            <MyStatsChart stats={card.stats} motoId={card.id} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Fade suave ao trocar de mota */
        video,
        img {
          animation: fadeEnter 1s ease-in-out;
        }
        @keyframes fadeEnter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
