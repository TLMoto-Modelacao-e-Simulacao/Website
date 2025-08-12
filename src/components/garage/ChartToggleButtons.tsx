import React from 'react';
import { themeColors } from 'src/components/textContent/GarageSectionTexts';

export default function MyChartToggleButtons({
  showHistory,
  setShowHistory,
  motoId,
  toggleBackground,
}) {
  const color = themeColors[motoId] || themeColors.m01;
  const gradientBg = `linear-gradient(to right, rgba(${color},1), rgba(${color},0.5))`;
  const borderColor = `rgba(${color},0.5)`;

  const baseButtonClasses = `
    font-bold text-white
    rounded-lg
    px-4 py-2
    transition transform duration-200 ease-in-out
    shadow-lg
    hover:scale-105 hover:shadow-xl
    active:scale-95
    flex-shrink-0  
    min-w-[120px]  
  `;

  return (
    <div className="w-full flex justify-center py-2 mt-4">
      <div 
        className="flex flex-wrap justify-center items-center gap-4 w-full max-w-4xl mx-auto"
      >
        <button
          onClick={() => setShowHistory(false)}
          style={{ background: gradientBg, border: `2px solid ${borderColor}` }}
          className={`${baseButtonClasses} ${!showHistory ? 'opacity-100' : 'opacity-50'}`}
        >
          Stats
        </button>
        <button
          onClick={() => setShowHistory(true)}
          style={{ background: gradientBg, border: `2px solid ${borderColor}` }}
          className={`${baseButtonClasses} ${showHistory ? 'opacity-100' : 'opacity-50'}`}
        >
          History
        </button>
        <button
          onClick={toggleBackground} 
          style={{ background: gradientBg, border: `2px solid ${borderColor}` }}
          className={baseButtonClasses}
        >
          Theme
        </button>
      </div>
    </div>
  );
}
