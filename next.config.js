/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'serverless',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.datocms-assets.com'],
    minimumCacheTTL: 31536000,
  },
  i18n: {
    // providing the locales supported by your application
    locales: ["pt", "en"],
    //  default locale used when the non-locale paths are visited
    defaultLocale: "pt",
  },
}

module.exports = nextConfig
