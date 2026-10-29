/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07070a',
        surface: '#0e0e15',
        'surface-elevated': '#161622',
        primary: {
          DEFAULT: '#ff2a51', // Crimson Red
          hover: '#ff4d6d',
          dark: '#b91c1c',
          dim: 'rgba(255, 42, 81, 0.15)'
        },
        crimson: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519'
        },
        accent: {
          DEFAULT: '#ff2a51',
          red: '#ef4444',
          ruby: '#e11d48',
          blood: '#991b1b',
          amber: '#f59e0b',
          emerald: '#10b981'
        }
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
        glow: '0 0 25px rgba(255, 42, 81, 0.35)',
        'glow-red': '0 0 35px rgba(255, 42, 81, 0.5)',
        'inner-glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-red': 'glowRed 3s ease-in-out infinite'
      },
      keyframes: {
        glowRed: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(255,42,81,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 18px rgba(255,42,81,0.85))' }
        }
      }
    },
  },
  plugins: [],
};
