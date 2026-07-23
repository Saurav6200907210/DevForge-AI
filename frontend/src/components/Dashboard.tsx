import React, { useState } from 'react';
import { 
  BarChart2, 
  FileText, 
  Globe, 
  Briefcase, 
  HelpCircle, 
  LogOut, 
  Sparkles, 
  Github, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  FileCode,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Users,
  GitBranch,
  Play,
  Settings,
  Calendar,
  Layers,
  MapPin,
  Link as LinkIcon,
  Search,
  BookOpen,
  ChevronDown,
  Pin,
  PinOff
} from 'lucide-react';
import ResumeEditor from './ResumeEditor';
import LivePreview from './LivePreview';
import { 
  DoughnutDial, 
  BarChart, 
  ContributionGrid, 
  LanguageTreemap, 
  CommitTimeChart 
} from './CustomChart';
import { api } from '../api';

// GitHub GraphQL Contribution Calendar Interfaces
export interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface DashboardProps {
  profile: any;
  onLogout: () => void;
  onUpdateProfile: (updatedProfile: any) => void;
}

export default function Dashboard({ profile, onLogout, onUpdateProfile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'repos' | 'explorer' | 'timeline' | 'resume' | 'portfolio'>('overview');

  // Explorer States
  const [searchQuery, setSearchQuery] = useState('');
  const [langFilter, setLangFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name'>('stars');
  const [expandedRepo, setExpandedRepo] = useState<string | null>(null);

  // Load ALL repositories from profile database, fallback to AI projects
  const repositories = profile.repositories || profile.resume?.projects || [];
  
  const rawLanguages = profile.analysis?.languages || {};
  const techStack = profile.analysis?.techStack || [];
  const aiScores = profile.analysis?.aiScores || {};
  const aiRecommendations = profile.analysis?.aiRecommendations || [];

/**
 * GITHUB GRAPHQL CONTRIBUTION CALENDAR ENGINE & STREAK ALGORITHM:
 * 
 * 1. Total Commits:
 *    Read directly from `contributionCalendar.totalContributions`.
 * 
 * 2. Current Streak:
 *    Iterates backwards from today (or yesterday if today has no contributions yet) 
 *    and counts consecutive days where `contributionCount > 0`.
 * 
 * 3. Longest Streak:
 *    Scans the entire `contributionCalendar.weeks[].contributionDays[]` sequentially 
 *    to compute the maximum consecutive days with `contributionCount > 0`.
 * 
 * 4. Peak Productivity:
 *    Aggregates contributions by weekday index (0 = Sunday to 6 = Saturday)
 *    across `contributionCalendar.weeks[].contributionDays[]` and selects the maximum.
 */
const calculateCalendarStats = (calendar: ContributionCalendar | null | undefined) => {
  if (!calendar || !Array.isArray(calendar.weeks) || calendar.weeks.length === 0) {
    return null;
  }

  const flatDays = calendar.weeks.flatMap(w => w.contributionDays || []);
  const totalCommits = calendar.totalContributions || 0;

  // Longest Streak
  let longestStreak = 0;
  let tempStreak = 0;
  flatDays.forEach(day => {
    if (day.contributionCount > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  });

  // Current Streak
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  const dayMap = new Map(flatDays.map(d => [d.date, d.contributionCount]));
  let currentStreak = 0;
  let startDateStr: string | null = null;

  if (dayMap.has(todayStr) && (dayMap.get(todayStr) || 0) > 0) {
    startDateStr = todayStr;
  } else if (dayMap.has(yesterdayStr) && (dayMap.get(yesterdayStr) || 0) > 0) {
    startDateStr = yesterdayStr;
  } else {
    const lastActiveDay = [...flatDays].reverse().find(d => d.contributionCount > 0);
    if (lastActiveDay) startDateStr = lastActiveDay.date;
  }

  if (startDateStr) {
    let curr = new Date(startDateStr + 'T00:00:00Z');
    while (true) {
      const dStr = curr.toISOString().split('T')[0];
      if (dayMap.has(dStr) && (dayMap.get(dStr) || 0) > 0) {
        currentStreak++;
        curr.setUTCDate(curr.getUTCDate() - 1);
      } else {
        break;
      }
    }
  }

  // Peak Productivity
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekdayCounts = [0, 0, 0, 0, 0, 0, 0];
  flatDays.forEach(day => {
    if (typeof day.weekday === 'number' && day.weekday >= 0 && day.weekday <= 6) {
      weekdayCounts[day.weekday] += (day.contributionCount || 0);
    }
  });

  let maxCount = -1;
  let peakWeekdayIndex = 0;
  weekdayCounts.forEach((cnt, idx) => {
    if (cnt > maxCount) {
      maxCount = cnt;
      peakWeekdayIndex = idx;
    }
  });

  return {
    totalCommits,
    currentStreak,
    longestStreak,
    peakProductivity: weekdays[peakWeekdayIndex]
  };
};

const calendarStats = calculateCalendarStats(profile.analysis?.contributionCalendar);
const backendIntelligence = profile.analysis?.commitIntelligence;

const commitsInfo = {
  totalCommits: calendarStats?.totalCommits ?? backendIntelligence?.totalCommits ?? 0,
  currentStreak: calendarStats?.currentStreak ?? backendIntelligence?.currentStreak ?? 0,
  longestStreak: calendarStats?.longestStreak ?? backendIntelligence?.longestStreak ?? 0,
  peakProductivity: calendarStats?.peakProductivity || backendIntelligence?.peakProductivity || 'Wednesday',
  morning: backendIntelligence?.morning ?? 35,
  afternoon: backendIntelligence?.afternoon ?? 45,
  night: backendIntelligence?.night ?? 20
};

  // Dynamic Featured Projects State
  const [featuredRepos, setFeaturedRepos] = useState<string[]>(
    repositories.slice(0, 3).map((r: any) => r.name)
  );

  // Toggle repository featured status
  const toggleFeatured = (repoName: string) => {
    if (featuredRepos.includes(repoName)) {
      setFeaturedRepos(featuredRepos.filter(name => name !== repoName));
    } else {
      setFeaturedRepos([...featuredRepos, repoName]);
    }
  };

  // Convert languages metrics for charts
  const languagesData = Object.entries(rawLanguages).map(([key, val]) => ({
    label: key,
    value: Number(val)
  })).sort((a, b) => b.value - a.value);

  if (languagesData.length === 0) {
    languagesData.push({ label: 'TypeScript', value: 5 }, { label: 'JavaScript', value: 3 }, { label: 'CSS', value: 2 });
  }

  // Filter and Sort Repositories for Explorer
  const filteredRepos = repositories.filter((repo: any) => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (repo.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = langFilter === 'All' || repo.language === langFilter || (repo.bullets?.[0] || '').includes(langFilter) || (repo.description || '').toLowerCase().includes(langFilter.toLowerCase());
    return matchesSearch && matchesLang;
  }).sort((a: any, b: any) => {
    if (sortBy === 'stars') return (b.stars || 0) - (a.stars || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // Default order
  });

  // Unique languages for filter dropdown
  const uniqueLangs = ['All', ...Object.keys(rawLanguages)];

  // Get currently featured repositories
  const featuredList = repositories.filter((r: any) => featuredRepos.includes(r.name));

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#2B2B2B] flex font-sans select-none">
      
      {/* Sidebar navigation */}
      <aside className="w-64 border-r border-[#1F3A5F]/10 bg-white/75 backdrop-blur-md hidden md:flex flex-col justify-between shrink-0 h-screen p-6 sticky top-0">
        <div className="space-y-6">
          {/* Header Logo */}
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#1F6F5F] to-[#1F3A5F] flex items-center justify-center shadow-md shadow-[#1F6F5F]/10">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-base text-[#1F3A5F] block leading-none">DevForge AI</span>
              <span className="text-[9px] text-[#C8A96A] font-bold block mt-1">INTELLIGENCE PLATFORM</span>
            </div>
          </div>

          {/* Navigation Links list */}
          <nav className="space-y-1 text-xs text-left">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'overview' ? 'bg-[#1F3A5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F3A5F]'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Developer Profile</span>
            </button>

            <button 
              onClick={() => setActiveTab('repos')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'repos' ? 'bg-[#1F3A5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F3A5F]'
              }`}
            >
              <BarChart2 className="h-4 w-4" />
              <span>Repository Analytics</span>
            </button>



            <button 
              onClick={() => setActiveTab('explorer')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'explorer' ? 'bg-[#1F3A5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F3A5F]'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Repository Explorer</span>
            </button>

            <button 
              onClick={() => setActiveTab('timeline')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'timeline' ? 'bg-[#1F3A5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F3A5F]'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Milestone Timeline</span>
            </button>

            <div className="h-px bg-slate-100 my-4"></div>

            <button 
              onClick={() => setActiveTab('resume')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'resume' ? 'bg-[#1F6F5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F6F5F]'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>AI Resume Builder</span>
            </button>

            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'portfolio' ? 'bg-[#1F6F5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F6F5F]'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>Web Portfolio</span>
            </button>
          </nav>
        </div>

        {/* User profile footer controls */}
        <div className="border-t border-[#1F3A5F]/5 pt-4 space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <img 
              src={profile.avatarUrl} 
              alt="avatar" 
              className="h-9 w-9 rounded-lg border border-[#1F3A5F]/10 bg-slate-100"
            />
            <div className="truncate">
              <span className="block text-xs font-bold text-[#1F3A5F] truncate">{profile.fullName}</span>
              <span className="block text-[10px] text-slate-400 truncate">{profile.email}</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-2 text-[11px] font-bold text-red-600 hover:text-red-700 transition-colors py-2 px-3 rounded-lg hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content display view */}
      <main className="flex-1 overflow-y-auto h-screen px-6 md:px-12 py-8 space-y-8 text-left">
        
        {/* Top Header navbar banner */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1F3A5F]/5 pb-5">
          <div className="text-left">
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl font-extrabold text-[#1F3A5F]">{profile.fullName}</h1>
              <span className="text-[10px] bg-[#1F6F5F]/5 text-[#1F6F5F] border border-[#1F6F5F]/10 font-bold px-2.5 py-0.8 rounded-full flex items-center space-x-1">
                <Github className="h-3 w-3" />
                <span>@{profile.githubUsername}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{profile.bio}</p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="text-right text-xs hidden sm:block">
              <span className="block text-slate-400">Analysis Completed</span>
              <span className="block font-bold text-[#1F3A5F]">{new Date(profile.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="h-10 w-px bg-[#1F3A5F]/10 hidden sm:block"></div>
            {/* Mobile logout option */}
            <button 
              onClick={onLogout}
              className="md:hidden flex items-center space-x-1 text-xs font-bold text-red-600 border border-red-200 bg-red-50/50 px-3 py-2 rounded-xl"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Tab view contents switcher */}
        <div className="transition-all duration-300">
          
          {/* TAB: DEVELOPER PROFILE (OVERVIEW) */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* SECTION 1: Profile Details & Badges */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Profile Card */}
                <div className="lg:col-span-1 bg-white border border-[#1F3A5F]/5 rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <img 
                      src={profile.avatarUrl} 
                      alt="Avatar" 
                      className="h-24 w-24 rounded-full border-2 border-[#1F6F5F]/20 object-cover bg-slate-100"
                    />
                    <div>
                      <h3 className="text-base font-extrabold text-[#1F3A5F]">{profile.fullName}</h3>
                      <span className="text-xs text-slate-400">@{profile.githubUsername}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      <span className="text-[9px] font-bold bg-[#1F6F5F]/5 text-[#1F6F5F] border border-[#1F6F5F]/15 px-2 py-0.5 rounded-full">
                        {profile.developerLevel}
                      </span>
                      <span className="text-[9px] font-bold bg-[#C8A96A]/5 text-[#C8A96A] border border-[#C8A96A]/15 px-2 py-0.5 rounded-full">
                        Rank: {profile.openSourceRank}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-3 text-xs text-slate-500">
                    {profile.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile.websiteUrl && (
                      <div className="flex items-center space-x-2">
                        <LinkIcon className="h-3.5 w-3.5 text-slate-400" />
                        <a href={profile.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-[#1F6F5F] underline truncate">
                          {profile.websiteUrl}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>Joined: {profile.joinedSince || "March 2021"}</span>
                    </div>
                  </div>

                  {/* Organizations */}
                  {profile.organizations && profile.organizations.length > 0 && (
                    <div className="border-t border-slate-100 pt-4 space-y-2">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Organizations</h5>
                      <div className="flex flex-wrap gap-2">
                        {profile.organizations.map((org: any, i: number) => (
                          <img 
                            key={i} 
                            src={org.avatarUrl} 
                            alt={org.name} 
                            title={org.name}
                            className="h-6 w-6 rounded border border-slate-200"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Dermal Quality Scores (Section 9) */}
                <div className="lg:col-span-2 bg-white border border-[#1F3A5F]/5 rounded-3xl p-6 shadow-sm space-y-6">
                  <h3 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest border-b border-slate-100 pb-3">AI Codebase Quality Audit</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center">
                      <DoughnutDial percentage={aiScores.securityScore || 85} label="Security" color="#1F6F5F" size={80} />
                    </div>
                    <div className="flex flex-col items-center">
                      <DoughnutDial percentage={aiScores.performanceScore || 88} label="Performance" color="#1F6F5F" size={80} />
                    </div>
                    <div className="flex flex-col items-center">
                      <DoughnutDial percentage={aiScores.scalabilityScore || 82} label="Scalability" color="#1F3A5F" size={80} />
                    </div>
                    <div className="flex flex-col items-center">
                      <DoughnutDial percentage={aiScores.maintainabilityScore || 85} label="Maintainability" color="#1F3A5F" size={80} />
                    </div>
                    <div className="flex flex-col items-center">
                      <DoughnutDial percentage={aiScores.testingScore || 72} label="Testing" color="#C8A96A" size={80} />
                    </div>
                    <div className="flex flex-col items-center">
                      <DoughnutDial percentage={aiScores.devOpsScore || 78} label="DevOps" color="#C8A96A" size={80} />
                    </div>
                  </div>
                </div>

              </div>

              {/* COMMIT INTELLIGENCE INTEGRATION */}
              <div className="space-y-6">
                
                {/* Streaks & Totals Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                  <div className="bg-white border border-[#1F3A5F]/5 rounded-2xl p-5 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Commits (All-Time)</span>
                    <span className="block text-3xl font-extrabold text-[#1F3A5F]">{commitsInfo.totalCommits}</span>
                    <span className="text-[10px] text-[#1F6F5F] font-semibold bg-[#1F6F5F]/5 px-2 py-0.5 rounded-full">Scanned from GitHub API</span>
                  </div>

                  <div className="bg-white border border-[#1F3A5F]/5 rounded-2xl p-5 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Streak</span>
                    <span className="block text-3xl font-extrabold text-[#1F6F5F]">{commitsInfo.currentStreak} Days</span>
                    <span className="text-[10px] text-slate-400">Consistent daily pushes</span>
                  </div>

                  <div className="bg-white border border-[#1F3A5F]/5 rounded-2xl p-5 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Longest Streak</span>
                    <span className="block text-3xl font-extrabold text-[#C8A96A]">{commitsInfo.longestStreak} Days</span>
                    <span className="text-[10px] text-slate-400">All-time record</span>
                  </div>

                  <div className="bg-white border border-[#1F3A5F]/5 rounded-2xl p-5 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Peak Productivity</span>
                    <span className="block text-xl font-extrabold text-[#1F3A5F]">{commitsInfo.peakProductivity}</span>
                    <span className="text-[10px] text-slate-400">Most active day of week</span>
                  </div>
                </div>

                {/* Heatmap & Time Chart Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8">
                    <ContributionGrid username={profile.githubUsername} repositories={repositories} />
                  </div>
                  <div className="lg:col-span-4">
                    <CommitTimeChart 
                      morning={commitsInfo.morning} 
                      afternoon={commitsInfo.afternoon} 
                      night={commitsInfo.night} 
                    />
                  </div>
                </div>

              </div>

              {/* SECTION 11: Tech Stack Detection & SECTION 10: AI Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Tech Stack */}
                <div className="lg:col-span-5 bg-white border border-[#1F3A5F]/5 rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest border-b border-slate-100 pb-3">Detected Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech: string, i: number) => (
                      <span key={i} className="text-xs font-bold bg-[#1F3A5F]/5 text-[#1F3A5F] border border-[#1F3A5F]/10 px-3 py-1 rounded-xl">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="lg:col-span-7 bg-white border border-[#1F3A5F]/5 rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest border-b border-slate-100 pb-3">Dermal Upgrade Recommendations</h3>
                  <div className="space-y-3">
                    {aiRecommendations.map((rec: any, i: number) => (
                      <div key={i} className="p-4 border border-[#1F3A5F]/5 rounded-xl bg-[#FAFAF8]/60 flex items-start space-x-3 text-xs">
                        <div className="h-6 w-6 rounded-full bg-[#C8A96A]/10 flex items-center justify-center text-[#C8A96A] shrink-0 mt-0.5 font-extrabold">
                          !
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-[#1F3A5F]">{rec.type}</span>
                            <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.2 rounded font-mono">{rec.repo}</span>
                          </div>
                          <p className="text-slate-500 leading-relaxed">{rec.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: REPOSITORY ANALYTICS */}
          {activeTab === 'repos' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Repository stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BarChart data={languagesData} />
                <LanguageTreemap data={languagesData} />
              </div>

              {/* Dynamic Featured/Top Projects */}
              <div className="space-y-4 text-left">
                <h3 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest border-b border-slate-100 pb-3">Top Featured Projects</h3>
                
                {featuredList.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-3xl text-xs">
                    No repositories pinned to Top. Use the repository list below to pin your favorite repositories!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                    {featuredList.map((repo: any, i: number) => (
                      <div key={i} className="bg-white border border-[#1F3A5F]/5 p-5 rounded-3xl shadow-sm space-y-3 relative group overflow-hidden">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-extrabold text-[#1F3A5F] truncate">{repo.name}</span>
                          <button 
                            onClick={() => toggleFeatured(repo.name)}
                            className="text-red-500 hover:text-red-600 transition-colors p-1"
                            title="Unpin from Top"
                          >
                            <PinOff className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{repo.description}</p>
                        <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-bold pt-2 border-t border-slate-50">
                          <span>★ {repo.stars || 0} Stars</span>
                          {repo.githubUrl && (
                            <a href={repo.githubUrl} target="_blank" rel="noreferrer" className="text-[#1F6F5F] hover:underline flex items-center space-x-0.5">
                              <span>GitHub</span> <ArrowRight className="h-3 w-3" />
                            </a>
                          )}
                          <a 
                            href={repo.homepageUrl || `https://${profile.githubUsername.toLowerCase()}.github.io/${repo.name.toLowerCase()}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[#C8A96A] hover:underline flex items-center space-x-0.5"
                          >
                            <span>Live</span> <Globe className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Manage All Repositories Section */}
              <div className="bg-white border border-[#1F3A5F]/5 rounded-3xl p-6 shadow-sm space-y-4 text-left">
                <h3 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest border-b border-slate-100 pb-3">All Repositories</h3>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {repositories.map((repo: any, idx: number) => {
                    const isPinned = featuredRepos.includes(repo.name);
                    return (
                      <div key={idx} className="flex items-center justify-between p-4 border border-slate-50 rounded-2xl bg-[#FAFAF8]/50 hover:bg-slate-50/50 transition-colors animate-fadeIn">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-[#1F3A5F]">{repo.name}</span>
                          <span className="block text-[10px] text-slate-400 truncate max-w-md">{repo.description}</span>
                        </div>

                        <div className="flex items-center space-x-4 shrink-0">
                          <span className="text-[10px] font-bold text-slate-400">★ {repo.stars || 0}</span>
                          <button
                            onClick={() => toggleFeatured(repo.name)}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                              isPinned 
                                ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100/50' 
                                : 'bg-white border-[#1F3A5F]/10 text-[#1F3A5F] hover:bg-slate-50'
                            }`}
                          >
                            {isPinned ? (
                              <>
                                <PinOff className="h-3.5 w-3.5" />
                                <span>Unpin</span>
                              </>
                            ) : (
                              <>
                                <Pin className="h-3.5 w-3.5" />
                                <span>Pin to Top</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}


          {/* TAB: REPOSITORY EXPLORER */}
          {activeTab === 'explorer' && (
            <div className="space-y-6 animate-fadeIn text-left">
              
              {/* Search and Filters */}
              <div className="bg-white border border-[#1F3A5F]/5 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex rounded-xl border border-[#1F3A5F]/10 overflow-hidden bg-[#FAFAF8] w-full md:w-80">
                  <span className="px-3 py-2.5 text-slate-400 flex items-center">
                    <Search className="h-4 w-4" />
                  </span>
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent px-2 py-2.5 text-xs focus:outline-none text-[#2B2B2B] w-full placeholder-slate-400"
                    placeholder="Search repositories by name..."
                  />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  {/* Language filter */}
                  <select
                    value={langFilter}
                    onChange={(e) => setLangFilter(e.target.value)}
                    className="bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-[#2B2B2B] flex-1 md:flex-initial"
                  >
                    {uniqueLangs.map((lang, idx) => (
                      <option key={idx} value={lang}>{lang}</option>
                    ))}
                  </select>

                  {/* Sort filter */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-[#2B2B2B] flex-1 md:flex-initial"
                  >
                    <option value="stars">Sort by Stars</option>
                    <option value="name">Sort by Name</option>
                  </select>
                </div>
              </div>

              {/* Repositories List */}
              <div className="space-y-4">
                {filteredRepos.map((repo: any, idx: number) => {
                  const isExpanded = expandedRepo === repo.name;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white border border-[#1F3A5F]/5 rounded-3xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                      <button 
                        onClick={() => setExpandedRepo(isExpanded ? null : repo.name)}
                        className="w-full p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-left focus:outline-none gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-extrabold text-[#1F3A5F]">{repo.name}</h4>
                          <p className="text-xs text-slate-400 line-clamp-1">{repo.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4 shrink-0">
                          <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2.5 py-0.5 rounded-full">
                            ★ {repo.stars || 0} Stars
                          </span>
                          <ChevronDown className={`h-4 w-4 text-[#1F6F5F] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-6 border-t border-slate-100 bg-[#FAFAF8]/40 space-y-6 animate-fadeIn">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Stats */}
                            <div className="space-y-3 text-xs">
                              <h5 className="font-bold text-[#1F3A5F] uppercase tracking-wider text-[10px]">Repository Parameters</h5>
                              <div className="space-y-2">
                                <p><b className="text-slate-400">GitHub Link:</b> <a href={repo.githubUrl} target="_blank" rel="noreferrer" className="text-[#1F6F5F] hover:underline break-all">{repo.githubUrl}</a></p>
                                <p><b className="text-slate-400">Live Demo:</b> <a href={repo.homepageUrl || `https://${profile.githubUsername.toLowerCase()}.github.io/${repo.name.toLowerCase()}`} target="_blank" rel="noreferrer" className="text-[#C8A96A] hover:underline break-all">{repo.homepageUrl || `https://${profile.githubUsername.toLowerCase()}.github.io/${repo.name.toLowerCase()}`}</a></p>
                                <p><b className="text-slate-400">Primary Technology:</b> {repo.language || 'TypeScript'}</p>
                              </div>
                            </div>

                            {/* Bullet accomplishments */}
                            <div className="space-y-3">
                              <h5 className="font-bold text-[#1F3A5F] uppercase tracking-wider text-[10px]">AI Achievements Generated</h5>
                              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-500">
                                {repo.bullets?.map((b: string, i: number) => (
                                  <li key={i}>{b}</li>
                                ))}
                              </ul>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB: MILESTONE TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="max-w-2xl mx-auto space-y-12 animate-fadeIn text-left relative py-4">
              
              {/* Vertical timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#1F3A5F]/10"></div>

              {repositories.map((repo: any, idx: number) => (
                <div key={idx} className="relative pl-12 space-y-3">
                  {/* Timeline dot */}
                  <div className="absolute left-[9px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#1F6F5F] border-4 border-white shadow-sm ring-1 ring-[#1F6F5F]/20"></div>
                  
                  <div className="bg-white border border-[#1F3A5F]/5 rounded-3xl p-6 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#1F6F5F] uppercase tracking-wider">Milestone</span>
                      <span className="text-[10px] text-slate-400">Repository Created</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-[#1F3A5F]">{repo.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{repo.description}</p>
                  </div>
                </div>
              ))}

            </div>
          )}

          {/* TAB: AI RESUME BUILDER */}
          {activeTab === 'resume' && (
            <div className="animate-fadeIn">
              <ResumeEditor 
                profile={profile} 
                onUpdateProfile={onUpdateProfile} 
                featuredRepos={featuredRepos}
              />
            </div>
          )}

          {/* TAB: WEB PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="animate-fadeIn">
              <LivePreview profile={profile} onUpdateProfile={onUpdateProfile} />
            </div>
          )}

        </div>

      </main>
      
    </div>
  );
}
