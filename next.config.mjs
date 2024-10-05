/** @type {import('next').NextConfig} */
// basePath and images.unoptimized get's injected through the publish.yml
const nextConfig = {
    basePath: "/portfolio",
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'opengraph.githubassets.com'
        ],
        unoptimized: true
    },
    output: 'export',
};

export default nextConfig;
