/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack está ahora estable, mover de experimental
  turbopack: {
    // Configuraciones específicas de turbopack
  },

  experimental: {
    // Optimizaciones que SÍ funcionan con Turbopack
    optimizeCss: true,
    caseSensitiveRoutes: false,
  },

  // REMOVER modularizeImports para antd - causa problemas con Turbopack
  modularizeImports: {
    // Solo mantener react-icons que sí funciona
    "react-icons/fa": {
      transform: "react-icons/fa/{{member}}",
    },
    "react-icons/md": {
      transform: "react-icons/md/{{member}}",
    },
    "react-icons/hi": {
      transform: "react-icons/hi/{{member}}",
    },
    // QUITAR la configuración de antd que causa el error
  },
};

export default nextConfig;
