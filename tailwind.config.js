/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{html,js,ts,Vue}'],
  theme: {
    color: {
      'text': {
        'main': '#F3F3F3',
        'dim': '#76808C',
      },
      'bg': {
        'main': '0E141B',
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
      }
    },
    extend: {
      fontFamily: {
        sans: [
          'Motiva Sans',
          ...defaultTheme.fontFamily.sans,
        ]
      },
      fontSize: {
        'heading': {
          'lg': ['1.625rem', {
            fontWeight: '700',
          }],
          'md': ['1.375rem', {
            fontWeight: '700',
          }],
          'sm': ['1.125rem', {
            fontWeight: '700',
          }],
        },
        'body': {
          'lg': ['1rem', {
            fontWeight: '400',
          }],
          'md': ['0.875rem', {
            fontWeight: '400',
          }],
          'sm': ['0.75rem', {
            fontWeight: '400',
          }]
        }
      }
    },
  },
  plugins: [],
}