import { 
  Brain, 
  Layers, 
  Globe, 
  Cpu, 
  BookOpen, 
  BarChart3, 
  Cog, 
  ShieldCheck, 
  Cloud, 
  Database, 
  Terminal, 
  Award 
} from 'lucide-react';
import type { Certificate } from '../types/portfolio';

export const getCourseMeta = (cert: Partial<Certificate> | Certificate) => {
  const key = (cert.iconKey || '').toLowerCase();
  const title = (cert.title || '').toLowerCase();

  if (key === 'brain' || title.includes('openai') || title.includes('generative ai') || title.includes('ai &') || title.includes('machine learning')) {
    return {
      icon: Brain,
      iconBg: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
      badgeBg: 'bg-purple-500/10 dark:bg-purple-500/15 light:bg-purple-50 border-purple-500/25 light:border-purple-200',
      brandColor: 'text-purple-400 dark:text-purple-300 light:text-purple-700',
      glowHover: 'group-hover:border-purple-400/50 group-hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]',
      dotColor: 'bg-purple-400',
      coursePill: 'AI & GenAI',
      categoryTag: 'AI & Machine Learning',
    };
  }

  if (key === 'layers' || title.includes('full stack') || title.includes('fullstack')) {
    return {
      icon: Layers,
      iconBg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/15 light:bg-emerald-50 border-emerald-500/25 light:border-emerald-200',
      brandColor: 'text-emerald-400 dark:text-emerald-300 light:text-emerald-700',
      glowHover: 'group-hover:border-emerald-400/50 group-hover:shadow-[0_0_24px_rgba(52,211,153,0.25)]',
      dotColor: 'bg-emerald-400',
      coursePill: 'Full-Stack Web',
      categoryTag: 'Full-Stack Development',
    };
  }

  if (key === 'globe' || title.includes('web development')) {
    return {
      icon: Globe,
      iconBg: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10 dark:bg-cyan-500/15 light:bg-cyan-50 border-cyan-500/25 light:border-cyan-200',
      brandColor: 'text-cyan-400 dark:text-cyan-300 light:text-cyan-700',
      glowHover: 'group-hover:border-cyan-400/50 group-hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]',
      dotColor: 'bg-cyan-400',
      coursePill: 'Web Engineering',
      categoryTag: 'Web Development',
    };
  }

  if (key === 'cpu' || title.includes('advanced')) {
    return {
      icon: Cpu,
      iconBg: 'bg-gradient-to-br from-indigo-500/20 to-violet-600/20 text-indigo-400 border-indigo-500/30',
      badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/15 light:bg-indigo-50 border-indigo-500/25 light:border-indigo-200',
      brandColor: 'text-indigo-400 dark:text-indigo-300 light:text-indigo-700',
      glowHover: 'group-hover:border-indigo-400/50 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.25)]',
      dotColor: 'bg-indigo-400',
      coursePill: 'Advanced Systems',
      categoryTag: 'Advanced Systems',
    };
  }

  if (key === 'book' || title.includes('fundamental')) {
    return {
      icon: BookOpen,
      iconBg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
      badgeBg: 'bg-amber-500/10 dark:bg-amber-500/15 light:bg-amber-50 border-amber-500/25 light:border-amber-200',
      brandColor: 'text-amber-400 dark:text-amber-300 light:text-amber-700',
      glowHover: 'group-hover:border-amber-400/50 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]',
      dotColor: 'bg-amber-400',
      coursePill: 'Core Fundamentals',
      categoryTag: 'Fundamentals',
    };
  }

  if (key === 'chart' || title.includes('data analysis') || title.includes('visualization')) {
    return {
      icon: BarChart3,
      iconBg: 'bg-gradient-to-br from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30',
      badgeBg: 'bg-teal-500/10 dark:bg-teal-500/15 light:bg-teal-50 border-teal-500/25 light:border-teal-200',
      brandColor: 'text-teal-400 dark:text-teal-300 light:text-teal-700',
      glowHover: 'group-hover:border-teal-400/50 group-hover:shadow-[0_0_24px_rgba(20,184,166,0.25)]',
      dotColor: 'bg-teal-400',
      coursePill: 'Data & Analytics',
      categoryTag: 'Data & Analytics',
    };
  }

  if (key === 'cog' || title.includes('automation') || title.includes('scripting')) {
    return {
      icon: Cog,
      iconBg: 'bg-gradient-to-br from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30',
      badgeBg: 'bg-rose-500/10 dark:bg-rose-500/15 light:bg-rose-50 border-rose-500/25 light:border-rose-200',
      brandColor: 'text-rose-400 dark:text-rose-300 light:text-rose-700',
      glowHover: 'group-hover:border-rose-400/50 group-hover:shadow-[0_0_24px_rgba(244,63,94,0.25)]',
      dotColor: 'bg-rose-400',
      coursePill: 'Automation & Scripts',
      categoryTag: 'Automation',
    };
  }

  if (key === 'shield' || title.includes('cyber') || title.includes('security')) {
    return {
      icon: ShieldCheck,
      iconBg: 'bg-gradient-to-br from-red-500/20 to-rose-600/20 text-red-400 border-red-500/30',
      badgeBg: 'bg-red-500/10 dark:bg-red-500/15 light:bg-red-50 border-red-500/25 light:border-red-200',
      brandColor: 'text-red-400 dark:text-red-300 light:text-red-700',
      glowHover: 'group-hover:border-red-400/50 group-hover:shadow-[0_0_24px_rgba(239,68,68,0.25)]',
      dotColor: 'bg-red-400',
      coursePill: 'Cybersecurity',
      categoryTag: 'Cybersecurity',
    };
  }

  if (key === 'cloud' || title.includes('cloud') || title.includes('aws') || title.includes('azure')) {
    return {
      icon: Cloud,
      iconBg: 'bg-gradient-to-br from-sky-500/20 to-blue-600/20 text-sky-400 border-sky-500/30',
      badgeBg: 'bg-sky-500/10 dark:bg-sky-500/15 light:bg-sky-50 border-sky-500/25 light:border-sky-200',
      brandColor: 'text-sky-400 dark:text-sky-300 light:text-sky-700',
      glowHover: 'group-hover:border-sky-400/50 group-hover:shadow-[0_0_24px_rgba(14,165,233,0.25)]',
      dotColor: 'bg-sky-400',
      coursePill: 'Cloud Infrastructure',
      categoryTag: 'Cloud Computing',
    };
  }

  if (key === 'database' || title.includes('database') || title.includes('sql')) {
    return {
      icon: Database,
      iconBg: 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30',
      badgeBg: 'bg-amber-500/10 dark:bg-amber-500/15 light:bg-amber-50 border-amber-500/25 light:border-amber-200',
      brandColor: 'text-amber-400 dark:text-amber-300 light:text-amber-700',
      glowHover: 'group-hover:border-amber-400/50 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]',
      dotColor: 'bg-amber-400',
      coursePill: 'Database Architecture',
      categoryTag: 'Database Systems',
    };
  }

  if (key === 'terminal' || title.includes('python')) {
    return {
      icon: Terminal,
      iconBg: 'bg-gradient-to-br from-blue-500/20 to-sky-600/20 text-blue-400 border-blue-500/30',
      badgeBg: 'bg-blue-500/10 dark:bg-blue-500/15 light:bg-blue-50 border-blue-500/25 light:border-blue-200',
      brandColor: 'text-blue-400 dark:text-blue-300 light:text-blue-700',
      glowHover: 'group-hover:border-blue-400/50 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]',
      dotColor: 'bg-blue-400',
      coursePill: 'Python Core',
      categoryTag: 'Python Programming',
    };
  }

  return {
    icon: Award,
    iconBg: 'bg-gradient-to-br from-indigo-500/20 to-purple-600/20 text-indigo-400 border-indigo-500/30',
    badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/15 light:bg-indigo-50 border-indigo-500/25 light:border-indigo-200',
    brandColor: 'text-indigo-400 dark:text-indigo-300 light:text-indigo-700',
    glowHover: 'group-hover:border-indigo-400/50 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.25)]',
    dotColor: 'bg-indigo-400',
    coursePill: 'Specialization',
    categoryTag: 'Industry Specialization',
  };
};

