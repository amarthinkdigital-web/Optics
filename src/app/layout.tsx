import type { Metadata } from "next";
import { Navbar, Footer, WhatsAppButton } from "@/components/layout";
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
        <main className="pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
