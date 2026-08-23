/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFB800',
          yellowHover: '#E6A600',
          yellowLight: '#FFFBEB',
          navy: '#101936',
          deepNavy: '#080F2D',
          textDark: '#111827',
          body: '#475569',
          muted: '#64748B',
          bg: '#F7F9FC',
          success: '#22C55E',
          danger: '#EF4444'
        },
        navy: {
          DEFAULT: '#101936',
          deep: '#080F2D',
          light: '#1E293B',
        }
      }
    },
  },
  plugins: [],
}
