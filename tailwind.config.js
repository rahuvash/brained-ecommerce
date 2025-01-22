/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#ebf8ff", // Very light blue
          DEFAULT: "#3b82f6", // Blue
          dark: "#1e3a8a", // Dark blue
        },
        accent: {
          DEFAULT: "#22d3ee", // Cyan
          light: "#cffafe", // Light Cyan
        },
        neutral: {
          light: "#f9fafb", // Light gray
          dark: "#1f2937", // Dark gray
        },
        
      },
      
    },
  },
  plugins: [],
};
