import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis, LabelList } from "recharts";
import { themeColors } from "@/src/components/textContent/GarageSectionTexts";

interface Stat {
  name: string;
  value: number;
  max: number;
  unit: string;
}

interface MyStatsChartProps {
  stats: Stat[];
  motoId: string;
  showHistory?: boolean;
  historyText?: string;
}

export default function MyStatsChart({
  stats,
  motoId,
  showHistory = false,
  historyText = "",
}: MyStatsChartProps) {
  const [activeTab, setActiveTab] = useState(showHistory ? "history" : "stats");

  useEffect(() => {
    setActiveTab(showHistory ? "history" : "stats");
  }, [showHistory]);

  if (!stats || stats.length === 0) {
    return <p className="text-sm text-white/90">No stats available</p>;
  }

  const normalizedData = stats.map(
    (stat: { name: string; value: number; max: number; unit: string }) => ({
      name: stat.name.replace(" ", " "),
      value: (stat.value / stat.max) * 100,
      max: 100,
      displayValue: `${stat.value} ${stat.unit}`,
    })
  );

  const color = themeColors[motoId as keyof typeof themeColors] || themeColors.m01;

  return (
    <section
      className="
        w-full md:w-[45vw]
        pt-8 px-4 md:px-5 pb-4
        rounded-2xl
        bg-black/80
        shadow-xl
        text-white
        backdrop-blur-sm
        relative
      "
      role="region"
      aria-label={activeTab === "history" ? "History panel" : "Stats panel"}
    >
      <div className="absolute top-0 left-0 w-full px-4 md:px-5">
        <div className="flex w-full gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("stats")}
            aria-pressed={activeTab === "stats"}
            className={`flex-1 text-center rounded-tl-2xl rounded-tr-none rounded-b-none px-3 py-2 text-sm md:text-lg font-semibold transition-colors duration-150 ease-in-out
              ${activeTab === "stats" ? "bg-black/40" : "bg-transparent border border-white/10"}
            `}
          >
            Stats
          </button>
        </div>
      </div>

      <div className="mt-2 min-h-[20vh]">
        <div
          id="panel-history"
          role="tabpanel"
          aria-hidden={activeTab !== "history"}
          className={`${activeTab === "history" ? "block" : "hidden"} h-full`}
        >
          <div className="bg-white p-2 md:p-3 rounded-lg text-black h-full overflow-auto mt-5">
            <p className="text-sm md:text-base lg:text-xl leading-relaxed">{historyText}</p>
          </div>
        </div>

        <div
          id="panel-stats"
          role="tabpanel"
          aria-hidden={activeTab !== "stats"}
          className={`${activeTab === "stats" ? "block" : "hidden"}`}
        >
          <div className="bg-white/6 p-2 md:p-3 rounded-lg">
            <div className="h-[140px] sm:h-[120px] md:h-[200px] ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={normalizedData} margin={{ left: 20 }} layout="vertical">
                  <XAxis type="number" hide={true} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "rgba(255,255,255,0.95)", fontSize: 13 }}
                  />
                  <Bar dataKey="value" fill={`rgba(${color},0.9)`} radius={[8, 8, 8, 8]}>
                    <LabelList
                      dataKey="displayValue"
                      position="insideRight"
                      style={{ fill: "rgba(255,255,255,0.95)", fontSize: 12, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
