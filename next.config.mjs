/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    // for react-icons
    "react-icons/fa": {
      transform: "{{member}}",
    },
    // for antd
    antd: {
      transform: "{{member}}",
    },
  },
};

export default nextConfig;
