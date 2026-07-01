import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Trash2, 
  Plus, 
  Download, 
  RefreshCw, 
  ChevronRight, 
  Check,
  Briefcase,
  FileCode,
  CheckCircle,
  FileText,
  Save,
  Printer
} from 'lucide-react';
import { api } from '../api';

const generateTailoredBullets = (role: string, company: string): string[] => {
  const roleLower = role.toLowerCase();
  const comp = company || 'the company';
  
  const bullets: string[] = [];

  // Bullet 1: Core functionality based on role
  if (roleLower.includes('back') || roleLower.includes('api') || roleLower.includes('server') || roleLower.includes('django') || roleLower.includes('node') || roleLower.includes('nest') || roleLower.includes('golang') || roleLower.includes('go ')) {
    bullets.push(`Architected and implemented high-performance RESTful APIs and server-side logic at ${comp}, utilizing clean architecture and modular routing.`);
  } else if (roleLower.includes('front') || roleLower.includes('ui') || roleLower.includes('react') || roleLower.includes('next') || roleLower.includes('vue') || roleLower.includes('client') || roleLower.includes('design') || roleLower.includes('web')) {
    bullets.push(`Developed responsive client-side user interfaces and state management systems at ${comp}, utilizing modern component-driven patterns for page speed optimization.`);
  } else if (roleLower.includes('devops') || roleLower.includes('cloud') || roleLower.includes('sys') || roleLower.includes('aws') || roleLower.includes('infra') || roleLower.includes('docker') || roleLower.includes('k8s') || roleLower.includes('jenkins') || roleLower.includes('cicd') || roleLower.includes('ci/cd')) {
    bullets.push(`Designed and orchestrated secure containerized workflows and automated deployment pipelines at ${comp}, reducing pipeline run boundaries and server configuration friction.`);
  } else if (roleLower.includes('android') || roleLower.includes('ios') || roleLower.includes('mobile') || roleLower.includes('flutter') || roleLower.includes('native')) {
    bullets.push(`Built and optimized high-performance mobile application modules at ${comp}, integrating native APIs and local data persistence mechanisms for fluid user experiences.`);
  } else if (roleLower.includes('intern') || roleLower.includes('trainee') || roleLower.includes('junior')) {
    bullets.push(`Contributed directly to core application features at ${comp} during the internship, writing clean modular code and gaining practical experience in production-grade environments.`);
  } else {
    bullets.push(`Designed and deployed scalable software features at ${comp}, leveraging core engineering patterns to improve product quality and codebase maintainability.`);
  }

  // Bullet 2: Specific stack details or optimization
  if (roleLower.includes('data') || roleLower.includes('db') || roleLower.includes('sql') || roleLower.includes('mongo') || roleLower.includes('redis') || roleLower.includes('postgres') || roleLower.includes('mysql')) {
    bullets.push(`Normalized database schemas and optimized SQL/NoSQL queries, integrating caching mechanisms to decrease database latency under peak load times.`);
  } else if (roleLower.includes('front') || roleLower.includes('ui') || roleLower.includes('ux') || roleLower.includes('design') || roleLower.includes('web')) {
    bullets.push(`Transformed wireframes and design mockups into pixel-perfect web elements, ensuring cross-browser compatibility and optimized client asset size.`);
  } else if (roleLower.includes('devops') || roleLower.includes('cloud') || roleLower.includes('infra')) {
    bullets.push(`Configured cloud resource monitoring and log visualization dashboards, monitoring system metrics to preemptively identify infrastructure bottlenecks.`);
  } else {
    bullets.push(`Optimized application throughput and database querying speeds by implementing structured caching mechanisms and refactoring legacy code paths.`);
  }

  // Bullet 3: Quality assurance / testing / DevOps automation
  if (roleLower.includes('devops') || roleLower.includes('infra') || roleLower.includes('ci') || roleLower.includes('cd')) {
    bullets.push(`Built multi-stage deployment workflows and automated verification testing suites, achieving zero-downtime rolling updates in production.`);
  } else {
    bullets.push(`Authored comprehensive unit and integration testing suites, achieving increased code coverage and ensuring build stability across releases.`);
  }

  // Bullet 4: Professional collaboration / learning / Agile delivery
  if (roleLower.includes('intern') || roleLower.includes('trainee') || roleLower.includes('junior') || roleLower.includes('student')) {
    bullets.push(`Collaborated actively with cross-functional development teams, participating in Agile sprints, code reviews, and technical documentation audits.`);
  } else {
    bullets.push(`Collaborated with senior architects and product managers to translate complex specifications into modular, scalable, and well-documented technical deliverables.`);
  }

  return bullets;
};

