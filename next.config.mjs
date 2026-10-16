/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.base44.com" },
      { protocol: "https", hostname: "www.grechmotors.com" },
    ],
  },
};
