import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Smartphone, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Github, 
  Linkedin,
  Server, 
  Play, 
  RefreshCw, 
  Globe, 
  Compass, 
  ArrowRight,
  Briefcase,
  Terminal as TerminalIcon,
  Code,
  Grid,
  Lock,
  Search,
  MessageSquare,
  Award,
  Layers,
  ChevronUp,
  Activity,
  Cpu,
  Database,
  Cloud,
  CheckCircle,
  Eye,
  Send,
  X,
  Sliders,
  Calendar,
  MousePointer,
  Sparkle
} from 'lucide-react';
import { api } from '../api';
import { DoughnutDial, BarChart, ContributionGrid } from './CustomChart';

interface LivePreviewProps {
  profile: any;
  onUpdateProfile: (updatedProfile: any) => void;
}

export default function LivePreview({ profile, onUpdateProfile }: LivePreviewProps) {
  const portfolio = profile.portfolio || {
    theme: 'emerald',
    customColors: { primary: '#1F6F5F', background: '#FAFAF8' },
    deployedUrl: '',
    vercelSubdomain: ''
  };

  const [previewSize, setPreviewSize] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'creative' | 'devops'>('creative');
  const [previewThemeMode, setPreviewThemeMode] = useState<'dark' | 'light'>('dark');
  
  // Custom subdomain states
  const [subdomain, setSubdomain] = useState(portfolio.vercelSubdomain || (profile.githubUsername ? profile.githubUsername.toLowerCase() : 'sauravkumar'));
  
  // Deployment & Git logs simulation states
  const [deploying, setDeploying] = useState(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [activeDeployUrl, setActiveDeployUrl] = useState(portfolio.deployedUrl || '');
  
  const [syncingGit, setSyncingGit] = useState(false);
  const [gitLogs, setGitLogs] = useState<string[]>([]);

  // Portfolio interactive states
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>('All');
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandPaletteQuery, setCommandPaletteQuery] = useState('');
  const [visitorCount, setVisitorCount] = useState(1284);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactErrors, setContactErrors] = useState<any>({});

  // GitHub repository selection state
  const [selectedGithubRepos, setSelectedGithubRepos] = useState<string[]>(() => {
    return portfolio.selectedGithubRepos || (profile.repositories || []).slice(0, 3).map((r: any) => r.name);
  });

  const toggleGithubRepo = (repoName: string) => {
    const updated = selectedGithubRepos.includes(repoName)
      ? selectedGithubRepos.filter(name => name !== repoName)
      : [...selectedGithubRepos, repoName];
    setSelectedGithubRepos(updated);
    onUpdateProfile({
      ...profile,
      portfolio: {
        ...portfolio,
        selectedGithubRepos: updated
      }
    });
  };

  // Mouse Glow Spotlight Effect for Creative mode
  const previewRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Mock static data for Saurav Kumar to supplement standard profile
  const mockSauravDetails = {
    fullName: "Saurav Kumar",
    role: "DevOps Engineer & AI Automation Builder",
    summary: "Senior DevOps Engineer specialized in cloud-native system orchestration, containerized security, CI/CD automation, and intelligent AI builder pipelines. Passionate about infrastructure-as-code and building autonomous deployment agents.",
    stats: [
      { label: "Years Learning & Building", value: "5+" },
      { label: "Completed Deployments", value: "140+" },
      { label: "AI Engines Integrated", value: "12" },
      { label: "Infrastructure Automation", value: "99.9%" }
    ],
    experience: [
      {
        company: "Vortex Labs",
        role: "Lead DevOps Architect",
        duration: "2024 - Present",
        description: "Orchestrated highly available Kubernetes clusters on GCP. Automated microservices pipeline reducing deployment cycles by 65%. Developed AI self-healing automation routines for infrastructure health checks.",
        achievements: ["Reduced cloud spending by 35% through resource auto-scaling", "Designed GitOps workflow supporting 40+ microservices"]
      },
      {
        company: "InnoTech Systems",
        role: "DevOps & Automation Engineer",
        duration: "2022 - 2024",
        description: "Implemented DevSecOps practices with automated vulnerability scanning (Trivy, SonarQube). Maintained Ansible and Terraform configurations for cloud infrastructure provisioning.",
        achievements: ["Automated SSL renewals and compliance tracking for 200+ micro-domains", "Set up ELK logging dashboard supporting live telemetry monitoring"]
      }
    ],
    projects: [
      {
        name: "WebMatrixX",
        description: "Next-generation multi-cloud dashboard for Kubernetes cluster visualization, real-time log streaming, and metric alerts using WebSocket and React.",
        category: "DevOps",
        tech: ["Kubernetes", "React", "Go", "WebSockets", "Docker"],
        features: ["Multi-cluster authentication", "Real-time resource utilization dials", "Kubectl CLI shell simulation"],
        githubUrl: "#",
        liveUrl: "#",
        architecture: "React Frontend <-> Go WebSocket Agent <-> Kubernetes API Server"
      },
      {
        name: "GitAnalyze AI",
        description: "AI-driven developer analytics platform parsing commit patterns, repository health, and automated pull-request code reviews utilizing LLMs.",
        category: "AI",
        tech: ["Next.js", "Python", "FastAPI", "OpenAI API", "PostgreSQL"],
        features: ["Automated PR code quality audit reports", "Git-tree branch dependency mapping", "Developer productivity index calculations"],
        githubUrl: "#",
        liveUrl: "#",
        architecture: "Next.js Web Client <-> FastAPI Services Router <-> LangChain Orchestrator"
      },
      {
        name: "KubeVision",
        description: "An interactive, visually rich canvas interface showcasing Kubernetes pod relationships, traffic flow pipelines, and live error nodes status.",
        category: "DevOps",
        tech: ["React Flow", "TypeScript", "Tailwind CSS", "Express", "Prometheus"],
        features: ["Visual node drag-and-drop orchestration simulator", "Live Prometheus traffic metric overlays", "Automated alert triggers node highlight"],
        githubUrl: "#",
        liveUrl: "#",
        architecture: "React Canvas <-> Express Prometheus Scraper <-> Cluster Pods"
      },
      {
        name: "DevSecOps Dashboard",
        description: "Centralized security telemetry dashboard parsing SonarQube, Trivy scan outputs and displaying dynamic compliance scores.",
        category: "Security",
        tech: ["Next.js", "Tailwind CSS", "Trivy API", "Docker", "S3 Storage"],
        features: ["Vulnerability severity radar chart reports", "Automated Slack alerts triggers", "Compliance PDF reporting download"],
        githubUrl: "#",
        liveUrl: "#",
        architecture: "GitHub Webhooks <-> Scan Job Runner <-> DevSecOps Portal"
      }
    ],
    certifications: [
      { title: "Certified Kubernetes Administrator (CKA)", issuer: "Cloud Native Computing Foundation", date: "2025" },
      { title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2024" },
      { title: "HashiCorp Certified: Terraform Associate", issuer: "HashiCorp", date: "2024" }
    ],
    skills: {
      devops: ["Docker", "Kubernetes", "Terraform", "Ansible", "GitLab CI/CD", "GitHub Actions"],
      cloud: ["AWS", "GCP", "Vercel", "Linux", "Nginx", "Prometheus", "Grafana"],
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "Python", "FastAPI", "Go"]
    }
  };

  // Dynamically categorize skills fetched from profile.resume.skills
  const getCategorizedSkills = () => {
    const rawSkills = profile.resume?.skills;
    if (!rawSkills || !Array.isArray(rawSkills) || rawSkills.length === 0) {
      // Fallback to static structured list
      return {
        'DevOps & Pipelines': mockSauravDetails.skills.devops,
        'Cloud & Systems': mockSauravDetails.skills.cloud,
        'Frontend UI': mockSauravDetails.skills.frontend,
        'Backend Dev': mockSauravDetails.skills.backend
      };
    }

    const categories: { [key: string]: string[] } = {
      'DevOps & CI/CD': [],
      'Cloud & Platforms': [],
      'Frontend Development': [],
      'Backend & Databases': [],
      'AI & Automation': [],
      'General & Others': []
    };

    rawSkills.forEach(skill => {
      const s = skill.toLowerCase();
      if (s.includes('docker') || s.includes('kube') || s.includes('terraform') || s.includes('ansible') || s.includes('jenkins') || s.includes('gitlab') || s.includes('actions') || s.includes('gitops') || s.includes('ci/') || s.includes('cd') || s.includes('argocd') || s.includes('bash') || s.includes('linux')) {
        categories['DevOps & CI/CD'].push(skill);
      } else if (s.includes('aws') || s.includes('gcp') || s.includes('azure') || s.includes('cloud') || s.includes('vercel') || s.includes('nginx') || s.includes('prometheus') || s.includes('grafana') || s.includes('monitoring') || s.includes('sentry')) {
        categories['Cloud & Platforms'].push(skill);
      } else if (s.includes('react') || s.includes('next') || s.includes('vue') || s.includes('tailwind') || s.includes('css') || s.includes('html') || s.includes('typescript') || s.includes('javascript') || s.includes('js') || s.includes('ts')) {
        categories['Frontend Development'].push(skill);
      } else if (s.includes('node') || s.includes('express') || s.includes('python') || s.includes('django') || s.includes('flask') || s.includes('go') || s.includes('golang') || s.includes('postgres') || s.includes('mongo') || s.includes('redis') || s.includes('sql') || s.includes('mysql') || s.includes('fastapi') || s.includes('database')) {
        categories['Backend & Databases'].push(skill);
      } else if (s.includes('openai') || s.includes('llm') || s.includes('langchain') || s.includes('ai') || s.includes('ml') || s.includes('automation') || s.includes('agent')) {
        categories['AI & Automation'].push(skill);
      } else {
        categories['General & Others'].push(skill);
      }
    });

    // Filter out empty groups
    const result: { [key: string]: string[] } = {};
    Object.entries(categories).forEach(([key, list]) => {
      if (list.length > 0) {
        result[key] = list;
      }
    });

    return result;
  };

  const getProfileData = () => {
    const githubRepos = profile.repositories || [];
    let projectsList = [];

    if (githubRepos.length > 0 && selectedGithubRepos.length > 0) {
      projectsList = githubRepos
        .filter((r: any) => selectedGithubRepos.includes(r.name))
        .map((r: any) => ({
          name: r.name,
          description: r.description || "Cloud-native platform utility and DevOps automation pipeline.",
          category: r.language || "DevOps",
          tech: [r.language || "DevOps", "Docker", "CI/CD", "Terraform"].filter(Boolean),
          features: [
            "Fully automated container deployment configuration.",
            "Continuous Integration builds integrated using GitHub Actions.",
            "Infrastructure automation templates set up for simple orchestration."
          ],
          githubUrl: r.htmlUrl || `https://github.com/${profile.githubUsername || 'sauravkumar'}/${r.name}`,
          liveUrl: activeDeployUrl || `https://${subdomain}.vercel.app/${r.name}`
        }));
    }

    if (projectsList.length === 0) {
      // Use fallback mock details
      projectsList = mockSauravDetails.projects.map((p: any) => ({
        ...p,
        features: p.features && p.features.length >= 3 ? p.features.slice(0, 3) : [
          "Real-time pipeline diagnostics metrics.",
          "Automated vulnerability detection and scanning logs.",
          "Custom orchestration control dashboard panels."
        ],
        githubUrl: `https://github.com/${profile.githubUsername || 'sauravkumar'}/${p.name.toLowerCase()}`,
        liveUrl: activeDeployUrl || `https://${subdomain}.vercel.app/${p.name.toLowerCase()}`
      }));
    }

    return {
      fullName: profile.fullName || mockSauravDetails.fullName,
      role: mockSauravDetails.role,
      summary: profile.resume?.summary || mockSauravDetails.summary,
      stats: mockSauravDetails.stats,
      experience: (profile.resume?.experience && profile.resume.experience.length > 0) ? profile.resume.experience : mockSauravDetails.experience,
      projects: projectsList,
      certifications: mockSauravDetails.certifications,
      skills: getCategorizedSkills()
    };
  };

  const currentProfile = getProfileData();
  const userGithubUrl = profile.githubUsername ? `https://github.com/${profile.githubUsername}` : 'https://github.com';
  const userLinkedinUrl = profile.linkedinUrl || profile.resume?.linkedinUrl || 'https://linkedin.com';

  // Typing simulator
  const [typedText, setTypedText] = useState('');
  const roles = [currentProfile.role, "Platform Engineering Innovator", "Kubernetes & Cloud Specialist", "Autonomous System Designer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const currentRole = roles[roleIndex];
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex(prev => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // Deployment simulator mockup
  const handleDeploy = async () => {
    try {
      setDeploying(true);
      setDeployLogs([]);
      
      const res = await api.portfolios.deploy(profile.id || 'dev', subdomain);
      if (res.success) {
        for (let i = 0; i < res.logs.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setDeployLogs(prev => [...prev, res.logs[i]]);
        }
        setActiveDeployUrl(res.deployedUrl);
        onUpdateProfile({
          ...profile,
          portfolio: {
            ...profile.portfolio,
            deployedUrl: res.deployedUrl,
            vercelSubdomain: subdomain
          }
        });
      }
    } catch (err) {
      console.error('Simulated deployment failed:', err);
    } finally {
      setDeploying(false);
    }
  };

  const handleGitSync = async () => {
    try {
      setSyncingGit(true);
      setGitLogs([]);

      const res = await api.portfolios.pushRepo(profile.id || 'dev', subdomain);
      if (res.success) {
        for (let i = 0; i < res.logs.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setGitLogs(prev => [...prev, res.logs[i]]);
        }
      }
    } catch (err) {
      console.error('Git synchronization failed:', err);
    } finally {
      setSyncingGit(false);
    }
  };

  // Keyboard listener for Cmd+K command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: any = {};
    if (!contactForm.name) errors.name = 'Name is required';
    if (!contactForm.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email is invalid';
    }
    if (!contactForm.message) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactErrors({});
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  // Render Modern Minimalist layout
  const renderModernDeveloper = () => {
    const filtered = currentProfile.projects.filter((p: any) => {
      const matchCat = selectedProjectCategory === 'All' || p.category === selectedProjectCategory;
      const matchSearch = p.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(projectSearchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    return (
      <div className={`space-y-16 text-left transition-colors duration-300 ${
        previewThemeMode === 'dark' ? 'text-slate-100 bg-[#0f172a]' : 'text-slate-800 bg-[#fafafa]'
      } p-6 rounded-xl`}>
        {/* Navbar */}
        <div className="flex justify-between items-center border-b border-slate-500/10 pb-4">
          <span className="font-black text-lg tracking-tight uppercase flex items-center space-x-1.5">
            <span className="h-2.5 w-2.5 bg-blue-500 rounded-full"></span>
            <span>{currentProfile.fullName}</span>
          </span>
          <div className="flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
          </div>
        </div>

        {/* Hero */}
        <div className="space-y-6 max-w-2xl py-8">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold">
            <Activity className="h-3 w-3 animate-pulse" />
            <span>Available for Remote Architecture Work</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl leading-tight">
            I build stable <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">infrastructure systems</span> and smart cloud orchestration pipelines.
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            {currentProfile.summary}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all">
              View Solutions
            </a>
            <a href="#contact" className="border border-slate-500/20 hover:border-slate-500/50 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all">
              Reach Out
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-500/5 p-6 rounded-2xl border border-slate-500/10">
          {currentProfile.stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <span className="block text-2xl font-extrabold text-blue-500">{s.value}</span>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Skills Cards Grid - Modern style */}
        <div className="space-y-6" id="skills">
          <div>
            <h2 className="text-xl font-bold">Skills Matrix</h2>
            <p className="text-xs text-slate-400">Fetched directly from your custom resume data</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(currentProfile.skills).map(([category, items]) => (
              <div key={category} className="p-5 border border-slate-500/10 rounded-xl bg-slate-50/5 space-y-3">
                <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider">{category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(items as string[]).map((s: string, idx: number) => (
                    <span key={`${s}-${idx}`} className="bg-white text-slate-800 border border-slate-500/10 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-8" id="projects">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold">Engineering Work</h2>
              <p className="text-xs text-slate-400">Search and filter active deployments below</p>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search project..."
                  value={projectSearchQuery}
                  onChange={e => setProjectSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-500/10 text-xs bg-transparent focus:outline-none focus:border-blue-500 w-full"
                />
              </div>
              {['All', 'DevOps', 'AI', 'Security'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedProjectCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedProjectCategory === cat 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-500/10 hover:bg-slate-500/20 text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((proj: any, idx: number) => (
              <div 
                key={idx} 
                onClick={() => setSelectedProject(proj)}
                className="p-5 border border-slate-500/10 rounded-xl bg-slate-500/5 hover:border-blue-500/40 cursor-pointer transition-all space-y-3 relative group"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-blue-500">{proj.name}</h3>
                  <span className="text-[9px] font-bold bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full uppercase">{proj.category}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1">
                  {proj.tech.slice(0, 3).map((t: string, i: number) => (
                    <span key={i} className="text-[9px] border border-slate-500/10 px-1.5 py-0.5 rounded bg-slate-500/10 font-mono text-slate-400">{t}</span>
                  ))}
                  {proj.tech.length > 3 && <span className="text-[9px] text-slate-400">+{proj.tech.length - 3} more</span>}
                </div>
                <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider group-hover:text-blue-500 transition-colors">
                  <span>Explore Architecture details</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold">Milestones & History</h2>
            <p className="text-xs text-slate-400">Professional career timeline and impact achievements</p>
          </div>

          <div className="space-y-6 relative border-l border-slate-500/10 pl-6 ml-3">
            {currentProfile.experience.map((exp: any, idx: number) => (
              <div key={idx} className="relative space-y-2">
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 border-4 border-slate-900 shadow"></span>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <h4 className="font-bold text-sm">{exp.role} <span className="text-blue-500 font-semibold">@ {exp.company}</span></h4>
                  <span className="text-[10px] bg-slate-500/10 px-2.5 py-0.5 rounded-md font-mono text-slate-400">{exp.duration}</span>
                </div>
                {exp.description && <p className="text-xs text-slate-400 leading-relaxed">{exp.description}</p>}
                <ul className="list-disc pl-4 text-xs text-slate-400 space-y-1">
                  {(exp.bullets || exp.achievements || []).map((ach: string, i: number) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 bg-slate-500/5 border border-slate-500/10 rounded-2xl space-y-4" id="contact">
          <div>
            <h2 className="text-lg font-bold">Send encrypted secure message</h2>
            <p className="text-xs text-slate-400">Simulate direct deployment and notification logs trigger</p>
          </div>

          {contactSuccess ? (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-xs flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Deployment alert logs sent successfully! Saurav will receive this on Slack.</span>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={contactForm.name}
                    onChange={e => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-500/10 focus:border-blue-500 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                  {contactErrors.name && <span className="text-[9px] text-red-500 font-semibold">{contactErrors.name}</span>}
                </div>
                <div className="space-y-1">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={contactForm.email}
                    onChange={e => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-500/10 focus:border-blue-500 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                  {contactErrors.email && <span className="text-[9px] text-red-500 font-semibold">{contactErrors.email}</span>}
                </div>
              </div>
              <div className="space-y-1">
                <textarea 
                  placeholder="Message payload details..." 
                  rows={3}
                  value={contactForm.message}
                  onChange={e => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-500/10 focus:border-blue-500 rounded-xl px-3 py-2 text-xs focus:outline-none"
                ></textarea>
                {contactErrors.message && <span className="text-[9px] text-red-500 font-semibold">{contactErrors.message}</span>}
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all shadow-sm flex items-center space-x-1">
                <Send className="h-3 w-3" />
                <span>Simulate Dispatch</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-500/10 text-xs text-slate-400 gap-4 mt-8">
          <span>© {new Date().getFullYear()} {currentProfile.fullName}. All rights reserved.</span>
          <div className="flex items-center space-x-4">
            <a href={userGithubUrl} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href={userLinkedinUrl} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Render Creative Glassmorphism Layout with Neon theme details
  const renderInteractiveCreative = () => {
    const filtered = currentProfile.projects.filter((p: any) => {
      const matchCat = selectedProjectCategory === 'All' || p.category === selectedProjectCategory;
      const matchSearch = p.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(projectSearchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    return (
      <div 
        ref={previewRef}
        onMouseMove={handleMouseMove}
        className="relative bg-[#030712] text-[#FFFFFF] font-sans p-6 rounded-2xl overflow-hidden text-left min-h-[800px] select-none"
      >
        {/* Glow spotlight filter layer */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 245, 212, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)`
          }}
        ></div>

        {/* Ambient mesh blobs */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#00F5D4]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header Navbar */}
        <div className="relative z-10 flex justify-between items-center border-b border-white/5 pb-4 mb-8">
          <span className="font-extrabold text-sm tracking-widest text-[#00F5D4] uppercase flex items-center space-x-2">
            <Sparkle className="h-4 w-4 animate-spin text-[#00F5D4]" style={{ animationDuration: '6s' }} />
            <span>SAURAV.DEV</span>
          </span>
          <div className="hidden md:flex space-x-6 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <a href="#about" className="hover:text-[#00F5D4] transition-all">/about</a>
            <a href="#skills" className="hover:text-[#3B82F6] transition-all">/skills</a>
            <a href="#projects" className="hover:text-[#8B5CF6] transition-all">/projects</a>
            <a href="#contact" className="hover:text-[#00F5D4] transition-all">/contact</a>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="bg-white/5 border border-white/10 hover:border-[#00F5D4]/50 hover:bg-white/10 text-white rounded-lg px-2.5 py-1 text-[9px] font-bold transition-all flex items-center space-x-1.5"
            >
              <span>Command Menu</span>
              <kbd className="bg-white/10 px-1 rounded text-[8px]">Ctrl+K</kbd>
            </button>
            <div className="bg-emerald-500/20 text-[#00F5D4] border border-[#00F5D4]/20 px-2 py-0.5 rounded text-[8px] font-mono flex items-center space-x-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F5D4] animate-ping"></span>
              <span>LIVE</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 space-y-6 pt-6 pb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-[#3B82F6]/5 border border-[#3B82F6]/10 px-3 py-1 rounded-full inline-block">
              🚀 Platform Automation Engineer
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
              Saurav Kumar
            </h1>
            <h2 className="text-lg sm:text-xl font-bold font-mono text-slate-400 flex items-center h-8">
              &gt; <span className="text-[#00F5D4] ml-2">{typedText}</span>
              <span className="w-1.5 h-4 bg-[#00F5D4] ml-1 animate-pulse"></span>
            </h2>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-lg bg-white/[0.02] border border-white/5 p-4 rounded-xl backdrop-blur-md">
            {currentProfile.summary}
          </p>

          <div className="flex flex-wrap gap-3">
            <a 
              href="#projects" 
              className="bg-gradient-to-r from-[#00F5D4] to-[#3B82F6] hover:scale-105 text-[#030712] font-extrabold px-6 py-3 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(0,245,212,0.3)]"
            >
              Explore Deployments
            </a>
            <a 
              href="#contact" 
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#3B82F6]/30 px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <MessageSquare className="h-3.5 w-3.5 text-[#3B82F6]" />
              <span>Contact Developer</span>
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {currentProfile.stats.map((s, idx) => (
            <div key={idx} className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#00F5D4]/20 p-4 rounded-xl transition-all shadow-sm">
              <span className="block text-2xl font-black bg-gradient-to-r from-[#00F5D4] to-[#3B82F6] bg-clip-text text-transparent">{s.value}</span>
              <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Skills Cards Grid - Positioned right where the terminal CLI was */}
        <div className="relative z-10 space-y-6 mb-12" id="skills">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#00F5D4]">/Skills Matrix</h3>
            <p className="text-[10px] text-slate-400">Core skills fetched dynamically from your resume profile</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(currentProfile.skills).map(([category, items]) => (
              <div key={category} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-3 hover:border-[#00F5D4]/20 transition-colors">
                <h4 className="text-[10px] font-extrabold text-[#3B82F6] uppercase tracking-wider">{category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(items as string[]).map((s: string, idx: number) => (
                    <span key={`${s}-${idx}`} className="bg-white/[0.04] border border-white/10 hover:border-[#00F5D4]/30 px-2 py-1 rounded-lg text-[9px] font-mono text-slate-300 transition-all">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Experience Timeline for Creative AI */}
        <div className="relative z-10 space-y-6 mb-12" id="experience">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#00F5D4]">/Work Milestones</h3>
            <p className="text-[10px] text-slate-400">Professional path and engineering impact</p>
          </div>

          <div className="space-y-6 relative border-l border-white/5 pl-6 ml-3">
            {currentProfile.experience.map((exp: any, idx: number) => (
              <div key={idx} className="relative space-y-2 group text-left">
                {/* Glowing node connector */}
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#00F5D4] border-2 border-[#030712] shadow-[0_0_8px_rgba(0,245,212,0.8)] group-hover:scale-125 transition-transform"></span>
                
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <h4 className="font-bold text-sm text-white">{exp.role} <span className="text-[#3B82F6] font-semibold">@ {exp.company}</span></h4>
                  <span className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded font-mono text-slate-400">{exp.duration}</span>
                </div>
                {exp.description && <p className="text-[11px] text-slate-400 leading-relaxed">{exp.description}</p>}
                <ul className="list-disc pl-4 text-[10px] text-slate-400 space-y-1.5 leading-relaxed">
                  {(exp.bullets || exp.achievements || []).map((ach: string, i: number) => (
                    <li key={i} className="hover:text-white transition-colors">{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Layout */}
        <div className="relative z-10 space-y-6 mb-12" id="projects">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#00F5D4]">/Engineering Artifacts</h3>
              <p className="text-[10px] text-slate-400">Click individual artifacts to view their system design models</p>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {['All', 'DevOps', 'AI', 'Security'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedProjectCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    selectedProjectCategory === cat 
                      ? 'bg-gradient-to-r from-[#00F5D4] to-[#3B82F6] text-[#030712]' 
                      : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((p: any, idx: number) => (
              <div 
                key={idx}
                onClick={() => setSelectedProject(p)}
                className="bg-white/[0.02] border border-white/5 hover:border-[#3B82F6]/50 p-5 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between h-[180px] group relative overflow-hidden"
              >
                {/* Visual hover background lines */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00F5D4]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-[#00F5D4] border border-[#00F5D4]/30 px-2 py-0.5 rounded bg-[#00F5D4]/5">{p.category}</span>
                    <span className="text-[8px] font-mono text-slate-500">v1.0</span>
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-[#00F5D4] transition-colors">{p.name}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{p.description}</p>
                </div>

                <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 group-hover:text-white transition-colors border-t border-white/5 pt-2">
                  <span>DEPLOYMENT INSTANCE</span>
                  <div className="flex items-center space-x-1 text-[#3B82F6]">
                    <span>VIEW DETAILS</span>
                    <ArrowRight className="h-2.5 w-2.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Showcase */}
        <div className="relative z-10 space-y-6 mb-12">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#00F5D4]">/Credentials</h3>
            <p className="text-[10px] text-slate-400">Validated professional certifications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentProfile.certifications.map((cert: any, idx: number) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center space-x-3">
                <Award className="h-6 w-6 text-[#3B82F6] shrink-0" />
                <div className="text-left">
                  <h4 className="text-[10px] font-extrabold text-white leading-tight">{cert.title}</h4>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub stats widgets */}
        <div className="relative z-10 bg-white/[0.02] border border-white/5 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center space-x-1.5">
              <Github className="h-4 w-4 text-white" />
              <span>GitHub Telemetry Analysis</span>
            </span>
            <span className="text-[8px] bg-slate-500/10 px-2 py-0.5 rounded font-mono text-slate-400">UPDATED REALTIME</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="block text-xl font-black text-white">484</span>
                  <span className="block text-[8px] text-slate-400 uppercase tracking-wider">Contributions this Year</span>
                </div>
                <div>
                  <span className="block text-xl font-black text-[#00F5D4]">32 Days</span>
                  <span className="block text-[8px] text-slate-400 uppercase tracking-wider">Active Deploy Streak</span>
                </div>
              </div>
              <ContributionGrid username={profile.githubUsername} repositories={profile.repositories || []} />
            </div>

            <div className="flex justify-center">
              <DoughnutDial percentage={95} label="DevOps Systems" color="#00F5D4" size={130} />
            </div>
          </div>
        </div>

        {/* Contact Form - Placed elegantly at the bottom */}
        <div className="relative z-10 pt-12 text-center max-w-md mx-auto space-y-6" id="contact">
          <div className="space-y-1">
            <MessageSquare className="h-8 w-8 text-[#00F5D4] mx-auto animate-bounce" />
            <h3 className="text-lg font-black tracking-tight text-white uppercase">Initialize Contact Request</h3>
            <p className="text-[10px] text-slate-400">Trigger custom webhook payload containing project brief</p>
          </div>

          {contactSuccess ? (
            <div className="p-4 bg-[#00F5D4]/10 border border-[#00F5D4]/30 rounded-xl text-[#00F5D4] text-xs font-mono">
              [SUCCESS]: Message package dispatched to Saurav's hub logs.
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <input 
                type="text" 
                placeholder="Sender Handle / Name" 
                value={contactForm.name}
                onChange={e => setContactForm({...contactForm, name: e.target.value})}
                className="w-full bg-black/60 border border-white/10 hover:border-[#00F5D4]/50 focus:border-[#00F5D4] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-slate-600 transition-all font-mono"
              />
              <input 
                type="email" 
                placeholder="Sender Communication Email" 
                value={contactForm.email}
                onChange={e => setContactForm({...contactForm, email: e.target.value})}
                className="w-full bg-black/60 border border-white/10 hover:border-[#00F5D4]/50 focus:border-[#00F5D4] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-slate-600 transition-all font-mono"
              />
              <textarea 
                placeholder="Write message cargo contents..." 
                rows={3}
                value={contactForm.message}
                onChange={e => setContactForm({...contactForm, message: e.target.value})}
                className="w-full bg-black/60 border border-white/10 hover:border-[#00F5D4]/50 focus:border-[#00F5D4] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-slate-600 transition-all font-mono"
              ></textarea>
              <button className="w-full bg-gradient-to-r from-[#00F5D4] to-[#3B82F6] hover:opacity-90 text-[#030712] font-black uppercase text-[10px] py-3 rounded-xl transition-all tracking-wider shadow-md">
                Transmit Payload
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-12 mt-12 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500">
          <span>© {new Date().getFullYear()} {currentProfile.fullName.toUpperCase()}</span>
          <div className="flex items-center space-x-3.5">
            <a href={userGithubUrl} target="_blank" rel="noreferrer" className="hover:text-[#00F5D4] transition-colors text-white">
              <Github className="h-4 w-4" />
            </a>
            <a href={userLinkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[#3B82F6] transition-colors text-white">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Render SRE DevOps Interactive Terminal Dashboard Layout - Overhauled to focus on Classic White Resume
  const renderDevOpsTerminal = () => {
    const filtered = currentProfile.projects.filter((p: any) => {
      const matchCat = selectedProjectCategory === 'All' || p.category === selectedProjectCategory;
      const matchSearch = p.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(projectSearchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    return (
      <div className="bg-[#FFFFFF] text-slate-800 p-6 sm:p-8 space-y-16 rounded-xl shadow border border-slate-200 text-left min-h-[600px] transition-colors duration-300">
        
        {/* Navbar */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <span className="font-black text-lg tracking-tight uppercase flex items-center space-x-1.5 text-[#1F3A5F]">
            <span className="h-2.5 w-2.5 bg-[#1F6F5F] rounded-full"></span>
            <span>{currentProfile.fullName}</span>
          </span>
          <div className="flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <a href="#about" className="hover:text-[#1F6F5F] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#1F6F5F] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#1F6F5F] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[#1F6F5F] transition-colors">Contact</a>
          </div>
        </div>

        {/* Hero */}
        <div className="space-y-6 max-w-2xl py-8">
          <div className="inline-flex items-center space-x-2 bg-[#1F6F5F]/10 text-[#1F6F5F] px-3 py-1 rounded-full text-xs font-bold">
            <Activity className="h-3 w-3 animate-pulse" />
            <span>Available for Remote Architecture Work</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl leading-tight text-[#1F3A5F]">
            I build stable <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F6F5F] to-[#1F3A5F]">infrastructure systems</span> and smart cloud orchestration pipelines.
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {currentProfile.summary}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="bg-[#1F6F5F] hover:bg-[#1F6F5F]/90 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all">
              View Solutions
            </a>
            <a href="#contact" className="border border-slate-200 hover:border-slate-400 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all text-slate-600">
              Reach Out
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          {currentProfile.stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <span className="block text-2xl font-extrabold text-[#1F6F5F]">{s.value}</span>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="space-y-6" id="skills">
          <div>
            <h2 className="text-xl font-bold text-[#1F3A5F]">Skills Matrix</h2>
            <p className="text-xs text-slate-400">Fetched directly from your custom resume data</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(currentProfile.skills).map(([category, items]) => (
              <div key={category} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-bold text-[#1F6F5F] uppercase tracking-wider">{category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(items as string[]).map((s: string, idx: number) => (
                    <span key={`${s}-${idx}`} className="bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-8" id="projects">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#1F3A5F]">Engineering Work</h2>
              <p className="text-xs text-slate-400">Search and filter active deployments below</p>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search project..."
                  value={projectSearchQuery}
                  onChange={e => setProjectSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#1F6F5F] w-full text-slate-800"
                />
              </div>
              {['All', 'DevOps', 'AI', 'Security'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedProjectCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedProjectCategory === cat 
                      ? 'bg-[#1F6F5F] text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((proj: any, idx: number) => (
              <div 
                key={idx} 
                onClick={() => setSelectedProject(proj)}
                className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 hover:border-[#1F6F5F] cursor-pointer transition-all space-y-3 relative group"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-[#1F6F5F]">{proj.name}</h3>
                  <span className="text-[9px] font-bold bg-[#1F6F5F]/10 text-[#1F6F5F] px-2 py-0.5 rounded-full uppercase">{proj.category}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1">
                  {proj.tech.slice(0, 3).map((t: string, i: number) => (
                    <span key={i} className="text-[9px] border border-slate-200 px-1.5 py-0.5 rounded bg-white font-mono text-slate-500">{t}</span>
                  ))}
                  {proj.tech.length > 3 && <span className="text-[9px] text-slate-400">+{proj.tech.length - 3} more</span>}
                </div>
                <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider group-hover:text-[#1F6F5F] transition-colors">
                  <span>Explore Architecture details</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#1F3A5F]">Milestones & History</h2>
            <p className="text-xs text-slate-400">Professional career timeline and impact achievements</p>
          </div>

          <div className="space-y-6 relative border-l border-slate-200 pl-6 ml-3">
            {currentProfile.experience.map((exp: any, idx: number) => (
              <div key={idx} className="relative space-y-2">
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#1F6F5F] border-4 border-white shadow"></span>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <h4 className="font-bold text-sm text-[#1F3A5F]">{exp.role} <span className="text-[#1F6F5F] font-semibold">@ {exp.company}</span></h4>
                  <span className="text-[10px] bg-slate-100 px-2.5 py-0.5 rounded-md font-mono text-slate-500">{exp.duration}</span>
                </div>
                {exp.description && <p className="text-xs text-slate-500 leading-relaxed">{exp.description}</p>}
                <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                  {(exp.bullets || exp.achievements || []).map((ach: string, i: number) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4" id="contact">
          <div>
            <h2 className="text-lg font-bold text-[#1F3A5F]">Send encrypted secure message</h2>
            <p className="text-xs text-slate-400">Simulate direct deployment and notification logs trigger</p>
          </div>

          {contactSuccess ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Deployment alert logs sent successfully! Saurav will receive this on Slack.</span>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={contactForm.name}
                    onChange={e => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full bg-white border border-slate-200 focus:border-[#1F6F5F] rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800"
                  />
                  {contactErrors.name && <span className="text-[9px] text-red-500 font-semibold">{contactErrors.name}</span>}
                </div>
                <div className="space-y-1">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={contactForm.email}
                    onChange={e => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full bg-white border border-slate-200 focus:border-[#1F6F5F] rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800"
                  />
                  {contactErrors.email && <span className="text-[9px] text-red-500 font-semibold">{contactErrors.email}</span>}
                </div>
              </div>
              <div className="space-y-1">
                <textarea 
                  placeholder="Message payload details..." 
                  rows={3}
                  value={contactForm.message}
                  onChange={e => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full bg-white border border-slate-200 focus:border-[#1F6F5F] rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800"
                ></textarea>
                {contactErrors.message && <span className="text-[9px] text-red-500 font-semibold">{contactErrors.message}</span>}
              </div>
              <button className="bg-[#1F6F5F] hover:bg-[#1F6F5F]/90 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all shadow-sm flex items-center space-x-1">
                <Send className="h-3 w-3" />
                <span>Simulate Dispatch</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 text-xs text-slate-400 gap-4 mt-8">
          <span>© {new Date().getFullYear()} {currentProfile.fullName}. All rights reserved.</span>
          <div className="flex items-center space-x-4">
            <a href={userGithubUrl} target="_blank" rel="noreferrer" className="hover:text-[#1F6F5F] transition-colors text-slate-400">
              <Github className="h-4 w-4" />
            </a>
            <a href={userLinkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[#1F6F5F] transition-colors text-slate-400">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full text-[#2B2B2B] pb-16 text-left">
      
      {/* Top Banner section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1F3A5F]/5 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold flex items-center space-x-2.5 text-[#1F3A5F]">
            <Globe className="h-6 w-6 text-[#1F6F5F]" />
            <span>Interactive Portfolio Builder</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Deploy stunning animated web portfolios directly from parsed GitHub records.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Template Selectors */}
          <div className="flex items-center space-x-1.5 bg-slate-100 border border-[#1F3A5F]/10 rounded-xl p-1 shrink-0">
            <button 
              onClick={() => setSelectedTemplate('creative')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all flex items-center space-x-1 ${
                selectedTemplate === 'creative' ? 'bg-[#030712] text-white shadow-sm' : 'text-slate-400 hover:text-slate-500'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Creative AI</span>
            </button>
            <button 
              onClick={() => setSelectedTemplate('devops')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all flex items-center space-x-1 ${
                selectedTemplate === 'devops' ? 'bg-white text-slate-800 border border-slate-200 shadow-sm' : 'text-slate-400 hover:text-slate-500'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5 text-[#1F6F5F]" />
              <span>Classic Resume</span>
            </button>
            <button 
              onClick={() => setSelectedTemplate('modern')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all flex items-center space-x-1 ${
                selectedTemplate === 'modern' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-500'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Modern Slate</span>
            </button>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-100 border border-[#1F3A5F]/10 rounded-xl p-1 shrink-0">
            <button 
              onClick={() => setPreviewSize('desktop')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs font-bold transition-all ${
                previewSize === 'desktop' ? 'bg-white text-[#1F3A5F] shadow-sm' : 'text-slate-400 hover:text-slate-500'
              }`}
            >
              <Monitor className="h-4 w-4" />
              <span>Desktop</span>
            </button>
            <button 
              onClick={() => setPreviewSize('mobile')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs font-bold transition-all ${
                previewSize === 'mobile' ? 'bg-white text-[#1F3A5F] shadow-sm' : 'text-slate-400 hover:text-slate-500'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>Mobile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Controls, Right Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Ledger Settings and Logs */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Theme toggles inside builder controls */}
          <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Preview Parameters</h4>
            
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500">Toggle Subtheme</span>
              <button 
                onClick={() => setPreviewThemeMode(prev => prev === 'dark' ? 'light' : 'dark')}
                className="bg-white border border-[#1F3A5F]/10 text-[#1F3A5F] px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-all flex items-center space-x-1"
              >
                <span>Theme: {previewThemeMode === 'dark' ? '🌙 Dark' : '☀️ Light'}</span>
              </button>
            </div>
          </div>

          {/* GitHub Project Selector Checklist */}
          <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Choose Pinned Projects</h4>
            <p className="text-[10px] text-slate-400">Select which GitHub repositories will be featured as projects in your portfolio preview.</p>
            
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {(profile.repositories || []).length === 0 ? (
                <p className="text-[10px] text-slate-400 italic">No repositories found in parsed GitHub profile data. Fallback projects will display.</p>
              ) : (
                (profile.repositories || []).map((repo: any) => {
                  const isChecked = selectedGithubRepos.includes(repo.name);
                  return (
                    <label key={repo.name} className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer transition-all">
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => toggleGithubRepo(repo.name)}
                        className="rounded border-[#1F3A5F]/15 text-[#1F6F5F] focus:ring-[#1F6F5F] h-3.5 w-3.5 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] font-bold text-[#1F3A5F] truncate">{repo.name}</span>
                        {repo.language && <span className="block text-[8px] text-[#1F6F5F] font-bold uppercase tracking-wider">{repo.language}</span>}
                      </div>
                    </label>
                  );
                })
              )}
            </div>
          </div>

          {/* Subdomain form */}
          <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Deployment Parameters</h4>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vercel Subdomain</label>
              <div className="flex rounded-xl border border-[#1F3A5F]/10 overflow-hidden bg-[#FAFAF8]">
                <span className="bg-slate-100 border-r border-[#1F3A5F]/10 px-3 py-2.5 text-xs text-slate-400 flex items-center">https://</span>
                <input 
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="flex-1 bg-transparent px-3 py-2 text-xs focus:outline-none text-[#2B2B2B]"
                  placeholder="custom-portfolio"
                />
                <span className="bg-slate-100 border-l border-[#1F3A5F]/10 px-3 py-2.5 text-xs text-slate-400 flex items-center">.vercel.app</span>
              </div>
            </div>

            <button
              onClick={handleDeploy}
              disabled={deploying}
              className="w-full bg-[#1F6F5F] hover:bg-[#1F6F5F]/90 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center space-x-1.5 disabled:opacity-50"
            >
              {deploying ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Deploying on Edge...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Deploy Portfolio</span>
                </>
              )}
            </button>
          </div>

          {/* Sync Codebase Card */}
          <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Code Synchronization</h4>
              <p className="text-[10px] text-slate-400 mt-1">Initialize Git tree and push the generated portfolio codebase directly to your GitHub account.</p>
            </div>
            
            <button
              onClick={handleGitSync}
              disabled={syncingGit || deploying}
              className="w-full bg-[#1F3A5F] hover:bg-[#1F3A5F]/90 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center space-x-1.5 disabled:opacity-50"
            >
              {syncingGit ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Syncing Codebase...</span>
                </>
              ) : (
                <>
                  <Server className="h-3.5 w-3.5" />
                  <span>Sync Code to GitHub</span>
                </>
              )}
            </button>
          </div>

          {/* Build Terminal Logs */}
          {(deployLogs.length > 0 || gitLogs.length > 0) && (
            <div className="bg-[#2B2B2B] text-[#FAFAF8] rounded-2xl p-5 shadow-inner space-y-4 font-mono text-[10px] leading-relaxed text-left">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1F6F5F] animate-pulse"></span>
                  <span>Build Terminal</span>
                </span>
                <span className="text-slate-500">v2.0</span>
              </div>
              
              <div className="space-y-1 max-h-[150px] overflow-y-auto">
                {deployLogs.map((log, i) => (
                  <div key={i} className="text-[#FAFAF8]">{log}</div>
                ))}
                {gitLogs.map((log, i) => (
                  <div key={i} className="text-[#C8A96A]">{log}</div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Portfolio Preview Frame */}
        <div className={`lg:col-span-8 bg-white border border-[#1F3A5F]/10 rounded-2xl shadow-lg overflow-hidden transition-all mx-auto ${
          previewSize === 'mobile' ? 'max-w-[375px]' : 'w-full'
        }`}>
          {/* Frame Header */}
          <div className="bg-slate-100 border-b border-[#1F3A5F]/10 px-4 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5 text-[#1F3A5F]">
              <Lock className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-semibold select-none">{subdomain}.vercel.app</span>
            </div>
            {activeDeployUrl && (
              <a 
                href={activeDeployUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#1F6F5F] hover:text-[#1F6F5F]/80 flex items-center space-x-1 font-bold"
              >
                <span>Visit Live</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Render Templates */}
          <div className="relative max-h-[750px] overflow-y-auto">
            {selectedTemplate === 'modern' && renderModernDeveloper()}
            {selectedTemplate === 'creative' && renderInteractiveCreative()}
            {selectedTemplate === 'devops' && renderDevOpsTerminal()}
          </div>

        </div>

      </div>

      {/* Command Palette Modal */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c0f16] border border-[#00F5D4]/20 rounded-xl overflow-hidden max-w-lg w-full font-mono text-xs">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <span className="text-[#00F5D4]">Command Palette</span>
              <button onClick={() => setIsCommandPaletteOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-3 bg-slate-950 flex items-center">
              <Search className="h-4 w-4 text-slate-400 mr-2" />
              <input 
                type="text"
                placeholder="Type a section name or command (e.g. skills, projects, contact)..."
                value={commandPaletteQuery}
                onChange={e => setCommandPaletteQuery(e.target.value)}
                className="w-full bg-transparent border-none text-[#FFFFFF] focus:outline-none placeholder-slate-600"
                autoFocus
              />
            </div>

            <div className="p-2 space-y-1 max-h-[200px] overflow-y-auto">
              {[
                { name: 'Skills Matrix', desc: 'Jump to core skills' },
                { name: 'Deployments', desc: 'Jump to project showcase list' },
                { name: 'Bio Speeches', desc: 'View operator description summary' },
                { name: 'Credentials', desc: 'Verify professional certifications' }
              ].filter(item => 
                item.name.toLowerCase().includes(commandPaletteQuery.toLowerCase()) || 
                item.desc.toLowerCase().includes(commandPaletteQuery.toLowerCase())
              ).map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    if (item.name === 'Skills Matrix') {
                      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (item.name === 'Deployments') {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (item.name === 'Bio Speeches') {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="p-3 hover:bg-[#00F5D4]/10 rounded-lg cursor-pointer flex justify-between items-center text-slate-300"
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c0f16] border border-[#3B82F6]/20 rounded-2xl overflow-hidden max-w-2xl w-full text-left font-sans text-white text-xs">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] font-mono text-[9px] uppercase">{selectedProject.category}</span>
                <h3 className="font-extrabold text-sm text-white">{selectedProject.name}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">Description</h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">{selectedProject.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">Key Features</h4>
                <ul className="list-disc pl-4 text-slate-300 space-y-1.5 text-[11px]">
                  {(selectedProject.features || []).map((f: string, idx: number) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest font-mono">System Architecture Pattern</h4>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl font-mono text-[10px] text-[#00F5D4] overflow-x-auto whitespace-nowrap">
                  {selectedProject.architecture}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">Technology Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t: string, idx: number) => (
                    <span key={`${t}-${idx}`} className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-slate-300">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/5 bg-slate-950 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedProject(null)} 
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white font-semibold"
              >
                Close Specification
              </button>
              <a 
                href={selectedProject.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="px-4 py-2 bg-gradient-to-r from-[#00F5D4] to-[#3B82F6] hover:opacity-90 rounded-lg text-[#030712] font-black uppercase text-[9px] flex items-center space-x-1"
              >
                <Github className="h-3.5 w-3.5" />
                <span>View Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
