// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind is scanning your React files
  ],
  theme: {
    extend: {
      colors: {
        casinoGreen: '#0d5901',
        casinoGold: '#ffd700',
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'cursive'], // Add the pixel font
      },
    },
  },
  plugins: [],
};
