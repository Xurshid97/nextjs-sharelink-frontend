import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Home from "./Home";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShareLink",
  description: "ShareLink gives you an opportunity to create a collection of links in one convenient place and share it with anyone. Add as many links as you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <Home>
            {children}
          </Home>
        </AntdRegistry>
      </body>
    </html>
  );
}
