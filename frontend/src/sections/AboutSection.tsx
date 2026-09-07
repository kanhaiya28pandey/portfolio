import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Sparkles, Mail } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { NeonBadge } from '../components/common/NeonBadge';
import { WhatsAppIcon } from '../components/common/BrandIcons';
import { fadeInUp, staggerContainer, scaleIn } from '../styles/animations';
import type { Education } from '../types/portfolio';

import kanhaiyaRealPhoto from '../assets/kanhaiya_real.jpg';
import { resolveAssetUrl } from '../utils/assetUrl';

interface AboutSectionProps {
  profileData?: {
    name: string;
    status: string;
    bio: string;
    aboutText: string;
    avatarUrl?: string;
    location?: string;
    streamBadge?: string;
    phone?: string;
    whatsapp?: string;
  };
  educations?: Education[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profileData = {
    name: 'Kanhaiya Pandey',
    status: 'Full-Stack Developer',
    bio: 'Passionate about scalable architectures, Data Structures & Algorithms, and modern web applications.',
    aboutText:
      'I am a passionate Software Engineer focused on building robust full-stack applications and solving real-world problems. With strong foundations in Data Structures & Algorithms, Java, Spring Boot, and modern React, I enjoy crafting seamless user experiences backed by reliable database architectures.\n\nAlways excited to learn new technologies, build scalable systems, and collaborate on high-impact projects.',
    location: 'Chengalpattu, Chennai, Tamil Nadu',
    streamBadge: 'Software Engineer',
    avatarUrl: kanhaiyaRealPhoto,
    phone: '+91 9801573326',
    whatsapp: '+91 9801573326',
  },
  educations = [],
}) => {
  // Determine latest education degree dynamically from database / Admin panel
  const latestEducation = educations && educations.length > 0 ? educations[0] : null;

  return (
    <section id="about" className="scroll-mt-20 sm:scroll-mt-24 relative py-8 sm:py-10 lg:py-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37, 99, 235, 0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Sophisticated Circular Real Photo Frame (5 cols) */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 flex items-center justify-center">
              {/* Ambient Outer Halo Pulse */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/30 to-purple-600/25 blur-2xl animate-pulse-glow" />

              {/* Outer Concentric Ring 1 */}
              <div className="absolute inset-2 rounded-full border border-blue-500/25 dark:border-blue-500/30 light:border-blue-400/35" />

              {/* Concentric Ring 2 (Double Subtle Ring) */}
              <div className="absolute inset-5 rounded-full border border-purple-500/25 dark:border-purple-500/30 light:border-purple-400/35" />

              {/* Glassmorphic Inner Circular Frame */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full p-2 bg-slate-900/80 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-xl border-2 border-white/20 dark:border-white/20 light:border-slate-300 shadow-[0_0_35px_rgba(59,130,246,0.35)] overflow-hidden flex items-center justify-center group">
                <img
                  src={resolveAssetUrl(profileData.avatarUrl) || kanhaiyaRealPhoto}
                  alt={profileData.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = kanhaiyaRealPhoto;
                  }}
                  className="w-full h-full object-cover object-top rounded-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Dynamic Stream Badge */}
              <div className="absolute bottom-2 right-4 z-20">
                <div className="rounded-full shadow-lg p-0.5 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/95 border border-white/10 dark:border-white/10 light:border-slate-300">
                  <NeonBadge variant="cyan" size="sm" pulse>
                    {profileData.streamBadge || 'Software Engineer'}
                  </NeonBadge>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio, Dynamic Education & Core Highlights (7 cols) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Header without commented syntax */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="flex items-center gap-2">
                <NeonBadge variant="purple" size="sm">
                  About Me
                </NeonBadge>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider font-semibold">
                  Personal Profile &amp; Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-slate-300 dark:from-white dark:via-cyan-100 dark:to-slate-300 light:from-slate-900 light:to-slate-700 bg-clip-text text-transparent">
                  Driven by Clean Code &amp; Real-World Impact
                </span>
              </h2>
            </motion.div>

            {/* Concise Description */}
            <motion.div
              variants={fadeInUp}
              className="space-y-3 text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed text-base"
            >
              {profileData.aboutText.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Dynamic Education & Location Cards */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <GlassCard variant="default" className="p-4 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 dark:text-blue-400 light:text-blue-600 border border-blue-500/20 light:border-blue-300 flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider font-semibold">
                    Education
                  </div>
                  <div className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 text-sm">
                    {latestEducation ? latestEducation.degree : 'Master of Computer Applications (MCA)'}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 line-clamp-1">
                    {latestEducation ? latestEducation.institution : 'SRM Institute of Science and Technology'}
                  </div>
                  {latestEducation?.gradeOrPercentage && (
                    <div className="text-[11px] font-mono font-semibold text-cyan-400 dark:text-cyan-400 light:text-blue-700">
                      {latestEducation.gradeOrPercentage}
                    </div>
                  )}
                </div>
              </GlassCard>

              <GlassCard variant="default" className="p-4 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 dark:text-purple-400 light:text-purple-600 border border-purple-500/20 light:border-purple-300 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider font-semibold">
                    Location
                  </div>
                  <div className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 text-sm">
                    {profileData.location || 'Chengalpattu, Chennai, Tamil Nadu'}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">Open to Remote, Hybrid &amp; On-site</div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Attractive Core Focus Chips */}
            <motion.div variants={fadeInUp} className="pt-2">
              <div className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-800 mb-2.5 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 dark:text-cyan-400 light:text-blue-600" />
                <span>Primary Engineering Focus</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Java & Spring Boot', color: 'border-blue-500/30 text-blue-300 dark:text-blue-300 light:text-blue-800 bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-100/90 light:border-blue-300' },
                  { name: 'React & TypeScript', color: 'border-cyan-500/30 text-cyan-300 dark:text-cyan-300 light:text-cyan-800 bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-100/90 light:border-cyan-300' },
                  { name: 'Data Structures & Algorithms', color: 'border-emerald-500/30 text-emerald-300 dark:text-emerald-300 light:text-emerald-800 bg-emerald-500/10 dark:bg-emerald-500/10 light:bg-emerald-100/90 light:border-emerald-300' },
                  { name: 'PostgreSQL & MongoDB', color: 'border-purple-500/30 text-purple-300 dark:text-purple-300 light:text-purple-800 bg-purple-500/10 dark:bg-purple-500/10 light:bg-purple-100/90 light:border-purple-300' },
                  { name: 'Applied ML & NLP Matchers', color: 'border-pink-500/30 text-pink-300 dark:text-pink-300 light:text-pink-800 bg-pink-500/10 dark:bg-pink-500/10 light:bg-pink-100/90 light:border-pink-300' },
                  { name: 'Clean Architecture & REST APIs', color: 'border-amber-500/30 text-amber-300 dark:text-amber-300 light:text-amber-800 bg-amber-500/10 dark:bg-amber-500/10 light:bg-amber-100/90 light:border-amber-300' },
                ].map((chip, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border ${chip.color} shadow-sm`}
                  >
                    {chip.name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Quick Action Contact Row */}
            <motion.div variants={fadeInUp} className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${(profileData.whatsapp || '919801573326').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-mono font-semibold transition-all hover:scale-105 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 border border-white/15 dark:border-white/15 light:border-slate-300 text-xs font-mono font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-white dark:hover:text-white light:hover:text-slate-950 transition-all hover:scale-105 shadow-sm cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400 dark:text-cyan-400 light:text-blue-600" />
                <span>Send a Message</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
