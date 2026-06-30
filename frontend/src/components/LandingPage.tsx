import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Sparkles, 
  Terminal, 
  Award, 
  Zap, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  Loader2,
  FileText,
  Globe,
  Share2,
  Users,
  Database,
  Search,
  BookOpen,
  Code,
  Lock,
  ExternalLink,
  ChevronDown,
  Play,
  User
} from 'lucide-react';

interface LandingPageProps {
  onAnalyze: (payload: {
    githubUsername: string;
    fullName: string;
    email: string;
    phone: string;
    linkedinUrl?: string;
    theme: string;
  }) => Promise<void>;
  loading: boolean;
  error: string;
}

export default function LandingPage({ onAnalyze, loading, error }: LandingPageProps) {
  // Form Inputs
  const [githubUsername, setGithubUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('emerald');

  // Interactive States
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroCounter, setHeroCounter] = useState(142380);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  // Parallax / Mouse Hover States for Hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for headline
  const words = ["ATS-Optimized Resumes", "Stunning Web Portfolios", "Dazzling Developer Bios", "Interview Prep Guides"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Live Demo Simulation States
  const [demoActive, setDemoActive] = useState(false);
  const [demoStep, setDemoStep] = useState(-1);
  const [demoProgress, setDemoProgress] = useState(0);

  // Live Resume / Portfolio Preview States
  const [resumeAtsScore, setResumeAtsScore] = useState(45);
  const [resumePhase, setResumePhase] = useState(0); // 0: empty, 1: typing bio, 2: adding experience, 3: adding skills
  const [portfolioPhase, setPortfolioPhase] = useState(0); // 0: loading, 1: projects, 2: charts

  // Live Counter for stats section
  const [stats, setStats] = useState({ users: 80000, repos: 900000, ats: 75, accuracy: 95.0 });

  // Infinite Marquee Testimonials
  const testimonials = [
    { name: "Alex Rivera", role: "Software Engineer @ Vercel", text: "DevForge AI analyzed my open-source repositories and generated a portfolio that immediately landed me interviews. The one-click deploy looks incredibly clean.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" },
    { name: "Elena Rostova", role: "Backend Architect @ Stripe", text: "I was skeptical, but DevForge surprised me. It parsed my Dockerfiles and GitHub Actions, highlighted my DevOps experience, and matched my coding style.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" },
    { name: "Marcus Chen", role: "Frontend Lead @ Linear", text: "The ATS Score scanner identified that my profile was missing crucial Next.js keywords. After making the recommended edits, my recruiter response rate doubled.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" },
    { name: "Sarah Jenkins", role: "Full Stack Dev @ Framer", text: "The design of the generated portfolio is state-of-the-art. It feels premium, minimal, and has subtle micro-animations that recruiters love.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80" }
  ];

  const faqs = [
    { q: "How does the GitHub Deep Intelligence Engine work?", a: "Our backend parses your public repositories via the GitHub API, evaluating your coding frequency, stars, forks, Docker/Kubernetes configurations, CI/CD pipelines, and project README structures. It maps this data into categorized skill sets verified by actual code references." },
    { q: "Can I deploy the generated portfolio under my own domain?", a: "Yes! The platform supports one-click simulated Vercel deployments. It creates a repository in your GitHub account, pushes the customized code directly, and sets up a free production deployment instantly." },
    { q: "Will the generated resumes pass automated ATS scanners?", a: "Absolutely. All templates (Slate, Emerald Minimal, and Cyberpunk) are built with ATS-friendly, high-density structured layout parameters. They avoid complex visual elements that break parsers while maintaining gorgeous aesthetics for human recruiters." },
    { q: "Do I need a paid API key for Google Gemini to use the app?", a: "No. While you can plug in your own Google Gemini API key in the environment, the app contains a highly sophisticated Local Developer AI Engine that simulates premium adjustments, job matching calculations, and interview questions instantly." }
  ];

  const demoSteps = [
    "Connecting GitHub Securely...",
    "Reading repository structures...",
    "Fetching LinkedIn profile details...",
    "Extracting technical skills...",
    "Detecting frameworks and technologies...",
    "Reading project README documents...",
    "Synthesizing key career achievements...",
    "Building ATS-optimized resume...",
    "Designing responsive web portfolio...",
    "Optimizing SEO and meta tags...",
    "Creating custom About Me page...",
    "Generating interactive projects deck...",
    "Structuring contact forms...",
    "Deploying portfolio build to Edge...",
    "AI Profile Generation Complete!"
  ];

  const workflowSteps = [
    { title: "Connect GitHub", desc: "Scan your public repositories, languages, and contributions." },
    { title: "Connect LinkedIn", desc: "Extract your professional history, education, and roles." },
    { title: "AI Dermal Analysis", desc: "Cross-reference code quality, DevOps footprint, and documentation." },
    { title: "Resume Generation", desc: "Compile a high-density, ATS-optimized professional resume." },
    { title: "Portfolio Generation", desc: "Build a beautiful, interactive, responsive web portfolio." },
    { title: "Customize Theme", desc: "Select colors, fonts, layouts, and interactive SVG widgets." },
    { title: "Export PDF", desc: "Download your recruiter-ready, print-ready ATS resume." },
    { title: "Deploy Portfolio", desc: "Simulate a Vercel edge deployment with live streaming logs." }
  ];

  // Typewriter effect logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[currentWordIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx]);

  // Mouse Parallax movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMousePos({ x, y });
  };

  // Hero Live Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCounter(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Stats Counters Auto Incrementor
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const nextUsers = prev.users + (Math.random() > 0.7 ? 1 : 0);
        const nextRepos = prev.repos + (Math.random() > 0.5 ? 1 : 0);
        const nextAts = prev.ats < 98 ? prev.ats + (Math.random() > 0.9 ? 1 : 0) : 98;
        const nextAcc = prev.accuracy < 99.9 ? Number((prev.accuracy + (Math.random() > 0.95 ? 0.1 : 0)).toFixed(1)) : 99.9;
        return { users: nextUsers, repos: nextRepos, ats: nextAts, accuracy: nextAcc };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Workflow auto switcher
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkflowStep(prev => (prev + 1) % workflowSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Live Demo Runner
  const runDemo = () => {
    if (demoActive) return;
    setDemoActive(true);
    setDemoStep(0);
    setDemoProgress(0);
    setResumeAtsScore(45);
    setResumePhase(0);
    setPortfolioPhase(0);
  };

  useEffect(() => {
    if (!demoActive || demoStep < 0) return;

    if (demoStep < demoSteps.length) {
      const timer = setTimeout(() => {
        setDemoStep(prev => prev + 1);
        setDemoProgress(prev => Math.min(100, Math.round(((demoStep + 1) / demoSteps.length) * 100)));
        
        // Trigger live resume/portfolio phases based on steps
        if (demoStep === 2) setResumePhase(1); // Typing bio
        if (demoStep === 5) setPortfolioPhase(1); // Projects load
        if (demoStep === 7) {
          setResumePhase(2); // Adding experience
          setResumeAtsScore(78);
        }
        if (demoStep === 9) setPortfolioPhase(2); // Charts grow
        if (demoStep === 11) {
          setResumePhase(3); // Adding skills
          setResumeAtsScore(98);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDemoActive(false);
        setDemoStep(-1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [demoActive, demoStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsername.trim() || !fullName.trim() || !email.trim() || !phone.trim()) return;
    onAnalyze({
      githubUsername: githubUsername.trim(),
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      linkedinUrl: linkedinUrl.trim() || undefined,
      theme: selectedTheme
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] bg-grid-pattern relative text-[#2B2B2B] flex flex-col font-sans selection:bg-[#1F6F5F]/10 selection:text-[#1F6F5F]">
      
      {/* Aurora Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#1F6F5F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#C8A96A]/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-[#1F3A5F]/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Landing Navigation Header */}
      <header className="h-20 border-b border-[#1F3A5F]/5 px-6 md:px-12 flex items-center justify-between glass-panel sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#1F6F5F] to-[#1F3A5F] flex items-center justify-center shadow-sm shadow-[#1F6F5F]/10">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-[#1F3A5F]">DevForge <span className="text-[#1F6F5F]">AI</span></span>
            <span className="text-[10px] text-[#C8A96A] ml-1.5 font-bold border border-[#C8A96A]/30 px-1.5 py-0.5 rounded-full bg-[#C8A96A]/5">AGENTIC V2</span>
          </div>
        </div>

        <a 
          href="#analyzer-form"
          className="hidden sm:flex items-center space-x-2 bg-[#1F6F5F] hover:bg-[#1F6F5F]/90 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#1F6F5F]/10 transform active:scale-95"
        >
          <span>Create My Profile</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </header>

      {/* Main Container */}
      <main className="flex-1 space-y-32 py-16 w-full">
        
        {/* 1. HERO SECTION */}
        <section 
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh]"
        >
          <div className="lg:col-span-6 space-y-6 text-left relative z-10">
            <div className="inline-flex items-center space-x-2 bg-[#1F6F5F]/5 border border-[#1F6F5F]/10 px-4 py-1.5 rounded-full text-[#1F6F5F] text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#C8A96A]" />
              <span>Next-Gen Career Automation</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-[#1F3A5F]">
              One Connect.<br />
              <span className="text-gradient-emerald">Instant</span> Professional<br />
              <span className="inline-block min-w-[280px] text-left border-r-2 border-[#1F3A5F] pr-1">{currentText}</span>
            </h1>

            <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
              DevForge AI pulls your GitHub repositories and LinkedIn details. It automatically synthesizes code quality, contribution history, and projects to build an ATS resume and a deployable portfolio.
            </p>

            {/* Counter Widget */}
            <div className="flex items-center space-x-4 bg-white/60 border border-[#1F3A5F]/5 p-4 rounded-2xl w-fit shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-[#1F6F5F]/10 flex items-center justify-center text-[#1F6F5F]">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-extrabold text-[#1F3A5F]">{heroCounter.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Profiles Generated Globally</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a 
                href="#analyzer-form"
                className="bg-[#1F6F5F] hover:bg-[#1F6F5F]/90 text-white font-bold py-4 px-8 rounded-xl text-sm transition-all shadow-sm shadow-[#1F6F5F]/10 flex items-center justify-center space-x-2 transform active:scale-95"
              >
                <span>Build Yours Now</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </a>
              <button 
                onClick={runDemo}
                className="bg-white hover:bg-slate-50 text-[#1F3A5F] font-bold py-4 px-8 rounded-xl text-sm transition-all border border-[#1F3A5F]/10 flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Watch Live AI Demo</span>
                <Play className="h-4 w-4 fill-current text-[#C8A96A]" />
              </button>
            </div>
          </div>

          {/* Hero Floating Parallax Assets */}
          <div className="lg:col-span-6 relative h-[450px] flex items-center justify-center">
            
            {/* Background glowing circle */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#1F6F5F]/10 to-[#C8A96A]/10 blur-2xl animate-pulse"></div>

            {/* Floating GitHub */}
            <div 
              style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }}
              className="absolute top-8 left-12 h-14 w-14 rounded-2xl bg-white border border-[#1F3A5F]/5 flex items-center justify-center shadow-md text-[#1F3A5F] hover:scale-110 transition-all duration-300"
            >
              <Github className="h-7 w-7" />
            </div>

            {/* Floating LinkedIn */}
            <div 
              style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px)` }}
              className="absolute bottom-8 right-12 h-14 w-14 rounded-2xl bg-white border border-[#1F3A5F]/5 flex items-center justify-center shadow-md text-[#1F3A5F] hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="h-7 w-7" />
            </div>

            {/* Central Floating Resume Card */}
            <div 
              style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
              className="absolute w-64 p-5 rounded-2xl border border-[#1F3A5F]/5 bg-white/85 backdrop-blur-md shadow-xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 text-left space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-lg bg-[#1F6F5F]/10 flex items-center justify-center text-[#1F6F5F]">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-extrabold text-[#1F3A5F]">ATS Resume</span>
                </div>
                <span className="text-[10px] text-[#1F6F5F] font-bold bg-[#1F6F5F]/5 px-2 py-0.5 rounded-full">Score: 98%</span>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-3/4 bg-[#1F3A5F]/10 rounded"></div>
                <div className="h-2.5 w-full bg-slate-100 rounded"></div>
                <div className="h-2.5 w-5/6 bg-slate-100 rounded"></div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[8px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">React</span>
                <span className="text-[8px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">TypeScript</span>
                <span className="text-[8px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Docker</span>
              </div>
            </div>

            {/* Central Floating Portfolio Card */}
            <div 
              style={{ transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px)` }}
              className="absolute w-72 p-5 rounded-2xl border border-[#1F3A5F]/5 bg-white/95 backdrop-blur-md shadow-2xl rotate-[6deg] hover:rotate-0 transition-transform duration-500 text-left space-y-4 z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-lg bg-[#C8A96A]/10 flex items-center justify-center text-[#C8A96A]">
                    <Globe className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-extrabold text-[#1F3A5F]">Interactive Web App</span>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="h-24 rounded-lg bg-slate-50 border border-slate-100 relative overflow-hidden flex items-center justify-center">
                {/* Simulated chart in portfolio */}
                <div className="flex items-end space-x-2 h-12 w-32 justify-center">
                  <div className="w-4 bg-[#1F6F5F]/60 rounded-t h-8"></div>
                  <div className="w-4 bg-[#1F6F5F] rounded-t h-12"></div>
                  <div className="w-4 bg-[#C8A96A] rounded-t h-6"></div>
                  <div className="w-4 bg-[#1F3A5F] rounded-t h-10"></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>Domain: vercel.app</span>
                <span className="text-[#1F6F5F] font-bold flex items-center space-x-0.5">
                  <span>Live</span> <ExternalLink className="h-2.5 w-2.5" />
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* 2. LIVE AI GENERATION DEMO */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F3A5F]">See the AI Work in Real-Time</h2>
            <p className="text-slate-500 text-sm">Click the button below to simulate the entire deep analysis and profile generation pipeline.</p>
          </div>

          <div className="glass-card p-6 md:p-8 border border-[#1F3A5F]/10 shadow-lg bg-white/80 max-w-4xl mx-auto relative overflow-hidden">
            
            {/* Top console bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <span className="text-xs font-bold text-slate-400 ml-2 font-mono">DevForge-Console-v2.0</span>
              </div>
              <button 
                onClick={runDemo}
                disabled={demoActive}
                className="bg-[#1F6F5F] hover:bg-[#1F6F5F]/90 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm flex items-center space-x-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#C8A96A]" />
                <span>{demoActive ? "Running..." : "Trigger Simulation"}</span>
              </button>
            </div>

            {/* Main console content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              
              {/* Left Column: Progress checklist */}
              <div className="space-y-3 font-mono text-xs">
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-2">
                  {demoSteps.map((step, idx) => {
                    const isCompleted = demoStep > idx;
                    const isActive = demoStep === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center space-x-2.5 transition-all duration-300 ${
                          isCompleted ? 'text-[#1F6F5F]' : (isActive ? 'text-[#C8A96A] font-bold' : 'text-slate-300')
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1F6F5F]" />
                        ) : (
                          isActive ? (
                            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#C8A96A]" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-slate-200 shrink-0"></div>
                          )
                        )}
                        <span>{step}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Progress bar */}
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>PROGRESS INDEX</span>
                    <span>{demoProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#1F6F5F] via-[#C8A96A] to-[#1F3A5F] transition-all duration-300"
                      style={{ width: `${demoProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Right Column: Flying Assets Visualizer */}
              <div className="bg-[#FAFAF8] rounded-2xl border border-slate-100 p-6 flex flex-col justify-between relative overflow-hidden h-[340px]">
                
                {/* Decorative grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

                {demoStep === -1 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-3 relative z-10">
                    <div className="h-12 w-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#1F3A5F]">
                      <Terminal className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">Press "Trigger Simulation" to visualize compilation</span>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-between relative z-10">
                    
                    {/* Sources (GitHub, LinkedIn) */}
                    <div className="flex justify-between">
                      <div className={`h-10 w-10 rounded-xl border flex items-center justify-center bg-white shadow-sm transition-all duration-500 ${
                        demoStep >= 1 ? 'border-[#1F6F5F] text-[#1F6F5F] scale-110' : 'border-slate-200 text-slate-300'
                      }`}>
                        <Github className="h-5 w-5" />
                      </div>
                      
                      <div className={`h-10 w-10 rounded-xl border flex items-center justify-center bg-white shadow-sm transition-all duration-500 ${
                        demoStep >= 3 ? 'border-[#1F3A5F] text-[#1F3A5F] scale-110' : 'border-slate-200 text-slate-300'
                      }`}>
                        <Linkedin className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Central Processing Node */}
                    <div className="flex justify-center relative">
                      {/* Animated connecting lines */}
                      <svg className="absolute top-[-50px] w-full h-[150px] pointer-events-none z-0">
                        {demoStep >= 1 && (
                          <line x1="30" y1="0" x2="50%" y2="70" stroke="#1F6F5F" strokeWidth="1.5" strokeDasharray="5,5" className="animate-dash" />
                        )}
                        {demoStep >= 3 && (
                          <line x1="90%" y1="0" x2="50%" y2="70" stroke="#1F3A5F" strokeWidth="1.5" strokeDasharray="5,5" className="animate-dash" />
                        )}
                        {demoStep >= 7 && (
                          <line x1="50%" y1="70" x2="20%" y2="150" stroke="#1F6F5F" strokeWidth="1.5" />
                        )}
                        {demoStep >= 9 && (
                          <line x1="50%" y1="70" x2="80%" y2="150" stroke="#C8A96A" strokeWidth="1.5" />
                        )}
                      </svg>

                      <div className={`h-14 w-14 rounded-full bg-white border flex items-center justify-center shadow-lg z-10 transition-all duration-500 ${
                        demoStep >= 4 ? 'border-[#C8A96A] text-[#C8A96A] scale-110 rotate-180' : 'border-slate-200 text-slate-300'
                      }`}>
                        <Cpu className="h-6 w-6 animate-pulse" />
                      </div>
                    </div>

                    {/* Outputs (Resume, Portfolio) */}
                    <div className="flex justify-between items-end">
                      <div className={`p-3 rounded-xl border bg-white shadow-md text-left transition-all duration-500 w-32 ${
                        demoStep >= 7 ? 'border-[#1F6F5F] opacity-100 scale-100' : 'border-slate-200 opacity-20 scale-95'
                      }`}>
                        <span className="block text-[8px] font-bold text-slate-400">ATS RESUME</span>
                        <span className="block text-[10px] font-extrabold text-[#1F3A5F] truncate">Generated CV</span>
                        <div className="w-full h-1.5 bg-[#1F6F5F]/10 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-[#1F6F5F] w-3/4"></div>
                        </div>
                      </div>

                      <div className={`p-3 rounded-xl border bg-white shadow-md text-left transition-all duration-500 w-32 ${
                        demoStep >= 9 ? 'border-[#C8A96A] opacity-100 scale-100' : 'border-slate-200 opacity-20 scale-95'
                      }`}>
                        <span className="block text-[8px] font-bold text-slate-400">WEB PORTFOLIO</span>
                        <span className="block text-[10px] font-extrabold text-[#1F3A5F] truncate">Live Preview</span>
                        <div className="w-full h-1.5 bg-[#C8A96A]/10 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-[#C8A96A] w-5/6"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE WORKFLOW */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 bg-[#C8A96A]/10 border border-[#C8A96A]/20 px-3 py-1 rounded-full text-[#C8A96A] text-xs font-bold uppercase tracking-wider">
              <Zap className="h-3.5 w-3.5" />
              <span>Step-By-Step Mechanics</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F3A5F]">The Automation Pipeline</h2>
            <p className="text-slate-500 text-sm">An elegant, automated workflow built to translate engineering footprints into career assets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((step, idx) => {
              const isActive = activeWorkflowStep === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={`glass-card p-6 border text-left cursor-pointer transition-all duration-500 relative bg-white/70 ${
                    isActive 
                      ? 'border-[#1F6F5F] shadow-md ring-1 ring-[#1F6F5F]/10 scale-[1.02]' 
                      : 'border-[#1F3A5F]/5 hover:border-[#1F3A5F]/20 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-[#1F6F5F] text-white' : 'bg-[#1F3A5F]/5 text-[#1F3A5F]'
                      }`}>{idx + 1}</span>
                      {isActive && <Sparkles className="h-4 w-4 text-[#C8A96A] animate-spin-slow" />}
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-[#1F3A5F]">{step.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. AI FEATURES */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F3A5F]">High-Caliber Feature Suite</h2>
            <p className="text-slate-500 text-sm">Every element optimized for maximum visual impact and recruiter engagement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <FileText className="h-6 w-6 text-[#1F6F5F]" />, 
                title: "ATS-Grade Resumes", 
                desc: "High-density, structured templates designed to pass parsers with 98%+ compatibility scores while maintaining beautiful layouts." 
              },
              { 
                icon: <Globe className="h-6 w-6 text-[#1F3A5F]" />, 
                title: "One-Click Portfolios", 
                desc: "Stunning, animated websites with interactive charts, dark/light modes, and automatic repository syncs deployed instantly." 
              },
              { 
                icon: <Award className="h-6 w-6 text-[#C8A96A]" />, 
                title: "Agentic Optimisation", 
                desc: "Our local AI model audits your content against target job descriptions, suggesting project upgrades and key metrics." 
              }
            ].map((feat, idx) => (
              <div 
                key={idx}
                className="glass-card p-8 border border-[#1F3A5F]/5 hover:border-[#1F6F5F]/20 text-left bg-white/70 shadow-sm relative group overflow-hidden"
              >
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-[#1F6F5F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="space-y-4 relative z-10">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 border border-[#1F3A5F]/5 flex items-center justify-center shadow-inner">
                    {feat.icon}
                  </div>
                  <h4 className="text-base font-extrabold text-[#1F3A5F]">{feat.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. LIVE RESUME PREVIEW */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-[#1F6F5F]/5 border border-[#1F6F5F]/10 px-3 py-1 rounded-full text-[#1F6F5F] text-xs font-bold uppercase tracking-wider">
              <FileText className="h-3.5 w-3.5" />
              <span>Resume Engine</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F3A5F]">AI-Assisted ATS Formatting</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Watch the AI draft, optimize, and organize your credentials into high-density sheets. The system automatically incorporates metrics, highlights key frameworks, and scores your profile against top-tier roles.
            </p>
            
            <div className="flex items-center space-x-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm w-fit">
              <span className="text-2xl font-extrabold text-[#1F6F5F]">{resumeAtsScore}%</span>
              <div className="text-left">
                <span className="block text-xs font-extrabold text-[#1F3A5F]">ATS Compatibility Index</span>
                <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-[#1F6F5F] transition-all duration-500" style={{ width: `${resumeAtsScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-[#1F3A5F]/10 rounded-2xl p-6 md:p-8 shadow-lg text-left font-sans text-xs space-y-4 max-w-2xl mx-auto w-full relative min-h-[300px]">
            {/* Top watermarked badge */}
            <div className="absolute top-4 right-4 text-[10px] font-bold border border-[#1F6F5F]/20 text-[#1F6F5F] px-2 py-0.5 rounded-full bg-[#1F6F5F]/5">
              ATS AUDITED
            </div>

            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <h3 className="text-lg font-bold text-[#1F3A5F]">{fullName || "Saurav Sharma"}</h3>
                <p className="text-slate-400 text-[10px]">{email || "saurav@example.com"} • {phone || "+91 98765 43210"}</p>
              </div>

              {/* Dynamic typing summary */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-[#1F3A5F] uppercase tracking-wider text-[10px]">Professional Summary</h4>
                {resumePhase >= 1 ? (
                  <p className="text-slate-500 leading-relaxed text-[11px] animate-fadeIn">
                    High-impact Software Engineer with a strong track record of crafting robust applications, specialized in TypeScript and React. Proven history of open-source contributions and managing complex, modular codebases.
                  </p>
                ) : (
                  <div className="space-y-2 py-1">
                    <div className="h-3 w-full bg-slate-100 rounded animate-pulse"></div>
                    <div className="h-3 w-5/6 bg-slate-100 rounded animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* Dynamic Experience */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-[#1F3A5F] uppercase tracking-wider text-[10px]">Experience</h4>
                {resumePhase >= 2 ? (
                  <div className="space-y-1 animate-fadeIn">
                    <div className="flex justify-between font-bold text-[#1F3A5F]">
                      <span>Senior Full-Stack Engineer</span>
                      <span>2024 - Present</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">TechForge Solutions</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500 text-[10px] mt-1.5">
                      <li>Designed and implemented robust backend microservices using Node.js and TypeScript, improving query latency by 35%.</li>
                      <li>Optimized pipeline velocities by configuring multi-stage Docker builds and automated GitHub Actions.</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2 py-1">
                    <div className="h-10 w-full bg-slate-100 rounded animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* Dynamic Skills */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-[#1F3A5F] uppercase tracking-wider text-[10px]">Technical Skills</h4>
                {resumePhase >= 3 ? (
                  <div className="flex flex-wrap gap-1.5 animate-fadeIn pt-1">
                    {["React", "Node.js", "TypeScript", "Tailwind CSS", "Docker", "PostgreSQL", "Git"].map((s, i) => (
                      <span key={i} className="text-[9px] font-bold bg-[#1F3A5F]/5 text-[#1F3A5F] border border-[#1F3A5F]/10 px-2.5 py-0.8 rounded-md">{s}</span>
                    ))}
                  </div>
                ) : (
                  <div className="h-6 w-1/2 bg-slate-100 rounded animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 6. LIVE PORTFOLIO PREVIEW */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="bg-white border border-[#1F3A5F]/10 rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto w-full text-left min-h-[320px]">
              <div className="bg-slate-100 px-4 py-2.5 border-b border-[#1F3A5F]/10 flex items-center justify-between text-[10px]">
                <div className="flex items-center space-x-1.5 text-slate-400">
                  <Lock className="h-3.5 w-3.5" />
                  <span>saurav.vercel.app</span>
                </div>
                <span className="text-[#1F6F5F] font-bold">LIVE PREVIEW</span>
              </div>
              
              <div className="p-6 space-y-6 bg-[#FAFAF8] min-h-[280px]">
                {portfolioPhase >= 1 ? (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Header navbar mock */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="font-bold text-[#1F3A5F] text-xs">Saurav.dev</span>
                      <div className="flex space-x-3 text-[10px] text-slate-400 font-semibold">
                        <span className="text-[#1F6F5F]">Projects</span>
                        <span>Experience</span>
                        <span>Contact</span>
                      </div>
                    </div>

                    {/* Project card mock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm space-y-2">
                        <span className="text-[9px] font-bold text-[#C8A96A] uppercase tracking-wider">Featured Project</span>
                        <h4 className="text-xs font-bold text-[#1F3A5F]">Collaborative Cloud IDE</h4>
                        <p className="text-[10px] text-slate-400 line-clamp-2">Real-time coding environment featuring Monaco, WebRTC multi-feed signaling, and sandboxes.</p>
                      </div>
                      
                      {portfolioPhase >= 2 ? (
                        <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between animate-fadeIn">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Dermal Commit Density</span>
                          <div className="flex items-end space-x-1.5 h-10 pt-2">
                            <div className="w-3 bg-[#1F6F5F]/40 rounded-t h-4"></div>
                            <div className="w-3 bg-[#1F6F5F]/60 rounded-t h-6"></div>
                            <div className="w-3 bg-[#1F6F5F] rounded-t h-10"></div>
                            <div className="w-3 bg-[#C8A96A] rounded-t h-5"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-20 bg-slate-100 rounded-xl animate-pulse"></div>
                      )}
                    </div>

                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 space-y-3">
                    <Loader2 className="h-6 w-6 animate-spin text-[#1F6F5F]" />
                    <span className="text-xs text-slate-400">Loading portfolio modules...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-[#C8A96A]/10 border border-[#C8A96A]/20 px-3 py-1 rounded-full text-[#C8A96A] text-xs font-bold uppercase tracking-wider">
              <Globe className="h-3.5 w-3.5" />
              <span>Portfolio Builder</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F3A5F]">Interactive Pixel-Perfect Deploys</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We compile your codebase parameters into structured portfolio pages. Deployed on Vercel Edge with clean styling, responsive layouts, and interactive SVG widgets that showcase your expertise visually.
            </p>
          </div>
        </section>

        {/* 7. GITHUB ANALYSIS VISUALIZER */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 text-left">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-1.5 bg-[#1F3A5F]/5 border border-[#1F3A5F]/10 px-3 py-1 rounded-full text-[#1F3A5F] text-xs font-bold uppercase tracking-wider">
              <Github className="h-3.5 w-3.5" />
              <span>GitHub Analyzer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F3A5F]">Deep Codebase Intelligence</h2>
            <p className="text-slate-500 text-sm">We don't just fetch repositories; we analyze molecular commit densities, Docker configurations, CI/CD YAML structures, and language distribution.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Heatmap & language spectrum */}
            <div className="lg:col-span-8 space-y-6">
              {/* Mock repository cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/70 border border-[#1F3A5F]/5 p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-[#1F3A5F] truncate">nova-gateway</span>
                    <span className="text-[9px] bg-[#1F6F5F]/5 text-[#1F6F5F] px-2 py-0.5 rounded-full border border-[#1F6F5F]/10 font-bold">Go</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">Scalable data pipeline proxy routing real-time service metrics, logs, and rate-limiting rules.</p>
                  <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-bold">
                    <span>★ 8 Stars</span>
                    <span>⑂ 2 Forks</span>
                  </div>
                </div>

                <div className="bg-white/70 border border-[#1F3A5F]/5 p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-[#1F3A5F] truncate">nexus-ide</span>
                    <span className="text-[9px] bg-[#C8A96A]/5 text-[#C8A96A] px-2 py-0.5 rounded-full border border-[#C8A96A]/10 font-bold">TypeScript</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">Collaborative real-time coding environment featuring Monaco, WebRTC, and isolated sandboxes.</p>
                  <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-bold">
                    <span>★ 14 Stars</span>
                    <span>⑂ 5 Forks</span>
                  </div>
                </div>
              </div>

              {/* Contribution heatmap mock */}
              <div className="p-5 bg-white/70 border border-[#1F3A5F]/5 rounded-2xl shadow-sm overflow-x-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 text-xs">
                  <span className="font-bold text-[#1F3A5F] uppercase tracking-wider">Dermal Commit Density Heatmap</span>
                  <span className="text-slate-400">Activity Level: High</span>
                </div>
                {/* Heatmap cells */}
                <div className="flex space-x-[3px] py-1 select-none">
                  {Array.from({ length: 24 }).map((_, cIdx) => (
                    <div key={cIdx} className="flex flex-col space-y-[3px]">
                      {Array.from({ length: 7 }).map((_, rIdx) => {
                        const val = Math.floor(Math.random() * 5);
                        const colors = ['bg-slate-100', 'bg-[#1F6F5F]/10', 'bg-[#1F6F5F]/30', 'bg-[#1F6F5F]/60', 'bg-[#1F6F5F]'];
                        return (
                          <div 
                            key={rIdx}
                            className={`h-2.5 w-2.5 rounded-sm transition-all ${colors[val]}`}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Language chart column */}
            <div className="lg:col-span-4 bg-white/70 border border-[#1F3A5F]/5 p-6 rounded-2xl shadow-sm flex flex-col justify-between h-full">
              <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-widest text-left mb-4">Language Spectrum</h4>
              
              <div className="space-y-4">
                {[
                  { lang: "TypeScript", pct: 48, color: "bg-[#1F6F5F]" },
                  { lang: "Go", pct: 28, color: "bg-[#1F3A5F]" },
                  { lang: "Python", pct: 14, color: "bg-[#C8A96A]" },
                  { lang: "Dockerfiles", pct: 10, color: "bg-[#2B2B2B]" }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-[#2B2B2B]">
                      <span>{item.lang}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 text-[10px] text-slate-400">
                Primary Framework: <b>React/Next.js</b>
              </div>
            </div>
          </div>
        </section>

        {/* 8. LINKEDIN ANALYSIS VISUALIZER */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-[#1F3A5F]/5 border border-[#1F3A5F]/10 px-3 py-1 rounded-full text-[#1F3A5F] text-xs font-bold uppercase tracking-wider">
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn Scanner</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F3A5F]">Dermal Career Synthesizer</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We extract and structure your professional experience, education, endorsements, and recommendations. The AI evaluates your history to format high-impact achievements and structure bullet points.
            </p>
          </div>

          <div className="lg:col-span-6 bg-white border border-[#1F3A5F]/10 rounded-2xl p-6 md:p-8 shadow-lg max-w-xl mx-auto w-full space-y-6">
            <div className="flex items-start space-x-4 border-b border-slate-100 pb-4">
              <div className="h-14 w-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-[#1F3A5F]">
                <User className="h-6 w-6" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-sm font-extrabold text-[#1F3A5F]">{fullName || "Elena Rostova"}</h4>
                <p className="text-xs text-[#1F6F5F] font-bold">Backend Architect @ Stripe</p>
                <p className="text-[10px] text-slate-400">San Francisco Bay Area</p>
              </div>
            </div>

            {/* Experience timeline */}
            <div className="space-y-4 text-left">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Professional History</h5>
              <div className="space-y-3">
                {[
                  { role: "Backend Architect", company: "Stripe", duration: "2023 - Present" },
                  { role: "Senior Software Engineer", company: "Vercel", duration: "2021 - 2023" }
                ].map((job, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs">
                    <div className="h-2 w-2 rounded-full bg-[#1F6F5F] mt-1.5 shrink-0"></div>
                    <div className="space-y-0.5">
                      <span className="font-bold text-[#1F3A5F]">{job.role}</span>
                      <p className="text-[10px] text-slate-400">{job.company} • {job.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & recommendations */}
            <div className="border-t border-slate-100 pt-4 text-left space-y-3">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dermal Credentials</h5>
              <div className="flex flex-wrap gap-1">
                {["Distributed Systems", "Cloud Infrastructure", "API Design", "Docker"].map((s, i) => (
                  <span key={i} className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. AI STATISTICS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 bg-white border border-[#1F3A5F]/5 rounded-3xl p-10 md:p-16 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <span className="block text-4xl md:text-5xl font-extrabold text-[#1F6F5F]">{stats.users.toLocaleString()}+</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Users</span>
            </div>
            <div className="text-center space-y-2 border-l border-slate-100">
              <span className="block text-4xl md:text-5xl font-extrabold text-[#1F3A5F]">{stats.repos.toLocaleString()}+</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Repositories Scanned</span>
            </div>
            <div className="text-center space-y-2 border-l border-slate-100">
              <span className="block text-4xl md:text-5xl font-extrabold text-[#C8A96A]">{stats.ats}%</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Average ATS Score</span>
            </div>
            <div className="text-center space-y-2 border-l border-slate-100">
              <span className="block text-4xl md:text-5xl font-extrabold text-[#2B2B2B]">{stats.accuracy}%</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Parsing Accuracy</span>
            </div>
          </div>
        </section>

        {/* 10. TESTIMONIALS (Infinite Marquee) */}
        <section className="space-y-12 overflow-hidden">
          <div className="text-center space-y-3 max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F3A5F]">Endorsed by Top Engineers</h2>
            <p className="text-slate-500 text-sm">Join thousands of developers who have landed roles at Stripe, Vercel, and Apple.</p>
          </div>

          {/* Marquee Row */}
          <div className="relative flex overflow-x-hidden py-4 border-y border-[#1F3A5F]/5 bg-white/40">
            <div className="animate-marquee flex space-x-6 whitespace-nowrap">
              {testimonials.concat(testimonials).map((t, i) => (
                <div 
                  key={i} 
                  className="w-[380px] shrink-0 glass-card p-6 border border-[#1F3A5F]/5 bg-white shadow-sm inline-block text-left whitespace-normal"
                >
                  <p className="text-xs text-slate-500 italic leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center space-x-3 mt-4 border-t border-slate-100 pt-3">
                    <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <h5 className="text-xs font-bold text-[#1F3A5F]">{t.name}</h5>
                      <p className="text-[10px] text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FAQ ACCORDION */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          <h2 className="text-3xl font-extrabold text-[#1F3A5F] text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="glass-card border border-[#1F3A5F]/5 overflow-hidden transition-all bg-white/70 shadow-sm"
                >
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-bold text-[#1F3A5F] text-sm md:text-base">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-[#1F6F5F] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[200px] border-t border-slate-100' : 'max-h-0'}`}>
                    <p className="p-6 text-xs md:text-sm text-slate-500 leading-relaxed text-left bg-[#FAFAF8]/40">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ANALYZER INPUT FORM SECTION */}
        <section id="analyzer-form" className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="glass-card p-8 md:p-10 border border-[#1F3A5F]/10 shadow-xl relative overflow-hidden bg-white/95">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A96A]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1F6F5F]/5 rounded-full blur-3xl"></div>

            <div className="relative space-y-6 text-left">
              <div className="text-left">
                <h3 className="text-xl font-bold text-[#1F3A5F]">Generate Your Profile</h3>
                <p className="text-xs text-slate-400 mt-1">Connect your GitHub and LinkedIn to automatically compile your resume and portfolio.</p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-red-700 text-xs text-left">
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">GitHub Username</label>
                    <input 
                      type="text"
                      required
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="e.g. Saurav6200907210"
                      className="w-full bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F6F5F] transition-all text-[#2B2B2B] placeholder-[#999999]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Saurav Sharma"
                      className="w-full bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F6F5F] transition-all text-[#2B2B2B] placeholder-[#999999]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. saurav@example.com"
                      className="w-full bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F6F5F] transition-all text-[#2B2B2B] placeholder-[#999999]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F6F5F] transition-all text-[#2B2B2B] placeholder-[#999999]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">LinkedIn URL</label>
                  <input 
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="e.g. https://linkedin.com/in/saurav-sharma"
                    className="w-full bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F6F5F] transition-all text-[#2B2B2B] placeholder-[#999999]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1F6F5F] hover:bg-[#1F6F5F]/90 text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-[#1F6F5F]/10 flex items-center justify-center space-x-2 transform active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                      <span>Analyzing GitHub Repositories...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 text-[#C8A96A] animate-pulse" />
                      <span>Generate My Profile</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* 12. FOOTER */}
      <footer className="border-t border-[#1F3A5F]/5 py-16 px-6 md:px-12 bg-white/50 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-[#1F6F5F] to-[#1F3A5F] flex items-center justify-center">
                <Terminal className="h-4 w-4 text-white" />
              </div>
              <span className="font-extrabold text-sm text-[#1F3A5F]">DevForge AI</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              World-class AI resume and portfolio builder powered by codebase intelligence.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-bold text-[#1F3A5F] uppercase tracking-wider text-[10px]">Product</h5>
            <ul className="space-y-1 text-slate-400">
              <li><a href="#analyzer-form" className="hover:text-[#1F6F5F]">Profile Builder</a></li>
              <li><a href="#demo" className="hover:text-[#1F6F5F]">Live Demo</a></li>
              <li><a href="#features" className="hover:text-[#1F6F5F]">Features</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-[#1F3A5F] uppercase tracking-wider text-[10px]">Company</h5>
            <ul className="space-y-1 text-slate-400">
              <li><a href="#about" className="hover:text-[#1F6F5F]">About Us</a></li>
              <li><a href="#careers" className="hover:text-[#1F6F5F]">Careers</a></li>
              <li><a href="#privacy" className="hover:text-[#1F6F5F]">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-[#1F3A5F] uppercase tracking-wider text-[10px]">Legal</h5>
            <ul className="space-y-1 text-slate-400">
              <li><a href="#terms" className="hover:text-[#1F6F5F]">Terms of Service</a></li>
              <li><a href="#cookies" className="hover:text-[#1F6F5F]">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-[#1F3A5F]/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 DevForge AI. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#1F6F5F]"><Github className="h-4 w-4" /></a>
            <a href="#" className="hover:text-[#1F6F5F]"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
