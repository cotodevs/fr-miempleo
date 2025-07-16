import type { Metadata } from "next";
import "./globals.css";
import { rubik } from "@/shared/lib/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { theme } from "@/shared/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import esES from "antd/locale/es_ES";

export const metadata: Metadata = {
  title: {
    default: "Mi empleo COTONEB - Portal de Empleos",
    template: "%s | Mi empleo COTONEB",
  },
  description: "Encuentra las mejores oportunidades laborales en COTONEB...",
  keywords: "empleos COTONEB, trabajo, oportunidades laborales...",

  // Configuración de robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Open Graph para redes sociales
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://miempleo.cotoneb.com",
    siteName: "Mi empleo COTONEB",
    title: "Mi empleo COTONEB - Portal de Empleos",
    description:
      "Encuentra las mejores oportunidades laborales en COTONEB. Portal oficial de empleos con ofertas actualizadas.",
    images: [
      {
        url: "/images/FondoTH-movil.jpg",
        width: 1200,
        height: 630,
        alt: "Mi empleo COTONEB - Portal de Empleos",
      },
    ],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  category: "employment",
  classification: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={rubik.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <ConfigProvider theme={theme} locale={esES}>
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
        <ToastContainer
          limit={2}
          theme="colored"
          toastStyle={rubik.style}
          position="top-center"
        />
      </body>
    </html>
  );
}
