/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.pinimg.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.i-scmp.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'content.tupaki.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'englishtribuneimages.blob.core.windows.net',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'imgeng.jagran.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'www.thestatesman.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'images.news18.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'instagram.fknu1-3.fna.fbcdn.net',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'assets.vogue.in',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'pin.it',
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
            hostname: '4kwallpapers.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'priyanshu-quicky-dev.s3.ap-south-1.amazonaws.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'r1.ilikewallpaper.net',
            pathname: '**',
          },
        ]  
      },
};

export default nextConfig;
