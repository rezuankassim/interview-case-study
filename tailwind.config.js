module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textColor: ['group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // eslint-disable-line global-require
    require('@tailwindcss/aspect-ratio'), // eslint-disable-line global-require
  ],
}
