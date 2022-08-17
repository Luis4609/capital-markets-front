/** @type {import('next').NextConfig} */

// next.config.js - wrap your config withAxiom()
import { withAxiom } from "next-axiom";
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withAxiom({ nextConfig });
