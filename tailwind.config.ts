import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        "dark-purple": "#3F0973",
        "app-purple": "#702EB0",
        "light-purple": "#F7EFFF",
        "light-gray": "#758494",
        "disabled-btn": "#B9A6D4",
        "input-bg": "#EDF0F3",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        'custom-gray': '#C0C0C0',
        "dark-purple": "#3F0973",
      },
    },
  },
  plugins: [],
};
export default config;
