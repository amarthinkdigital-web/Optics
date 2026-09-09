"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import OgEditCard from "./og-edit-card";

/* ─── Types ─────────────────────────────────────────── */
interface SubItem {
  label: string;
  href: string;
  tag?: string;
}
interface NavCategory {
  id: string;
  label: string;
  icon: string;
  items: SubItem[];
}

/* ─── Navigation Data ────────────────────────────────── */
const categories: NavCategory[] = [
  {
    id: "clip-on",
    label: "Clip-On Glasses",
    icon: "▢",
    items: [
      { label: "All Clip-On", href: "/category/clip-on" },
      { label: "Men", href: "/category/men?parent=clip-on" },
      { label: "Women", href: "/category/women?parent=clip-on" },
    ],
  },
  {
    id: "eyeglasses",
    label: "Eyeglasses",
    icon: "▢",
    items: [
      { label: "All Eyeglasses", href: "/category/eyeglasses" },
      { label: "Men", href: "/category/men?parent=eyeglasses" },
      { label: "Women", href: "/category/women?parent=eyeglasses" },
    ],
  },
  {
    id: "sunglasses",
    label: "Sunglasses",
    icon: "▢",
    items: [
      { label: "All Sunglasses", href: "/category/sunglasses" },
      { label: "Men", href: "/category/men?parent=sunglasses" },
      { label: "Women", href: "/category/women?parent=sunglasses" },
    ],
  },
  {
    id: "accessories",
    label: "Accessories",
    icon: "▢",
    items: [
      { label: "All Accessories", href: "/category/accessories" },
      { label: "Cases", href: "/category/cases" },
      { label: "Cleaning Accessories", href: "/category/cleaning-accessories" },
      { label: "Eyewear Accessories", href: "/category/eyewear-accessories" },
    ],
  },
];

