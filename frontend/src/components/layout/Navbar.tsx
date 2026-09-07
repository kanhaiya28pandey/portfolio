import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Send } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { BrandLogo3D } from '../common/BrandLogo3D';
import { FuturisticButton } from '../common/FuturisticButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupportModal } from '../../context/SupportModalContext';
import { fetchPortfolioOverview } from '../../services/api';

interface NavItem {
  label: string;
  href: string;
}

const BASE_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
];

export const Navbar: React.FC = () => {
  const { openSupport } = useSupportModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasAchievements, setHasAchievements] = useState(false);

  useEffect(() => {
    fetchPortfolioOverview().then((overview) => {
      if (overview?.achievements && overview.achievements.length > 0) {
        setHasAchievements(true);
      } else {
        setHasAchievements(false);
      }
    });

    const checkAchievements = () => {
      const el = document.getElementById('achievements');
      setHasAchievements(!!el);
    };

    checkAchievements();
    const observer = new MutationObserver(() => {
      checkAchievements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const navItems = React.useMemo<NavItem[]>(() => {
    const items = [...BASE_NAV_ITEMS];
    if (hasAchievements) {
      items.push({ label: 'Achievements', href: '#achievements' });
    }
    items.push({ label: 'Contact', href: '#contact' });
    return items;
  }, [hasAchievements]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);

          // Scroll Spy logic (throttled to RAF)
          const scrollPosition = window.scrollY + 200;
          for (let i = navItems.length - 1; i >= 0; i--) {
            const section = navItems[i].href.substring(1);
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    
    // 1. Instantly wake up ALL sections so dynamic heights stabilize completely
    window.dispatchEvent(new CustomEvent('portfolio-mount-all'));
    if (targetId) {
      window.dispatchEvent(new CustomEvent('portfolio-nav-target', { detail: targetId }));
    }

    const scrollToTarget = () => {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        window.location.hash = href;
      }
    };

    // First pass immediately
    scrollToTarget();

    // Secondary settling passes to ensure tracking if DOM heights shifted during mount
    setTimeout(scrollToTarget, 80);
    setTimeout(scrollToTarget, 240);
  };

  return (
    <>
      <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-200 ease-out ${
        isScrolled
          ? 'py-2.5 sm:py-3 bg-[#060913]/90 dark:bg-[#060913]/90 light:bg-white/90 backdrop-blur-xl border-blue-500/20 light:border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.35)] light:shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
          : 'py-2.5 sm:py-3 md:py-5 bg-[#060913]/85 dark:bg-[#060913]/85 light:bg-white/85 md:bg-transparent md:dark:bg-transparent md:light:bg-transparent backdrop-blur-lg md:backdrop-blur-none border-blue-500/10 md:border-transparent light:border-slate-200/60 shadow-sm md:shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 flex items-center justify-between gap-3 xl:gap-5 flex-nowrap w-full">
        {/* Left: 3D Monogram Logo with Kanhaiya Pandey Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="focus:outline-none flex-shrink-0 inline-flex items-center"
          aria-label="Kanhaiya Pandey Home"
        >
          <BrandLogo3D />
        </a>

        {/* Center: Desktop Navigation Links (Floating Glass Capsule) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2.5 xl:px-3 py-1.5 rounded-full bg-[#0c1322]/80 light:bg-slate-100/90 border border-white/10 light:border-slate-300/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] light:shadow-sm flex-shrink-0">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-2.5 xl:px-3.5 py-1 text-[11px] xl:text-xs font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-white light:text-white font-bold'
                    : 'text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-950'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-[0_0_16px_rgba(59,130,246,0.6)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions (Support Me + Theme Toggle + Let's Connect) for Large Screens */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 flex-shrink-0 flex-nowrap">
          {/* Support Me / Direct UPI */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={openSupport}
            className="group flex-shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-semibold rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 light:text-amber-600 light:bg-amber-50 light:border-amber-300/80 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
            title="Support via UPI"
          >
            <Heart className="w-3.5 h-3.5 flex-shrink-0 transition-transform group-hover:scale-110 text-rose-400 fill-rose-400/20" />
            <span className="whitespace-nowrap">Support ❤️</span>
          </motion.button>

          {/* Animated Theme Toggle */}
          <div className="flex-shrink-0">
            <ThemeToggle />
          </div>

          {/* Let's Connect Button */}
          <FuturisticButton
            size="sm"
            variant="primary"
            icon={<Send className="w-3.5 h-3.5 flex-shrink-0" />}
            iconPosition="right"
            className="whitespace-nowrap flex-shrink-0 text-[11px] xl:text-xs px-3 py-1.5"
            onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#contact')}
          >
            Let's Connect
          </FuturisticButton>
        </div>

        {/* Tablet & Mobile Header Right: Support (on tablet) + Theme Toggle + Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
          {/* Support Button (visible on tablet, hidden on tiny phone to conserve space) */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={openSupport}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 light:text-amber-600 light:bg-amber-50 light:border-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
            title="Support via UPI"
          >
            <Heart className="w-3.5 h-3.5 flex-shrink-0 text-rose-400 fill-rose-400/20" />
            <span className="whitespace-nowrap">Support ❤️</span>
          </motion.button>

          <ThemeToggle />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-300 text-slate-300 light:text-slate-800 hover:text-white transition-colors cursor-pointer shadow-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer (Full navigation support for iPad & Mobile) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden bg-[#0a0f1d]/98 light:bg-white/98 backdrop-blur-2xl border-b border-white/10 light:border-slate-200 px-5 sm:px-8 py-5 space-y-4 shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-cyan-400 light:text-blue-600 border border-cyan-500/40 shadow-sm font-bold'
                        : 'text-slate-300 light:text-slate-700 hover:bg-white/5 light:hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 light:bg-blue-600" />}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 light:border-slate-200 flex flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  openSupport();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 light:text-amber-600 light:bg-amber-50 font-semibold text-xs whitespace-nowrap hover:bg-amber-500/20 transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 flex-shrink-0 text-rose-400 fill-rose-400/20" />
                <span>Support via UPI ❤️</span>
              </button>
              <FuturisticButton
                size="md"
                variant="primary"
                className="flex-1 justify-center text-xs whitespace-nowrap"
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#contact')}
              >
                Let's Connect
              </FuturisticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  </>
);
};
