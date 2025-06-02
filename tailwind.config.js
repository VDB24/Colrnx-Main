/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  safelist: [
    'hover:shadow-glow-light',
    'dark:hover:shadow-glow-dark'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        light: {
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
        },
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          border: '#334155',
        },
      },
      boxShadow: {
        'neu-light': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
        'neu-light-sm': '5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff',
        'neu-light-pressed': 'inset 6px 6px 12px #d1d9e6, inset -6px -6px 12px #ffffff',
        'neu-dark': '20px 20px 60px #1a2334, -20px -20px 60px #222f42',
        'neu-dark-sm': '5px 5px 10px #1a2334, -5px -5px 10px #222f42',
        'neu-dark-pressed': 'inset 6px 6px 12px #1a2334, inset -6px -6px 12px #222f42',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow-light': '0 0 20px rgba(14, 165, 233, 0.3), 0 0 40px rgba(14, 165, 233, 0.1)',
        'glow-dark': '0 0 20px rgba(14, 165, 233, 0.2), 0 0 40px rgba(14, 165, 233, 0.1)',
      },
    },
  },
  plugins: [],
}