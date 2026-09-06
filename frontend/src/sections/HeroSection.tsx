import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, MessageSquare, Sparkles, Terminal } from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  LeetCodeIcon,
  GfgIcon,
  CodeforcesIcon,
  InstagramIcon,
  WhatsAppIcon,
  PhoneIcon,
  DynamicSocialIcon,
} from '../components/common/BrandIcons';
import { FuturisticButton } from '../components/common/FuturisticButton';
import { NeonBadge } from '../components/common/NeonBadge';
import { HeroPortrait } from '../components/hero/HeroPortrait';
import { fadeInUp, staggerContainer } from '../styles/animations';

interface HeroSectionProps {
  heroAvatarUrl?: string;
  resumeUrl?: string;
  stats?: {
    projectsCount: number;
    skillsCount: number;
    statusText: string;
    dsaSolvedCount?: string;
  };
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

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroAvatarUrl,
  resumeUrl,
  stats = {
    projectsCount: 10,
    skillsCount: 15,
    statusText: 'Available for Opportunities',
    dsaSolvedCount: '150+',
  },
  socialLinks = {
    github: 'https://github.com/kanhaiya28pandey/',
    linkedin: 'https://www.linkedin.com/in/kanhaiya-pandey-3856743a7/',
    email: 'kanhaiya542112@gmail.com',
    phone: '+91 9801573326',
    whatsapp: '+91 9801573326',
  },
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-0 pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28 lg:pb-12 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle Background Radial Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Introduction & CTAs (7 cols) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            {/* Availability Indicator */}
            <motion.div variants={fadeInUp}>
              <NeonBadge variant="green" pulse size="md">
                {stats.statusText}
              </NeonBadge>
            </motion.div>

