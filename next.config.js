/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.imagin.studio", // for generated images
      "vehicle-images.dealerinspire.com", // for Honda/Toyota images
      "images.ford.com", // for Ford
      "www.tesla.com", // for Tesla images
    ],
  },
};

module.exports = nextConfig;
