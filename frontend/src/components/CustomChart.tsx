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

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE' | string;
  weekday?: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions?: number;
  weeks: ContributionWeek[];
}

export function ContributionGrid({ username = '', calendar }: { username?: string; calendar?: ContributionCalendar | null }) {
  const weeks = calendar?.weeks || [];

  const getIntensityClass = (level?: string, count?: number): string => {
    if (level === 'FOURTH_QUARTILE' || level === '4') return 'bg-[#0F766E] border-[0.5px] border-[#0F766E]/80';
    if (level === 'THIRD_QUARTILE' || level === '3') return 'bg-[#1FA187] border-[0.5px] border-[#1FA187]/80';
    if (level === 'SECOND_QUARTILE' || level === '2') return 'bg-[#66D9B8] border-[0.5px] border-[#66D9B8]/80';
    if (level === 'FIRST_QUARTILE' || level === '1') return 'bg-[#C7F9E5] border-[0.5px] border-[#66D9B8]/50';

    // Fall back to contributionCount if level is missing/undefined/NONE
    const cnt = typeof count === 'number' ? count : 0;
    if (cnt > 14) return 'bg-[#0F766E] border-[0.5px] border-[#0F766E]/80';
    if (cnt > 7) return 'bg-[#1FA187] border-[0.5px] border-[#1FA187]/80';
    if (cnt > 3) return 'bg-[#66D9B8] border-[0.5px] border-[#66D9B8]/80';
    if (cnt > 0) return 'bg-[#C7F9E5] border-[0.5px] border-[#66D9B8]/50';

    return 'bg-[#F3F4F6] border-[0.5px] border-slate-200/60';
  };

  const formatTooltip = (day: ContributionDay): string => {
    const countText = day.contributionCount === 0 ? 'No contributions' : `${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`;
    const dateFormatted = day.date ? new Date(day.date + 'T00:00:00Z').toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : day.date;
    return `${countText} on ${dateFormatted}`;
  };

  return (
    <div className="space-y-4 w-full p-6 rounded-2xl bg-white border border-[#1F3A5F]/5 shadow-sm overflow-x-auto text-left">
      <div className="flex items-center justify-between border-b border-[#1F3A5F]/5 pb-3">
        <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest">365 Day Contribution Heatmap</h4>
        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-semibold">
          <span>Less</span>
          <div className="h-[11px] w-[11px] rounded-[3px] bg-[#F3F4F6] border border-slate-200/60" title="Level 0: No contributions"></div>
          <div className="h-[11px] w-[11px] rounded-[3px] bg-[#C7F9E5] border border-[#66D9B8]/50" title="Level 1"></div>
          <div className="h-[11px] w-[11px] rounded-[3px] bg-[#66D9B8] border border-[#66D9B8]/80" title="Level 2"></div>
          <div className="h-[11px] w-[11px] rounded-[3px] bg-[#1FA187] border border-[#1FA187]/80" title="Level 3"></div>
          <div className="h-[11px] w-[11px] rounded-[3px] bg-[#0F766E] border border-[#0F766E]/80" title="Level 4"></div>
          <span>More</span>
        </div>
      </div>
      
      {weeks.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl space-y-1">
          <p className="font-bold text-[#1F3A5F]">Contribution Calendar Unavailable</p>
          <p className="text-[11px]">No contribution weeks data returned for @{username || 'user'}. Please check backend logs.</p>
        </div>
      ) : (
        <div className="flex space-x-[3px] py-2 w-fit mx-auto select-none">
          {weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col space-y-[3px]">
              {week.contributionDays.map((day, dIndex) => (
                <div 
                  key={day.date || dIndex}
                  className={`h-[11px] w-[11px] rounded-[3px] transition-all duration-200 ease-in-out hover:scale-[1.15] hover:shadow-md hover:z-10 cursor-pointer ${getIntensityClass(day.contributionLevel, day.contributionCount)}`}
                  title={formatTooltip(day)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      )}
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
