/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      // La page Tarifs/Offres a fusionné avec Services (redirection permanente).
      {
        source: "/tarifs",
        destination: "/services",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
