import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, ArrowRight, Mail } from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from '../common/BrandIcons';
import { useSupportModal } from '../../context/SupportModalContext';
import { fetchPortfolioOverview, DEFAULT_PORTFOLIO_DATA } from '../../services/api';
import type { Profile } from '../../types/portfolio';

interface FooterProps {
  profile?: Profile;
  settings?: Record<string, string>;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
    leetcode?: string;
    gfg?: string;
    codeforces?: string;
    instagram?: string;
    customLinks?: Array<{ platform: string; url: string }>;
  };
}

export const Footer: React.FC<FooterProps> = ({
  profile: propProfile,
  settings: propSettings,
  socialLinks: propSocialLinks,
}) => {
  const { openSupport } = useSupportModal();
  const [data, setData] = useState<{
    profile: Profile;
    settings: Record<string, string>;
  }>({
    profile: propProfile || DEFAULT_PORTFOLIO_DATA.profile,
    settings: propSettings || DEFAULT_PORTFOLIO_DATA.settings || {},
  });

  useEffect(() => {
    if (propProfile || propSettings) {
      setData({
        profile: propProfile || DEFAULT_PORTFOLIO_DATA.profile,
        settings: propSettings || DEFAULT_PORTFOLIO_DATA.settings || {},
      });
      return;
    }

    let isMounted = true;
    fetchPortfolioOverview()
      .then((overview) => {
        if (isMounted && overview) {
          setData({
            profile: overview.profile || DEFAULT_PORTFOLIO_DATA.profile,
            settings: overview.settings || DEFAULT_PORTFOLIO_DATA.settings || {},
          });
        }
      })
      .catch(() => {
        // Fallback to default
      });

    return () => {
      isMounted = false;
    };
  }, [propProfile, propSettings]);

  const { profile, settings } = data;

  // Fully synchronized dynamic values
  const fullName = profile.fullName || 'Kanhaiya Pandey';
  const email = propSocialLinks?.email || settings.email || profile.email || 'kanhaiya542112@gmail.com';
  const whatsapp = propSocialLinks?.whatsapp || settings.whatsapp_number || profile.whatsapp || '+91 9801573326';
  const cleanWaNumber = whatsapp.replace(/\D/g, '');
  const availability =
    settings.availability_badge || profile.availabilityStatus || 'Open to Internships & Opportunities';

  const githubUrl = propSocialLinks?.github || settings.github_url || profile.githubUrl || 'https://github.com/kanhaiya28pandey/';
  const linkedinUrl = propSocialLinks?.linkedin || settings.linkedin_url || profile.linkedinUrl || 'https://www.linkedin.com/in/kanhaiya-pandey-3856743a7/';

  // Technologies actually used to engineer this portfolio (as shown in reference)
  const portfolioTech = [
    { name: 'Java', dotColor: 'bg-[#EF4444] shadow-[#EF4444]/60' },
    { name: 'Spring Boot', dotColor: 'bg-[#10B981] shadow-[#10B981]/60' },
    { name: 'React', dotColor: 'bg-[#06B6D4] shadow-[#06B6D4]/60' },
    { name: 'TypeScript', dotColor: 'bg-[#3B82F6] shadow-[#3B82F6]/60' },
    { name: 'PostgreSQL', dotColor: 'bg-[#8B5CF6] shadow-[#8B5CF6]/60' },
    { name: 'Docker', dotColor: 'bg-[#0EA5E9] shadow-[#0EA5E9]/60' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#050914] dark:bg-[#050914] light:bg-[#f6f9fe] border-t border-blue-500/20 dark:border-blue-500/20 light:border-slate-200 transition-colors duration-500 overflow-hidden select-text">
      {/* ========================================================================= */}
      {/* 1. CURVED CELESTIAL PLANET HORIZON GLOW (Matching Uploaded Image)          */}
      {/* ========================================================================= */}
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[160%] max-w-[1800px] h-36 rounded-[100%] bg-gradient-to-b from-blue-600/25 via-cyan-500/10 to-transparent blur-2xl pointer-events-none dark:opacity-100 light:opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

      {/* Subtle Micro-Stars along Horizon */}
      <div className="absolute top-2 left-1/4 w-1 h-1 rounded-full bg-cyan-300 opacity-60 animate-ping pointer-events-none" />
      <div className="absolute top-3 right-1/3 w-1.5 h-1.5 rounded-full bg-blue-300 opacity-50 pointer-events-none" />
      <div className="absolute top-1.5 right-1/4 w-1 h-1 rounded-full bg-indigo-300 opacity-70 animate-pulse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-9 pb-5 sm:pb-6 relative z-10">
        {/* ========================================================================= */}
        {/* 2. COMPACT SLEEK 3-COLUMN HORIZONTAL COMMAND STRIP                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-6 items-center">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT: DEVELOPER IDENTITY & STATUS                                       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2.5">
            <div className="flex items-center gap-3">
              {/* KP Monogram Box */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0e172e] via-[#091124] to-[#040813] dark:from-[#0e172e] dark:to-[#040813] light:from-white light:to-slate-100 border border-cyan-500/40 dark:border-cyan-500/40 light:border-blue-300/80 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.3)] light:shadow-md flex items-center justify-center flex-shrink-0 group">
                <span className="text-base font-black tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  KP
                </span>
              </div>

              {/* Name & Role */}
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 tracking-tight leading-none">
                  Kanhaiya{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Pandey
                  </span>
                </h3>
                <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-400 dark:text-slate-400 light:text-blue-700 uppercase">
                  Full-Stack Developer
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xs leading-relaxed">
              Building scalable backend systems and modern interactive web experiences.
            </p>

            {/* Open to Opportunities Glass Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 light:bg-emerald-50 border border-emerald-500/30 dark:border-emerald-500/30 light:border-emerald-300 text-xs font-medium text-emerald-400 dark:text-emerald-400 light:text-emerald-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>{availability}</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CENTER: CRAFTED WITH TECHNOLOGIES (Matching Uploaded Image)             */}
          {/* ----------------------------------------------------------------------- */}
          <div className="flex flex-col items-center justify-center text-center space-y-2.5">
            {/* Header with Horizontal Tech Lines */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase font-bold text-slate-400 dark:text-slate-400 light:text-slate-600">
              <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-slate-500/60" />
              <span>Crafted with Technologies</span>
              <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-slate-500/60" />
            </div>

            {/* Technology Dot Pills Grid (2 rows) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full max-w-xs sm:max-w-md md:max-w-xs lg:max-w-md justify-center">
              {portfolioTech.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a1122]/80 dark:bg-[#0a1122]/80 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 shadow-sm text-[11px] font-mono text-slate-300 dark:text-slate-300 light:text-slate-800 font-semibold justify-center transition-all hover:border-cyan-500/40"
                >
                  <span className={`w-2 h-2 rounded-full ${tech.dotColor}`} />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Sub-Motto */}
            <p className="text-[10px] font-mono tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 font-medium">
              Clean Code <span className="text-cyan-400">•</span> Scalable Systems <span className="text-purple-400">•</span> Better Solutions
            </p>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT: LET'S CONNECT & SUPPORT                                          */}
          {/* ----------------------------------------------------------------------- */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2.5">
            {/* Header with Trailing Line */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase font-bold text-slate-400 dark:text-slate-400 light:text-slate-600">
              <span>Let's Connect</span>
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-slate-500/60 to-transparent" />
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xs leading-relaxed">
              Have an idea or opportunity?<br />
              Let's build something meaningful together.
            </p>

            {/* Social Icons & Action Cluster */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 pt-1">
              {/* GitHub */}
              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-800 hover:text-white dark:hover:text-white light:hover:text-black hover:border-cyan-400/50 flex items-center justify-center shadow-sm transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-[#0A66C2] hover:border-[#0A66C2]/60 flex items-center justify-center shadow-sm transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </motion.a>

              {/* Email */}
              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${email}`}
                aria-label="Email Transmission"
                className="w-9 h-9 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-cyan-400 dark:text-cyan-400 light:text-blue-600 hover:border-cyan-400 flex items-center justify-center shadow-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${cleanWaNumber || '919801573326'}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-9 h-9 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-[#25D366] hover:border-[#25D366]/60 flex items-center justify-center shadow-sm transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </motion.a>

              {/* Direct UPI Support Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={openSupport}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 light:bg-amber-50 border border-amber-500/30 text-amber-400 dark:text-amber-400 light:text-amber-700 text-xs font-semibold shadow-sm hover:bg-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
                title="Support via UPI"
              >
                <Heart className="w-3.5 h-3.5 flex-shrink-0 text-rose-400 fill-rose-400/20" />
                <span>Support ❤️</span>
              </motion.button>

              {/* Glowing Let's Connect Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 hover:shadow-purple-500/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM BAR WITH CELESTIAL STAR EMBLEM (Matching Uploaded Image)         */}
        {/* ========================================================================= */}
        <div className="mt-7 pt-4 relative">
          {/* Subtle horizontal divider with star in center */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 dark:via-white/10 light:via-slate-300 to-transparent" />
            <span className="absolute px-3 bg-[#050914] dark:bg-[#050914] light:bg-[#f6f9fe] text-cyan-400 dark:text-cyan-400 light:text-blue-600 text-xs">
              ✦
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 font-sans pt-2">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              © 2026 <strong className="text-slate-200 dark:text-slate-200 light:text-slate-900 font-semibold">{fullName}</strong>. All rights reserved.
            </div>

            {/* Tech Stack Credit */}
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600">
              <span>Built with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>using React + Spring Boot</span>
            </div>

            {/* Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-950 transition-all text-xs font-mono font-medium cursor-pointer shadow-sm"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};


