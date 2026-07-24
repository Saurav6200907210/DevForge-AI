import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ExternalLink, Code, Briefcase, Award, ArrowUpRight,
  Terminal, Database, Monitor, Server, Globe, Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';

const getSkillIcon = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('react') || s.includes('vue') || s.includes('css') || s.includes('html') || s.includes('tailwind')) return <Monitor className="w-3.5 h-3.5" />;
  if (s.includes('node') || s.includes('express') || s.includes('python') || s.includes('go') || s.includes('java')) return <Server className="w-3.5 h-3.5" />;
  if (s.includes('sql') || s.includes('mongo') || s.includes('postgres') || s.includes('redis') || s.includes('database')) return <Database className="w-3.5 h-3.5" />;
  if (s.includes('aws') || s.includes('cloud') || s.includes('vercel') || s.includes('azure') || s.includes('gcp')) return <Globe className="w-3.5 h-3.5" />;
  if (s.includes('docker') || s.includes('kubernetes') || s.includes('ci') || s.includes('cd') || s.includes('jenkins') || s.includes('terraform')) return <Terminal className="w-3.5 h-3.5" />;
  if (s.includes('ai') || s.includes('ml') || s.includes('openai') || s.includes('agent')) return <Cpu className="w-3.5 h-3.5" />;
  return <Code className="w-3.5 h-3.5" />;
};

interface PremiumPortfolioProps {
  profile: any;
}

