//esto de abajo es para cuando no se usa typescript
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imgs.xkcd.com"],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    // averigua para que serviria los domains
    // domains: [
    //   {
    //     domain: "xkcd.com",
    //     defaultLocale: "en",
    //   },
    //   {
    //     domain: "xkcd.es",
    //     defaultLocale: "es",
    //   },
    // ],
  },
};

module.exports = nextConfig;
