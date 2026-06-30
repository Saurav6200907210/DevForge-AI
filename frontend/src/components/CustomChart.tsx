import React from 'react';

interface DoughnutDialProps {
  percentage: number;
  label: string;
  color?: string;
  size?: number;
}

export function DoughnutDial({ percentage, label, color = '#1F6F5F', size = 120 }: DoughnutDialProps) {
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-2xl bg-white/70 border border-[#1F3A5F]/5 shadow-sm w-fit">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Background track circle */}
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="transparent" 
            stroke="rgba(31, 58, 95, 0.04)" 
            strokeWidth={strokeWidth} 
          />
          {/* Foreground active progress circle */}
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="transparent" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 3px ${color}22)`
            }}
          />
        </svg>
        {/* Metric score inside */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-[#1F3A5F] leading-none">{percentage}%</span>
          <span className="text-[9px] text-[#777777] font-bold uppercase tracking-wider mt-1">{label}</span>
        </div>
      </div>
    </div>
  );
}

interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
}

export function BarChart({ data, height = 180 }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="space-y-4 w-full p-6 rounded-2xl bg-white/70 border border-[#1F3A5F]/5 shadow-sm">
      <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest text-left">Formulation Spectrum</h4>
      <div className="flex items-end justify-between w-full h-[180px] pt-4 px-2 relative border-b border-[#1F3A5F]/10">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 120; // Max height capped to fit
          return (
            <div key={index} className="flex flex-col items-center group flex-1 max-w-[60px] mx-1 relative">
              {/* Hover Tooltip showing percentage */}
              <span className="absolute top-[-30px] opacity-0 group-hover:opacity-100 bg-[#1F3A5F] text-[9px] font-bold text-white px-2 py-0.5 rounded-md pointer-events-none transition-all z-20 shadow-sm">
                {item.value} ingredients
              </span>
              
              {/* Dynamic Bar with gradient */}
              <div 
                className="w-full rounded-t-lg transition-all duration-1000 ease-out bg-gradient-to-t from-[#1F6F5F] via-[#1F6F5F] to-[#C8A96A] shadow-sm group-hover:shadow-md"
                style={{ height: `${Math.max(12, barHeight)}px` }}
              ></div>

              {/* Bottom label */}
              <span className="text-[10px] text-[#555555] font-semibold mt-2 truncate w-full text-center group-hover:text-[#1F6F5F] transition-colors">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ContributionGrid() {
  // Mock arrays simulating Routine tracking consistency calendar
  const cols = 28; // Weeks
  const rows = 7;  // Days of week
  
  const intensityLevels = [
    'bg-slate-100 border-[0.5px] border-[#1F3A5F]/5', // Empty
    'bg-[#1F6F5F]/10 border-[0.5px] border-[#1F6F5F]/20', // Very light
    'bg-[#1F6F5F]/30 border-[0.5px] border-[#1F6F5F]/30', // Light
    'bg-[#1F6F5F]/60 border-[0.5px] border-[#1F6F5F]/40', // Medium
    'bg-[#1F6F5F] border-[0.5px] border-[#1F6F5F]/50'     // High
  ];

  // Dynamically compile contribution map
  const gridCells = [];
  for (let c = 0; c < cols; c++) {
    const colCells = [];
    for (let r = 0; r < rows; r++) {
      // Formulate a pseudo-random heatmap, favoring clustering
      const baseChance = Math.sin(c / 2) + Math.cos(r / 2) + 1.2;
      const intensity = Math.max(0, Math.min(4, Math.floor(Math.random() * baseChance * 1.8)));
      colCells.push(intensity);
    }
    gridCells.push(colCells);
  }

  return (
    <div className="space-y-4 w-full p-6 rounded-2xl bg-white/70 border border-[#1F3A5F]/5 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between border-b border-[#1F3A5F]/5 pb-3">
        <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest text-left">Dermal Consistency Tracker</h4>
        <div className="flex items-center space-x-2 text-[10px] text-[#777777] font-semibold">
          <span>Missed</span>
          <div className="h-2.5 w-2.5 rounded bg-slate-100 border border-[#1F3A5F]/5"></div>
          <div className="h-2.5 w-2.5 rounded bg-[#1F6F5F]/10 border border-[#1F6F5F]/20"></div>
          <div className="h-2.5 w-2.5 rounded bg-[#1F6F5F]/30 border border-[#1F6F5F]/30"></div>
          <div className="h-2.5 w-2.5 rounded bg-[#1F6F5F]/60 border border-[#1F6F5F]/40"></div>
          <div className="h-2.5 w-2.5 rounded bg-[#1F6F5F] border border-[#1F6F5F]/50"></div>
          <span>Consistent</span>
        </div>
      </div>
      
      <div className="flex space-x-[3px] py-2 w-fit mx-auto select-none">
        {gridCells.map((week, cIndex) => (
          <div key={cIndex} className="flex flex-col space-y-[3px]">
            {week.map((level, rIndex) => (
              <div 
                key={rIndex}
                className={`h-2.5 w-2.5 rounded-sm transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer ${intensityLevels[level]}`}
                title={`Routine consistency: Level ${level}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
