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
          DEFAULT: '#FF7A00',
          dark: '#E06B00',
          light: '#FFF0E0',
          hover: '#FF8F24',
        },
        secondary: '#FFFFFF',
        accent: {
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
          light: '#DBEAFE',
        },
        bgLight: '#FAFAFA',
        cardLight: '#FFFFFF',
        textDark: '#1E293B',
        textMuted: '#64748B',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 0, 0, 0.04)',
        glass: '0 8px 32px 0 rgba(255, 122, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
