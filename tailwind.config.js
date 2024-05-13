/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'text': {
        'main': '#F3F3F3',
        'dim': '#76808C',
      },
      'bg': {
        'main': '#0E141B',
        'highlight': '#1E2329',
        'hover': '#313843',
        'secondary': '#14344B',
        'tertiary': '#212B45',
      },
      'primary': '#66C0F4',
      'secondary': '#4B619B',
      'accent': {
        'green': '#A1CD44',
        'red': '#CD5444',
        'yellow': '#C1B15F',
      },
      'blue': '#1A9FFF',
      'blueHi': '#00BBFF',
      'green': '#5BA32B',
      'greenHi': '#59BF40',
      'orange': '#E35E1C',
      'red': '#D94126',
      'redHi': '#EE563B',
      'dustyBlue': '#417a9b',
      'lightBlue': '#B3DFFF',
      'yellow': '#FFC82C',
      'chalkyBlue': '#66C0F4',
    },
    borderRadius: {
      DEFAULT: '3px',
      'lg': '5px',
    },
    fontSize: {
      xs: '0.625rem',
      sm: '0.75rem',
      base: '0.875rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.375rem',
      '3xl': '1.625rem',
    },
    extend: {},
  },
  plugins: [],
}
