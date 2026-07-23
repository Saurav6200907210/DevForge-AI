import React, { useState, useEffect, useMemo, useRef } from 'react';

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

// High-Voltage Plasma Electric Neon Contribution Line Graph
interface ElectricContributionGraphProps {
  calendar?: ContributionCalendar | null;
  username?: string;
  repositories?: any[];
}

export function ElectricContributionGraph({ calendar, username = 'developer', repositories = [] }: ElectricContributionGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; dateLabel: string; dayNum: string; val: number } | null>(null);

  // Process 30-day daily contribution data
  const processedData = useMemo(() => {
    if (calendar && Array.isArray(calendar.weeks) && calendar.weeks.length > 0) {
      const flatDays = calendar.weeks.flatMap(w => w.contributionDays || []);
      if (flatDays.length > 0) {
        const last30 = flatDays.slice(-30);
        return last30.map(day => {
          const d = day.date ? new Date(day.date + 'T00:00:00Z') : new Date();
          const dayNum = !isNaN(d.getTime()) ? d.getUTCDate().toString() : '1';
          const dateLabel = !isNaN(d.getTime())
            ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : day.date;
          return {
            val: day.contributionCount || 0,
            dayNum,
            dateLabel
          };
        });
      }
    }

    const fallbackDays = [
      23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
    ];
    const fallbackVals = [
      7, 10, 0, 14, 5, 6, 14, 11, 7, 6, 7, 2, 8, 16, 12, 7, 18, 12, 8, 9, 4, 14, 14, 4, 3, 0, 10, 0, 15, 26, 23
    ];

    return fallbackDays.map((dayNum, i) => ({
      val: fallbackVals[i],
      dayNum: dayNum.toString(),
      dateLabel: `Day ${dayNum}`
    }));
  }, [calendar]);

  const rawMax = Math.max(...processedData.map(d => d.val), 30);
  const maxValue = Math.ceil(rawMax / 5) * 5;

  const width = 850;
  const height = 260;
  const paddingLeft = 55;
  const paddingRight = 25;
  const paddingTop = 40;
  const paddingBottom = 45;

  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  const points = useMemo(() => {
    return processedData.map((item, idx) => {
      const x = paddingLeft + (idx / (processedData.length - 1)) * innerWidth;
      const y = paddingTop + innerHeight - (item.val / maxValue) * innerHeight;
      return { x, y, val: item.val, dayNum: item.dayNum, dateLabel: item.dateLabel };
    });
  }, [processedData, maxValue, innerWidth, innerHeight, paddingLeft, paddingTop]);

  const smoothPath = useMemo(() => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const lastP = points[points.length - 1];
    const firstP = points[0];
    const baselineY = paddingTop + innerHeight;
    return `${smoothPath} L ${lastP.x} ${baselineY} L ${firstP.x} ${baselineY} Z`;
  }, [smoothPath, points, innerHeight, paddingTop]);

  const lineSparksRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    color: string; size: number; alpha: number; life: number; maxLife: number;
  }>>([]);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sparkColors = ['#00E5FF', '#3B82F6', '#A855F7', '#EC4899', '#F97316', '#EAB308', '#FFFFFF'];

    const renderSparks = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scaleX = rect.width / width;
      const scaleY = rect.height / height;

      if (Math.random() < 0.65 && points.length > 1) {
        const segIdx = Math.floor(Math.random() * (points.length - 1));
        const pA = points[segIdx];
        const pB = points[segIdx + 1];
        const t = Math.random();

        const lineX = (pA.x + (pB.x - pA.x) * t) * scaleX;
        const lineY = (pA.y + (pB.y - pA.y) * t) * scaleY;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.8;

        lineSparksRef.current.push({
          x: lineX,
          y: lineY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          size: Math.random() * 2.5 + 1.2,
          alpha: 1,
          life: 0,
          maxLife: Math.floor(Math.random() * 10) + 6
        });
      }

      for (let i = lineSparksRef.current.length - 1; i >= 0; i--) {
        const s = lineSparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        s.alpha = Math.max(0, 1 - s.life / s.maxLife);

        if (s.life >= s.maxLife) {
          lineSparksRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.alpha, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(renderSparks);
    };

    animId = requestAnimationFrame(renderSparks);
    return () => cancelAnimationFrame(animId);
  }, [points]);

  // Clean Y-axis steps (e.g. 0, 5, 10, 15, 20, 25, 30)
  const ySteps = useMemo(() => {
    const count = 6;
    const stepVal = maxValue / count;
    const arr = [];
    for (let i = 0; i <= count; i++) {
      const val = Math.round(maxValue - i * stepVal);
      const y = paddingTop + (i / count) * innerHeight;
      arr.push({ label: `${val}`, y });
    }
    return arr;
  }, [maxValue, paddingTop, innerHeight]);

  const cleanName = username.replace(/-/g, ' ');

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#090D16] border border-[#1F3A5F]/20 rounded-2xl p-5 shadow-2xl relative overflow-hidden select-none text-left font-sans"
    >
      {/* Header Title */}
      <div className="flex items-center justify-center border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]"></div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-sans">
            {cleanName}'s Contribution Graph
          </h4>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06)_0%,transparent_75%)]"></div>

      <div className="relative w-full aspect-[850/260]">
        <svg viewBox="0 0 850 260" className="w-full h-full overflow-visible font-sans">
          <defs>
            <linearGradient id="plasmaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="14%" stopColor="#3B82F6" />
              <stop offset="28%" stopColor="#A855F7" />
              <stop offset="42%" stopColor="#EC4899" />
              <stop offset="57%" stopColor="#EF4444" />
              <stop offset="71%" stopColor="#F97316" />
              <stop offset="85%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            <linearGradient id="plasmaAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#090D16" stopOpacity="0" />
            </linearGradient>

            <filter id="highVoltageElectricFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" result="noise">
                <animate attributeName="seed" values="1;7;19;33;42;12;3;1" dur="0.35s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feGaussianBlur in="displaced" stdDeviation="2.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="displaced" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Y-Axis Label: "Contributions" */}
          <text
            x={-((paddingTop + innerHeight) / 2)}
            y={20}
            transform="rotate(-90)"
            fill="rgba(255, 255, 255, 0.65)"
            fontSize="10"
            fontWeight="700"
            fontFamily="Inter, system-ui, sans-serif"
            textAnchor="middle"
          >
            Contributions
          </text>

          {/* X-Axis Label: "Days" */}
          <text
            x={paddingLeft + innerWidth / 2}
            y={height - 4}
            fill="rgba(255, 255, 255, 0.65)"
            fontSize="10"
            fontWeight="700"
            fontFamily="Inter, system-ui, sans-serif"
            textAnchor="middle"
          >
            Days
          </text>

          {/* Thin, Dashed Horizontal Grid Lines with Y-Axis Values */}
          {ySteps.map((g, i) => (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={g.y}
                x2={width - paddingRight}
                y2={g.y}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 12}
                y={g.y + 3}
                fill="rgba(255, 255, 255, 0.45)"
                fontSize="9.5"
                fontWeight="600"
                fontFamily="Inter, system-ui, sans-serif"
                textAnchor="end"
              >
                {g.label}
              </text>
            </g>
          ))}

          {/* X-Axis Baseline */}
          <line
            x1={paddingLeft}
            y1={height - paddingBottom}
            x2={width - paddingRight}
            y2={height - paddingBottom}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />

          {/* X-Axis Days Numbers (23, 24, 25, 26...) & Tick Marks */}
          {points.map((p, i) => (
            <g key={i}>
              <line
                x1={p.x}
                y1={height - paddingBottom}
                x2={p.x}
                y2={height - paddingBottom + 4}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1"
              />
              <text
                x={p.x}
                y={height - paddingBottom + 16}
                fill="rgba(255, 255, 255, 0.55)"
                fontSize="9"
                fontWeight="600"
                fontFamily="Inter, system-ui, sans-serif"
                textAnchor="middle"
              >
                {p.dayNum}
              </text>
            </g>
          ))}

          <path d={areaPath} fill="url(#plasmaAreaGradient)" pointerEvents="none" />

          <path
            d={smoothPath}
            fill="none"
            stroke="url(#plasmaGradient)"
            strokeWidth="12"
            opacity="0.35"
            style={{ filter: 'blur(10px)' }}
            pointerEvents="none"
          />

          <path
            d={smoothPath}
            fill="none"
            stroke="url(#plasmaGradient)"
            strokeWidth="3.5"
            filter="url(#highVoltageElectricFilter)"
            opacity="0.9"
            pointerEvents="none"
          />

          <path
            d={smoothPath}
            fill="none"
            stroke="url(#plasmaGradient)"
            strokeWidth="2.5"
            strokeDasharray="14 8"
            style={{
              animation: 'electricDashFlow 1.2s linear infinite'
            }}
            pointerEvents="none"
          />

          <path
            d={smoothPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            opacity="0.95"
            style={{ filter: 'drop-shadow(0 0 3px #00E5FF)' }}
            pointerEvents="none"
          />

          {points.map((p, i) => {
            const isPeak = p.val === Math.max(...processedData.map(d => d.val));
            const nodeRadius = isPeak ? 6 : 4;
            const haloRadius = isPeak ? 14 : 8;

            return (
              <g
                key={i}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={haloRadius}
                  fill="url(#plasmaGradient)"
                  opacity={isPeak ? 0.45 : 0.25}
                  className="animate-pulse"
                />

                <circle
                  cx={p.x}
                  cy={p.y}
                  r={nodeRadius + 2}
                  fill="#090D16"
                  stroke="url(#plasmaGradient)"
                  strokeWidth="2"
                  style={{
                    filter: `drop-shadow(0 0 ${isPeak ? 12 : 6}px #00E5FF)`
                  }}
                />

                <circle
                  cx={p.x}
                  cy={p.y}
                  r={nodeRadius - 1.5}
                  fill="#FFFFFF"
                />
              </g>
            );
          })}
        </svg>

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-20"
        />

        {/* Analytics Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-30 pointer-events-none bg-[#0D1117]/95 border border-slate-700/80 shadow-2xl backdrop-blur-md rounded-xl px-3.5 py-2.5 text-left -translate-x-1/2 -translate-y-full mb-3 transition-all duration-150"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`
            }}
          >
            <div className="text-slate-300 text-[11px] font-semibold flex items-center space-x-1.5 mb-1 font-sans">
              <span>📅</span>
              <span>{hoveredPoint.dateLabel}</span>
            </div>
            <div className="text-[#00E5FF] text-[12px] font-extrabold flex items-center space-x-1.5 font-sans">
              <span>🔥</span>
              <span>{hoveredPoint.val} Contributions</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes electricDashFlow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -44;
          }
        }
      `}</style>
    </div>
  );
}
