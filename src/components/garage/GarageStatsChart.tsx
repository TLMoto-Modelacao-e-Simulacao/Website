import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis, LabelList } from "recharts";
import { themeColors } from "@/src/components/textContent/GarageSectionTexts";

interface Stat {
  name: string;
  value: number;
  max: number;
  unit: string;
}

export default function MyStatsChart({ stats, motoId }: { stats: Stat[]; motoId: string }) {
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
      className="w-full lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw] rounded-2xl bg-black/80 
                 shadow-xl text-white backdrop-blur-sm flex flex-col justify-center p-4"
      role="region"
    >
      <div>
        <h1 className="text-center text-lg lg:text-xl xl:text-2xl font-semibold">Stats</h1>

        <div className="bg-white/6 p-2 md:p-3 rounded-lg w-full">
          <div className="h-[20vh]">
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
    </section>
  );
}
