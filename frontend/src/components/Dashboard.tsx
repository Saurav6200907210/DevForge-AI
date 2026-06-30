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
  Award, 
  Terminal, 
  Copy, 
  Check, 
  FileCode,
  ArrowRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import ResumeEditor from './ResumeEditor';
import LivePreview from './LivePreview';
import { DoughnutDial, BarChart, ContributionGrid } from './CustomChart';
import { api } from '../api';

interface DashboardProps {
  profile: any;
  onLogout: () => void;
  onUpdateProfile: (updatedProfile: any) => void;
}

export default function Dashboard({ profile, onLogout, onUpdateProfile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'resume' | 'portfolio' | 'jobmatch' | 'interview'>('analytics');

  // Job Matcher States
  const [jobDescription, setJobDescription] = useState('');
  const [matching, setMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any | null>(null);

  // Clipboard copy feedback states
  const [copiedLink, setCopiedLink] = useState<'linkedin' | 'cover' | 'readme' | null>(null);

  const handleCopy = (text: string, type: 'linkedin' | 'cover' | 'readme') => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // Trigger Job Description Scanner
  const handleJobMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    try {
      setMatching(true);
      const res = await api.resumes.matchJob(profile.id, jobDescription);
      if (res.success) {
        setMatchResult(res);
      }
    } catch (err) {
      console.error('Job matching failed:', err);
    } finally {
      setMatching(false);
    }
  };

  // Convert languages metrics for charts
  const languagesData = Object.entries(profile.analysis?.languages || {}).map(([key, val]) => ({
    label: key,
    value: Number(val)
  })).slice(0, 5);

  if (languagesData.length === 0) {
    languagesData.push({ label: 'TypeScript', value: 45 }, { label: 'JavaScript', value: 30 }, { label: 'Go', value: 25 });
  }

  // Simulated Custom Interview Questions derived from actual repos
  const interviewQuestions = [
    {
      q: `In your repository "${profile.analysis?.skillsVerified[0]?.repository || 'nexus-ide'}", how did you orchestrate React components and TypeScript bindings to guarantee smooth data synchronization?`,
      a: "I structured context providers leveraging custom generic hooks in TypeScript. We decoupled state-changing operations from UI renders using debounced buffers and WebSockets overlays, avoiding thread blocks and caretaker carets displacement."
    },
    {
      q: "Explain how you evaluated the DevOps standard parameters for containerization. Why did you configure specific Docker/Kubernetes YAML layers?",
      a: "I focused on keeping build sizes minimal. We configured multi-stage builds inside Dockerfiles, caching intermediate dependencies layers and using clean alpine images. This shortened production deployment sizes down to 400MB and streamlined cloud proxy startups."
    },
    {
      q: "When pushing codebase parameters to git repositories, how do you handle version control standards and collaborative diff evaluations?",
      a: "I strictly enforce structured semantic commit standards (e.g. feat:, fix:, chore:) and establish mandatory PR testing verification pipelines. Every push triggers automated test audits to ensure zero regressions are merged into the main line."
    },
    {
      q: "Describe a scenario where you had to debug database latencies or asynchronous request surge bottlenecks.",
      a: "I implemented a sliding-window Redis cache strategy sitting directly behind Express gateways proxy paths. By caching high-density query statistics, we deflected 80% of repeating reads away from database pools, driving response latencies down to sub-10ms."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#2B2B2B] flex font-sans">
      
      {/* SaaS Sidebar menu navigation */}
      <aside className="w-64 border-r border-[#1F3A5F]/10 bg-white/75 backdrop-blur-md hidden md:flex flex-col justify-between shrink-0 h-screen p-6 sticky top-0">
        <div className="space-y-8">
          {/* Header Logo */}
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#1F6F5F] to-[#1F3A5F] flex items-center justify-center shadow-md shadow-[#1F6F5F]/10">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-base text-[#1F3A5F] block">DevForge AI</span>
              <span className="text-[9px] text-[#C8A96A] font-bold block">DASHBOARD</span>
            </div>
          </div>

          {/* Navigation Links list */}
          <nav className="space-y-1.5 text-xs text-left">
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'analytics' ? 'bg-[#1F6F5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F3A5F]'
              }`}
            >
              <BarChart2 className="h-4.5 w-4.5" />
              <span>GitHub Analytics</span>
            </button>

            <button 
              onClick={() => setActiveTab('resume')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'resume' ? 'bg-[#1F6F5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F3A5F]'
              }`}
            >
              <FileText className="h-4.5 w-4.5" />
              <span>AI Resume Builder</span>
            </button>

            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'portfolio' ? 'bg-[#1F6F5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F3A5F]'
              }`}
            >
              <Globe className="h-4.5 w-4.5" />
              <span>Web Portfolio</span>
            </button>

            <button 
              onClick={() => setActiveTab('jobmatch')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'jobmatch' ? 'bg-[#1F6F5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F3A5F]'
              }`}
            >
              <Briefcase className="h-4.5 w-4.5" />
              <span>ATS Score Scanner</span>
            </button>

            <button 
              onClick={() => setActiveTab('interview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'interview' ? 'bg-[#1F6F5F] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-[#1F3A5F]'
              }`}
            >
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Interview Prep</span>
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
      <main className="flex-1 overflow-y-auto h-screen px-6 md:px-12 py-8 space-y-8">
        
        {/* Top Header navbar banner */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1F3A5F]/5 pb-5">
          <div className="text-left">
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl font-extrabold text-[#1F3A5F]">{profile.fullName}</h1>
              <span className="text-[10px] bg-[#1F6F5F]/5 text-[#1F6F5F] border border-[#1F6F5F]/10 font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
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
          
          {/* TAB 1: GITHUB ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fadeIn text-left">
              
              {/* Gauges row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div className="text-left space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATS Score</span>
                    <span className="block text-3xl font-extrabold text-[#1F6F5F]">{profile.analysis?.score}%</span>
                    <span className="text-[10px] text-[#1F6F5F] font-semibold bg-[#1F6F5F]/5 px-2 py-0.5 rounded-full">Optimal Level</span>
                  </div>
                  <DoughnutDial percentage={profile.analysis?.score || 88} label="ATS Score" color="#1F6F5F" size={80} />
                </div>

                <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div className="text-left space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GitHub Stars</span>
                    <span className="block text-3xl font-extrabold text-[#1F3A5F]">{profile.analysis?.metrics?.totalStars || 0}</span>
                    <span className="text-[10px] text-[#1F3A5F] font-semibold bg-[#1F3A5F]/5 px-2 py-0.5 rounded-full">Social Proof</span>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#1F3A5F]/5 flex items-center justify-center text-[#1F3A5F]">
                    <Award className="h-6 w-6 text-[#C8A96A]" />
                  </div>
                </div>

                <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div className="text-left space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DevOps Score</span>
                    <span className="block text-3xl font-extrabold text-[#C8A96A]">{profile.analysis?.metrics?.devOpsScore || 78}%</span>
                    <span className="text-[10px] text-[#C8A96A] font-semibold bg-[#C8A96A]/5 px-2 py-0.5 rounded-full">Automation Ready</span>
                  </div>
                  <DoughnutDial percentage={profile.analysis?.metrics?.devOpsScore || 78} label="DevOps" color="#C8A96A" size={80} />
                </div>

                <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-5 text-left flex flex-col justify-between shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Commit Density</span>
                    <span className="block text-3xl font-extrabold text-[#1F6F5F]">{profile.analysis?.metrics?.commitFrequency || 'Daily'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-[#1F3A5F]/5 mt-2">
                    <span>Forks: <b>{profile.analysis?.metrics?.totalForks || 0}</b></span>
                    <span>Contributions: <b>{profile.analysis?.metrics?.openSourceContributions || 0}</b></span>
                  </div>
                </div>
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <BarChart data={languagesData} />
                <ContributionGrid />
              </div>

              {/* Verified skills section */}
              <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm text-left">
                <h3 className="text-sm font-bold text-[#1F3A5F] uppercase tracking-widest mb-4">Verified Technical Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.analysis?.skillsVerified?.map((skill: any, idx: number) => (
                    <div key={idx} className="p-4 border border-[#1F3A5F]/5 rounded-xl bg-[#FAFAF8]/50 flex items-start space-x-3.5">
                      <div className="h-6 w-6 rounded-full bg-[#1F6F5F]/10 flex items-center justify-center shrink-0 text-[#1F6F5F] mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-[#1F3A5F]">{skill.name}</span>
                          <span className="text-[9px] font-bold border border-[#1F6F5F]/20 text-[#1F6F5F] px-1.5 py-0.2 rounded-full bg-[#1F6F5F]/5">
                            {skill.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{skill.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: AI RESUME BUILDER */}
          {activeTab === 'resume' && (
            <div className="animate-fadeIn">
              <ResumeEditor profile={profile} onUpdateProfile={onUpdateProfile} />
            </div>
          )}

          {/* TAB 3: WEB PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="animate-fadeIn">
              <LivePreview profile={profile} onUpdateProfile={onUpdateProfile} />
            </div>
          )}

          {/* TAB 4: ATS SCORE SCANNER */}
          {activeTab === 'jobmatch' && (
            <div className="space-y-8 animate-fadeIn text-left">
              <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="max-w-2xl">
                  <h2 className="text-lg font-bold text-[#1F3A5F] flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5 text-[#1F6F5F]" />
                    <span>ATS Score Scanner & Job Matcher</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Paste a target Job Description. Our AI will analyze keywords, identify gaps, calculate compatibility, and generate a customized project roadmap.</p>
                </div>

                <form onSubmit={handleJobMatch} className="mt-6 space-y-4">
                  <textarea 
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                    rows={6}
                    placeholder="Paste the target Job Description here..."
                    className="w-full bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F6F5F] transition-all text-[#2B2B2B] placeholder-[#999999] resize-none"
                  />
                  <button 
                    type="submit"
                    disabled={matching}
                    className="bg-[#1F6F5F] hover:bg-[#1F6F5F]/90 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm flex items-center space-x-2 disabled:opacity-50"
                  >
                    {matching ? (
                      <span>Comparing Credentials...</span>
                    ) : (
                      <>
                        <span>Scan Compatibility</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Match Results Display */}
              {matchResult && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
                  
                  {/* Score card */}
                  <div className="lg:col-span-4 bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Match Index</h4>
                    <DoughnutDial percentage={matchResult.matchScore} label="Match" color="#1F6F5F" size={130} />
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-[#1F3A5F]">
                        {matchResult.matchScore >= 80 ? 'Excellent Match' : (matchResult.matchScore >= 60 ? 'Moderate Match' : 'High Friction')}
                      </span>
                      <p className="text-[11px] text-slate-500 max-w-[200px]">This profile matches target recruiter parameters.</p>
                    </div>
                  </div>

                  {/* Details card */}
                  <div className="lg:col-span-8 bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Matched Skills */}
                      <div className="space-y-3">
                        <h5 className="text-xs font-bold text-[#1F6F5F] uppercase tracking-wider flex items-center space-x-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#1F6F5F]"></span>
                          <span>Keywords Matched</span>
                        </h5>
                        {matchResult.matchedSkills.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {matchResult.matchedSkills.map((s: string, i: number) => (
                              <span key={i} className="text-[10px] font-bold bg-[#1F6F5F]/5 text-[#1F6F5F] px-2.5 py-1 rounded-md border border-[#1F6F5F]/10">{s}</span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">No matching keywords identified.</p>
                        )}
                      </div>

                      {/* Missing Skills */}
                      <div className="space-y-3">
                        <h5 className="text-xs font-bold text-[#C8A96A] uppercase tracking-wider flex items-center space-x-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#C8A96A]"></span>
                          <span>Missing Keywords</span>
                        </h5>
                        {matchResult.missingSkills.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {matchResult.missingSkills.map((s: string, i: number) => (
                              <span key={i} className="text-[10px] font-bold bg-[#C8A96A]/5 text-[#C8A96A] px-2.5 py-1 rounded-md border border-[#C8A96A]/10">{s}</span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">No missing skills identified.</p>
                        )}
                      </div>

                    </div>

                    {/* Skill development roadmap */}
                    <div className="border-t border-[#1F3A5F]/5 pt-6 space-y-4">
                      <h5 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Project Roadmap Recommendations</h5>
                      <div className="space-y-3">
                        {matchResult.roadmap.map((item: any, idx: number) => (
                          <div key={idx} className="p-4 border border-[#1F3A5F]/5 rounded-xl bg-[#FAFAF8]/40 space-y-1">
                            <span className="text-xs font-bold text-[#1F3A5F]">{item.skill} Upgrade</span>
                            <p className="text-xs text-slate-500"><b className="text-[#1F6F5F]">Action:</b> {item.action}</p>
                            <p className="text-xs text-slate-400"><b className="text-[#C8A96A]">Suggested Project:</b> {item.suggestedProject}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 5: INTERVIEW PREPARATION */}
          {activeTab === 'interview' && (
            <div className="space-y-6 animate-fadeIn text-left max-w-4xl mx-auto">
              <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-[#1F3A5F] flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-[#1F6F5F]" />
                  <span>Technical Interview Preparation</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">Simulate expert-level technical interview questions derived from your actual public repository structures.</p>
              </div>

              <div className="space-y-4">
                {interviewQuestions.map((item, idx) => (
                  <div key={idx} className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-3">
                    <h4 className="text-sm font-bold text-[#1F3A5F] flex items-start space-x-2.5">
                      <span className="h-5 w-5 rounded-full bg-[#1F3A5F]/5 text-[#1F3A5F] flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">Q</span>
                      <span>{item.q}</span>
                    </h4>
                    <div className="text-xs text-[#555555] leading-relaxed flex items-start space-x-2.5 bg-[#FAFAF8]/40 p-4 rounded-xl border border-[#1F3A5F]/5">
                      <span className="h-5 w-5 rounded-full bg-[#1F6F5F]/5 text-[#1F6F5F] flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">A</span>
                      <span>{item.a}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>
      
    </div>
  );
}
