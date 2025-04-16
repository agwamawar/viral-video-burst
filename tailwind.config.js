
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-green-100',
    'bg-green-500',
    'text-green-800',
    'border-green-200',
    'bg-yellow-100',
    'bg-yellow-500',
    'text-yellow-800',
    'border-yellow-200',
    'bg-gray-100',
    'bg-gray-500',
    'text-gray-800',
    'border-gray-200',
    'bg-purple-100',
    'bg-purple-500',
    'text-purple-800',
    'border-purple-200',
    'bg-indigo-500',
    'bg-cyan-500',
    'bg-rose-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-blue-500',
    'bg-teal-500',
    'bg-amber-500',
    'bg-pink-500',
  ],
}
