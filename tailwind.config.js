/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        primary: "#303030",
        secondary: "white",
        pink: "#f62369",
        black: "#202123",
        "light-gray": "#e1e3e5",
        // Bạn có thể mở rộng dải màu gray chuẩn của Tailwind CSS
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280", // Đây là lớp `text-gray-500` mà bạn đang cần
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
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
