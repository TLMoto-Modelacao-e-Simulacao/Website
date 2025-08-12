import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis, LabelList } from 'recharts';
import { backgroundsm , themeColors } from '@/src/components/textContent/GarageSectionTexts';


export default function MyStatsChart({ stats, motoId, showHistory, historyText }) {
  if (!stats || stats.length === 0) return <p>No stats available</p>;

  const normalizedData = stats.map(stat => ({
    name: stat.name.replace(' ', '\u00A0'),
    value: (stat.value / stat.max) * 100,
    max: 100,
    displayValue: `${stat.value} ${stat.unit}`,

    
  }));

  const color = themeColors[motoId] || themeColors.m01;

  return (
    <div
      className="bottom-4 left-4 w-[calc(100%-32px)] md:w-80 md:bottom-20 md:left-20 p-4 rounded-lg shadow-lg bg-gray-800 min-w-[300px] sm:min-w-[500px] md:min-w-[600px] border border-gray-300/10"
    >
      <h3 className="text-white text-lg sm:text-2xl font-bold mb-4 text-center">
        {showHistory ? 'HISTORY' : 'STATS'}
      </h3>

      {showHistory ? (
        <div className="bg-white p-3 sm:p-6 rounded-lg max-w-full sm:max-w-2xl shadow-lg overflow-auto">
          <p className="text-black text-sm sm:text-lg leading-relaxed">{historyText}</p>
        </div>
      ) : (
        <div className="bg-white bg-opacity-30 p-3 rounded-lg w-full">
          {/* Heights reduced slightly as requested */}
          <div className="h-[80px] sm:h-[120px] md:h-[160px] lg:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={normalizedData} layout="vertical">
                <XAxis type="number" hide={true} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'black', fontSize: '10px' }}
                />
                <Bar 
                  dataKey="value" 
                  fill={`rgba(${color},0.8)`} 
                  radius={[10, 10, 10, 10]}
                >
                  <LabelList
                    dataKey="displayValue"
                    position="insideRight"
                    style={{ fill: 'black', fontSize: '12px', fontWeight: 'bold' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
