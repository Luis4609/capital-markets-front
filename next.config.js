const { withAxiom } = require("next-axiom");

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = {
  nextConfig,
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};
