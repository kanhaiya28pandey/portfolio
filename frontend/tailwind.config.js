/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#060913',
          surface: '#0A0F1D',
          card: 'rgba(13, 21, 39, 0.7)',
          border: 'rgba(59, 130, 246, 0.2)',
          muted: '#94A3B8',
          text: '#F1F5F9',
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: 'rgba(255, 255, 255, 0.85)',
          border: 'rgba(226, 232, 240, 0.8)',
          muted: '#64748B',
          text: '#0F172A',
        },
        neon: {
          blue: '#3B82F6',
          cyan: '#06B6D4',
          purple: '#8B5CF6',
          violet: '#A855F7',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.35)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.35)',
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.35)',
        'glow-sm': '0 0 10px rgba(59, 130, 246, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(139, 92, 246, 0.7))' },
        }
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
        heavy: '24px',
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('light', ['.light &', '.light&', 'html:not(.dark) &', ':root:not(.dark) &']);
    },
  ],
};