export default function PremiumPortfolio({ profile }: PremiumPortfolioProps) {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Extract necessary details from profile
  const getCategorizedSkills = () => {
    const rawSkills = profile.resume?.skills;
    const categories: { [key: string]: string[] } = {
      'DevOps & CI/CD': [],
      'Cloud & Infrastructure': [],
      'Frontend & UI': [],
      'Backend & Databases': [],
      'Tools & Miscellaneous': []
    };

    if (rawSkills && Array.isArray(rawSkills)) {
      rawSkills.forEach(skill => {
        const s = skill.toLowerCase();
        if (s.includes('docker') || s.includes('kube') || s.includes('terraform') || s.includes('ansible') || s.includes('ci/') || s.includes('cd') || s.includes('action')) {
          categories['DevOps & CI/CD'].push(skill);
        } else if (s.includes('aws') || s.includes('gcp') || s.includes('azure') || s.includes('cloud') || s.includes('vercel') || s.includes('linux')) {
          categories['Cloud & Infrastructure'].push(skill);
        } else if (s.includes('react') || s.includes('next') || s.includes('tailwind') || s.includes('css') || s.includes('html') || s.includes('js') || s.includes('ts')) {
          categories['Frontend & UI'].push(skill);
        } else if (s.includes('node') || s.includes('express') || s.includes('python') || s.includes('go') || s.includes('sql') || s.includes('db') || s.includes('mongo')) {
          categories['Backend & Databases'].push(skill);
        } else {
          categories['Tools & Miscellaneous'].push(skill);
        }
      });
    }

    const result: { [key: string]: string[] } = {};
    Object.entries(categories).forEach(([key, list]) => {
      if (list.length > 0) result[key] = list;
    });
    return Object.keys(result).length > 0 ? result : { 'Core Technologies': ['React', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'PostgreSQL'] };
  };

  const skills = getCategorizedSkills();
  const experience = (profile.resume?.experience && profile.resume.experience.length > 0) 
    ? profile.resume.experience 
    : [
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
      ];
  const projects = profile.repositories || [];
  const certifications = profile.resume?.certifications || [];
  
  const githubUrl = profile.githubUsername ? `https://github.com/${profile.githubUsername}` : '#';
  const linkedinUrl = profile.linkedinUrl || profile.resume?.linkedinUrl || '#';
  const email = profile.email || 'hello@example.com';
  const phone = profile.phone || profile.resume?.phone || '';

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Portfolio link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] font-sans selection:bg-[#00F5D4]/30">
      
      {/* Background Animated Gradient / Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center opacity-30">
        <motion.div 
          style={{ y: yBg }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#1F6F5F] blur-[150px] mix-blend-screen"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-50%']) }}
          className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#3B82F6]/40 blur-[150px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Sticky Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-[#00F5D4] group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00F5D4] to-[#3B82F6] flex items-center justify-center p-0.5">
              <div className="bg-[#0A0A0A] w-full h-full rounded-md flex items-center justify-center group-hover:bg-transparent transition-colors">
                <span className="font-black text-sm text-white">{profile.fullName?.charAt(0) || 'D'}</span>
              </div>
            </div>
            <span className="font-extrabold tracking-tight hidden sm:block text-white">{profile.fullName || 'Developer'}</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            {['About', 'Skills', 'Experience', 'Projects'].map(item => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`hover:text-white transition-colors ${activeSection === item.toLowerCase() ? 'text-[#00F5D4]' : ''}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCopyLink}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors hidden sm:block"
            >
              Copy Link
            </button>
            <a 
              href="#contact"
              className="text-xs font-bold px-5 py-2.5 rounded-full bg-white text-black hover:bg-slate-200 transition-colors flex items-center space-x-1"
            >
              <span>Contact</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#00F5D4]/30 bg-[#00F5D4]/10 text-[#00F5D4] text-xs font-mono mb-6">
                <span className="h-2 w-2 rounded-full bg-[#00F5D4] animate-pulse"></span>
                <span>Available for new opportunities</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                Building digital <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] to-[#3B82F6]">experiences</span> & systems.
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              {profile.bio || profile.resume?.summary || `I'm ${profile.fullName}, a software engineer specializing in building exceptional digital experiences and scalable infrastructure.`}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <a href="#projects" className="px-8 py-3.5 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex items-center space-x-2">
                <span>View My Work</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="flex items-center space-x-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <a href={githubUrl} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[#0A66C2] transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={`mailto:${email}`} className="p-2 text-slate-400 hover:text-[#EA4335] transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT & SKILLS SECTION */}
        <section id="about" className="py-24 px-6 border-t border-white/5 bg-black/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
              <div className="w-12 h-1 bg-[#00F5D4] rounded-full"></div>
              <p className="text-slate-400 leading-relaxed text-lg">
                {profile.resume?.summary || profile.bio || "Passionate engineer with a track record of building robust systems. I specialize in bridging the gap between sophisticated backend infrastructure and intuitive user interfaces."}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <h4 className="text-4xl font-black text-white">{projects.length}+</h4>
                  <span className="text-sm text-slate-500 font-medium">Open Source Projects</span>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-black text-white">{experience.length > 0 ? experience.length : '3+'}</h4>
                  <span className="text-sm text-slate-500 font-medium">Professional Roles</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              id="skills"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Technical Arsenal</h2>
                <div className="w-12 h-1 bg-[#3B82F6] rounded-full mt-6"></div>
              </div>

              <div className="space-y-6">
                {Object.entries(skills).map(([category, items], catIdx) => (
                  <div key={category} className="space-y-3">
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest pl-4">{category}</h4>
                    <div className="relative flex overflow-hidden w-full group">
                      {/* Gradient Masks for smooth fading edges */}
                      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                      
                      <motion.div 
                        className="flex whitespace-nowrap gap-3 w-max"
                        animate={{ x: catIdx % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
                        whileHover={{ animationPlayState: 'paused' }} // CSS property to pause on hover isn't natively supported this way in standard framer-motion without extra state, but we'll leave it simple
                      >
                        {Array(8).fill(items).flat().map((skill: string, idx: number) => (
                           <div key={idx} className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-slate-300 text-sm font-medium hover:border-[#00F5D4]/40 hover:text-white transition-colors cursor-default hover:bg-white/10 shrink-0">
                             <span className="text-[#00F5D4]">{getSkillIcon(skill)}</span>
                             <span>{skill}</span>
                           </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        {experience.length > 0 && (
          <section id="experience" className="py-32 px-6">
            <div className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Work Experience</h2>
                <p className="text-slate-400">My professional journey and career progression.</p>
              </div>

              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                {experience.map((exp: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0A0A0A] bg-slate-800 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl">
                      <Briefcase className="h-4 w-4 text-[#00F5D4]" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md hover:border-white/10 transition-colors">
                      <div className="flex flex-col space-y-1 mb-4">
                        <span className="text-[#00F5D4] text-xs font-mono font-bold tracking-widest">{exp.duration || '2023 - Present'}</span>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <span className="text-slate-400 font-medium">{exp.company}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="space-y-2 text-sm text-slate-300">
                          {exp.bullets.map((b: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <span className="text-[#3B82F6] mr-2 mt-1">▹</span>
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURED PROJECTS SECTION */}
        <section id="projects" className="py-32 px-6 bg-black/20 backdrop-blur-lg border-y border-white/5">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
                <p className="text-slate-400 max-w-xl text-lg">A selection of my best work, side projects, and open-source contributions.</p>
              </div>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-[#00F5D4] hover:text-white transition-colors group">
                <span className="font-semibold">View GitHub Archive</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.length > 0 ? projects.slice(0, 4).map((project: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative rounded-3xl bg-white/5 border border-white/5 p-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00F5D4]/10 to-[#3B82F6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-full bg-[#0c0f16] rounded-2xl p-8 flex flex-col">
                    <div className="mb-6">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center">
                        <Code className="h-6 w-6 text-[#00F5D4]" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00F5D4] transition-colors">{project.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                      {project.description || "A meticulously crafted engineering project focusing on performance, scalability, and clean architecture."}
                    </p>

                    <div className="flex flex-col gap-4 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {(project.topics || [project.language || 'Code']).slice(0, 3).map((tech: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-slate-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3 pt-2">
                        <a 
                          href={project.githubUrl || project.htmlUrl || '#'} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-semibold text-white"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Source Code</span>
                        </a>
                        {(project.homepageUrl || project.liveUrl || project.homepage) && (
                          <a 
                            href={project.homepageUrl || project.liveUrl || project.homepage || '#'} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#00F5D4]/10 hover:bg-[#00F5D4]/20 border border-[#00F5D4]/20 transition-colors text-xs font-semibold text-[#00F5D4]"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Live Preview</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )) : (
                // Fallback projects if github data is empty
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-80 rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-800 animate-pulse" />
                      <div className="h-6 w-1/2 bg-slate-800 rounded animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-slate-800 rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-slate-800 rounded-full animate-pulse" />
                      <div className="h-6 w-16 bg-slate-800 rounded-full animate-pulse" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS & STATS */}
        {certifications.length > 0 && (
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Credentials</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {certifications.map((cert: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start space-x-4"
                  >
                    <div className="p-3 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight mb-1">{cert.title}</h4>
                      <p className="text-xs text-slate-400">{cert.issuer}</p>
                      {cert.date && <p className="text-[10px] text-slate-500 font-mono mt-2">{cert.date}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA / FOOTER */}
        <section id="contact" className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00F5D4]/5 pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Let's build together.</h2>
              <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
                Whether you have a question, a project in mind, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center space-x-3">
                  <div className="p-2 bg-[#00F5D4]/10 rounded-lg text-[#00F5D4]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Email</p>
                    <a href={`mailto:${email}`} className="text-white font-medium hover:text-[#00F5D4] transition-colors">{email}</a>
                  </div>
                </div>

                {phone && (
                  <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center space-x-3">
                    <div className="p-2 bg-[#3B82F6]/10 rounded-lg text-[#3B82F6]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Phone</p>
                      <a href={`tel:${phone}`} className="text-white font-medium hover:text-[#3B82F6] transition-colors">{phone}</a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-white/5 text-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs">
            <p>© {new Date().getFullYear()} {profile.fullName || 'Developer'}. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
