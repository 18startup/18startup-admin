/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'wholesale-cc.s3.ap-south-1.amazonaws.com',
                protocol: 'https'   
            }
        ]
    }
};

export default nextConfig;
