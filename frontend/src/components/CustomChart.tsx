import React, { useState, useEffect } from 'react';

interface DoughnutDialProps {
  percentage: number;
  label: string;
  color?: string;
  size?: number;
}

export function DoughnutDial({ percentage, label, color = '#1F6F5F', size = 80 }: DoughnutDialProps) {
  const radius = 38;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  
  // State for progress animation
  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    const t = setTimeout(() => {
      const offsetValue = circumference - (percentage / 100) * circumference;
      setAnimatedOffset(offsetValue);
    }, 150);
    return () => clearTimeout(t);
  }, [percentage, circumference]);

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Background track circle */}
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="transparent" 
            stroke="rgba(31, 58, 95, 0.05)" 
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
            strokeDashoffset={animatedOffset} 
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 2px ${color}33)`
            }}
          />
        </svg>
        {/* Metric score inside */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-black text-[#1F3A5F]">{percentage}%</span>
        </div>
      </div>
      {/* Label placed outside circle to prevent text clipping */}
      <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest text-center truncate max-w-[100px] block">
        {label}
      </span>
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
    <div className="space-y-4 w-full p-6 rounded-2xl bg-white border border-[#1F3A5F]/5 shadow-sm text-left">
      <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest">Repositories Per Language</h4>
      <div className="flex items-end justify-between w-full h-[180px] pt-4 px-2 relative border-b border-[#1F3A5F]/10">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 120; // Max height capped to fit
          return (
            <div key={index} className="flex flex-col items-center group flex-1 max-w-[60px] mx-1 relative">
              {/* Hover Tooltip showing count */}
              <span className="absolute top-[-30px] opacity-0 group-hover:opacity-100 bg-[#1F3A5F] text-[9px] font-bold text-white px-2 py-0.5 rounded-md pointer-events-none transition-all z-20 shadow-sm">
                {item.value} Repos
              </span>
              
              {/* Dynamic Bar with gradient */}
              <div 
                className="w-full rounded-t-lg transition-all duration-1000 ease-out bg-gradient-to-t from-[#1F6F5F] via-[#1F6F5F] to-[#C8A96A] shadow-sm group-hover:shadow-md"
                style={{ height: `${Math.max(12, barHeight)}px` }}
              ></div>

              {/* Bottom label */}
              <span className="text-[10px] text-slate-500 font-semibold mt-2 truncate w-full text-center group-hover:text-[#1F6F5F] transition-colors">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ContributionGrid({ username = '', repositories = [] }: { username?: string; repositories?: any[] }) {
  // Mock arrays simulating GitHub style contribution board grid
  const cols = 24; // Weeks
  const rows = 7;  // Days of week
  
  const intensityLevels = [
    'bg-slate-100 border-[0.5px] border-[#1F3A5F]/5', // Empty
    'bg-[#1F6F5F]/10 border-[0.5px] border-[#1F6F5F]/20', // Very light
    'bg-[#1F6F5F]/30 border-[0.5px] border-[#1F6F5F]/30', // Light
    'bg-[#1F6F5F]/60 border-[0.5px] border-[#1F6F5F]/40', // Medium
    'bg-[#1F6F5F] border-[0.5px] border-[#1F6F5F]/50'     // High
  ];

  // Simple deterministic hash based on username to prevent random redraws on state updates
  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const seed = getHash(username || 'saurav');

  // Compile deterministic base grid
  const gridCells: number[][] = [];
  for (let c = 0; c < cols; c++) {
    const colCells: number[] = [];
    for (let r = 0; r < rows; r++) {
      const val = Math.abs(Math.sin(seed + c * 43 + r * 79));
      let intensity = 0;
      if (val > 0.88) intensity = 3;
      else if (val > 0.72) intensity = 2;
      else if (val > 0.55) intensity = 1;
      colCells.push(intensity);
    }
    gridCells.push(colCells);
  }

  // Inject real repository update events to light up cells
  if (Array.isArray(repositories) && repositories.length > 0) {
    repositories.forEach((repo: any) => {
      const updateDate = repo.updatedAt || repo.pushedAt;
      if (updateDate) {
        const date = new Date(updateDate);
        if (!isNaN(date.getTime())) {
          const row = date.getDay(); // 0-6
          const col = (date.getMonth() * 2 + Math.floor(date.getDate() / 15)) % cols;
          if (gridCells[col]) {
            gridCells[col][row] = 4; // High intensity for real commit
          }
        }
      }
    });
  }

  return (
    <div className="space-y-4 w-full p-6 rounded-2xl bg-white border border-[#1F3A5F]/5 shadow-sm overflow-x-auto text-left">
      <div className="flex items-center justify-between border-b border-[#1F3A5F]/5 pb-3">
        <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest">365 Day Contribution Heatmap</h4>
        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-semibold">
          <span>Less</span>
          <div className="h-2.5 w-2.5 rounded bg-slate-100 border border-[#1F3A5F]/5"></div>
          <div className="h-2.5 w-2.5 rounded bg-[#1F6F5F]/10 border border-[#1F6F5F]/20"></div>
          <div className="h-2.5 w-2.5 rounded bg-[#1F6F5F]/30 border border-[#1F6F5F]/30"></div>
          <div className="h-2.5 w-2.5 rounded bg-[#1F6F5F]/60 border border-[#1F6F5F]/40"></div>
          <div className="h-2.5 w-2.5 rounded bg-[#1F6F5F] border border-[#1F6F5F]/50"></div>
          <span>More</span>
        </div>
      </div>
      
      <div className="flex space-x-[3px] py-2 w-fit mx-auto select-none">
        {gridCells.map((week, cIndex) => (
          <div key={cIndex} className="flex flex-col space-y-[3px]">
            {week.map((level, rIndex) => (
              <div 
                key={rIndex}
                className={`h-2.5 w-2.5 rounded-sm transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer ${intensityLevels[level]}`}
                title={`Contributions: Level ${level}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Language Treemap Visualizer
