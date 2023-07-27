/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        spin2: "spin2 0.1s linear infinite",
        flip2: "flip2 0.2s linear infinite",
      },
      keyframes: {
        spin2: {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        flip2: {
          "0%": { transform: "rotateX(0deg)" },
          "20%": { transform: "rotateY(180deg)" },
          "40%": { transform: "rotateX(360deg)" },
          "80%": { transform: "rotateX(720deg)" },
          "100%": { transform: "rotateX(1080deg)" },
        },
      },
    },
  },
  plugins: [],
};
