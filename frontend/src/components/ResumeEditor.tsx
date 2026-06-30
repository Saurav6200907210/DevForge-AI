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

interface ResumeEditorProps {
  profile: any;
  onUpdateProfile: (updatedProfile: any) => void;
}

export default function ResumeEditor({ profile, onUpdateProfile }: ResumeEditorProps) {
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
  const [projects, setProjects] = useState<any[]>(resume.projects || []);

  // Technical Achievements editing states
  const [achievements, setAchievements] = useState<any[]>(resume.achievements || []);

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
    setExperiences([
      ...experiences,
      { company: 'New Company', role: 'Software Engineer', duration: '2026 - Present', bullets: ['Built custom database query hooks mapping high throughput metrics.'] }
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
              { id: 'details', name: 'Clinical Details' },
              { id: 'experience', name: 'Professional History' },
              { id: 'projects', name: 'Featured Projects' },
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
                </div>
              ))}
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#1F3A5F]/5 pb-3">
                <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Featured Repositories</h4>
                <button 
                  onClick={addProject}
                  className="text-xs font-bold text-[#1F6F5F] hover:text-[#1F6F5F]/80 flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No projects defined. Click "Add Project" to begin.
                </div>
              ) : (
                <div className="space-y-6">
                  {projects.map((project, idx) => (
                    <div key={idx} className="p-5 border border-[#1F3A5F]/5 rounded-xl bg-[#FAFAF8]/50 space-y-4 relative group">
                      <button 
                        onClick={() => removeProject(idx)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            value={project.githubUrl}
                            onChange={(e) => updateProject(idx, 'githubUrl', e.target.value)}
                            className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(idx, 'description', e.target.value)}
                          rows={2}
                          className="w-full bg-white border border-[#1F3A5F]/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B] resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="bg-white/70 border border-[#1F3A5F]/5 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#1F3A5F]/5 pb-3">
                <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Technical Achievements</h4>
                <button 
                  onClick={addAchievement}
                  className="text-xs font-bold text-[#1F6F5F] hover:text-[#1F6F5F]/80 flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Achievement</span>
                </button>
              </div>

              {achievements.length === 0 ? (
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