interface LanguageTreemapProps {
  data: { label: string; value: number }[];
}

export function LanguageTreemap({ data }: LanguageTreemapProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const sorted = [...data].sort((a, b) => b.value - a.value);

  const colors = [
    'bg-[#1F6F5F] text-white',
    'bg-[#1F3A5F] text-white',
    'bg-[#C8A96A] text-white',
    'bg-[#2B2B2B] text-white',
    'bg-[#E5E5E0] text-[#2B2B2B]'
  ];

  return (
    <div className="space-y-4 w-full p-6 rounded-2xl bg-white border border-[#1F3A5F]/5 shadow-sm text-left">
      <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest">Language Treemap</h4>
      <div className="w-full h-40 flex rounded-xl overflow-hidden shadow-inner border border-slate-100">
        {sorted.map((item, index) => {
          const pct = total > 0 ? (item.value / total) * 100 : 0;
          if (pct < 4) return null; // Hide tiny blocks
          return (
            <div 
              key={index} 
              style={{ width: `${pct}%` }}
              className={`h-full flex flex-col justify-between p-3 border-r border-[#FAFAF8] last:border-0 transition-all hover:opacity-90 cursor-pointer ${
                colors[index % colors.length]
              }`}
            >
              <span className="font-extrabold text-[10px] uppercase truncate">{item.label}</span>
              <span className="text-xs font-black">{Math.round(pct)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Commit Time Distribution Chart
interface CommitTimeChartProps {
  morning: number;
  afternoon: number;
  night: number;
}

export function CommitTimeChart({ morning, afternoon, night }: CommitTimeChartProps) {
  const total = morning + afternoon + night;
  const mPct = total > 0 ? Math.round((morning / total) * 100) : 33;
  const aPct = total > 0 ? Math.round((afternoon / total) * 100) : 33;
  const nPct = total > 0 ? 100 - mPct - aPct : 34;

  return (
    <div className="space-y-4 w-full p-6 rounded-2xl bg-white border border-[#1F3A5F]/5 shadow-sm text-left">
      <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest">Commit Time Distribution</h4>
      
      <div className="space-y-4">
        {/* Horizontal stacked bar */}
        <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-inner border border-slate-100">
          <div style={{ width: `${mPct}%` }} className="h-full bg-[#C8A96A] transition-all flex items-center justify-center text-[10px] font-bold text-white" title="Morning">
            {mPct}%
          </div>
          <div style={{ width: `${aPct}%` }} className="h-full bg-[#1F6F5F] transition-all flex items-center justify-center text-[10px] font-bold text-white" title="Afternoon">
            {aPct}%
          </div>
          <div style={{ width: `${nPct}%` }} className="h-full bg-[#1F3A5F] transition-all flex items-center justify-center text-[10px] font-bold text-white" title="Night">
            {nPct}%
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-bold text-[#2B2B2B]">
          <div className="flex items-center space-x-1.5">
            <div className="h-3 w-3 rounded bg-[#C8A96A]"></div>
            <span>Morning (6am-12pm)</span>
          </div>
          <div className="flex items-center space-x-1.5 border-l border-slate-100 pl-2">
            <div className="h-3 w-3 rounded bg-[#1F6F5F]"></div>
            <span>Afternoon (12pm-6pm)</span>
          </div>
          <div className="flex items-center space-x-1.5 border-l border-slate-100 pl-2">
            <div className="h-3 w-3 rounded bg-[#1F3A5F]"></div>
            <span>Night (6pm-6am)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
