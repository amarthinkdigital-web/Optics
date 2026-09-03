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
    <html lang="en" className="overflow-x-hidden">
      <body className="min-h-screen antialiased overflow-x-hidden w-full max-w-full">
        <Navbar />
        <main className="pt-20 w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
