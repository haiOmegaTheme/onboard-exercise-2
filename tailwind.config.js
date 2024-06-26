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
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
