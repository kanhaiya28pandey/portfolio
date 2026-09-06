import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (eventOrCoords?: React.MouseEvent | { x: number; y: number }) => void;
  setTheme: (theme: Theme, eventOrCoords?: React.MouseEvent | { x: number; y: number }) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'kp_portfolio_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved =
        localStorage.getItem(THEME_STORAGE_KEY) ||
        localStorage.getItem('pj_portfolio_theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark'; // Default: Dark Futuristic
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const isRunningRef = useRef(false);

  const applyThemeWithTransition = (
    newTheme: Theme,
    eventOrCoords?: React.MouseEvent | { x: number; y: number }
  ) => {
    if (isRunningRef.current) return;

    let x = window.innerWidth - 48; // Default to top-right corner where toggle button lives
    let y = 36;

    if (eventOrCoords) {
      if ('currentTarget' in eventOrCoords && eventOrCoords.currentTarget) {
        const rect = (eventOrCoords.currentTarget as HTMLElement).getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if ('clientX' in eventOrCoords) {
        x = (eventOrCoords as React.MouseEvent).clientX;
        y = (eventOrCoords as React.MouseEvent).clientY;
      } else if ('x' in eventOrCoords) {
        x = eventOrCoords.x;
        y = eventOrCoords.y;
      }
    }

    // Calculate radius to fully clear opposite corner (bottom-left) with a 150px smooth momentum buffer
    const endRadius =
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      ) + 150;

    const root = document.documentElement;

    // Check for native View Transitions API support
    const hasViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasViewTransitions && !prefersReducedMotion) {
      isRunningRef.current = true;
      setIsTransitioning(true);

      // Use document.startViewTransition with synchronous flushSync commit
      const transition = (document as unknown as {
        startViewTransition: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
      }).startViewTransition(() => {
        flushSync(() => {
          setThemeState(newTheme);
        });
        if (newTheme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      });

      transition.ready.then(() => {
        // Expand the circular clip path smoothly in a cinematic, leisurely sweep from top-right past bottom-left
        const animation = root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 1150,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
            fill: 'forwards',
          }
        );

        animation.onfinish = () => {
          isRunningRef.current = false;
        };
      });

      transition.finished.finally(() => {
        isRunningRef.current = false;
        setIsTransitioning(false);
      });
    } else {
      // Fallback for browsers without View Transitions: smooth page-wide CSS transition
      isRunningRef.current = true;
      setIsTransitioning(true);
      root.classList.add('theme-transitioning');
      setThemeState(newTheme);
      if (newTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);

      setTimeout(() => {
        root.classList.remove('theme-transitioning');
        isRunningRef.current = false;
        setIsTransitioning(false);
      }, 950);
    }
  };

  const toggleTheme = (eventOrCoords?: React.MouseEvent | { x: number; y: number }) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    applyThemeWithTransition(nextTheme, eventOrCoords);
  };

  const setTheme = (
    newTheme: Theme,
    eventOrCoords?: React.MouseEvent | { x: number; y: number }
  ) => {
    applyThemeWithTransition(newTheme, eventOrCoords);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

