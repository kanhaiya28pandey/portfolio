import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { FuturisticButton } from '../../components/common/FuturisticButton';
import { adminLogin } from '../../services/api';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await adminLogin({ username, password });
      if (res.success) {
        sessionStorage.setItem('admin_session_active', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid credentials or account temporarily locked');
      }
    } catch {
      setError('An unexpected error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-dark-bg text-dark-text overflow-hidden">
      {/* Ambient background glowing orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Grid line pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Portfolio
          </Link>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            SECURE ACCESS GATEWAY
          </span>
        </div>

        <GlassCard variant="glow-blue" className="p-8">
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Admin Terminal
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Authenticate with administrative credentials
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                Username / Identifier
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-sm text-white placeholder-slate-500 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                Passphrase
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-sm text-white placeholder-slate-500 transition-all font-sans"
                />
              </div>
            </div>

            <div className="pt-2">
              <FuturisticButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full justify-center"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Establish Session <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </FuturisticButton>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] font-mono text-slate-500">
              Session is protected by HttpOnly SameSite=Strict cookies & brute-force throttler.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
