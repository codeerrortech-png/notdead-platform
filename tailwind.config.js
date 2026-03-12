/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0b0f17",
          secondary: "#111827",
          accent: "#00ff9c",
          text: "#e5e7eb",
          "accent-dim": "rgba(0, 255, 156, 0.3)",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        neon: "0 0 5px #00ff9c, 0 0 20px rgba(0, 255, 156, 0.4)",
        "neon-lg": "0 0 15px #00ff9c, 0 0 40px rgba(0, 255, 156, 0.3)",
        "neon-button": "0 0 20px #00ff9c, 0 0 40px rgba(0, 255, 156, 0.25)",
        glow: "0 0 30px rgba(0, 255, 156, 0.2)",
        "glow-strong": "0 0 40px rgba(0, 255, 156, 0.3)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px #00ff9c, 0 0 20px rgba(0, 255, 156, 0.2)" },
          "50%": { boxShadow: "0 0 10px #00ff9c, 0 0 40px rgba(0, 255, 156, 0.4)" },
        },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0, 255, 156, 0.2)", boxShadow: "0 0 20px rgba(0, 255, 156, 0.1)" },
          "50%": { borderColor: "rgba(0, 255, 156, 0.4)", boxShadow: "0 0 30px rgba(0, 255, 156, 0.2)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        scan: "scan 3s linear infinite",
        float: "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      backgroundImage: {
        "gradient-radial-cyber": "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 255, 156, 0.08), transparent 50%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent, rgba(0, 255, 156, 0.1), transparent)",
      },
    },
  },
  plugins: [],
}
