import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  PhoneCall,
  Copy,
  Check,
  Sparkles,
  User,
  AtSign,
  Tag,
  MessageSquare,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { FuturisticButton } from '../components/common/FuturisticButton';
import {
  GithubIcon,
  LinkedinIcon,
  LeetCodeIcon,
  GfgIcon,
  CodeforcesIcon,
  InstagramIcon,
  WhatsAppIcon,
  DynamicSocialIcon,
} from '../components/common/BrandIcons';
import { submitContactMessage } from '../services/api';
import confetti from 'canvas-confetti';
import type { InquiryType, Profile } from '../types/portfolio';

interface ContactSectionProps {
  profile: Profile;
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

const INQUIRY_OPTIONS: { type: InquiryType; label: string; icon: string }[] = [
  { type: 'JOB', label: 'Full-Time Role', icon: '💼' },
  { type: 'INTERNSHIP', label: 'Internship', icon: '🎓' },
  { type: 'COLLABORATION', label: 'Collaboration', icon: '🤝' },
  { type: 'FREELANCE', label: 'Freelance', icon: '💻' },
  { type: 'GENERAL', label: 'General Message', icon: '💬' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, settings, socialLinks }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'JOB' as InquiryType,
    website: '', // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Resolved Contact Channels with resilient fallbacks
  const fullName = profile.fullName || 'Kanhaiya Pandey';
  const rawRoleTitle = profile.title || 'Software Engineer • Full-Stack Developer';
  const roleTitle = rawRoleTitle.toLowerCase().includes('mca final year') || rawRoleTitle.toLowerCase().includes('student')
    ? 'Software Engineer & Full-Stack Developer'
    : rawRoleTitle;
  const email = socialLinks?.email || settings?.email || profile.email || 'kanhaiya542112@gmail.com';
  const phone = socialLinks?.phone || settings?.phone_number || profile.phone || '+91 9801573326';
  const rawPhone = phone.replace(/[^0-9+]/g, '');
  const whatsappNumber =
    socialLinks?.whatsapp || settings?.whatsapp_number || profile.whatsapp || phone || '+91 9801573326';
  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const location = settings?.about_location || profile.location || 'Chengalpattu, Chennai, Tamil Nadu';
  const availability =
    settings?.availability_badge || profile.availabilityStatus || 'Available for Full-Stack & AI Roles';

  // Dynamic Handles: Strictly synced with Home Section & Admin Settings
  const githubUrl = socialLinks?.github || settings?.github_url || profile.githubUrl;
  const linkedinUrl = socialLinks?.linkedin || settings?.linkedin_url || profile.linkedinUrl;
  const leetcodeUrl = socialLinks?.leetcode || settings?.leetcode_url || profile.leetcodeUrl;
  const gfgUrl = socialLinks?.gfg || settings?.gfg_url || profile.gfgUrl;
  const codeforcesUrl = socialLinks?.codeforces || settings?.codeforces_url || profile.codeforcesUrl;
  const instagramUrl = socialLinks?.instagram || settings?.instagram_url || profile.instagramUrl;
  const customLinks = socialLinks?.customLinks || [];

  const hasAnySocialLinks = Boolean(
    githubUrl ||
      linkedinUrl ||
      leetcodeUrl ||
      gfgUrl ||
      codeforcesUrl ||
      instagramUrl ||
      (customLinks && customLinks.length > 0)
  );

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    const result = await submitContactMessage(formData);
    setLoading(false);

    if (result.success) {
      setStatus({
        type: 'success',
        message: 'Thank you! Your transmission was delivered successfully. I will respond to your email promptly.',
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'JOB',
        website: '',
      });

      // Celebration Confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.8 },
          colors: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'],
        });
      } catch {
        // Safe fallback
      }
    } else {
      setStatus({
        type: 'error',
        message: result.message || 'Transmission failed to deliver. Please reach out directly via Email or WhatsApp.',
      });
    }
  };

  return (
    <section id="contact" className="relative py-8 sm:py-10 lg:py-14 overflow-hidden select-text">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 -left-36 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37, 99, 235, 0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-36 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-50 border border-blue-500/25 text-blue-400 dark:text-blue-400 light:text-blue-600 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            Let's Build Together
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="text-slate-100 dark:text-slate-100 light:text-slate-900">Direct Contact & </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Collaboration
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have a full-stack engineering role, an ambitious startup project, or want to discuss DSA & distributed systems? Reach out through any direct channel or dispatch a transmission below.
          </p>
        </div>

        {/* Both Cards are in items-stretch for identical height on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ========================================================= */}
          {/* LEFT COLUMN: All Contact Channels & Persona (5 cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="rounded-3xl bg-[#0c1322]/85 dark:bg-[#0c1322]/85 light:bg-white/90 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-200/90 p-6 sm:p-8 shadow-2xl shadow-black/30 flex flex-col justify-between h-full space-y-6 transition-all">
              {/* Persona Header (No Photo as requested) */}
              <div className="pb-5 border-b border-white/10 dark:border-white/10 light:border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
                      {fullName}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-blue-400 dark:text-blue-400 light:text-blue-600 mt-0.5">
                      {roleTitle}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 light:bg-emerald-50 border border-emerald-500/25 text-xs font-mono text-emerald-400 dark:text-emerald-400 light:text-emerald-700 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-semibold">{availability}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed pt-1">
                  Feel free to reach out directly through any channel below. I am prompt with emails, calls, and WhatsApp messages.
                </p>
              </div>

              {/* Direct Communication Channels */}
              <div className="space-y-3 flex-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-bold">
                  Direct Communication Channels
                </div>

                {/* 1. Direct Email */}
                {email && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200/80 hover:border-blue-500/40 transition-all flex items-center justify-between gap-3 group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-400 light:text-slate-500">
                          Direct Email
                        </div>
                        <a
                          href={`mailto:${email}`}
                          className="text-xs sm:text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-blue-400 dark:hover:text-blue-400 light:hover:text-blue-600 transition-colors truncate block"
                          title={email}
                        >
                          {email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(email, 'email')}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        title="Copy email to clipboard"
                        aria-label="Copy email"
                      >
                        {copiedField === 'email' ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={`mailto:${email}`}
                        className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                        title="Send email directly"
                        aria-label="Send email"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {/* 2. Phone / Call */}
                {phone && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200/80 hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3 group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-400 light:text-slate-500">
                          Phone & Direct Call
                        </div>
                        <a
                          href={`tel:${rawPhone}`}
                          className="text-xs sm:text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-emerald-400 dark:hover:text-emerald-400 light:hover:text-emerald-600 transition-colors truncate block"
                          title={phone}
                        >
                          {phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(phone, 'phone')}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        title="Copy phone number"
                        aria-label="Copy phone"
                      >
                        {copiedField === 'phone' ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={`tel:${rawPhone}`}
                        className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                        title="Call now"
                        aria-label="Call phone"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {/* 3. WhatsApp Instant Chat */}
                {whatsappNumber && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200/80 hover:border-green-500/40 transition-all flex items-center justify-between gap-3 group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <WhatsAppIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-400 light:text-slate-500">
                          WhatsApp Instant Chat
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 truncate block">
                          {whatsappNumber}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <a
                        href={`https://wa.me/${cleanWaNumber}?text=Hi%20Kanhaiya,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-green-400 text-xs font-mono font-semibold hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all"
                      >
                        <span>Chat Now</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {/* 4. Location & Availability */}
                {location && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-200/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-400 light:text-slate-500">
                        Current Base Location
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 truncate">
                        {location}
                      </div>
                      <div className="text-[10px] font-mono text-cyan-400/90 mt-0.5">
                        Open to Relocation & Remote Roles Worldwide
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Profiles & Handles (Synced with Home/Settings; only shows configured links) */}
              {hasAnySocialLinks && (
                <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-bold">
                    <span>Professional Profiles & Handles</span>
                    <span className="text-[10px] text-cyan-400/90 font-mono">Synced</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-100 hover:bg-white/[0.08] dark:hover:bg-white/[0.08] light:hover:bg-slate-200 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-800 hover:text-white transition-all flex items-center gap-2 text-xs font-mono group"
                      >
                        <GithubIcon className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-white" />
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-white flex-shrink-0" />
                      </a>
                    )}

                    {linkedinUrl && (
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 text-blue-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono group"
                      >
                        <LinkedinIcon className="w-4 h-4 flex-shrink-0 text-blue-400" />
                        <span>LinkedIn</span>
                        <ArrowUpRight className="w-3 h-3 text-blue-400 group-hover:text-white flex-shrink-0" />
                      </a>
                    )}

                    {leetcodeUrl && (
                      <a
                        href={leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-amber-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono group"
                      >
                        <LeetCodeIcon className="w-4 h-4 flex-shrink-0 text-amber-400" />
                        <span>LeetCode</span>
                        <ArrowUpRight className="w-3 h-3 text-amber-400 group-hover:text-white flex-shrink-0" />
                      </a>
                    )}

                    {gfgUrl && (
                      <a
                        href={gfgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono group"
                      >
                        <GfgIcon className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                        <span>GFG</span>
                        <ArrowUpRight className="w-3 h-3 text-emerald-400 group-hover:text-white flex-shrink-0" />
                      </a>
                    )}

                    {codeforcesUrl && (
                      <a
                        href={codeforcesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono group"
                      >
                        <CodeforcesIcon className="w-4 h-4 flex-shrink-0 text-sky-400" />
                        <span>Codeforces</span>
                        <ArrowUpRight className="w-3 h-3 text-sky-400 group-hover:text-white flex-shrink-0" />
                      </a>
                    )}

                    {instagramUrl && (
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/25 text-pink-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono group"
                      >
                        <InstagramIcon className="w-4 h-4 flex-shrink-0 text-pink-400" />
                        <span>Instagram</span>
                        <ArrowUpRight className="w-3 h-3 text-pink-400 group-hover:text-white flex-shrink-0" />
                      </a>
                    )}

                    {customLinks.map((custom, idx) => {
                      if (!custom.url) return null;
                      return (
                        <a
                          key={idx}
                          href={custom.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/25 text-cyan-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono group"
                        >
                          <DynamicSocialIcon
                            platform={custom.platform}
                            url={custom.url}
                            className="w-4 h-4 flex-shrink-0 text-cyan-400"
                          />
                          <span className="capitalize">{custom.platform || 'Link'}</span>
                          <ArrowUpRight className="w-3 h-3 text-cyan-400 group-hover:text-white flex-shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Direct Reassurance SLA */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Clock className="w-3.5 h-3.5" /> Fast Response: &lt; 2-4 Hours
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> 100% Direct & Confidential
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Interactive Message Transmission Terminal (7 cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="rounded-3xl bg-[#0c1322]/85 dark:bg-[#0c1322]/85 light:bg-white/90 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-200/90 p-6 sm:p-8 shadow-2xl shadow-black/30 flex flex-col justify-between h-full relative overflow-hidden transition-all text-left">
              {/* Subtle holographic top border highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-60" />

              <div>
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                      <span>Dispatch a Direct Transmission</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Encrypted Protocol
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
                    Select your inquiry type and leave your message. I read every inquiry personally.
                  </p>
                </div>

                {/* Inquiry Type Animated Pills */}
                <div className="space-y-2 mb-5">
                  <label className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5 text-purple-400" />
                    <span>Purpose of Connection</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_OPTIONS.map((opt) => {
                      const isSelected = formData.inquiryType === opt.type;
                      return (
                        <button
                          key={opt.type}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: opt.type })}
                          className={`relative px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                            isSelected
                              ? 'text-white font-bold shadow-md shadow-blue-500/25'
                              : 'bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-100 hover:bg-white/[0.08] dark:hover:bg-white/[0.08] light:hover:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-700 border border-white/10 dark:border-white/10 light:border-slate-300'
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeInquiryPill"
                              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl -z-10"
                              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                            />
                          )}
                          <span>{opt.icon}</span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-4">
                {/* Honeypot field (hidden from human visitors) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase flex items-center gap-1.5 font-bold">
                        <User className="w-3.5 h-3.5 text-blue-400" />
                        <span>Your Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe / Tech Recruiter"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase flex items-center gap-1.5 font-bold">
                        <AtSign className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Subject / Topic *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Software Engineer Opportunity / Project Collaboration"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase flex items-center gap-1.5 font-bold">
                        <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                        <span>Your Message *</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        {formData.message.length} chars
                      </span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about the engineering role, project scope, tech stack requirements, or collaboration idea..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full flex-1 min-h-[130px] px-4 py-3 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
                    />
                  </div>
                </div>

                {/* Status Feedback Toast */}
                <AnimatePresence>
                  {status.type && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm font-mono ${
                        status.type === 'success'
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      )}
                      <span className="leading-relaxed">{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 text-left">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Direct inbox delivery. Zero spam guaranteed.</span>
                  </div>

                  <FuturisticButton
                    type="submit"
                    size="md"
                    variant="primary"
                    isLoading={loading}
                    icon={<Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    iconPosition="right"
                    className="w-full sm:w-auto justify-center px-6"
                  >
                    {loading ? 'Transmitting...' : 'Dispatch Message'}
                  </FuturisticButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
