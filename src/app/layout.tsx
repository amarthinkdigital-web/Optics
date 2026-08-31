import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Optics",
  description: "E-commerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
