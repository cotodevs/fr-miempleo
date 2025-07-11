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
  title: "Mi empleo COTONEB",
  description:
    "Mi empleo COTONEB es una aplicación para estar al tanto de los empleos disponibles en COTONEB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={rubik.className}>
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
