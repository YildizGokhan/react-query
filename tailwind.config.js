/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "#2563EB",
            dark: "#1E40AF",
            light: "#3B82F6",
          },
          secondary: "#FACC15",
          grayDark: "#374151",
          danger: "#EF4444",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
        },
        borderRadius: {
          xl: "1rem",
        },
        spacing: {
          18: "4.5rem",
        },
        boxShadow: {
          card: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: [require("@tailwindcss/forms")],
  };
  