const standaloneLinks = [
  { label: "Our Stores", href: "/brands" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchange", href: "/returns" },
];

/* ─── Component ──────────────────────────────────────── */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { count: rawCount } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCartCount(rawCount);
  }, [rawCount]);

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* focus trap & body lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggleCat = (id: string) =>
    setOpenCat((prev) => (prev === id ? null : id));

  return (
    <>
      {/* ──────────────── HEADER BAR ──────────────── */}
      <header
        className={`fixed w-full top-0 left-0 z-40 transition-all duration-500 bg-white ${
          scrolled
            ? "shadow-[0_1px_30px_rgba(0,0,0,0.08)]"
            : "border-b border-gray-100"
        }`}
      >
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-5">
          {/* Left: Hamburger */}
          <div className="flex items-center">
            <button
              id="nav-menu-trigger"
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              className="group relative flex flex-col gap-[6px] w-8 h-6 justify-center focus:outline-none"
            >
              <span className="block h-[2px] w-8 bg-luxury-black transition-all duration-300 group-hover:w-6" />
              <span className="block h-[2px] w-6 bg-luxury-black transition-all duration-300 group-hover:w-8" />
              <span className="block h-[2px] w-7 bg-luxury-black transition-all duration-300 group-hover:w-5" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              id="nav-logo"
              className="flex items-center hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src="/images/logo.webp"
                alt="Optics Logo"
                width={160}
                height={48}
                className="h-10 sm:h-11 w-auto object-contain transition-all font-extrabold duration-300"
                priority
              />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <button
              id="nav-search"
              aria-label="Search"
              className="text-gray-600 transition-colors duration-200 hover:text-luxury-black"
            >
              <svg className="h-[22px] w-[22px] font-bold " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account */}
            <Link
              href="/login"
              id="nav-account"
              aria-label="Account"
              className="text-gray-600 transition-colors duration-200 hover:text-luxury-black"
            >
              <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              id="nav-cart"
              aria-label="Cart"
              className="relative text-gray-600 transition-colors duration-200 hover:text-luxury-black"
            >
              <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-black text-white px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* ──────────────── BACKDROP ──────────────── */}
      <div
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ──────────────── DRAWER ──────────────── */}
      <aside
        ref={drawerRef}
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed top-0 left-0 bottom-0 z-50 w-full max-w-[360px] flex flex-col bg-[#0a0a0a] text-white shadow-[10px_0_60px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.15,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ── DRAWER HEADER ── */}
        <div className="flex items-center justify-between px-6 pt-7 pb-4">
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-extrabold tracking-[0.2em] text-white uppercase leading-none">
              Optic Gallery
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] text-gray-400 uppercase mt-1">
              Eyewear for a Better You
            </span>
          </div>

          <button
            id="nav-drawer-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-6 py-2 flex flex-col gap-5">

          {/* New In / Sale / Search Pill Row */}
          <div className="flex items-center gap-2">
            <Link
              href="/category/sunglasses?parent=sunglasses"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/10 text-white hover:bg-luxury-gold hover:text-luxury-black transition-all duration-200"
            >
              New In
            </Link>

            <Link
              href="/category/sunglasses?parent=sunglasses"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/10 text-white hover:bg-luxury-gold hover:text-luxury-black transition-all duration-200"
            >
              Sale
            </Link>

            <div className="flex-1 relative flex items-center min-w-0">
              <div className="w-full flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-2 focus-within:bg-white/15 focus-within:ring-1 focus-within:ring-luxury-gold/50 transition-all duration-300">
                <svg className="h-3.5 w-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsOpen(false);
                      window.location.href = "/products";
                    }
                  }}
                  className="bg-transparent text-[11px] text-white placeholder:text-gray-400 focus:outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* 🌟 OG EDIT FEATURED BANNER BOX 🌟 */}
          <OgEditCard onClick={() => setIsOpen(false)} />

          {/* Accordion Categories */}
          <nav className="flex flex-col pt-3 gap-3">
            {categories.map((cat, idx) => {
              const isExpanded = openCat === cat.id;
              return (
                <div 
                  key={cat.id} 
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? "border-luxury-gold/40 bg-gradient-to-r from-[#141210] via-[#1e1913] to-[#2a2116] shadow-xl" 
                      : "border-white/10 bg-white/5 hover:border-luxury-gold/30 hover:bg-gradient-to-r hover:from-[#141210] hover:via-[#1e1913] hover:to-[#2a2116]"
                  }`}
                >
                  <div className="w-full flex items-center justify-between p-4 group">
                    <Link
                      href={`/category/${cat.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 flex-1"
                    >
                      {/* Custom Icons per category */}
                      <span className="text-luxury-gold flex items-center justify-center">
                        {cat.id === "clip-on" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M5 10v4a3 3 0 003 3h1a3 3 0 003-3v-4M12 10v4a3 3 0 003 3h1a3 3 0 003-3v-4M9 10H15" />
                          </svg>
                        )}
                        {cat.id === "eyeglasses" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="7" cy="12" r="4" strokeWidth={1.5} />
                            <circle cx="17" cy="12" r="4" strokeWidth={1.5} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 12h2" />
                          </svg>
                        )}
                        {cat.id === "sunglasses" && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 8c-1.1 0-2 .9-2 2v2c0 2.2 1.8 4 4 4h.5c2.2 0 4-1.8 4-4v-2c0-1.1-.9-2-2-2H4zm16 0h-2.5c-1.1 0-2 .9-2 2v2c0 2.2 1.8 4 4 4h.5c2.2 0 4-1.8 4-4v-2c0-1.1-.9-2-2-2zM9.5 11h5v1h-5v-1z" />
                          </svg>
                        )}
                        {cat.id === "accessories" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        )}
                      </span>
                      <span className="font-display text-xs font-bold uppercase tracking-[0.15em] text-white group-hover:text-luxury-gold transition-colors duration-200">
                        {cat.label}
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCat(cat.id);
                      }}
                      className="p-1 text-gray-400 hover:text-luxury-gold transition-colors"
                      aria-label="Toggle subcategories"
                    >
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180 text-luxury-gold" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Sub items */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out bg-black/20 ${
                      isExpanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="px-5 pb-4 flex flex-col gap-1">
                      {cat.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="group/item flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-medium text-gray-300 hover:text-luxury-gold hover:bg-white/5 transition-colors duration-200"
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="block h-[1px] w-3 bg-luxury-gold/50 group-hover/item:w-5 group-hover/item:bg-luxury-gold transition-all duration-300" />
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Standalone links with icons */}
          <nav className="flex flex-col border-t border-white/10 pt-2">
            {[
              {
                label: "Our Stores",
                href: "/about",
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                label: "About Us",
                href: "/about",
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
              },
              {
                label: "Contact Us",
                href: "/contact",
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
              },
              {
                label: "Shipping & Delivery",
                href: "/shipping",
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                ),
              },
              {
                label: "Returns & Exchange",
                href: "/returns",
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
              },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 group border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 group-hover:text-luxury-gold transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </div>
                <svg className="h-3.5 w-3.5 text-gray-600 group-hover:text-luxury-gold group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Socials & Follow Row */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                </svg>
              </a>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="h-9 w-9 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37A9.85 9.85 0 012.2 12a9.84 9.84 0 1119.9.03c0 2.63-1.02 5.1-2.88 6.96a9.82 9.82 0 01-7.17 2.8zm8.4-18.18A11.75 11.75 0 0012.02 0C5.5 0 .16 5.33.16 11.88c0 2.1.55 4.14 1.59 5.94L.16 24l6.32-1.66a11.8 11.8 0 005.53 1.4h.01c6.53 0 11.86-5.33 11.86-11.88 0-3.18-1.24-6.16-3.43-8.37z" />
                </svg>
              </a>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              <span>FOLLOW US <span className="text-[#c5a880]">@optic.gallery</span></span>
              <svg className="h-3 w-3 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Bottom Gold CTA Button */}
          <div className="pt-2 pb-6 flex flex-col items-center gap-2.5">
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              id="nav-drawer-shop-cta"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#c5a880] text-luxury-black text-xs font-black uppercase tracking-[0.2em] shadow-lg hover:bg-white transition-all duration-300"
            >
              Shop All Eyewear
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <span className="text-[8px] font-extrabold uppercase tracking-[0.3em] text-gray-500 text-center">
              Better Vision &nbsp;•&nbsp; Brighter Days
            </span>
          </div>

        </div>
      </aside>
    </>
  );
}
