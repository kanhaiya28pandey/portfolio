import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  LayoutGrid,
  List,
  ArrowRight,
  Sparkles,
  Layers,
  Code,
  Infinity as InfinityIcon,
  ChevronDown,
} from 'lucide-react';
import { InteractiveUniverse25D } from '../components/universe/InteractiveUniverse25D';
import {
  TechInspectorCard,
  getSkillProficiencyPercentage,
} from '../components/skills/TechInspectorCard';
import { SkillsUniverseSidebar } from '../components/skills/SkillsUniverseSidebar';
import { SkillDetailModal } from '../components/skills/SkillDetailModal';
import { TechLogo } from '../components/common/TechIcons';
import { getCategoryTheme, getTechDetails } from '../utils/techRelationships';
import { useTheme } from '../context/ThemeContext';
import type { Skill } from '../types/portfolio';

interface SkillsUniverseSectionProps {
  skills: Skill[];
}

export const SkillsUniverseSection: React.FC<SkillsUniverseSectionProps> = ({ skills }) => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  // Initial state is null (no tech pre-selected so no phantom buttons appear on scroll)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const [modalSkill, setModalSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'proficiency' | 'category'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredSkillId, setHoveredSkillId] = useState<number | null>(null);

  const universeRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl+K keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute category counts dynamically across all categories
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      CORE: 0,
      FRONTEND: 0,
      BACKEND: 0,
      DATABASE: 0,
      TOOLS: 0,
    };
    skills.forEach((s) => {
      const cat = s.category?.trim().toUpperCase() || 'CORE';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [skills]);

  // Filter & Sort Technology Directory Cards
  const filteredSkills = useMemo(() => {
    let list = skills.filter((s) => {
      const cat = s.category?.toUpperCase() || 'CORE';
      const matchCat =
        activeCategory === 'ALL' || cat === activeCategory.toUpperCase();
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.relatedConcepts && s.relatedConcepts.some((c) => c.toLowerCase().includes(q)));
      return matchCat && matchSearch;
    });

    // Sorting
    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'category') {
      list = [...list].sort((a, b) => (a.category || '').localeCompare(b.category || ''));
    } else if (sortBy === 'proficiency') {
      list = [...list].sort(
        (a, b) => getSkillProficiencyPercentage(b) - getSkillProficiencyPercentage(a)
      );
    } else {
      // 'relevance' (default order matching displayOrder / priority in Pic 1)
      list = [...list].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }

    return list;
  }, [skills, activeCategory, searchQuery, sortBy]);

  // Two-way interaction: selecting skill
  const handleSelectSkill = (skill: Skill, shouldScroll: boolean = false) => {
    setSelectedSkill(skill);

    if (window.innerWidth < 1024) {
      setModalSkill(skill);
    } else if (shouldScroll && universeRef.current) {
      universeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Coordinated close handler for mobile & desktop
  const handleCloseInspector = () => {
    setSelectedSkill(null);
    setModalSkill(null);
  };

  // Select related skill by name (from Inspector card buttons)
  const handleSelectRelatedByName = (techName: string) => {
    const q = techName.toLowerCase();
    const found = skills.find(
      (s) =>
        s.name.toLowerCase() === q ||
        s.name.toLowerCase().includes(q) ||
        q.includes(s.name.toLowerCase())
    );
    if (found) {
      setSelectedSkill(found);
    }
  };

  return (
    <section
      id="skills"
      aria-label="Skills Universe Section"
      className="scroll-mt-20 sm:scroll-mt-24 relative py-8 sm:py-10 lg:py-12 overflow-hidden select-text"
    >
      {/* Ambient background glows matching site design system */}
      <div
        className="absolute top-1/4 -left-48 w-[520px] h-[520px] rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6, 182, 212, 0.10) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 -right-48 w-[520px] h-[520px] rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* ========================================================================= */}
        {/* 1. HERO / HEADER SECTION (Centered, Matching Pic 1)                      */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-[0.22em] uppercase shadow-sm transition-colors ${
              isDark
                ? 'bg-cyan-950/40 border border-cyan-500/30 text-cyan-300'
                : 'bg-cyan-100 border border-cyan-300 text-cyan-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>EXPLORE • INTERACT • LEARN</span>
          </div>

          {/* Main Heading */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Skills{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Universe
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className={`text-xs sm:text-sm font-sans max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            An interactive map of the technologies and tools I use to build real-world solutions.
          </p>

          {/* Compact Statistics Row */}
          <div
            className={`flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-1 text-xs font-mono ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {skills.length || 23}
              </span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                Technologies
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-500" />
              <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {Object.keys(categoryCounts).length}
              </span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Domains</span>
            </div>

            <div className="flex items-center gap-2">
              <InfinityIcon className="w-4 h-4 text-emerald-500" />
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                Always Learning
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THREE-COLUMN DECK: SIDEBAR + UNIVERSE + INSPECTOR (Responsive)        */}
        {/* ========================================================================= */}
        <div
          ref={universeRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
        >
          {/* Left Column: Floating Glass Sidebar (Desktop: 3 cols | Mobile: order-2) */}
          <div className="order-2 lg:order-1 lg:col-span-3 xl:col-span-3 w-full h-full flex flex-col">
            <SkillsUniverseSidebar
              activeCategory={activeCategory}
              onSelectCategory={(id) => setActiveCategory(id)}
              searchQuery={searchQuery}
              onSearchChange={(q) => setSearchQuery(q)}
              categoryCounts={categoryCounts}
              totalCount={skills.length || 23}
              searchInputRef={searchInputRef}
              className="h-full"
            />
          </div>

          {/* Center Column: Planetary Universe Viewport (Desktop: 6 cols | Mobile: order-1) */}
          <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6 w-full h-full flex flex-col min-h-[480px] sm:min-h-[540px]">
            <InteractiveUniverse25D
              skills={skills}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              selectedSkill={selectedSkill}
              hoveredSkillId={hoveredSkillId}
              onHoverSkill={(id) => setHoveredSkillId(id)}
              onSelectSkill={(skill) => handleSelectSkill(skill, false)}
              className="h-full"
            />
          </div>

          {/* Right Column: Technology Inspector Card (Desktop: 3 cols | Mobile: modal/fallback) */}
          <div className="order-3 hidden lg:flex lg:col-span-3 xl:col-span-3 w-full h-full flex-col">
            <TechInspectorCard
              skill={selectedSkill}
              onClose={() => setSelectedSkill(null)}
              onSelectRelated={handleSelectRelatedByName}
              className="h-full"
            />
          </div>
        </div>


        {/* ========================================================================= */}
        {/* 3. ALL TECHNOLOGIES DIRECTORY HEADER & CONTROLS (Matching Pic 1)          */}
        {/* ========================================================================= */}
        <div
          className={`space-y-4 pt-5 border-t transition-colors ${
            isDark ? 'border-white/10' : 'border-slate-300/70'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left Title & Subtitle */}
            <div className="text-left space-y-0.5">
              <h3
                className={`text-lg sm:text-xl font-bold font-sans ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                All Technologies ({filteredSkills.length})
              </h3>
              <p
                className={`text-xs font-sans ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Browse all the tools and technologies I work with. Filter, search or sort to find what you're looking for.
              </p>
            </div>

            {/* Right Controls: Sort Dropdown & View Mode */}
            <div className="flex items-center gap-3">
              {/* Sort by Dropdown */}
              <div
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border transition-colors ${
                  isDark
                    ? 'bg-slate-900/90 border-white/15 text-slate-300'
                    : 'bg-white border-slate-300 text-slate-800 shadow-sm'
                }`}
              >
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                  Sort by:
                </span>
                <div className="relative flex items-center">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as 'relevance' | 'name' | 'proficiency' | 'category'
                      )
                    }
                    className={`bg-transparent font-bold focus:outline-none cursor-pointer pr-4 font-mono appearance-none ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    <option
                      value="relevance"
                      className={isDark ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-900'}
                    >
                      Relevance
                    </option>
                    <option
                      value="name"
                      className={isDark ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-900'}
                    >
                      Technology (A–Z)
                    </option>
                    <option
                      value="category"
                      className={isDark ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-900'}
                    >
                      Category
                    </option>
                    <option
                      value="proficiency"
                      className={isDark ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-900'}
                    >
                      Proficiency
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 pointer-events-none" />
                </div>
              </div>

              {/* View Mode Toggle: Grid / List */}
              <div
                className={`flex items-center p-1 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-900/90 border-white/15'
                    : 'bg-white border-slate-300 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* 4. 6-COLUMN CARDS GRID (Enhanced Micro-interactions & Dual Themes)     */}
          {/* ======================================================================= */}
          {filteredSkills.length === 0 ? (
            <div
              className={`py-14 text-center text-sm font-sans rounded-2xl border ${
                isDark
                  ? 'bg-slate-900/40 border-white/5 text-slate-400'
                  : 'bg-white border-slate-200 text-slate-600 shadow-sm'
              }`}
            >
              No technologies found matching "{searchQuery}".
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5">
              {filteredSkills.map((skill) => {
                const isHovered = hoveredSkillId === skill.id;
                const isSelected = selectedSkill?.id === skill.id;
                const theme = getCategoryTheme(skill.category);
                const details = getTechDetails(skill.name);
                const percentage = getSkillProficiencyPercentage(skill);
                // 5 segmented capsule bars
                const filled5 = Math.round((percentage / 100) * 5);

                // Badge color mapping matching Pic 1 & scalable for new domains
                const cat = (skill.category || 'CORE').toUpperCase();
                const badgeClasses =
                  cat === 'BACKEND'
                    ? isDark
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                      : 'bg-cyan-50 text-cyan-700 border-cyan-300'
                    : cat === 'FRONTEND'
                    ? isDark
                      ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                      : 'bg-blue-50 text-blue-700 border-blue-300'
                    : cat === 'DATABASE'
                    ? isDark
                      ? 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                      : 'bg-purple-50 text-purple-700 border-purple-300'
                    : cat === 'TOOLS'
                    ? isDark
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                    : cat.includes('AI') || cat.includes('ML') || cat.includes('DATA')
                    ? isDark
                      ? 'bg-pink-950/80 text-pink-300 border-pink-500/40'
                      : 'bg-pink-50 text-pink-700 border-pink-300'
                    : cat.includes('SECURITY') || cat.includes('CYBER') || cat.includes('FORENSIC')
                    ? isDark
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : cat.includes('CLOUD') || cat.includes('DEVOPS')
                    ? isDark
                      ? 'bg-teal-950/80 text-teal-300 border-teal-500/40'
                      : 'bg-teal-50 text-teal-700 border-teal-300'
                    : isDark
                    ? 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                    : 'bg-sky-50 text-sky-700 border-sky-300';

                return (
                  <div
                    key={`skill-card-${skill.name}-${skill.id}`}
                    onMouseEnter={() => setHoveredSkillId(skill.id)}
                    onMouseLeave={() => setHoveredSkillId(null)}
                    onClick={() => handleSelectSkill(skill, true)}
                    style={{
                      borderColor: isSelected
                        ? '#00F0FF'
                        : isHovered
                        ? theme.main
                        : isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(226, 232, 240, 0.9)',
                      boxShadow: isSelected
                        ? '0 0 24px rgba(0, 240, 255, 0.4)'
                        : isHovered
                        ? `0 12px 28px -4px ${theme.glow}, 0 0 12px ${theme.glow}`
                        : isDark
                        ? '0 4px 14px rgba(0,0,0,0.5)'
                        : '0 4px 16px rgba(0,0,0,0.06)',
                    }}
                    className={`cursor-pointer rounded-2xl backdrop-blur-xl border p-4 flex flex-col justify-between space-y-3.5 text-left transition-all duration-200 min-h-[162px] group hover:-translate-y-1.5 opacity-100 ${
                      isDark ? 'bg-[#091124]/90' : 'bg-white/95'
                    }`}
                  >
                    {/* Top Row: Tech Logo + Category Badge */}
                    <div className="flex items-start justify-between gap-2">
                      {/* Icon rotates/scales slightly on hover */}
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300 ease-out">
                        <TechLogo
                          name={skill.name}
                          iconKey={skill.iconKey}
                          className="w-6 h-6"
                        />
                      </div>

                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${badgeClasses}`}
                      >
                        {skill.category || 'CORE'}
                      </span>
                    </div>

                    {/* Middle: Title & 5-Capsule Segmented Bar */}
                    <div className="space-y-2">
                      <h4
                        className={`font-bold text-sm sm:text-base transition-colors font-sans truncate ${
                          isSelected
                            ? 'text-cyan-400'
                            : isHovered
                            ? isDark
                              ? 'text-cyan-300'
                              : 'text-blue-600'
                            : isDark
                            ? 'text-white'
                            : 'text-slate-900'
                        }`}
                      >
                        {skill.name}
                      </h4>

                      {/* 5 Segmented Capsule Bars */}
                      <div className="flex items-center gap-1.5 w-full">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const isFilled = i < filled5;
                          return (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                isFilled
                                  ? isHovered
                                    ? 'bg-cyan-300 shadow-[0_0_10px_#22D3EE] scale-y-110'
                                    : 'bg-cyan-400 shadow-[0_0_6px_#22D3EE]'
                                  : isDark
                                  ? 'bg-slate-800/80 border border-white/5'
                                  : 'bg-slate-200 border border-slate-300'
                              }`}
                              style={{
                                transitionDelay: isHovered ? `${i * 45}ms` : '0ms',
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Row: Level text + Inspect Link */}
                    <div
                      className={`pt-2 border-t flex items-center justify-between transition-colors ${
                        isDark ? 'border-white/5' : 'border-slate-100'
                      }`}
                    >
                      <span
                        className={`text-xs font-sans capitalize ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {skill.proficiencyLevel?.toLowerCase() || details.level.toLowerCase()}
                      </span>
                      {/* Inspect link slides 4px right */}
                      <span
                        className={`flex items-center gap-1 text-[11px] font-mono font-semibold transition-colors ${
                          isDark ? 'text-cyan-400 group-hover:text-cyan-300' : 'text-blue-600 group-hover:text-blue-700'
                        }`}
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-2">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill?.id === skill.id;
                const percentage = getSkillProficiencyPercentage(skill);
                const details = getTechDetails(skill.name);
                const theme = getCategoryTheme(skill.category);

                return (
                  <div
                    key={skill.id}
                    onClick={() => handleSelectSkill(skill, true)}
                    className={`cursor-pointer p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all duration-200 hover:-translate-y-0.5 ${
                      isSelected
                        ? isDark
                          ? 'border-cyan-400 bg-cyan-950/20 ring-1 ring-cyan-400'
                          : 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500'
                        : isDark
                        ? 'bg-[#091124]/90 border-white/10 hover:border-white/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isDark ? 'bg-slate-950' : 'bg-slate-100'
                        }`}
                      >
                        <TechLogo
                          name={skill.name}
                          iconKey={skill.iconKey}
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="text-left">
                        <div
                          className={`text-sm font-bold font-sans ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {skill.name}
                        </div>
                        <div
                          className={`text-xs capitalize ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {skill.category.toLowerCase()} •{' '}
                          {skill.proficiencyLevel?.toLowerCase() || details.level.toLowerCase()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isDark ? 'text-cyan-400' : 'text-blue-600'
                        }`}
                      >
                        {percentage}%
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                        style={{
                          color: theme.main,
                        }}
                      >
                        {skill.category}
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 ${
                          isDark ? 'text-cyan-400' : 'text-blue-600'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile / Tablet Inspection Modal */}
      <SkillDetailModal
        skill={modalSkill}
        onClose={handleCloseInspector}
      />

    </section>
  );
};
