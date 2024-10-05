/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'opengraph.githubassets.com'
        ],
        unoptimized: true,
    },
    output: 'export',
};

export default nextConfig;
