import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Smartphone,
  Coffee,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  supportHandle?: string;
  fullName?: string;
}

const PRESET_AMOUNTS = [
  { value: 50, label: '₹50', emoji: '☕', desc: 'Chai' },
  { value: 100, label: '₹100', emoji: '☕', desc: 'Coffee' },
  { value: 250, label: '₹250', emoji: '🍕', desc: 'Snacks' },
  { value: 500, label: '₹500', emoji: '🚀', desc: 'Super Fan' },
];

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  supportHandle = 'pandey123@okhdfcbank',
  fullName = 'Kanhaiya Pandey',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [mounted, setMounted] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Mount check for client portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const rawHandle = (supportHandle || '').trim();
  const isUpi = rawHandle.includes('@') && !rawHandle.startsWith('http');
  const upiId = isUpi
    ? rawHandle.replace(/^upi:\/\/pay\?pa=/, '').split('&')[0]
    : 'pandey123@okhdfcbank';

  // Compute active numerical amount
  const activeAmount = isCustom
    ? Math.max(1, Number(customAmount) || 100)
    : selectedAmount;

  const upiPayUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(fullName)}&am=${activeAmount}&cu=INR&tn=Support%20${encodeURIComponent(fullName)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(upiPayUri)}`;

  const isExternalUrl = rawHandle.startsWith('http://') || rawHandle.startsWith('https://');
  const externalUrl = isExternalUrl ? rawHandle : 'https://buymeacoffee.com';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto isolate">
          {/* Backdrop: Sits directly under document.body with max z-index */}
          <motion.div
            key="support-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className={`fixed inset-0 backdrop-blur-md z-[99999] ${
              isDark ? 'bg-black/85' : 'bg-slate-950/70'
            }`}
          />

          {/* Modal Card: Guaranteed foreground with z-[100000] */}
          <motion.div
            key="support-card"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full max-w-md max-h-[90vh] sm:max-h-[88vh] flex flex-col rounded-3xl p-4 sm:p-6 z-[100000] overflow-y-auto overscroll-contain border ${
              isDark
                ? 'bg-gradient-to-b from-[#0f172a] via-[#0b1120] to-[#070b14] border-amber-500/40 text-slate-100 shadow-[0_25px_80px_rgba(0,0,0,0.9)]'
                : 'bg-white border-amber-400/60 text-slate-900 shadow-[0_25px_80px_rgba(245,158,11,0.25)]'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-3.5 right-3.5 p-2 rounded-full transition-colors cursor-pointer z-20 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-1 mb-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/30 mb-0.5">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                Support & Buy Me a Coffee
              </h3>
              <p className={`text-xs max-w-xs mx-auto ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Scan via any UPI App (GPay, PhonePe, Paytm, BHIM) or pay directly with your UPI ID.
              </p>
            </div>

                {/* Amount Selection Chips */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Select Amount
                    </span>
                    <span className="text-[11px] font-mono text-amber-500 dark:text-amber-400 font-bold">
                      ₹{activeAmount} INR
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {PRESET_AMOUNTS.map((preset) => {
                      const isSelected = !isCustom && selectedAmount === preset.value;
                      return (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(preset.value);
                            setIsCustom(false);
                          }}
                          className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                            isSelected
                              ? 'bg-gradient-to-b from-amber-400 to-orange-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/30 scale-[1.02]'
                              : isDark
                              ? 'bg-slate-800/70 hover:bg-slate-800 text-slate-200 border-slate-700'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                          }`}
                        >
                          <span className="text-sm leading-none">{preset.emoji}</span>
                          <span className="leading-none">{preset.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Toggle & Input */}
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCustom(!isCustom)}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        isCustom
                          ? isDark
                            ? 'bg-amber-500/25 border-amber-500/50 text-amber-300'
                            : 'bg-amber-100 border-amber-400 text-amber-900 font-semibold'
                          : isDark
                          ? 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
                          : 'bg-slate-100 text-slate-600 border-slate-300 hover:text-slate-900'
                      }`}
                    >
                      Custom Amount
                    </button>
                    {isCustom && (
                      <div className="flex-1 relative">
                        <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>₹</span>
                        <input
                          type="number"
                          min="1"
                          max="100000"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className={`w-full pl-6 pr-2.5 py-1 text-xs rounded-lg border font-mono focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                            isDark
                              ? 'bg-slate-900/90 border-amber-500/50 text-slate-100'
                              : 'bg-white border-amber-400 text-slate-900'
                          }`}
                          autoFocus
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Dynamic QR Code Card */}
                <div className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border mb-3 ${
                  isDark
                    ? 'bg-slate-900/70 border-white/10'
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="relative p-2 rounded-2xl bg-white shadow-md">
                    <img
                      src={qrCodeUrl}
                      alt={`UPI QR Code for ${fullName}`}
                      className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-xl"
                      loading="eager"
                    />
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-mono font-bold whitespace-nowrap shadow-md border border-amber-500/40">
                      ₹{activeAmount} INR
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 mt-3.5 text-[11px] font-mono ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <QrCode className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span>Auto-fills ₹{activeAmount} in your UPI App</span>
                  </div>
                </div>

                {/* UPI ID Copy Field */}
                <div className="space-y-1 mb-3">
                  <div className={`flex items-center gap-2 p-2 rounded-xl border ${
                    isDark
                      ? 'bg-slate-900/80 border-white/10'
                      : 'bg-slate-100 border-slate-300'
                  }`}>
                    <span className="font-mono text-xs font-semibold flex-1 truncate text-amber-500 dark:text-amber-400 pl-1">
                      {upiId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex-shrink-0 ${
                        isDark
                          ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

            {/* Payment Button: Directly Launches Mobile UPI or Deep Link */}
            <div className="space-y-2">
              <a
                href={upiPayUri}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition-all text-center cursor-pointer"
              >
                <Smartphone className="w-4 h-4 flex-shrink-0" />
                <span>Pay ₹{activeAmount} via UPI App (GPay / PhonePe / Paytm)</span>
              </a>

              {/* Optional External link */}
              {isExternalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl border text-[11px] font-medium transition-colors text-center ${
                    isDark
                      ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
                  }`}
                >
                  <span>Support via Buy Me a Coffee</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Guarantee Badge */}
            <div className={`mt-3 pt-2.5 border-t flex items-center justify-center gap-1.5 text-[10px] ${
              isDark
                ? 'border-white/10 text-slate-500'
                : 'border-slate-200 text-slate-500'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Direct P2P Transfer • Zero Intermediary Fee • Verified UPI</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};


