/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'opengraph.githubassets.com'
        ],
    },
    output: 'export',
};

export default nextConfig;
