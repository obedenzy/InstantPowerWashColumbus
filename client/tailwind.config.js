/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'brand-navy-blue': '#1A2F5A',
        'brand-white': '#FFFFFF',
        // Secondary Colors
        'brand-cyan': '#00A8E8',
        'brand-slate-gray': '#6B7280',
        // Accent Color
        'brand-orange': '#F97316',
      }
    },
  },
  plugins: [],
}
