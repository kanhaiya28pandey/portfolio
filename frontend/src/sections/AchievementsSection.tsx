import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle, 
  ExternalLink, 
  Calendar 
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '../styles/animations';
import type { Achievement } from '../types/portfolio';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

import { getAchievementMeta } from '../utils/achievementMeta';
export { getAchievementMeta };

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  // Return null if empty — completely zero footprint on the page
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="relative py-8 sm:py-10 lg:py-12 overflow-hidden select-text">
      {/* Seamless Ambient Backlight Spheres */}
      <div
        className="absolute top-1/4 -left-48 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-48 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(234, 88, 12, 0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/10 light:bg-amber-50 border border-amber-500/25 text-amber-400 dark:text-amber-400 light:text-amber-600 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Honors & Recognition
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="text-slate-100 dark:text-slate-100 light:text-slate-900">Key Milestones & </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600">
            Competitive hackathons, algorithmic coding ranks, academic honors, and verified tech awards.
          </p>
        </div>

        {/* Responsive Milestone Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {achievements.map((item) => {
            const meta = getAchievementMeta(item);
            const IconComp = meta.icon;

            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className={`group relative rounded-2xl bg-[#0b1329]/80 dark:bg-[#0b1329]/85 light:bg-white/90 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-slate-200 p-5 sm:p-6 shadow-lg shadow-black/20 flex flex-col justify-between transition-all duration-300 text-left overflow-hidden ${meta.glowHover}`}
              >
                {/* Holographic Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-4">
                  {/* Top Header: Icon & Metric Pill */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-2 transition-transform duration-200 ${meta.iconBg}`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-extrabold border shadow-sm ${meta.badgeBg} ${meta.brandColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dotColor} animate-pulse`} />
                        {item.metricValue}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 leading-snug group-hover:text-amber-400 dark:group-hover:text-amber-300 light:group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>

                    {/* Organization / Issuer if available */}
                    {item.organization && (
                      <p className="text-xs font-semibold text-rose-400 dark:text-rose-400 light:text-rose-600 truncate mt-1">
                        @{item.organization}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {(item.description || item.descriptionMarkdown) && (
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed line-clamp-3">
                      {item.description || item.descriptionMarkdown}
                    </p>
                  )}
                </div>

                {/* Footer: Timeline & Proof Link */}
                <div className="pt-4 mt-4 border-t border-white/5 dark:border-white/5 light:border-slate-100 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1 text-slate-400 dark:text-slate-400 light:text-slate-500 text-[11px]">
                    {item.issueDate ? (
                      <>
                        <Calendar className="w-3 h-3" />
                        <span>{item.issueDate}</span>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  {item.proofUrl ? (
                    <a
                      href={item.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 light:text-amber-600 light:hover:text-amber-700 hover:underline transition-colors"
                    >
                      <span>Proof</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-slate-500">#{String(item.displayOrder || item.id).padStart(2, '0')}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