const generateTailoredProjectBullets = (name: string, description: string): string[] => {
  const nameLower = name.toLowerCase();
  const descLower = description.toLowerCase();
  const bullets: string[] = [];

  // 1. DevForge-AI
  if (nameLower.includes('devforge') || descLower.includes('career') || descLower.includes('resume optimizer')) {
    bullets.push("Architected a career intelligence platform that parses GitHub profiles to generate professional portfolios and ATS-optimized resumes.");
    bullets.push("Engineered a React and Express full stack architecture with real-time markdown rendering and PDF generation tools.");
    bullets.push("Implemented local quality auditing metrics to evaluate codebases, DevOps integration depth, and repository complexity.");
  }
  // 2. KubeVision
  else if (nameLower.includes('kubevision') || nameLower.includes('kube') || descLower.includes('kubernetes')) {
    bullets.push("Developed an interactive real-time topology dashboard to visualize complex Kubernetes cluster resources and configurations.");
    bullets.push("Designed a clean, component-driven React interface that maps nodes, services, and pods into a visual hierarchy.");
    bullets.push("Integrated active cluster state synchronization to present live status updates and network pathing of containerized apps.");
  }
  // 3. GitAnalyze-AI
  else if (nameLower.includes('gitanalyze') || nameLower.includes('git') || descLower.includes('github') || descLower.includes('analyser')) {
    bullets.push("Constructed an AI-powered GitHub profile analyzer utilizing public APIs to extract commit frequencies, PR velocities, and language splits.");
    bullets.push("Developed visual charts and graphs using custom canvas components to represent developer consistency and streaks.");
    bullets.push("Configured automated recommendations to advise developers on missing licenses, README details, and testing gaps.");
  }
  // 4. HireLens
  else if (nameLower.includes('hirelens') || descLower.includes('hiring') || descLower.includes('recruiter')) {
    bullets.push("Designed an AI hiring platform that parses resumes, ranks candidates, and generates recruiter-ready intelligence sheets.");
    bullets.push("Created dynamic, responsive recruiter dashboards with search filters, candidate profiles, and PDF report downloads.");
    bullets.push("Optimized candidate matching scoring latency using structured parsing algorithms and lightweight data storage.");
  }
  // 5. Startup Chronicle
  else if (nameLower.includes('startup') || nameLower.includes('chronicle') || descLower.includes('startup research')) {
    bullets.push("Built an AI startup research platform with competitor analysis, founder intelligence, and predictive business metrics.");
    bullets.push("Implemented PDF report generation and interactive visual graphs representing market cap and valuation changes.");
    bullets.push("Designed clean modular components to display predictive insights, reducing layout shifts and query load bounds.");
  }
  // 6. Terraform EC2
  else if (nameLower.includes('terraform') || nameLower.includes('ec2') || descLower.includes('terraform')) {
    bullets.push("Provisioned AWS EC2 infrastructure using Terraform (IaC) with dynamic AMI lookups and VPC routing policies.");
    bullets.push("Orchestrated secure Security Groups and IAM Roles to enforce strict access rules and minimize cloud exposure risks.");
    bullets.push("Created modular, dry (Don't Repeat Yourself) Terraform files to enable rapid, repeatable infrastructure deployments.");
  }
  // 7. CI/CD or Jenkins
  else if (nameLower.includes('jenkins') || nameLower.includes('ci-cd') || descLower.includes('jenkins') || descLower.includes('webhook')) {
    bullets.push("Configured end-to-end automated CI/CD pipelines utilizing Jenkins, GitHub Webhooks, Docker, and AWS EC2.");
    bullets.push("Integrated automated email notifications and Slack alerts to instantly report build failures or pipeline statuses.");
    bullets.push("Created multi-stage Docker builds to package NestJS/Express services, reducing production container sizes by 40%.");
  }
  // 8. General DevOps
  else if (nameLower.includes('docker') || descLower.includes('docker') || descLower.includes('container')) {
    bullets.push("Containerized real-time applications using multi-stage Docker configurations to ensure environment consistency.");
    bullets.push("Orchestrated multi-service environments with Docker Compose, managing volume storage and network linking.");
    bullets.push("Integrated health check scripts and recovery parameters inside containers for self-healing application deployments.");
  }
  // 9. Monitoring (Grafana/Prometheus)
  else if (nameLower.includes('grafana') || nameLower.includes('prometheus') || descLower.includes('monitor')) {
    bullets.push("Set up Prometheus metrics collection on Express.js apps, capturing request latencies and error rates.");
    bullets.push("Designed professional Grafana dashboards to visualize server CPU, memory, and database connection metrics.");
    bullets.push("Configured custom alerting rules with email/Slack integrations for preemptive infrastructure warning cycles.");
  }
  // 10. General Frontend
  else if (descLower.includes('website') || descLower.includes('landing') || descLower.includes('portfolio') || descLower.includes('dashboard')) {
    bullets.push("Developed a responsive web interface using React and Tailwind CSS, achieving high Lighthouse scores.");
    bullets.push("Integrated smooth micro-animations and layouts to elevate user experience across mobile and desktop viewports.");
    bullets.push("Authored clean modular structures to separate design components, improving readability and code maintainability.");
  }
  // 11. General/Fallback
  else {
    bullets.push(`Architected and developed the ${name} platform to resolve specific developer workflow bottlenecks.`);
    bullets.push(`Leveraged modern programming paradigms and clean code patterns to write highly reusable components.`);
    bullets.push(`Established automated deployment guidelines and verified software integrity via automated testing suites.`);
  }

  return bullets.slice(0, 3);
};


