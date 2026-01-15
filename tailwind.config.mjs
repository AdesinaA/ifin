export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* BRAND */
        navy: "#0B1C2D",
        navySoft: "#102A43",

        gold: "#D4AF37",
        goldSoft: "#F5D76E",

        /* BACKGROUNDS */
        backgroundPrimary: "#F8FAFC",
        backgroundSecondary: "#102A43",

        /* TEXT */
        textPrimary: "#111827",
        textMuted: "#9CA3AF",
        textInverse: "#F8FAFC",

        /* UI */
        borderColor: "#E5E7EB",

        /* STATES */
        success: "#16A34A",
        error: "#DC2626",
      },
    },
  },
  plugins: [],
};
