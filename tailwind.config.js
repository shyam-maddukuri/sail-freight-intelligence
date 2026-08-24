/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sail: {
          950: '#060c18',
          900: '#0b1528',
          850: '#0f1d38',
          800: '#14254b',
          700: '#1e3a6e',
          600: '#254e8e',
          500: '#2e66b4',
          400: '#4c86d4',
          300: '#7ba7e4',
          200: '#b4cef3',
          100: '#deebfb',
          50: '#f0f5fd',
        },
        steel: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
        accent: {
          teal: '#06b6d4',
          cyan: '#0ea5e9',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          indigo: '#6366f1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(14, 165, 233, 0.25)',
        'glow-md': '0 0 25px -5px rgba(14, 165, 233, 0.35)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
