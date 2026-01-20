/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        vsm: "364",
      },
      spacing: {
        160: "42rem", // Ajoute une classe 'mt-160' (640px)
      },
      margin: {
        76: "300px",
        100: "550px", // Classe utilitaire ml-72-custom (288px)
      },
    },
  },
  plugins: [],
};
