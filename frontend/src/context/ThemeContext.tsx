import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

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
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        // Only return 'light' if the user explicitly previously toggled to light
        if (saved === 'light') {
          return 'light';
        }
      } catch {
        // localStorage might be unavailable in restricted environments
      }
    }
    // Default theme is ALWAYS Dark for every responsive device
    return 'dark';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const isRunningRef = useRef(false);

  // Sync DOM root classes whenever theme state changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const applyThemeWithTransition = (
    newTheme: Theme,
    eventOrCoords?: React.MouseEvent | { x: number; y: number }
  ) => {
    // If a transition is currently in progress, ignore duplicate clicks until complete
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setIsTransitioning(true);

    let x = window.innerWidth - 48; // Default to top-right corner where toggle button lives
    let y = 36;

    if (eventOrCoords) {
      if ('currentTarget' in eventOrCoords && eventOrCoords.currentTarget) {
        const rect = (eventOrCoords.currentTarget as HTMLElement).getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if ('clientX' in eventOrCoords && typeof (eventOrCoords as React.MouseEvent).clientX === 'number') {
        x = (eventOrCoords as React.MouseEvent).clientX;
        y = (eventOrCoords as React.MouseEvent).clientY;
      } else if ('x' in eventOrCoords && typeof eventOrCoords.x === 'number') {
        x = eventOrCoords.x;
        y = eventOrCoords.y;
      }
    }

    // Calculate maximum radius to fully clear opposite diagonal corner with a smooth momentum buffer
    const endRadius =
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      ) + 120;

    const root = document.documentElement;

    const commitThemeToDOM = (themeToApply: Theme) => {
      setThemeState(themeToApply);
      if (themeToApply === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
      try {
        localStorage.setItem(THEME_STORAGE_KEY, themeToApply);
      } catch {
        // Ignore storage errors
      }
    };

    // Check for native View Transitions API support
    const hasViewTransitions =
      typeof document !== 'undefined' &&
      typeof (document as unknown as { startViewTransition?: unknown }).startViewTransition === 'function';
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasViewTransitions && !prefersReducedMotion) {
      // Safety release timeout to guarantee isRunningRef is NEVER stuck
      const safetyTimer = window.setTimeout(() => {
        isRunningRef.current = false;
        setIsTransitioning(false);
      }, 950);

      const cleanup = () => {
        window.clearTimeout(safetyTimer);
        isRunningRef.current = false;
        setIsTransitioning(false);
      };

      try {
        const transition = (document as unknown as {
          startViewTransition: (cb: () => void) => {
            ready: Promise<void>;
            finished: Promise<void>;
          };
        }).startViewTransition(() => {
          commitThemeToDOM(newTheme);
        });

        transition.ready
          .then(() => {
            // Smooth circular clip path sweep from toggle position across entire screen
            const animation = root.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 750,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );

            animation.onfinish = () => {
              cleanup();
            };
            animation.oncancel = () => {
              cleanup();
            };
          })
          .catch(() => {
            cleanup();
          });

        transition.finished
          .catch(() => {})
          .finally(() => {
            cleanup();
          });
      } catch {
        commitThemeToDOM(newTheme);
        cleanup();
      }
    } else {
      // Fallback for browsers without View Transitions (e.g. Firefox)
      root.classList.add('theme-transitioning');
      commitThemeToDOM(newTheme);

      window.setTimeout(() => {
        root.classList.remove('theme-transitioning');
        isRunningRef.current = false;
        setIsTransitioning(false);
      }, 700);
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

