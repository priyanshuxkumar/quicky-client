/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // domains: ["i.pinimg.com" , "cdn.statusqueen.com" , "images.unsplash.com"]
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.pinimg.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.statusqueen.com"',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'img.freepik.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'www.freepik.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'priyanshu-quicky-dev.s3.ap-south-1.amazonaws.com',
            pathname: '**',
          },
        ]
      },
};

export default nextConfig;
