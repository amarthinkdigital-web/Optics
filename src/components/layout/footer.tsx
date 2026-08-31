"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Newsletter Strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">Stay Connected</span>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Join the Optics Inner Circle
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              Get early access to new collections, exclusive offers, and style inspiration delivered to your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex w-full md:w-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 md:w-72 px-5 py-3.5 bg-white/5 border border-white/10 rounded-l-full text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-luxury-gold/50 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-luxury-gold text-luxury-black font-bold text-[10px] uppercase tracking-widest rounded-r-full hover:bg-luxury-gold-dark transition-colors duration-300 shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/images/logo.webp"
                alt="Optics Logo"
                width={170}
                height={50}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Curating the world&apos;s finest eyewear since 2020. Premium frames crafted for those who demand clarity, comfort, and confidence.
            </p>
            <div className="flex items-center gap-3">
              {["Instagram", "Twitter", "Facebook", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300"
                  aria-label={social}
                >
                  <span className="text-[10px] font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">Shop</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "All Sunglasses", href: "/products" },
                { label: "New Arrivals", href: "/category/new-arrivals" },
                { label: "Best Sellers", href: "/category/best-sellers" },
                { label: "Men", href: "/category/men" },
                { label: "Women", href: "/category/women" },
                { label: "Polarized", href: "/category/polarized" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">Company</h4>
            <ul className="flex flex-col gap-3">
              {["About Us", "Our Story", "Sustainability", "Careers", "Press"].map((label) => (
                <li key={label}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">Support</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "FAQ", href: "/faq" },
                { label: "Shipping Info", href: "/shipping" },
                { label: "Returns & Exchanges", href: "/returns" },
                { label: "Size Guide", href: "/size-guide" },
                { label: "Track Order", href: "/track-order" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Email</span>
                <a href="mailto:support@optics.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  support@optics.com
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Phone</span>
                <a href="tel:+971501234567" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +971 50 123 4567
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Location</span>
                <span className="text-sm text-gray-400">Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[11px] text-gray-500">
            <span>&copy; {new Date().getFullYear()} Optics. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-2">
            {["Visa", "Mastercard", "Amex", "Apple Pay"].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-bold uppercase tracking-wider text-gray-500"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
