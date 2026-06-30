import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Github, 
  Server, 
  Play, 
  RefreshCw, 
  Globe, 
  Compass, 
  ArrowRight,
  Briefcase,
  Terminal,
  Code,
  Grid,
  Lock
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
  const [selectedTheme, setSelectedTheme] = useState(portfolio.theme || 'emerald');
  
  // Custom subdomain states
  const [subdomain, setSubdomain] = useState(portfolio.vercelSubdomain || profile.githubUsername.toLowerCase());
  
  // Deployment & Git logs simulation states
  const [deploying, setDeploying] = useState(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [activeDeployUrl, setActiveDeployUrl] = useState(portfolio.deployedUrl || '');
  
  const [syncingGit, setSyncingGit] = useState(false);
  const [gitLogs, setGitLogs] = useState<string[]>([]);

  // Local state for searching projects inside preview frame
  const [searchProjectQuery, setSearchProjectQuery] = useState('');

  // Auto trigger deploy mockup simulation
  const handleDeploy = async () => {
    try {
      setDeploying(true);
      setDeployLogs([]);
      
      const res = await api.portfolios.deploy(profile.id, subdomain);
      if (res.success) {
        // Stream simulated build logs sequentially
        for (let i = 0; i < res.logs.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 650));
          setDeployLogs(prev => [...prev, res.logs[i]]);
        }
        setActiveDeployUrl(res.deployedUrl);
        // Sync profile status
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

      const res = await api.portfolios.pushRepo(profile.id, `${subdomain}-portfolio`);
      if (res.success) {
        // Stream Git syncing logs sequentially
        for (let i = 0; i < res.logs.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 550));
          setGitLogs(prev => [...prev, res.logs[i]]);
        }
      }
    } catch (err) {
      console.error('Git synchronization failed:', err);
    } finally {
      setSyncingGit(false);
    }
  };

  // Convert profile languages data to array list
  const languagesList = Object.entries(profile.analysis?.languages || {}).map(([key, val]) => ({
    label: key,
    value: Number(val)
  })).slice(0, 5);

  if (languagesList.length === 0) {
    languagesList.push({ label: 'TypeScript', value: 45 }, { label: 'JavaScript', value: 30 }, { label: 'Python', value: 25 });
  }

  const projectsList = profile.resume?.projects || [];
  const filteredProjects = projectsList.filter((p: any) => 
    p.name.toLowerCase().includes(searchProjectQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchProjectQuery.toLowerCase())
  );

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

        <div className="flex items-center space-x-3 bg-slate-100 border border-[#1F3A5F]/10 rounded-xl p-1 shrink-0">
          <button 
            onClick={() => setPreviewSize('desktop')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-xs font-bold transition-all ${
              previewSize === 'desktop' ? 'bg-white text-[#1F3A5F] shadow-sm' : 'text-slate-400 hover:text-slate-500'
            }`}
          >
            <Monitor className="h-4 w-4" />
            <span>Desktop</span>
          </button>
          <button 
            onClick={() => setPreviewSize('mobile')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-xs font-bold transition-all ${
              previewSize === 'mobile' ? 'bg-white text-[#1F3A5F] shadow-sm' : 'text-slate-400 hover:text-slate-500'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls, Right Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Ledger Settings and Logs */}
        <div className="lg:col-span-4 space-y-6">
          
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

          {/* Render Preview */}
          <div className="p-6 md:p-8 space-y-8 bg-[#FAFAF8] min-h-[600px] relative overflow-hidden text-[#2B2B2B]">
            <div className="relative space-y-8">
              
              {/* Header Navbar */}
              <div className="flex justify-between items-center border-b border-[#1F3A5F]/5 pb-4">
                <span className="font-extrabold text-sm text-[#1F3A5F]">{profile.fullName}.dev</span>
                <div className="flex space-x-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="text-[#1F6F5F]">Projects</span>
                  <span>Analytics</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* Bio & Intro */}
              <div className="text-left space-y-3">
                <h3 className="text-xl font-extrabold text-[#1F3A5F]">Hello, I'm {profile.fullName}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-lg">{profile.resume?.summary}</p>
              </div>

              {/* Languages Spectrum */}
              <div className="space-y-3 text-left">
                <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Language Proficiency</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {languagesList.map((item, idx) => (
                    <div key={idx} className="p-3 bg-white border border-[#1F3A5F]/5 rounded-xl shadow-sm space-y-1">
                      <span className="block text-[10px] font-bold text-slate-400">{item.label}</span>
                      <span className="block text-base font-extrabold text-[#1F3A5F]">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="space-y-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F3A5F]/5 pb-2">
                  <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">Featured Repositories</h4>
                  <input 
                    type="text"
                    value={searchProjectQuery}
                    onChange={(e) => setSearchProjectQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="bg-white border border-[#1F3A5F]/10 rounded-lg px-2.5 py-1 text-[10px] focus:outline-none focus:border-[#1F6F5F] text-[#2B2B2B] w-full sm:w-40"
                  />
                </div>

                {filteredProjects.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No matching repositories found.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProjects.map((proj: any, idx: number) => (
                      <div key={idx} className="p-4 border border-[#1F3A5F]/5 rounded-xl bg-white shadow-sm space-y-2 text-left hover:border-[#1F6F5F]/30 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-[#1F3A5F] truncate">{proj.name}</span>
                          <span className="text-[9px] bg-[#1F6F5F]/5 text-[#1F6F5F] border border-[#1F6F5F]/10 font-bold px-2 py-0.5 rounded-full">
                            ★ {proj.stars || 0}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                        {proj.githubUrl && (
                          <a 
                            href={proj.githubUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[9px] font-bold text-[#1F6F5F] hover:underline inline-flex items-center space-x-0.5"
                          >
                            <span>View Source</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-[#1F3A5F]/5 text-[10px] text-slate-400">
                <span>© {new Date().getFullYear()} {profile.fullName}</span>
                <span>Powered by DevForge AI</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
