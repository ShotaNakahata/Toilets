// frontend/tailwind.config.ts
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/styles/global.css',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#202020",
        foreground: "#FFFFFF",
        highlight: '#004CDF',
      },
      fontFamily: {
        baskerville: ['Libre Baskerville', 'serif'],
      },
    },
    letterSpacing: {
      'extra-widest': '0.3em',
      'super-widest': '0.5em',
    },
    boxShadow: {
      white: '2px 4px 4px 3px rgba(255, 255, 255, 0.5)',
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        '.buttonprimary': {
          padding: '0.5rem 1rem',
          backgroundColor: '#2d3748',
          color: '#ffffff',
          borderRadius: '9999px',
          transitionProperty: 'background-color, color',
          transitionDuration: '300ms',
        },
        '.buttonprimary:hover': {
          backgroundColor: '#ffffff',
          color: '#2d3748',
        },
        '.buttonsecondary': {
          color: '#ffffff',
          border: '2px solid #ffffff',
          backgroundColor: 'transparent',
          borderRadius: '0px', // 角を丸くしない設定
          transitionProperty: 'background-color, color',
          transitionDuration: '300ms',
        },
        '.buttonsecondary:hover': {
          backgroundColor: '#ffffff',
          color: '#2d3748',
        },
        ".scroll-snap-container":{
          overflowY:"scroll",
          scrollSnapType:"y mandatory",
          height:"100vh",
        },
        ".scroll-snap-child":{
          scrollSnapAlign:"start",
          height:"100vh",
        },
      };

      addUtilities(newUtilities, ['hover']);
    },
  ],
} satisfies Config;

export default config;

