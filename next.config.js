/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'downloads.ctfassets.net',
      'assets.ctfassets.net',
      'images.ctfassets.net',
    ],
  },
  // Remove the webpack config if not needed
//  async redirects() {
 //   return [
  //    {
  //    source: '/blog',
  //      destination: '/blog/page/1',
  //      permanent: false, // Changed to false to prevent caching
  //    },
  //  ];
  //},
  async headers() {
    return [
      {
        source: '/resources',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; img-src 'self' data: https:; media-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https:;",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
