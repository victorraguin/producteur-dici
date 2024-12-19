import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "#F7C35F"
      },
    },
    fontFamily: {
      title: ['Livvic', 'sans-serif'],
      body: ['"Century Gothic"', 'sans-serif'],
    },
  },
  plugins: [],
} satisfies Config;
