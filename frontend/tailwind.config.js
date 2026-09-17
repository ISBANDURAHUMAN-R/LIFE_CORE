module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // cyan 500
        background: '#111827', // gray-900
        surface: '#1f2937', // gray-800
        accent: '#6366f1' // indigo 500
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
};
