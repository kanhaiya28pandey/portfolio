import React, { useState, useMemo } from 'react';
import { Globe, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/common/BrandIcons';
import { ProjectDetailModal } from '../components/projects/ProjectDetailModal';
import { useTheme } from '../context/ThemeContext';
import type { Project } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Normalizes category strings into standardized display and filter labels
  const normalizeCategory = (cat: string): string => {
    const c = (cat || '').toUpperCase().trim();
    if (c.includes('AI') || c.includes('ML')) return 'AI / ML';
    if (c.includes('CYBER') || c.includes('SECURITY') || c.includes('FORENSIC')) return 'CYBER SECURITY';
    if (c.includes('CLOUD') || c.includes('DEVOPS')) return 'CLOUD & DEVOPS';
    if (c.includes('DATA') && (c.includes('ANALYSIS') || c.includes('ANALYTICS') || c.includes('SCIENCE'))) return 'DATA ANALYSIS';
    if (c.includes('DATABASE') || c.includes('SQL') || c.includes('DB')) return 'DATABASE';
    if (c.includes('FULL') || c.includes('STACK')) return 'FULLSTACK';
    if (c.includes('BACK')) return 'BACKEND';
    if (c.includes('FRONT')) return 'FRONTEND';
    return c || 'FULLSTACK';
  };

  // Derive categories dynamically from available projects
  const filters = useMemo(() => {
    const categoriesSet = new Set<string>();
    categoriesSet.add('ALL');
    projects.forEach((p) => {
      categoriesSet.add(normalizeCategory(p.category || 'FULLSTACK'));
    });
    return Array.from(categoriesSet);
  }, [projects]);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects;
    return projects.filter((p) => {
      return normalizeCategory(p.category || '') === activeFilter;
    });
  }, [projects, activeFilter]);

  // Helper to extract tools / skills for each project
  const getTools = (project: Project): string[] => {
    if (project.skills && project.skills.length > 0) {
      return project.skills.map((s) => s.name);
    }
    const t = (project.slug || project.title).toLowerCase();
    if (t.includes('resume')) {
      return ['React 19', 'FastAPI', 'Python', 'Gemini AI', 'MongoDB', 'ATS Engine'];
    }
    if (t.includes('youtube') || t.includes('yourtube')) {
      return ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'Socket.IO'];
    }
    if (t.includes('bank')) {
      return ['Java 17', 'Spring Boot 3.2', 'Spring Security', 'JWT', 'MongoDB', 'React 19', 'TypeScript', 'WebSocket'];
    }
    if (t.includes('student')) {
      return ['Python', 'Flask', 'MySQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'React', 'REST APIs'];
    }
    return ['Full Stack', 'Web Architecture', 'REST APIs'];
  };

  // Helper for project period / tag
  const getTag = (project: Project): string => {
    if (project.tag) return project.tag;
    return '2026';
  };

  // Helper for thumbnail image
  const getThumbnail = (project: Project): string => {
    if (project.thumbnailUrl && project.thumbnailUrl.trim().length > 0) {
      return project.thumbnailUrl;
    }
    if (project.bannerUrl && project.bannerUrl.trim().length > 0) {
      return project.bannerUrl;
    }
    const t = (project.slug || project.title).toLowerCase();
    if (t.includes('resume')) return '/assets/projects/resumeiq.jpg';
    if (t.includes('youtube') || t.includes('yourtube')) return '/assets/projects/youtube_clone.jpg';
    if (t.includes('bank')) return '/assets/projects/banking_system.jpg';
    if (t.includes('student')) return '/assets/projects/student_system.jpg';
    return '/assets/projects/resumeiq.jpg';
  };

  const getCategoryBadgeClass = (category: string, isDark: boolean): string => {
    const cat = normalizeCategory(category);
    if (cat === 'CYBER SECURITY') {
      return isDark
        ? 'bg-emerald-950/85 border-emerald-400/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
        : 'bg-emerald-50 border-emerald-300 text-emerald-800';
    }
    if (cat === 'CLOUD & DEVOPS') {
      return isDark
        ? 'bg-teal-950/85 border-teal-400/40 text-teal-300 shadow-[0_0_10px_rgba(20,184,166,0.25)]'
        : 'bg-teal-50 border-teal-300 text-teal-800';
    }
    if (cat === 'DATA ANALYSIS') {
      return isDark
        ? 'bg-amber-950/85 border-amber-400/40 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
        : 'bg-amber-50 border-amber-300 text-amber-800';
    }
    if (cat === 'DATABASE') {
      return isDark
        ? 'bg-purple-950/85 border-purple-400/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.25)]'
        : 'bg-purple-50 border-purple-300 text-purple-800';
    }
    if (cat === 'AI / ML') {
      return isDark
        ? 'bg-pink-950/85 border-pink-400/40 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.25)]'
        : 'bg-pink-50 border-pink-300 text-pink-800';
    }
    if (cat === 'BACKEND') {
      return isDark
        ? 'bg-cyan-950/85 border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.25)]'
        : 'bg-cyan-50 border-cyan-300 text-cyan-800';
    }
    if (cat === 'FRONTEND') {
      return isDark
        ? 'bg-blue-950/85 border-blue-400/40 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.25)]'
        : 'bg-blue-50 border-blue-300 text-blue-800';
    }
    return isDark
      ? 'bg-indigo-950/85 border-indigo-400/40 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.25)]'
      : 'bg-indigo-50 border-indigo-300 text-indigo-800';
  };

  return (
    <section
      id="projects"
      aria-label="Featured Projects Section"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden select-text"
    >
      {/* Ambient background glows matching design system */}
      <div
        className={`absolute top-1/4 -right-48 w-[520px] h-[520px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-300 ${
          isDark ? 'bg-indigo-600/12' : 'bg-indigo-500/10'
        }`}
      />
      <div
        className={`absolute top-2/3 -left-48 w-[520px] h-[520px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-300 ${
          isDark ? 'bg-blue-600/10' : 'bg-blue-500/8'
        }`}
      />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER                                                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-[0.22em] uppercase shadow-sm transition-colors ${
              isDark
                ? 'bg-indigo-950/40 border border-indigo-500/30 text-indigo-300'
                : 'bg-indigo-50 border border-indigo-200 text-indigo-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>PORTFOLIO SHOWCASE • PRODUCTION WORK</span>
          </div>

          {/* Main Heading */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className={`text-xs sm:text-sm font-sans max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Real-world full-stack, AI/ML, and web applications built with clean architecture, high performance, and scalable engineering.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_18px_rgba(79,70,229,0.45)] scale-105'
                      : isDark
                      ? 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400 shadow-sm'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. PROJECT CARDS GRID (1 Project = 1 Card, 4 Columns on Desktop)          */}
        {/* ========================================================================= */}
        {filteredProjects.length === 0 ? (
          <div
            className={`py-14 text-center text-sm font-sans rounded-2xl border ${
              isDark
                ? 'bg-slate-900/40 border-white/5 text-slate-400'
                : 'bg-white border-slate-200 text-slate-600 shadow-sm'
            }`}
          >
            No projects found matching the selected category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => {
              const tools = getTools(project);
              const tag = getTag(project);
              const thumbnail = getThumbnail(project);
              const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
              const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);
              const isFeatured = project.isFeatured ?? (project as any).featured ?? true;
              const normalizedCat = normalizeCategory(project.category || 'FULLSTACK');

              return (
                <div
                  key={`project-card-${project.slug || project.title}-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className={`group cursor-pointer rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-2 select-text opacity-100 ${
                    isDark
                      ? 'bg-[#091124]/90 border-white/10 hover:border-cyan-500/40 shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.8),0_0_22px_rgba(34,211,238,0.15)]'
                      : 'bg-white/95 border-slate-200/90 hover:border-blue-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]'
                  }`}
                >
                  {/* Top: Project Picture Banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                    <img
                      src={thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/projects/resumeiq.jpg';
                      }}
                    />

                    {/* Subtle gradient vignette at bottom of image for seamless card body blend */}
                    <div
                      className={`absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t ${
                        isDark ? 'from-[#091124] to-transparent' : 'from-white/95 to-transparent'
                      }`}
                    />

                    {/* Top-Left: Badges (Featured + Category) */}
                    <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none">
                      {isFeatured && (
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md border shadow-sm ${
                            isDark
                              ? 'bg-blue-950/85 border-blue-400/40 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                              : 'bg-blue-100/90 border-blue-300 text-blue-800'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>FEATURED</span>
                        </div>
                      )}
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md border shadow-sm ${getCategoryBadgeClass(
                          project.category || 'FULLSTACK',
                          isDark
                        )}`}
                      >
                        <span>{normalizedCat}</span>
                      </div>
                    </div>

                      {/* Bottom-Right: Period / Tag Badge */}
                      {tag && (
                        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                          <div
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium backdrop-blur-md border shadow-sm truncate max-w-[210px] ${
                              isDark
                                ? 'bg-slate-950/85 border-white/15 text-slate-300'
                                : 'bg-white/90 border-slate-300 text-slate-700'
                            }`}
                          >
                            {tag}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Middle: Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4 text-left">
                      <div className="space-y-2.5">
                        <h3
                          className={`font-bold text-lg sm:text-xl font-sans tracking-tight line-clamp-1 transition-colors ${
                            isDark
                              ? 'text-white group-hover:text-cyan-400'
                              : 'text-slate-900 group-hover:text-blue-600'
                          }`}
                        >
                          {project.title}
                        </h3>

                        <p
                          className={`text-xs sm:text-sm font-sans leading-relaxed line-clamp-3 ${
                            isDark ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {project.summary}
                        </p>
                      </div>

                      {/* Tools Used (Capsule Pills) */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium border transition-colors duration-200 ${
                              isDark
                                ? 'bg-[#061B2E]/60 text-cyan-300 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/40'
                                : 'bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300'
                            }`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Action Row: Live & GitHub Buttons */}
                      <div
                        className={`pt-3.5 border-t flex items-center gap-2.5 transition-colors ${
                          isDark ? 'border-white/10' : 'border-slate-100'
                        }`}
                      >
                        {/* Live Button (shown only if project is deployed) */}
                        {hasLive && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-mono font-bold tracking-wide shadow-[0_4px_14px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all duration-200 group/btn"
                          >
                            <Globe className="w-3.5 h-3.5 group-hover/btn:rotate-45 transition-transform duration-300" />
                            <span>Live</span>
                          </a>
                        )}

                        {/* GitHub Button */}
                        {hasGithub && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wide shadow-sm active:scale-95 transition-all duration-200 ${
                              hasLive
                                ? 'flex-1 bg-[#4338CA] hover:bg-[#3730A3] text-white shadow-[0_4px_14px_rgba(67,56,202,0.35)] hover:shadow-[0_6px_20px_rgba(67,56,202,0.5)]'
                                : 'w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-[0_4px_14px_rgba(79,70,229,0.35)]'
                            }`}
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Deep-Dive Architecture Inspection Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
