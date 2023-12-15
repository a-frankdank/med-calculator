/** @type {import('next').NextConfig} */
const nextConfig = {
    // does not produce anything apache can run:
    // npoutput: 'export',
    //output: 'standalone'

    /*
    reactStrictMode: true,
    swcMinify: true,
    // https://github.com/vercel/next.js/issues/32004
    useFileSystemPublicRoutes: true,
    */
}

module.exports = nextConfig
