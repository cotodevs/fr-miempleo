import type { Metadata } from "next";
import "./globals.css";
import { rubik } from "@/shared/lib/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { theme } from "@/shared/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "fr-starter",
  description: "Fr starter project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={rubik.className}>
      <body>
        <ConfigProvider theme={theme}>
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
