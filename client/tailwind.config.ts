import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {


    screens: {
      'xs': '380px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        customDark: {
          900: '#121418',
          700: '#1B1F24',
        },
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'emerge': {
            from: {
                transform: "translateY(100%)",
            },
            to: {
              transform: "translateY(0)",
            },
        },
        'out': {
          from: {
              transform: "translateY(0)",
          },
          to: {
            transform: "translateY(100%)",
          },
      },
    },
    animation: {
        'emerge': 'emerge .25s ease-out',
        'out': 'out .25s ease-in',
    },
    },
  },
  plugins: [],
}

export default config

