/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--neon)", // Using Sanad's neon as primary
        background: "var(--navy)", // Using Sanad's navy as background
        foreground: "#f4f7f6",
        "primary-foreground": "var(--navy)",
        dash: {
          dark: "#0A0C1A",
          darker: "#050610",
          card: "#0F1225",
          border: "rgba(255, 255, 255, 0.05)",
          accent: "#17E596",
          blue: "#0EA5E9",
          indigo: "#6366F1",
          purple: "#8B5CF6",
          orange: "#F59E0B",
          red: "#EF4444"
        }
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        tajawal: ["Tajawal", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
    },
  },
  plugins: [],
}
