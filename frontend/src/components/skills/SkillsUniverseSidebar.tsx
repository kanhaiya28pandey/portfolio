import React, { useMemo } from 'react';
import {
  LayoutGrid,
  Brain,
  Monitor,
  Server,
  Database,
  Wrench,
  Search,
  Lightbulb,
  X,
  Shield,
  Sparkles,
  Cloud,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface CategoryFilterItem {
  id: string;
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface SkillsUniverseSidebarProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
  className?: string;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const SkillsUniverseSidebar: React.FC<SkillsUniverseSidebarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categoryCounts,
  totalCount,
  className = '',
  searchInputRef,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Dynamic category registration mapping
  const knownCategoryMeta: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
    CORE: { label: 'Core', icon: Brain },
    FRONTEND: { label: 'Frontend', icon: Monitor },
    BACKEND: { label: 'Backend', icon: Server },
    DATABASE: { label: 'Database', icon: Database },
    TOOLS: { label: 'Tools', icon: Wrench },
    'AI / ML': { label: 'AI & Machine Learning', icon: Sparkles },
    AIML: { label: 'AI & ML', icon: Sparkles },
    'MACHINE LEARNING': { label: 'Machine Learning', icon: Sparkles },
    'CYBER SECURITY': { label: 'Cyber Security', icon: Shield },
    CYBERSECURITY: { label: 'Cyber Security', icon: Shield },
    SECURITY: { label: 'Security', icon: Shield },
    FORENSICS: { label: 'Cyber Forensics', icon: Search },
    'CYBER FORENSIC': { label: 'Cyber Forensics', icon: Search },
    CLOUD: { label: 'Cloud & DevOps', icon: Cloud },
  };

  const categories: CategoryFilterItem[] = useMemo(() => {
    const list: CategoryFilterItem[] = [
      {
        id: 'ALL',
        label: 'All Technologies',
        count: totalCount || 23,
        icon: LayoutGrid,
      },
    ];

    // Standard primary order
    const primaryKeys = ['CORE', 'FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS'];
    primaryKeys.forEach((key) => {
      list.push({
        id: key,
        label: knownCategoryMeta[key]?.label || key,
        count: categoryCounts[key] ?? 0,
        icon: knownCategoryMeta[key]?.icon || Brain,
      });
    });

    // Any dynamically added custom categories (e.g. AI / ML, Cyber Security)
    Object.keys(categoryCounts).forEach((key) => {
      const upper = key.toUpperCase();
      if (!primaryKeys.includes(upper) && (categoryCounts[key] ?? 0) > 0) {
        const meta = knownCategoryMeta[upper] || {
          label: key,
          icon:
            upper.includes('AI') || upper.includes('ML')
              ? Sparkles
              : upper.includes('SECURITY') || upper.includes('CYBER') || upper.includes('FORENSIC')
              ? Shield
              : Lightbulb,
        };
        list.push({
          id: upper,
          label: meta.label,
          count: categoryCounts[key] ?? 0,
          icon: meta.icon,
        });
      }
    });

    return list;
  }, [categoryCounts, totalCount]);

  return (
    <div
      className={`w-full rounded-2xl backdrop-blur-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 select-none transition-colors duration-300 ${
        isDark
          ? 'bg-[#0B1226]/85 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
          : 'bg-white/95 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
      } ${className}`}
    >
      {/* 1. Category Filter Navigation List */}
      <div className="space-y-1.5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600/90 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-400/40 font-semibold'
                  : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-white'
                      : isDark
                      ? 'text-slate-400 group-hover:text-cyan-400'
                      : 'text-slate-500 group-hover:text-blue-600'
                  }`}
                />
                <span className="tracking-wide">{cat.label}</span>
              </div>

              {/* Count Badge */}
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white font-bold'
                    : isDark
                    ? 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'
                    : 'bg-slate-100 text-slate-600 group-hover:text-slate-900'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Integrated Search Input with Ctrl K Badge */}
      <div className="pt-1">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef as any}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search technology..."
            className={`w-full pl-9 pr-14 py-2 rounded-xl text-xs transition-all font-sans cursor-text focus:outline-none focus:ring-1 ${
              isDark
                ? 'bg-slate-900/90 border border-white/10 text-white placeholder-slate-400 focus:border-cyan-400/60 focus:ring-cyan-400/60'
                : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span
              className={`absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[9px] font-mono pointer-events-none ${
                isDark
                  ? 'bg-slate-800/90 border border-slate-700 text-slate-400'
                  : 'bg-slate-200 border border-slate-300 text-slate-600'
              }`}
            >
              Ctrl K
            </span>
          )}
        </div>
      </div>

      {/* 3. Helper Tip Box */}
      <div
        className={`p-3 rounded-xl flex items-start gap-2.5 transition-colors ${
          isDark
            ? 'bg-slate-900/60 border border-white/5 text-slate-400'
            : 'bg-slate-50 border border-slate-200 text-slate-600'
        }`}
      >
        <div className="p-1 rounded-lg bg-amber-500/10 text-amber-500 flex-shrink-0 mt-0.5">
          <Lightbulb className="w-3.5 h-3.5" />
        </div>
        <p className="text-[11px] font-sans leading-relaxed">
          Click a node, drag to rotate, scroll to zoom.
        </p>
      </div>
    </div>
  );
};