export const getCertificateCategory = (cert: Partial<Certificate> | Certificate): string => {
  const title = (cert.title || '').toLowerCase();
  const org = (cert.issuingOrg || '').toLowerCase();
  const key = (cert.iconKey || '').toLowerCase();

  if (title.includes('full stack') || title.includes('fullstack') || key === 'layers') {
    return 'Full Stack';
  }
  if (title.includes('generative ai') || title.includes('openai') || title.includes('machine learning') || title.includes('ai &') || title.includes('ai ') || key === 'brain') {
    return 'AI & Machine Learning';
  }
  if (title.includes('python') || key === 'terminal') {
    return 'Python';
  }
  if (title.includes('web development') || title.includes('frontend') || title.includes('react') || key === 'globe') {
    return 'Web Development';
  }
  if (title.includes('cloud') || title.includes('aws') || title.includes('azure') || key === 'cloud') {
    return 'Cloud & DevOps';
  }
  if (title.includes('cyber') || title.includes('security') || key === 'shield') {
    return 'Cybersecurity';
  }
  if (title.includes('data') || title.includes('visualization') || title.includes('analytics') || key === 'chart') {
    return 'Data & Analytics';
  }
  if (title.includes('automation') || title.includes('scripting') || key === 'cog') {
    return 'Automation';
  }
  if (title.includes('database') || title.includes('sql') || key === 'database') {
    return 'Database Systems';
  }
  if (title.includes('java') || title.includes('spring') || title.includes('backend')) {
    return 'Java & Backend';
  }
  if (org.length > 0) {
    return org;
  }
  return 'Specialization';
};
