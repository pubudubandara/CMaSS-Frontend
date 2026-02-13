/** @type {import('tailwindcss').Config} */
module.exports = { 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f3f4f6", 
        surface: "#ffffff",
        border: "#e5e7eb",
        
        primary: {
          DEFAULT: "#f97316", 
          hover: "#ea580c",   
          light: "#ffedd5",   
        },
        dark: {
          DEFAULT: "#111827", 
          muted: "#4b5563",
        }
      },
    },
  },
  plugins: [],
}