/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* Palette primaire moderne */
        primary: "#0066ff",
        "primary-dark": "#0052cc",
        "primary-light": "#3385ff",
        
        /* Palette d'accent */
        accent: "#00d9ff",
        "accent-secondary": "#ff6b35",
        warning: "#ffa500",
        success: "#22c55e",
        error: "#ff3333",
        
        /* Arrière-plans */
        bg: "#0a0e27",
        "bg-secondary": "#151b3a",
        "bg-tertiary": "#1f2643",
        card: "#1a1f3a",
        
        /* Texte */
        text: "#f5f7fb",
        "text-secondary": "#c7d2e8",
        "text-muted": "#8892b0",
        
        /* Bordures */
        border: "#2d3454",
        "border-light": "#3d4563",
      },
      
      backgroundColor: {
        dark: "#0a0e27",
      },
      
      textColor: {
        light: "#f5f7fb",
      },
      
      borderColor: {
        dark: "#2d3454",
      },
      
      boxShadow: {
        sm: "0 2px 8px rgba(0, 0, 0, 0.15)",
        md: "0 8px 24px rgba(0, 0, 0, 0.2)",
        lg: "0 16px 40px rgba(0, 0, 0, 0.3)",
        glow: "0 0 20px rgba(0, 102, 255, 0.15)",
        "glow-lg": "0 0 40px rgba(0, 102, 255, 0.3)",
      },
      
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        vsm: "364px",
      },
      
      spacing: {
        160: "42rem",
      },
      
      margin: {
        76: "300px",
        100: "550px",
      },
      
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      
      transitionDuration: {
        DEFAULT: "300ms",
      },
      
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};