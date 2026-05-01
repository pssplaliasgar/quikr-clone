/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Quikr primary blue — #1580C1 and its scale
        primary: {
          50:  '#e8f4fc',
          100: '#c5e2f6',
          200: '#9ecef0',
          300: '#6fb8e9',
          400: '#4aa6e4',
          500: '#2595de',
          600: '#1580C1',  // Quikr brand blue
          700: '#1169a0',
          800: '#0d5280',
          900: '#083d60',
        },
        // Quikr accent green — #1FAC4B and its scale
        accent: {
          50:  '#e8f8ee',
          100: '#c5edd3',
          200: '#9de1b5',
          300: '#6dd496',
          400: '#45c97c',
          500: '#28bc64',
          600: '#1FAC4B',  // Quikr brand green
          700: '#198f3e',
          800: '#137231',
          900: '#0c5524',
        },
      },
    },
  },
  corePlugins: {
    // Disable gradient utilities to enforce Quikr's flat design
    backgroundImage: false,
    gradientColorStops: false,
  },
  plugins: [],
}
