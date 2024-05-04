import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/app.footer";
import Header from "@/components/app.header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "System manage",
  description: "System manage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
