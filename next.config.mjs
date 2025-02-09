import nextPWA from "next-pwa";
/** @type {import('next').NextConfig} */

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false
});

const nextConfig = withPWA({
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.discordapp.com",
      "profile.line-scdn.net",
      "pbs.twimg.com",
      "avatars.githubusercontent.com"
    ]
  }
});

export default nextConfig;
