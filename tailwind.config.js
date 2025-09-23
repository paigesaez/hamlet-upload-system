const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-default": "#002147",
        "primary-hover": "#003C81",
        "secondary-default": "#00CCCC",
        "accent-default": "#FF8200",
        "text-primary": "#002147",
        "background-light": "#FAFAFA",
        "background-dark": "#001734",
      },
    },
  },
  plugins: [
    nextui({
      defaultTheme: "light",
      themes: {
        light: {
          layout: {
            hoverOpacity: 0.8,
            boxShadow: {
              small: "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06)",
              medium: "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08)",
              large: "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12)",
            },
          },
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            divider: "rgba(0, 0, 0, 0.15)",
            overlay: "#000000",
            focus: "#006FEE",
            content1: "#FFFFFF",
            content2: "#f4f4f5",
            content3: "#e4e4e7",
            content4: "#d4d4d8",

            // Popover backgrounds
            popover: {
              DEFAULT: "#FFFFFF",
              foreground: "#11181C",
            },

            default: {
              50: "#fafafa",
              100: "#f4f4f5",
              200: "#e4e4e7",
              300: "#d4d4d8",
              400: "#a1a1aa",
              500: "#71717a",
              600: "#52525b",
              700: "#3f3f46",
              800: "#27272a",
              900: "#18181b",
              DEFAULT: "#d4d4d8",
              foreground: "#000000",
            },
            primary: {
              50: "#e6f1ff",
              100: "#cce3ff",
              200: "#99c7ff",
              300: "#66aaff",
              400: "#338eff",
              500: "#006FEE",
              600: "#005bc4",
              700: "#004493",
              800: "#002e62",
              900: "#001731",
              DEFAULT: "#006FEE",
              foreground: "#FFFFFF",
            },
            secondary: {
              50: "#f2eafa",
              100: "#e4d4f4",
              200: "#c9a9e9",
              300: "#ae7ede",
              400: "#9353d3",
              500: "#7828c8",
              600: "#6020a0",
              700: "#481878",
              800: "#301050",
              900: "#180828",
              DEFAULT: "#7828c8",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#17c964",
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#f5a524",
              foreground: "#000000",
            },
            danger: {
              DEFAULT: "#f31260",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};