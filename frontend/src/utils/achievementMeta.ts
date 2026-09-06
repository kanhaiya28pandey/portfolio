import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  Flame, 
  Target, 
  Rocket, 
  Code2, 
  Award 
} from 'lucide-react';
import type { Achievement } from '../types/portfolio';

export const getAchievementMeta = (ach: Partial<Achievement> | Achievement) => {
  const key = (ach.iconKey || '').toLowerCase();
  const metric = (ach.metricValue || '').toLowerCase();
  const title = (ach.title || '').toLowerCase();

  // 1. Trophy / Winner / 1st Place
  if (key === 'trophy' || metric.includes('1st') || metric.includes('winner') || title.includes('hackathon') || title.includes('winner')) {
    return {
      icon: Trophy,
      iconBg: 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30',
      badgeBg: 'bg-amber-500/10 dark:bg-amber-500/15 light:bg-amber-50 border-amber-500/25 light:border-amber-200',
      brandColor: 'text-amber-400 dark:text-amber-300 light:text-amber-700',
      glowHover: 'hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]',
      dotColor: 'bg-amber-400',
      category: 'Top Honor / Winner',
    };
  }

  // 2. Crown / Premier / Rank
  if (key === 'crown' || metric.includes('rank') || metric.includes('gold') || title.includes('champion')) {
    return {
      icon: Crown,
      iconBg: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
      badgeBg: 'bg-purple-500/10 dark:bg-purple-500/15 light:bg-purple-50 border-purple-500/25 light:border-purple-200',
      brandColor: 'text-purple-400 dark:text-purple-300 light:text-purple-700',
      glowHover: 'hover:border-purple-400/50 hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]',
      dotColor: 'bg-purple-400',
      category: 'Premier Milestone',
    };
  }

  // 3. Flame / Competitive Coding / Streak
  if (key === 'flame' || metric.includes('streak') || title.includes('leetcode') || title.includes('codeforces') || title.includes('solved')) {
    return {
      icon: Flame,
      iconBg: 'bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30',
      badgeBg: 'bg-orange-500/10 dark:bg-orange-500/15 light:bg-orange-50 border-orange-500/25 light:border-orange-200',
      brandColor: 'text-orange-400 dark:text-orange-300 light:text-orange-700',
      glowHover: 'hover:border-orange-400/50 hover:shadow-[0_0_24px_rgba(249,115,22,0.25)]',
      dotColor: 'bg-orange-400',
      category: 'Coding Benchmark',
    };
  }

  // 4. Medal / Finalist / Placement
  if (key === 'medal' || metric.includes('finalist') || metric.includes('2nd') || metric.includes('3rd')) {
    return {
      icon: Medal,
      iconBg: 'bg-gradient-to-br from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30',
      badgeBg: 'bg-rose-500/10 dark:bg-rose-500/15 light:bg-rose-50 border-rose-500/25 light:border-rose-200',
      brandColor: 'text-rose-400 dark:text-rose-300 light:text-rose-700',
      glowHover: 'hover:border-rose-400/50 hover:shadow-[0_0_24px_rgba(244,63,94,0.25)]',
      dotColor: 'bg-rose-400',
      category: 'Distinction / Podium',
    };
  }

  // 5. Star / Rating / Top Percentile
  if (key === 'star' || metric.includes('%') || metric.includes('star') || metric.includes('rating')) {
    return {
      icon: Star,
      iconBg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/15 light:bg-emerald-50 border-emerald-500/25 light:border-emerald-200',
      brandColor: 'text-emerald-400 dark:text-emerald-300 light:text-emerald-700',
      glowHover: 'hover:border-emerald-400/50 hover:shadow-[0_0_24px_rgba(52,211,153,0.25)]',
      dotColor: 'bg-emerald-400',
      category: 'Performance Rating',
    };
  }

  // 6. Target / Problem Solving
  if (key === 'target' || title.includes('target') || title.includes('olympiad')) {
    return {
      icon: Target,
      iconBg: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10 dark:bg-cyan-500/15 light:bg-cyan-50 border-cyan-500/25 light:border-cyan-200',
      brandColor: 'text-cyan-400 dark:text-cyan-300 light:text-cyan-700',
      glowHover: 'hover:border-cyan-400/50 hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]',
      dotColor: 'bg-cyan-400',
      category: 'Competitive Target',
    };
  }

  // 7. Rocket / Innovation / Project Milestone
  if (key === 'rocket' || title.includes('launch') || title.includes('scale')) {
    return {
      icon: Rocket,
      iconBg: 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
      badgeBg: 'bg-blue-500/10 dark:bg-blue-500/15 light:bg-blue-50 border-blue-500/25 light:border-blue-200',
      brandColor: 'text-blue-400 dark:text-blue-300 light:text-blue-700',
      glowHover: 'hover:border-blue-400/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]',
      dotColor: 'bg-blue-400',
      category: 'Innovation Launch',
    };
  }

  // 8. Code / Open Source
  if (key === 'code' || title.includes('open source') || title.includes('github') || title.includes('developer')) {
    return {
      icon: Code2,
      iconBg: 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20 text-teal-400 border-teal-500/30',
      badgeBg: 'bg-teal-500/10 dark:bg-teal-500/15 light:bg-teal-50 border-teal-500/25 light:border-teal-200',
      brandColor: 'text-teal-400 dark:text-teal-300 light:text-teal-700',
      glowHover: 'hover:border-teal-400/50 hover:shadow-[0_0_24px_rgba(20,184,166,0.25)]',
      dotColor: 'bg-teal-400',
      category: 'Engineering Merit',
    };
  }

  // Fallback: General Award
  return {
    icon: Award,
    iconBg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/15 light:bg-amber-50 border-amber-500/25 light:border-amber-200',
    brandColor: 'text-amber-400 dark:text-amber-300 light:text-amber-700',
    glowHover: 'hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]',
    dotColor: 'bg-amber-400',
    category: 'Special Recognition',
  };
};
