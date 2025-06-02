/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef0fc',
          100: '#dde0f9',
          200: '#bbc2f3',
          300: '#98a4ed',
          400: '#7686e7',
          500: '#5164e1', // Primary color
          600: '#4150b4',
          700: '#313c87',
          800: '#20285a',
          900: '#10142d',
        },
        secondary: {
          50: '#f1f9fe',
          100: '#e3f3fd',
          200: '#c7e7fb',
          300: '#a7d1f1', // Secondary color
          400: '#80b7e3',
          500: '#5a9dd5',
          600: '#487eaa',
          700: '#365e80',
          800: '#243f55',
          900: '#121f2a',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        light: {
          bg: '#F9F9F9',
          card: '#FFFFFF',
          border: '#E5E7EB',
          text: {
            primary: '#111827',
            secondary: '#4B5563',
          },
        },
        dark: {
          bg: '#1E1C21',
          card: '#2D2A35',
          border: '#3F3D45',
          text: {
            primary: '#F9FAFB',
            secondary: '#D1D5DB',
          },
        },
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale': {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-in': 'slide-in 0.3s ease-out',
        'scale': 'scale 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      backdropBlur: {
        'glass': 'blur(10px)',
      },
    },
  },
  plugins: [],
};