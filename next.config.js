const { withAxiom } = require("next-axiom");

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "es",
  },
});

module.exports = nextConfig;
