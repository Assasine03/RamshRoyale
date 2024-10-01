// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'casino-bg': "url('/images/bg-table.png')", 
      },
      colors: {
        casinoGreen: '#0d5901',
        casinoGold: '#ffd700',
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'cursive'], 
      },
    },
  },
  plugins: [],
};
