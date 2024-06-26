/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#303030",
      secondary: "white",
      pink: "#f62369",
      black: "#202123",
      gray: "#dee0e2",
      "light-gray": "#e1e3e5",
    },
    extend: {
      transitionTimingFunction: {
        "ease-in-out-custom": "ease-in-out",
      },
      transitionDuration: {
        350: "350ms",
      },
      transform: {
        "rotate-90": "rotate(90deg)",
      },
      screens: {
        xs: "480px", // Extra small devices
        sm: "640px", // Small devices
        md: "768px", // Medium devices
        lg: "1024px", // Large devices
        xl: "1280px", // Extra large devices
        "2xl": "1536px", // 2x Extra large devices
        "3xl": "1920px",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen md": {
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "1280px",
          },
          "@screen xl": {
            maxWidth: "1400px",
          },
        },
      });
    },
  ],
};