interface ResumeEditorProps {
  profile: any;
  onUpdateProfile: (updatedProfile: any) => void;
  featuredRepos?: string[];
}

export default function ResumeEditor({ profile, onUpdateProfile, featuredRepos }: ResumeEditorProps) {
  const resume = profile.resume || {
    template: 'emerald',
    atsScore: 85,
    summary: '',
    skills: [],
    projects: [],
    achievements: []
  };

  const [activeTab, setActiveTab] = useState<'details' | 'experience' | 'projects' | 'achievements'>('details');
  const [selectedTemplate, setSelectedTemplate] = useState(resume.template || 'emerald');
  
  // Form editing states
  const [summary, setSummary] = useState(resume.summary || '');
  const [skillsString, setSkillsString] = useState(resume.skills?.join(', ') || '');
  
  // Experience editing states
  const [experiences, setExperiences] = useState<any[]>(resume.experience || [
    {
      company: 'TechForge Solutions',
      role: 'Senior Full Stack Developer',
      duration: '2024 - Present',
      bullets: [
        'Spearheaded transition to modular microservices using TypeScript and Go, increasing query performance by 40%.',
        'Built dynamic glassmorphic administrative control dashboards utilizing React, Framer Motion, and Tailwind CSS.',
        'Established automated Docker orchestration pipelines, shortening pipeline start bounds down to 40 seconds.'
      ]
    }
  ]);

  // Project editing states
  const [projects, setProjects] = useState<any[]>(() => {
    if (featuredRepos && featuredRepos.length > 0) {
      const allRepos = profile.repositories || [];
      return allRepos
        .filter((r: any) => featuredRepos.includes(r.name))
        .map((repo: any) => ({
          name: repo.name,
          githubUrl: repo.githubUrl || repo.html_url || '',
          homepageUrl: repo.homepageUrl || repo.homepage || '',
          description: repo.description || '',
          stars: repo.stars || 0,
          bullets: generateTailoredProjectBullets(repo.name, repo.description || '')
        }));
    }
    const baseProjects = resume.projects || [];
    return baseProjects.map((p: any) => {
      const hasGenericBullets = !p.bullets || p.bullets.length === 0 || p.bullets.some((b: string) => b.includes('leveraging modern software engineering patterns'));
      return {
        ...p,
        bullets: hasGenericBullets ? generateTailoredProjectBullets(p.name, p.description || '') : p.bullets
      };
    });
  });

  // Sync projects when featuredRepos or profile.repositories updates
  React.useEffect(() => {
    if (featuredRepos) {
      const allRepos = profile.repositories || [];
      const syncedProjects = allRepos
        .filter((r: any) => featuredRepos.includes(r.name))
        .map((repo: any) => ({
          name: repo.name,
          githubUrl: repo.githubUrl || repo.html_url || '',
          homepageUrl: repo.homepageUrl || repo.homepage || '',
          description: repo.description || '',
          stars: repo.stars || 0,
          bullets: generateTailoredProjectBullets(repo.name, repo.description || '')
        }));
      setProjects(syncedProjects);
    }
  }, [featuredRepos, profile.repositories]);

  // Technical Achievements editing states
  const [achievements, setAchievements] = useState<any[]>(resume.achievements || []);
  const [showAchievements, setShowAchievements] = useState<boolean>(resume.showAchievements !== false);

  // Education editing states
  const [education, setEducation] = useState<any>(() => {
    return resume.education || {
      tenth: { schoolName: '', year: '', marks: '' },
      twelfth: { schoolName: '', year: '', marks: '' },
      college: { collegeName: '', degree: '', year: '', marks: '' }
    };
  });

  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [improvingSection, setImprovingSection] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Trigger Local AI optimization for sections
  const handleAiImprove = async (section: string) => {
    try {
      setImprovingSection(section);
      setAiSuggestions([]);
      
      let contentToImprove = '';
      if (section === 'summary') contentToImprove = summary;
      else if (section === 'experience') contentToImprove = JSON.stringify(experiences[0]?.bullets || '');
      else if (section === 'projects') contentToImprove = JSON.stringify(projects[0]?.description || '');

      const res = await api.resumes.improve(profile.id, section, contentToImprove);
      
      if (res.success) {
        setAiSuggestions(res.suggestions);
        if (section === 'summary') {
          setSummary(res.improvedContent);
        }
      }
    } catch (err) {
      console.error('AI improvement failed:', err);
    } finally {
      setImprovingSection(null);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const skillsArray = skillsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
      
      const updatedResume = {
        ...resume,
        template: selectedTemplate,
        summary,
        skills: skillsArray,
        experience: experiences,
        projects,
        achievements,
        showAchievements,
        education,
        atsScore: Math.min(98, 85 + (skillsArray.length > 5 ? 5 : 0) + (experiences.length > 0 ? 5 : 0))
      };

      const res = await api.resumes.save(profile.id, updatedResume);
      if (res.success) {
        onUpdateProfile({ 
          ...profile, 
          resume: res.resume,
          analysis: {
            ...profile.analysis,
            score: res.resume.atsScore
          }
        });
      }
    } catch (err) {
      console.error('Failed to save resume:', err);
    } finally {
      setSaving(false);
    }
  };

  // Printable layout window trigger
  const handlePrint = () => {
    window.print();
  };

  const addExperience = () => {
    const defaultCompany = 'New Company';
    const defaultRole = 'Software Engineer Intern';
    setExperiences([
      ...experiences,
      { 
        company: defaultCompany, 
        role: defaultRole, 
        duration: '2026 - Present', 
        bullets: generateTailoredBullets(defaultRole, defaultCompany)
      }
    ]);
  };

  const removeExperience = (idx: number) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { name: 'New Project', githubUrl: 'https://github.com', description: 'Brief description.', stars: 0, bullets: ['Accomplished X utilizing Y.'] }
    ]);
  };

  const removeProject = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const addAchievement = () => {
    setAchievements([...achievements, 'New technical achievement or certification']);
  };

  const removeAchievement = (idx: number) => {
    setAchievements(achievements.filter((_, i) => i !== idx));
  };

  const updateAchievement = (idx: number, value: string) => {
    const updated = [...achievements];
    updated[idx] = value;
    setAchievements(updated);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full text-[#2B2B2B] pb-16 text-left">
      
      {/* Upper action control banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1F3A5F]/5 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold flex items-center space-x-2.5 text-[#1F3A5F]">
            <FileText className="h-6 w-6 text-[#1F6F5F]" />
            <span>AI Resume Builder</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Customize your ATS-Optimized developer credentials and export print-ready PDFs.</p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button 
            onClick={handlePrint}
            className="bg-white hover:bg-slate-50 text-[#1F3A5F] border border-[#1F3A5F]/10 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center space-x-1.5"
          >
            <Printer className="h-3.5 w-3.5 text-[#C8A96A]" />
            <span>Print PDF</span>
          </button>
          
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-[#1F6F5F] hover:bg-[#1F6F5F]/90 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center space-x-1.5 disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                <span>Save Resume</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Main body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Parameters Form Editor */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tabs header bar */}
          <div className="flex border-b border-[#1F3A5F]/5 text-xs font-bold bg-white/50 p-1 rounded-xl border">
            {[
              { id: 'details', name: 'Profile Details' },
              { id: 'experience', name: 'Professional History' },
              { id: 'projects', name: 'Featured Projects' },
              { id: 'education', name: 'Education' },
              { id: 'achievements', name: 'Achievements' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2.5 text-center rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#1F3A5F] shadow-sm font-extrabold' 
                    : 'text-slate-400 hover:text-[#1F3A5F]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* TAB: DETAILS */}
          {activeTab === 'details' && (
            <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Professional Summary</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={5}
                  className="w-full bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F6F5F] transition-all text-[#2B2B2B] resize-none"
                  placeholder="Enter your professional summary..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Technical Skills (Comma Separated)</label>
                <textarea
                  value={skillsString}
                  onChange={(e) => setSkillsString(e.target.value)}
                  rows={4}
                  className="w-full bg-[#FAFAF8] border border-[#1F3A5F]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F6F5F] transition-all text-[#2B2B2B] resize-none"
                  placeholder="React, TypeScript, Node.js, Docker..."
                />
              </div>
            </div>
          )}

          {/* TAB: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#1F3A5F]/5 pb-3">
                <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Professional History</h4>
                <button 
                  onClick={addExperience}
                  className="text-xs font-bold text-[#1F6F5F] hover:text-[#1F6F5F]/80 flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              {experiences.map((exp, idx) => (
                <div key={idx} className="p-5 border border-[#1F3A5F]/5 rounded-xl bg-[#FAFAF8]/50 space-y-4 relative group">
                  <button 
                    onClick={() => removeExperience(idx)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Name</label>
                      <input 
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                        className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role / Title</label>
                      <input 
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(idx, 'role', e.target.value)}
                        className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</label>
                      <input 
                        type="text"
                        value={exp.duration}
                        onChange={(e) => updateExperience(idx, 'duration', e.target.value)}
                        className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-[#1F3A5F] uppercase tracking-wider">Experience Bullet Points</label>
                    <div className="flex items-center space-x-3">
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = [...experiences];
                          updated[idx].bullets = generateTailoredBullets(exp.role || '', exp.company || '');
                          setExperiences(updated);
                        }}
                        className="text-[10px] font-bold text-[#1F6F5F] hover:text-[#1F6F5F]/80 flex items-center space-x-1"
                        title="Generate 3-4 professional, ATS-optimized bullet points based on Role/Title and Company"
                      >
                        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                        <span>✨ Auto-Generate ATS Bullets</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = [...experiences];
                          updated[idx].bullets = [...(updated[idx].bullets || []), ''];
                          setExperiences(updated);
                        }}
                        className="text-[10px] font-bold text-slate-500 hover:text-slate-600 flex items-center space-x-1"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Bullet</span>
                      </button>
                    </div>
                    </div>

                    <div className="space-y-2">
                      {(exp.bullets || []).map((bullet: string, bIdx: number) => (
                        <div key={bIdx} className="flex items-center space-x-2">
                          <span className="text-slate-400 text-xs">•</span>
                          <input 
                            type="text"
                            value={bullet}
                            onChange={(e) => {
                              const updated = [...experiences];
                              updated[idx].bullets[bIdx] = e.target.value;
                              setExperiences(updated);
                            }}
                            placeholder="Describe what you did or learned (e.g. Developed scalable REST APIs using Express.js)"
                            className="flex-1 bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = [...experiences];
                              updated[idx].bullets = updated[idx].bullets.filter((_, bi) => bi !== bIdx);
                              setExperiences(updated);
                            }}
                            className="text-red-500 hover:text-red-600 p-1.5 bg-red-50 border border-red-200 rounded-lg shrink-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      {(exp.bullets || []).length === 0 && (
                        <div className="text-[11px] text-slate-400 italic">No bullets added yet. Click "Add Bullet" to add.</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#1F3A5F]/5 pb-3">
                <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Featured Repositories</h4>
                {!featuredRepos && (
                  <button 
                    onClick={addProject}
                    className="text-xs font-bold text-[#1F6F5F] hover:text-[#1F6F5F]/80 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Project</span>
                  </button>
                )}
              </div>

              {featuredRepos && (
                <p className="text-[10px] text-slate-400 leading-normal bg-slate-50 border border-[#1F3A5F]/5 p-3 rounded-xl">
                  💡 These repositories are synchronized with your <strong>Repository Analytics</strong> pins. Pin or unpin repositories there to change what's featured here.
                </p>
              )}

              {projects.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No projects defined. Click "Add Project" to begin.
                </div>
              ) : (
                <div className="space-y-6">
                  {projects.map((project, idx) => (
                    <div key={idx} className="p-5 border border-[#1F3A5F]/5 rounded-xl bg-[#FAFAF8]/50 space-y-4 relative group">
                      {!featuredRepos && (
                        <button 
                          onClick={() => removeProject(idx)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Name</label>
                          <input 
                            type="text"
                            value={project.name}
                            onChange={(e) => updateProject(idx, 'name', e.target.value)}
                            className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Repository URL</label>
                          <input 
                            type="text"
                            value={project.githubUrl || ''}
                            onChange={(e) => updateProject(idx, 'githubUrl', e.target.value)}
                            className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Demo URL (Optional)</label>
                          <input 
                            type="text"
                            value={project.homepageUrl || ''}
                            onChange={(e) => updateProject(idx, 'homepageUrl', e.target.value)}
                            placeholder="e.g. https://my-app.vercel.app"
                            className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                          />
                        </div>
                      </div>


                      <div className="space-y-2 border-t border-slate-100 pt-3">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-[#1F3A5F] uppercase tracking-wider">Project Key Features (ATS Bullet Points)</label>
                          <div className="flex items-center space-x-3">
                            <button 
                              type="button"
                              onClick={() => {
                                const updated = [...projects];
                                updated[idx].bullets = generateTailoredProjectBullets(project.name || '', project.description || '');
                                setProjects(updated);
                              }}
                              className="text-[10px] font-bold text-[#1F6F5F] hover:text-[#1F6F5F]/80 flex items-center space-x-1"
                              title="Generate 3 short, professional, ATS-optimized key features based on project README/description"
                            >
                              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                              <span>✨ Auto-Generate ATS Bullets</span>
                            </button>
                            <button 
                              type="button"
                              onClick={() => {
                                const updated = [...projects];
                                updated[idx].bullets = [...(updated[idx].bullets || []), ''];
                                setProjects(updated);
                              }}
                              className="text-[10px] font-bold text-slate-500 hover:text-slate-600 flex items-center space-x-1"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add Bullet</span>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {(project.bullets || []).map((bullet: string, bIdx: number) => (
                            <div key={bIdx} className="flex items-center space-x-2">
                              <span className="text-slate-400 text-xs">•</span>
                              <input 
                                type="text"
                                value={bullet}
                                onChange={(e) => {
                                  const updated = [...projects];
                                  updated[idx].bullets[bIdx] = e.target.value;
                                  setProjects(updated);
                                }}
                                placeholder="Describe a key feature or engineering achievement of the project"
                                className="flex-1 bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const updated = [...projects];
                                  updated[idx].bullets = updated[idx].bullets.filter((_, bi) => bi !== bIdx);
                                  setProjects(updated);
                                }}
                                className="text-red-500 hover:text-red-600 p-1.5 bg-red-50 border border-red-200 rounded-lg shrink-0"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                          {(project.bullets || []).length === 0 && (
                            <div className="text-[11px] text-slate-400 italic">No bullets added yet. Click "Add Bullet" to add.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: EDUCATION */}
          {activeTab === 'education' && (
            <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
              <div className="border-b border-[#1F3A5F]/5 pb-3">
                <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Education Details</h4>
              </div>

              {/* 10th Standard */}
              <div className="p-5 border border-[#1F3A5F]/5 rounded-xl bg-[#FAFAF8]/50 space-y-4 text-left">
                <h5 className="text-xs font-extrabold text-[#1F3A5F]">10th Standard (High School)</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">School Name</label>
                    <input 
                      type="text"
                      value={education.tenth?.schoolName || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        tenth: { ...education.tenth, schoolName: e.target.value }
                      })}
                      placeholder="e.g. St. Xavier's High School"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Passing Year</label>
                    <input 
                      type="text"
                      value={education.tenth?.year || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        tenth: { ...education.tenth, year: e.target.value }
                      })}
                      placeholder="e.g. 2020"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Marks / Percentage</label>
                    <input 
                      type="text"
                      value={education.tenth?.marks || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        tenth: { ...education.tenth, marks: e.target.value }
                      })}
                      placeholder="e.g. 92% or 9.5 CGPA"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                </div>
              </div>

              {/* 12th Standard */}
              <div className="p-5 border border-[#1F3A5F]/5 rounded-xl bg-[#FAFAF8]/50 space-y-4 text-left">
                <h5 className="text-xs font-extrabold text-[#1F3A5F]">12th Standard (Higher Secondary)</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">School / College Name</label>
                    <input 
                      type="text"
                      value={education.twelfth?.schoolName || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        twelfth: { ...education.twelfth, schoolName: e.target.value }
                      })}
                      placeholder="e.g. DAV Public School"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Passing Year</label>
                    <input 
                      type="text"
                      value={education.twelfth?.year || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        twelfth: { ...education.twelfth, year: e.target.value }
                      })}
                      placeholder="e.g. 2022"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Marks / Percentage</label>
                    <input 
                      type="text"
                      value={education.twelfth?.marks || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        twelfth: { ...education.twelfth, marks: e.target.value }
                      })}
                      placeholder="e.g. 89% or 8.8 CGPA"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                </div>
              </div>

              {/* College / University */}
              <div className="p-5 border border-[#1F3A5F]/5 rounded-xl bg-[#FAFAF8]/50 space-y-4 text-left">
                <h5 className="text-xs font-extrabold text-[#1F3A5F]">College / University</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">College Name</label>
                    <input 
                      type="text"
                      value={education.college?.collegeName || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        college: { ...education.college, collegeName: e.target.value }
                      })}
                      placeholder="e.g. IIT Delhi"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Degree / Course</label>
                    <input 
                      type="text"
                      value={education.college?.degree || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        college: { ...education.college, degree: e.target.value }
                      })}
                      placeholder="e.g. B.Tech in Computer Science"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Graduation Year</label>
                    <input 
                      type="text"
                      value={education.college?.year || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        college: { ...education.college, year: e.target.value }
                      })}
                      placeholder="e.g. 2026"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Marks / CGPA</label>
                    <input 
                      type="text"
                      value={education.college?.marks || ''}
                      onChange={(e) => setEducation({
                        ...education,
                        college: { ...education.college, marks: e.target.value }
                      })}
                      placeholder="e.g. 9.1 CGPA"
                      className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#1F3A5F]/5 pb-3">
                <div className="flex items-center space-x-4">
                  <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Technical Achievements</h4>
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={showAchievements}
                      onChange={(e) => setShowAchievements(e.target.checked)}
                      className="rounded border-[#1F3A5F]/20 text-[#1F6F5F] focus:ring-[#1F6F5F] h-4 w-4"
                    />
                    <span className="text-xs font-bold text-slate-500">Include in Resume</span>
                  </label>
                </div>
                {showAchievements && (
                  <button 
                    onClick={addAchievement}
                    className="text-xs font-bold text-[#1F6F5F] hover:text-[#1F6F5F]/80 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Achievement</span>
                  </button>
                )}
              </div>

              {!showAchievements ? (
                <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  🚫 Achievements section is disabled. It will not be shown in your exported resume.
                </div>
              ) : achievements.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No achievements listed. Click "Add Achievement" to begin.
                </div>
              ) : (
                <div className="space-y-3">
                  {achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <input 
                        type="text"
                        value={ach}
                        onChange={(e) => updateAchievement(idx, e.target.value)}
                        className="flex-1 bg-white border border-[#1F3A5F]/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                      />
                      <button 
                        onClick={() => removeAchievement(idx)}
                        className="text-red-500 hover:text-red-600 p-2 border border-red-200 rounded-xl bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Side: AI Assistant Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Optimise Card */}
          <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-[#1F3A5F]">
              <Sparkles className="h-5 w-5 text-[#C8A96A]" />
              <h4 className="font-bold text-sm">AI Resume Optimizer</h4>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed text-left">
              Click optimize to trigger our local AI engine. The assistant will evaluate your summary and suggest impact metrics and structured keyword updates.
            </p>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleAiImprove('summary')}
                disabled={improvingSection !== null}
                className="w-full py-2.5 px-4 bg-[#1F3A5F]/5 hover:bg-[#1F3A5F]/10 text-[#1F3A5F] rounded-xl text-xs font-bold transition-all border border-[#1F3A5F]/10 flex items-center justify-center space-x-1.5"
              >
                {improvingSection === 'summary' ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Optimizing Summary...</span>
                  </>
                ) : (
                  <span>Optimize Summary</span>
                )}
              </button>
            </div>
          </div>

          {/* AI Suggestions Results */}
          {aiSuggestions.length > 0 && (
            <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-4 animate-fadeIn">
              <h5 className="text-xs font-bold text-[#1F6F5F] uppercase tracking-wider flex items-center space-x-1.5">
                <Check className="h-4 w-4" />
                <span>Optimisation Recommendations</span>
              </h5>
              <ul className="space-y-2.5">
                {aiSuggestions.map((sug, idx) => (
                  <li key={idx} className="p-3 bg-[#FAFAF8]/50 border border-[#1F3A5F]/5 rounded-xl text-[11px] text-slate-500 leading-relaxed text-left flex items-start space-x-2">
                    <ChevronRight className="h-3.5 w-3.5 text-[#C8A96A] shrink-0 mt-0.5" />
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