            {/* Name & Title */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="text-sm sm:text-base font-mono font-bold tracking-widest text-blue-400 dark:text-blue-400 light:text-blue-700 uppercase">
                  Hello World, I am
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-blue-100 border border-cyan-500/30 dark:border-cyan-500/30 light:border-blue-300 text-cyan-400 dark:text-cyan-400 light:text-blue-700 font-semibold shadow-sm">
                  @techwithkanhaiya
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-slate-300 light:from-slate-950 light:to-slate-700 bg-clip-text text-transparent">
                  KANHAIYA PANDEY
                </span>
              </h1>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <Terminal className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <p className="text-base sm:text-lg font-medium text-slate-300 dark:text-slate-300 light:text-slate-700">
                  Full-Stack Engineer{' '}
                  <span className="text-blue-400 font-bold">•</span> DSA Enthusiast{' '}
                  <span className="text-purple-400 font-bold">•</span> Database & Applied ML Integrator
                </p>
              </div>
            </motion.div>

            {/* Value Proposition / Mission */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl leading-relaxed"
            >
              "Engineering resilient full-stack systems with strong Data Structures &amp; Algorithms foundations, seamless database architectures, and applied machine learning capabilities. Passionate about solving complex problems with clean, scalable code."
            </motion.p>

            {/* Buttons & Socials */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 pt-2">
              <FuturisticButton
                size="lg"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </FuturisticButton>

              <FuturisticButton
                size="lg"
                variant="secondary"
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
                href={resumeUrl || "/resume.pdf"}
                download="Kanhaiya_Pandey_Resume.pdf"
                target="_blank"
              >
                Download Resume
              </FuturisticButton>

              <FuturisticButton
                size="lg"
                variant="secondary"
                icon={<MessageSquare className="w-4 h-4 text-cyan-400" />}
                iconPosition="left"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </FuturisticButton>

              {/* Dynamic Social & Direct Connect Badges */}
              <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/10 dark:border-white/10 light:border-slate-300 flex-wrap">
                {/* GitHub */}
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile - Kanhaiya Pandey"
                    title="GitHub Profile"
                    className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-slate-100 dark:text-white light:text-slate-900 hover:border-slate-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* LinkedIn */}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile - Kanhaiya Pandey"
                    title="LinkedIn Profile"
                    className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-[#0A66C2] dark:text-[#38BDF8] light:text-[#0A66C2] hover:bg-[#0A66C2]/15 hover:border-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.35)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* WhatsApp */}
                {socialLinks.whatsapp && (
                  <a
                    href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, '') || '919801573326'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp - Kanhaiya Pandey"
                    title={`WhatsApp: ${socialLinks.whatsapp}`}
                    className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.35)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* Phone Call */}
                {socialLinks.phone && (
                  <a
                    href={`tel:${socialLinks.phone.replace(/\s+/g, '')}`}
                    aria-label="Call Kanhaiya Pandey"
                    title={`Call: ${socialLinks.phone}`}
                    className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-sky-400 light:text-sky-600 hover:bg-sky-500/15 hover:border-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.35)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <PhoneIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* LeetCode */}
                {socialLinks.leetcode && (
                  <a
                    href={socialLinks.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LeetCode Profile - Kanhaiya Pandey"
                    title="LeetCode Profile"
                    className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-[#FFA116] hover:bg-[#FFA116]/15 hover:border-[#FFA116] hover:shadow-[0_0_15px_rgba(245,158,11,0.35)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <LeetCodeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* GeeksforGeeks */}
                {socialLinks.gfg && (
                  <a
                    href={socialLinks.gfg}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GeeksforGeeks Profile - Kanhaiya Pandey"
                    title="GeeksforGeeks Profile"
                    className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-[#2F8D46] hover:bg-[#2F8D46]/15 hover:border-[#2F8D46] hover:shadow-[0_0_15px_rgba(16,185,129,0.35)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <GfgIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* Codeforces */}
                {socialLinks.codeforces && (
                  <a
                    href={socialLinks.codeforces}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Codeforces Profile - Kanhaiya Pandey"
                    title="Codeforces Profile"
                    className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-[#1F8ACB] hover:bg-[#1F8ACB]/15 hover:border-[#1F8ACB] hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <CodeforcesIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* Instagram */}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Profile - Kanhaiya Pandey"
                    title="Instagram Profile"
                    className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-pink-400 light:text-pink-600 hover:bg-pink-500/15 hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.35)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* Email */}
                {socialLinks.email && (
                  <a
                    href={`mailto:${socialLinks.email}`}
                    aria-label="Send Email to Kanhaiya Pandey"
                    title={`Email: ${socialLinks.email}`}
                    className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-amber-400 dark:text-amber-300 light:text-amber-600 hover:bg-amber-500/15 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.35)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                  >
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}

                {/* Custom Links */}
                {socialLinks.customLinks &&
                  socialLinks.customLinks.map((custom, idx) => {
                    if (!custom.url) return null;
                    return (
                      <a
                        key={idx}
                        href={custom.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={custom.platform || 'Social Profile Link'}
                        title={custom.platform || 'Social Profile'}
                        className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-cyan-400 light:text-cyan-600 hover:bg-cyan-500/15 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] shadow-sm hover:scale-110 transition-all flex items-center justify-center group"
                      >
                        <DynamicSocialIcon
                          platform={custom.platform}
                          url={custom.url}
                          className="w-5 h-5 group-hover:scale-110 transition-transform"
                        />
                      </a>
                    );
                  })}
              </div>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={fadeInUp}
              className="pt-6 grid grid-cols-3 gap-4 max-w-lg border-t border-white/10 dark:border-white/10 light:border-slate-300/80"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {stats.projectsCount}+
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-700 font-semibold uppercase tracking-wider">
                  Projects Built
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {stats.skillsCount}+
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-700 font-semibold uppercase tracking-wider">
                  Technologies
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center gap-1">
                  {stats.dsaSolvedCount || '150+'} <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-700 font-semibold uppercase tracking-wider">
                  DSA Solved
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Digital Portrait with Parallax (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <HeroPortrait avatarUrl={heroAvatarUrl} />
          </div>
        </div>
      </div>
    </section>
  );
};
