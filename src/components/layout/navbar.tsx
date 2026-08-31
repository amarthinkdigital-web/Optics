"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

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
    id: "sunglasses",
    label: "Sunglasses",
    icon: "☀",
    items: [
      { label: "Men", href: "/category/men" },
      { label: "Women", href: "/category/women" },
      { label: "Unisex", href: "/category/unisex" },
      { label: "View All", href: "/products", tag: "New" },
    ],
  },
  {
    id: "collections",
    label: "Collections",
    icon: "◈",
    items: [
      { label: "New Arrivals", href: "/category/new-arrivals", tag: "Hot" },
      { label: "Best Sellers", href: "/category/best-sellers" },
      { label: "Limited Edition", href: "/category/limited", tag: "Ltd" },
      { label: "Summer Edit", href: "/category/summer" },
    ],
  },
  {
    id: "shop-by",
    label: "Shop By",
    icon: "◎",
    items: [
      { label: "Polarized", href: "/category/polarized" },
      { label: "Aviator", href: "/category/aviator" },
      { label: "Wayfarer", href: "/category/wayfarer" },
      { label: "Round", href: "/category/round" },
      { label: "Cat-Eye", href: "/category/cat-eye" },
    ],
  },
];

const standaloneLinks = [
  { label: "Our Story", href: "/about", icon: "◷" },
  { label: "Returns & Exchange", href: "/returns", icon: "↺" },
  { label: "Contact Us", href: "/contact", icon: "◉" },
];

/* ─── Spotlight cards shown in sidebar ──────────────── */
const spotlights = [
  { title: "Polarized Pro", price: "₹3,499", badge: "BESTSELLER" },
  { title: "Summer Edit", price: "₹2,899", badge: "NEW" },
];

/* ─── Component ──────────────────────────────────────── */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>("sunglasses");
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCart().count;
  const drawerRef = useRef<HTMLDivElement>(null);

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
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.08)]"
            : "bg-white/80 backdrop-blur-md border-b border-gray-100"
        }`}
      >
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          {/* Left: Hamburger */}
          <div className="flex items-center">
            <button
              id="nav-menu-trigger"
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              className="group relative flex flex-col gap-[5px] w-7 h-5 justify-center focus:outline-none"
            >
              <span className="block h-[1.5px] w-7 bg-luxury-black transition-all duration-300 group-hover:w-5" />
              <span className="block h-[1.5px] w-5 bg-luxury-black transition-all duration-300 group-hover:w-7" />
              <span className="block h-[1.5px] w-6 bg-luxury-black transition-all duration-300 group-hover:w-4" />
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
                width={150}
                height={44}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-5 text-luxury-black">
            {/* Search */}
            <button
              id="nav-search"
              aria-label="Search"
              className="text-gray-500 hover:text-luxury-black transition-colors duration-200"
            >
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account */}
            <Link
              href="/login"
              id="nav-account"
              aria-label="Account"
              className="text-gray-500 hover:text-luxury-black transition-colors duration-200"
            >
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              id="nav-cart"
              aria-label="Cart"
              className="relative text-gray-500 hover:text-luxury-black transition-colors duration-200"
            >
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[9px] font-black text-white">
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
        className={`fixed top-0 left-0 bottom-0 z-50 w-full max-w-[360px] flex flex-col bg-[#0f0f0f] text-white shadow-[8px_0_60px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.15,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ── DRAWER HEADER ── */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/8">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center hover:opacity-80 transition-opacity duration-300"
          >
            <Image
              src="/images/logo.webp"
              alt="Optics Logo"
              width={130}
              height={38}
              className="h-8 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>

          <button
            id="nav-drawer-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto scrollbar-none">

          {/* Pill tag row */}
          <div className="flex gap-2 px-7 pt-5 pb-1 flex-wrap">
            {["New In", "Sale", "Polarized"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 text-gray-400 hover:border-luxury-gold hover:text-luxury-gold cursor-pointer transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Accordion categories */}
          <nav className="px-4 pt-4">
            {categories.map((cat, idx) => {
              const isExpanded = openCat === cat.id;
              return (
                <div key={cat.id} className={idx !== 0 ? "border-t border-white/6" : ""}>
                  <button
                    id={`nav-cat-${cat.id}`}
                    onClick={() => toggleCat(cat.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between px-3 py-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-luxury-gold text-base leading-none">{cat.icon}</span>
                      <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-white group-hover:text-luxury-gold transition-colors duration-200">
                        {cat.label}
                      </span>
                    </div>
                    <svg
                      className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Sub items */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      isExpanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="pl-9 pr-3 pb-3 flex flex-col gap-0.5">
                      {cat.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="group/item flex items-center justify-between py-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            <span className="flex items-center gap-2">
                              <span className="block h-[1px] w-3 bg-luxury-gold/40 group-hover/item:w-5 transition-all duration-300" />
                              {item.label}
                            </span>
                            {item.tag && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30">
                                {item.tag}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="mx-7 my-2 border-t border-white/8" />

          {/* Standalone links */}
          <nav className="px-4">
            {standaloneLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3.5 group border-b border-white/6 last:border-0"
              >
                <span className="text-gray-500 text-sm leading-none">{link.icon}</span>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                  {link.label}
                </span>
                <svg className="ml-auto h-3.5 w-3.5 text-gray-600 group-hover:text-luxury-gold group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Spotlight cards */}
          <div className="px-7 pt-6 pb-4">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-500 mb-3">
              ✦ Featured
            </p>
            <div className="flex gap-3">
              {spotlights.map((s) => (
                <Link
                  key={s.title}
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/6 to-white/2 border border-white/8 p-4 hover:border-luxury-gold/40 hover:bg-white/8 transition-all duration-300 group"
                >
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30">
                    {s.badge}
                  </span>
                  <div className="h-12 w-12 rounded-full bg-white/6 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    🕶
                  </div>
                  <p className="text-xs font-semibold text-white leading-tight">{s.title}</p>
                  <p className="text-[11px] text-luxury-gold font-bold mt-0.5">{s.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── DRAWER FOOTER ── */}
        <div className="px-7 py-5 border-t border-white/8">
          {/* Social links */}
          <div className="flex items-center gap-3 mb-4">
            {[
              { name: "Instagram", icon: "Ig" },
              { name: "Pinterest", icon: "Pi" },
              { name: "Twitter", icon: "Tw" },
            ].map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="h-8 w-8 flex items-center justify-center rounded-full border border-white/10 text-gray-500 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 text-[9px] font-bold"
              >
                {s.icon}
              </a>
            ))}
            <span className="ml-auto text-[10px] text-gray-600 font-medium">@optics.eyewear</span>
          </div>

          {/* CTA button */}
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            id="nav-drawer-shop-cta"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-luxury-gold text-luxury-black text-xs font-black uppercase tracking-widest hover:bg-white transition-colors duration-300"
          >
            Shop All Frames
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <p className="text-center text-[9px] text-gray-600 mt-3 tracking-widest uppercase">
            Free shipping on orders over ₹1,999
          </p>
        </div>
      </aside>
    </>
  );
}
