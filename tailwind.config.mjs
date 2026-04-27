/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  theme: {
    extend: {
      colors: {
        ink: {
          50: "#faf7f2",
          100: "#f1ebe0",
          900: "#1a1011",
        },
        vermilion: {
          400: "#ef4444",
          500: "#dc2626",
          600: "#b91c1c",
          700: "#991b1b",
          800: "#7f1d1d",
        },
      },
      backgroundImage: {
        "lantern-red":
          "linear-gradient(135deg, #dc2626 0%, #991b1b 55%, #450a0a 100%)",
        "ink-wash":
          "radial-gradient(circle at 20% 0%, rgba(220,38,38,0.18), transparent 55%), radial-gradient(circle at 90% 100%, rgba(127,29,29,0.20), transparent 60%)",
      },
      boxShadow: {
        scroll:
          "0 1px 0 rgba(220,38,38,0.35), 0 0 0 1px rgba(220,38,38,0.12), 0 18px 30px -20px rgba(0,0,0,0.6)",
      },
    },

    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    fontFamily: {
      inter: ["Inter", "sans-serif"],
      hanzi: ['"Noto Serif SC"', '"Ma Shan Zheng"', "serif"],
      display: ['"ZCOOL XiaoWei"', '"Noto Serif SC"', "serif"],
    },
  },

  plugins: [],

  darkMode: ["selector", '[data-theme="dark"]'],
};
