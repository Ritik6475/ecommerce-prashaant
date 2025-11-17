/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.bewakoof.com',
      },

 {           
        protocol: "https",
        hostname: "**",   
},
      {
        protocol: 'https',
        hostname: 'd2fy0k1bcbbnwr.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },

            {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      

    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig;
