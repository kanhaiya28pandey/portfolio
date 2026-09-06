import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle, 
  X, 
  Download, 
  FileText, 
  ShieldCheck, 
  Eye, 
  ArrowUpRight, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import type { Certificate } from '../types/portfolio';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

import { getCourseMeta, getCertificateCategory } from '../utils/certMeta';
export { getCourseMeta, getCertificateCategory };

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates }) => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  if (!certificates || certificates.length === 0) return null;

  const isPdf = (url?: string) => Boolean(url && url.toLowerCase().endsWith('.pdf'));
  const isImage = (url?: string) => Boolean(url && /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(url));

  // Dynamically compute active categories from actual uploaded certificates
  const { categoryCounts, filterOptions } = useMemo(() => {
    const counts: Record<string, number> = {};
    certificates.forEach((c) => {
      const cat = getCertificateCategory(c);
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const dynamicCategories = Object.keys(counts).sort((a, b) => {
      const order = [
        'Full Stack',
        'Java & Backend',
        'AI & Machine Learning',
        'Python',
        'Web Development',
        'Cloud & DevOps',
        'Data & Analytics',
        'Cybersecurity',
        'Automation',
        'Database Systems',
      ];
      const indexA = order.indexOf(a);
      const indexB = order.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    return {
      categoryCounts: counts,
      filterOptions: ['ALL', ...dynamicCategories],
    };
  }, [certificates]);

  // Filtered list that always reliably matches the category
  const filteredCerts = useMemo(() => {
    if (selectedFilter === 'ALL') return certificates;
    return certificates.filter((c) => getCertificateCategory(c) === selectedFilter);
  }, [certificates, selectedFilter]);

  return (
    <section id="certificates" className="relative py-8 sm:py-10 lg:py-12 overflow-hidden select-text">
      {/* Seamless Ambient Backlight Spheres */}
      <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-blue-600/10 dark:bg-blue-600/10 light:bg-blue-300/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-indigo-600/10 dark:bg-indigo-600/10 light:bg-indigo-300/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-50 border border-blue-500/25 text-blue-400 dark:text-blue-400 light:text-blue-600 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            Authenticated Specializations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-300 light:from-blue-600 light:via-indigo-600 light:to-purple-700 bg-clip-text text-transparent">
              Certifications & Credentials
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600">
            Industry-recognized credentials, specialized technical tracks, and verified certificates.
          </p>

          {/* Interactive Filter Pills */}
          {filterOptions.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
              {filterOptions.map((opt) => {
                const isSelected = selectedFilter === opt;
                const count = opt === 'ALL' ? certificates.length : (categoryCounts[opt] || 0);

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedFilter(opt)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                        : 'bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white light:hover:text-slate-950 border border-white/5 dark:border-white/5 light:border-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-white/10 dark:bg-white/10 light:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Responsive Compact Cards Grid with popLayout AnimatePresence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => {
              const meta = getCourseMeta(cert);
              const CourseIcon = meta.icon;

              return (
                <motion.div
                  key={`cert-${cert.id || cert.title}`}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -5 }}
                  className={`group relative rounded-2xl bg-[#0b1329]/80 dark:bg-[#0b1329]/85 light:bg-white/95 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-slate-200 p-4 sm:p-5 shadow-lg shadow-black/20 light:shadow-sm flex flex-col justify-between transition-all duration-300 text-left overflow-hidden select-text ${meta.glowHover}`}
                >
                {/* Holographic Top Accent Sweep Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card Top: Distinct Course Icon & Track Pill */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    {/* Course-Specific Illuminated Emblem */}
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-2 transition-transform duration-200 ${meta.iconBg}`}>
                      <CourseIcon className="w-5 h-5" />
                    </div>

                    {/* Course Track Pill */}
                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${meta.badgeBg} ${meta.brandColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dotColor} animate-pulse`} />
                      {meta.coursePill}
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-blue-400 dark:group-hover:text-cyan-300 light:group-hover:text-indigo-600 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Issuing Organization */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                    <span className="text-slate-500 font-normal text-[11px]">By:</span>
                    <span className="text-rose-400 dark:text-rose-400 light:text-rose-600 font-semibold truncate">
                      {cert.issuingOrg}
                    </span>
                  </div>

                  {/* Issue Date & Serial */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 pt-1 border-t border-white/5 dark:border-white/5 light:border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {cert.issueDate}
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>

                {/* Futuristic Action Button */}
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className="w-full py-2.5 px-3.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-between group/btn bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-900/20 hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-cyan-200" />
                      <span>View Certificate</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      </div>

      {/* Digital Credential Dossier Lightbox Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#0c1527]/95 dark:bg-[#0c1527]/95 light:bg-white/95 backdrop-blur-heavy border border-blue-500/30 p-5 sm:p-6 shadow-2xl z-10 space-y-4 text-left max-h-[90vh] overflow-y-auto"
            >
              {/* Top Cyber Security Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-t-2xl" />

              {/* Modal Header */}
              {(() => {
                const activeMeta = getCourseMeta(activeCert);
                const ActiveIcon = activeMeta.icon;
                return (
                  <div className="flex items-start justify-between pb-3 border-b border-white/10 dark:border-white/10 light:border-slate-200 pt-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${activeMeta.iconBg}`}>
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 leading-tight">
                          {activeCert.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${activeMeta.badgeBg} ${activeMeta.brandColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${activeMeta.dotColor}`} />
                            {activeCert.issuingOrg}
                          </span>
                          <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                            {activeCert.issueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveCert(null)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })()}

              {/* Credential Dossier Details */}
              <div className="space-y-3">
                {/* Candidate & Verification Meta */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Candidate</span>
                    <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
                      Kanhaiya Pandey
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Credential Status</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Authenticated
                    </span>
                  </div>
                </div>

                {/* Document View / Preview Box */}
                {activeCert.thumbnailUrl || isImage(activeCert.credentialUrl) ? (
                  <div className="rounded-xl overflow-hidden border border-white/10 dark:border-white/10 light:border-slate-200 max-h-64 flex items-center justify-center bg-black/40">
                    <img
                      src={activeCert.thumbnailUrl || activeCert.credentialUrl}
                      alt={activeCert.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : isPdf(activeCert.credentialUrl) ? (
                  <div className="rounded-xl p-5 bg-blue-950/30 dark:bg-blue-950/30 light:bg-blue-50 border border-blue-500/20 text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                        Official PDF Certificate Document
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
                        Authenticated credential file verified by {activeCert.issuingOrg}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl p-5 bg-slate-900/50 dark:bg-slate-900/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200 space-y-2.5">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Digital Certificate Authentication</span>
                    </div>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      This technical credential has been earned and verified for{' '}
                      <span className="font-semibold text-white dark:text-white light:text-slate-900">Kanhaiya Pandey</span> by{' '}
                      <span className="font-semibold text-cyan-400 dark:text-cyan-400 light:text-blue-600">{activeCert.issuingOrg}</span>.
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5 dark:border-white/5 light:border-slate-200">
                      <span>Timeline: {activeCert.issueDate}</span>
                      <span className="text-cyan-400">Record: Valid & Verified</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500">
                  Year: {activeCert.issueDate}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-colors"
                  >
                    Close
                  </button>

                  {activeCert.credentialUrl && (
                    <a
                      href={activeCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold shadow-md transition-all"
                    >
                      {isPdf(activeCert.credentialUrl) ? (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Credential</span>
                        </>
                      )}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
