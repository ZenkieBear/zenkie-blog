const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  sassOptions: {
    includPaths: [path.join(__dirname, './styles')],
    prependData: `@use "@/styles/variables";`
  }
}

module.exports = nextConfig
