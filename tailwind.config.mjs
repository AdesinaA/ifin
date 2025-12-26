export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

        primary: "#EFF6FF",        // light blue background
        secondary: "#1D4ED8",      // main brand blue (nav, CTAs)
        formPrimary: "#1D4ED8",    // inputs, focus, forms
        blue: "#2563EB",           // hover / accents

        // Text & Neutrals
        label: "#0F172A",          // main text
        grey: "#64748B",           // secondary text
        faded: "#94A3B8",          // muted text
        black: "#070D17",

        // Backgrounds
        backgroundPrimary: "#FFFFFF",
        backgroundSecondary: "#F7F9FC",
        greyBg: "#F7F9FC",
        teal: "#FFFFFF",           // keep key, neutralize color

        // Borders & UI
        borderColor: "#E4E7EC",
        buttonInvalid: "#CBD5E1",

        // States
        error: "#DC2626",
        errorBg: "#FEF2F2",
      },
    },
  },
  plugins: [],
};
