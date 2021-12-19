const theme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['index.html', 'src/**/*.tsx'],
  mode: 'jit',
  darkMode: 'media',
  theme: {
    extend: {
      transitionProperty: {
        composite: 'transform, opacity',
      },
      zIndex: {
        negative: -1,
      },
      boxShadow: {
        'top-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      transitionDuration: {
        0: '0ms',
        5000: '5000ms',
      },
      fontSize: {
        xxs: '.55rem',
      },
      screens: {
        'pointer-fine': {
          raw: '(pointer: fine)',
        },
      },
      colors: {
        primary: '#bf7221',
        solid: {
          default: '#bf7221',
          dark: '#864a0a',
          gray: '#414042',
          mediumgray: '#9d9d9d',
          lightgray: '#f3f5f7',
          medium: '#9D560C',
          light: '#DA9144',
          accent: '#185F77',
          secondaccent: '#243582',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            fontFamily: 'Consolas',
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            h1: {
              fontWeight: '600',
              fontSize: '1.75rem',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '1rem',
              marginTop: '2rem',
              color: '#bf7221',
            },
            h2: {
              fontWeight: '600',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '1rem',
              marginTop: '2rem',
              color: '#bf7221',
            },
            a: {
              color: '#999',
              textDecoration: 'none',
              '&:hover': {
                color: '#bf7221',
              },
            },
          },
        },
      },
      backgroundImage: (theme) => ({
        hero: "url('/src/assets/shapes/header.svg')",
        'blocks-one': "url('/src/assets/shapes/blocks1.svg')",
        'blocks-two': "url('/src/assets/shapes/blocks2.svg')",
        'blocks-three': "url('/src/assets/shapes/blocks3.svg')",
      }),
      container: {
        center: true,
      },
      borderRadius: {
        '6xl': '3.5rem',
      },
      fontFamily: {
        display: ['Consolas', ...theme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-dir')],
};
