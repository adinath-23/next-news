/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  }
}


module.exports = nextConfig
