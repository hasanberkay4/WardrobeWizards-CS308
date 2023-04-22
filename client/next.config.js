/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  dangerouslyAllowSVG: true,
  contentDispositionType: 'attachment',
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}

module.exports = nextConfig
