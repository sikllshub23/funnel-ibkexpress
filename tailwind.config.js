import { ibkExpress } from './config/ibkExpress.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: ibkExpress.theme.paper,
        surface: ibkExpress.theme.surface,
        ink: {
          DEFAULT: ibkExpress.theme.ink,
          soft: ibkExpress.theme.inkSoft
        },
        line: ibkExpress.theme.line,
        signal: ibkExpress.theme.signal,
        whatsapp: ibkExpress.theme.whatsapp,
        danger: ibkExpress.theme.danger
      },
      fontFamily: {
        display: ['"Big Shoulders"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      borderRadius: {
        ticket: '14px'
      },
      keyframes: {
        'flash-travel': {
          '0%': { transform: 'translateX(0) scale(1)', opacity: '1' },
          '92%': { opacity: '1' },
          '100%': { transform: 'translateX(var(--travel-distance, 100%)) scale(0.9)', opacity: '0' }
        },
        'fade-up': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'flash-travel': 'flash-travel 1.6s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'fade-up': 'fade-up 0.4s ease-out forwards'
      }
    }
  },
  plugins: []
}
