const colors = require('windicss/colors')
const typography = require('windicss/plugin/typography')

module.exports = {
  purge: {
    content: [
      'src/**/*.ts',
      'src/**/*.tsx'
    ],
    options: {
      safelist: ['prose', 'prose-sm', 'm-auto'],
    },
  },
  variants: {
    extend: {
    }
  },
  darkMode: false,
  plugins: [typography],
  theme: {
    extend: {
    }
  },
}
