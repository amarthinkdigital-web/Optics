"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { ogEditProducts, slugify } from "@/components/home/data";

const ogCode = (index: number) => `OG ${String(index + 1).padStart(3, "0")}`;

export default function OGEditPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuickAdd = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(id, 1);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-luxury-black">
      {/* ──────────────── 1. HERO BANNER SECTION ──────────────── */}
      <section className="relative w-full min-h-[360px] sm:min-h-[460px] md:min-h-[520px] bg-[#dedad2] border-b border-gray-200 overflow-hidden flex items-center">
        {/* Full-width campaign image */}
        <Image
          src="/images/og_edit_hero.png"
          alt="OG Edit Blackout Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-center"
        />



        {/* Banner Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-10 py-10 flex items-center justify-between">
          {/* Left Text Overlay */}
          <div className="flex flex-col max-w-sm sm:max-w-md">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#8a755b]">
              OG EDIT 01
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-luxury-black uppercase leading-none mt-1">
              BLACKOUT
            </h1>

            <p className="text-xs sm:text-sm text-gray-700 font-light tracking-wide mt-2">
              Bold frames. Sharp lines. One mood.
            </p>

            {/* Gold Accent Bar */}
            <div className="w-12 h-[2px] bg-[#c5a880] my-4" />

            {/* Button */}
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-6 py-3 bg-luxury-black text-white text-[11px] font-extrabold tracking-[0.2em] uppercase rounded hover:bg-[#c5a880] hover:text-black transition-all duration-300 shadow-md group"
              >
                <span>SHOP THE EDIT</span>
                <svg className="w-4 h-4 text-white group-hover:text-black group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Bottom Corner Tagline */}
          <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-10 z-10 flex flex-col items-end pointer-events-none select-none">
            <div className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-[0.3em] text-luxury-black text-right leading-snug opacity-85">
              <div>VISION</div>
              <div>LIVES</div>
              <div>DIFFERENTLY</div>
            </div>
            <div className="w-10 h-[2px] bg-[#c5a880] mt-1" />
          </div>
        </div>
      </section>

      {/* ──────────────── 2. CURATED PIECES SECTION 1 ──────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
          <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-[0.2em] text-luxury-black uppercase">
            CURATED PIECES
          </h2>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#c5a880] hover:text-luxury-black transition-colors"
          >
            <span>VIEW ALL</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* 2-Column Product Grid (Row 1 & 2) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {ogEditProducts.slice(0, 4).map((product, index) => {
            const slug = slugify(product.name);
            const isFav = favorites[product.id];

            return (
              <div
                key={product.id}
                onClick={() => router.push(`/products/${slug}`)}
                className="group relative flex flex-col bg-white border border-gray-200/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Container (1:1 Ratio) */}
                <div
                  className="relative aspect-square w-full bg-[#f8f8f8] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
                >
                  {/* Heart Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(product.id, e)}
                    aria-label="Add to favorites"
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                  >
                    <svg
                      className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : "fill-none"}`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Quick Add Overlay */}
                  <button
                    onClick={(e) => handleQuickAdd(product.id, e)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-luxury-black text-white text-[9px] font-extrabold tracking-widest uppercase rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#c5a880] hover:text-black whitespace-nowrap"
                  >
                    + Quick Add
                  </button>
                </div>

                {/* Info Container */}
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-luxury-black tracking-wider uppercase">
                      {ogCode(index)}
                    </span>
                    <h3 className="text-xs font-semibold text-gray-700 group-hover:text-luxury-black transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-extrabold text-luxury-black">
                        {product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-gray-400 line-through">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1">
                      {product.colors.map((c, idx) => (
                        <span
                          key={idx}
                          className="w-2.5 h-2.5 rounded-full border border-gray-300"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────── 3. MID-PAGE LIFESTYLE BANNER ──────────────── */}
      <section className="relative w-full bg-[#111111] py-14 sm:py-20 overflow-hidden border-y border-neutral-800">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/tryon_model.png"
            alt="Crafted Lifestyle"
            fill
            sizes="100vw"
            className="object-cover object-center filter grayscale contrast-[1.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col gap-2 max-w-lg">
            <h2 className="font-serif text-2xl sm:text-4xl italic font-normal text-white leading-tight">
              Crafted for bold everyday style.
            </h2>
            <p className="text-[10px] sm:text-xs font-extrabold tracking-[0.25em] text-[#c5a880] uppercase mt-2">
              MORE THAN EYEWEAR. A HIGHER PERSPECTIVE.
            </p>
          </div>

          <div className="relative w-full max-w-md h-36 sm:h-48 rounded-2xl overflow-hidden bg-black/60 border border-luxury-gold/30 p-4 flex items-center justify-center shadow-2xl">
            <Image
              src="/images/sunglasses_1.png"
              alt="OG Monogram Frame Detail"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain p-2"
            />
            <div className="absolute top-4 right-4 bg-luxury-black/90 border border-luxury-gold/50 px-3 py-1 rounded text-[10px] font-serif font-bold text-luxury-gold tracking-widest">
              OG MONOGRAM
            </div>
          </div>

        </div>
      </section>

      {/* ──────────────── 4. CURATED PIECES SECTION 2 ──────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {ogEditProducts.slice(4, 6).map((product, index) => {
            const slug = slugify(product.name);
            const isFav = favorites[product.id];

            return (
              <div
                key={product.id}
                onClick={() => router.push(`/products/${slug}`)}
                className="group relative flex flex-col bg-white border border-gray-200/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Container (1:1 Ratio) */}
                <div
                  className="relative aspect-square w-full bg-[#f8f8f8] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
                >
                  <button
                    onClick={(e) => toggleFavorite(product.id, e)}
                    aria-label="Add to favorites"
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                  >
                    <svg
                      className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : "fill-none"}`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  <button
                    onClick={(e) => handleQuickAdd(product.id, e)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-luxury-black text-white text-[9px] font-extrabold tracking-widest uppercase rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#c5a880] hover:text-black whitespace-nowrap"
                  >
                    + Quick Add
                  </button>
                </div>

                {/* Info Container */}
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-luxury-black tracking-wider uppercase">
                      {ogCode(index + 4)}
                    </span>
                    <h3 className="text-xs font-semibold text-gray-700 group-hover:text-luxury-black transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-extrabold text-luxury-black">
                        {product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-gray-400 line-through">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {product.colors.map((c, idx) => (
                        <span
                          key={idx}
                          className="w-2.5 h-2.5 rounded-full border border-gray-300"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ──────────────── 5. BOTTOM CTA BUTTON ──────────────── */}
        <div className="flex flex-col items-center gap-3 pt-6 pb-4">
          <Link
            href="/products"
            className="w-full max-w-xl py-4 rounded-full bg-luxury-black text-white text-xs font-extrabold uppercase tracking-[0.25em] text-center hover:bg-[#c5a880] hover:text-luxury-black transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
          >
            <span>EXPLORE ALL EYEWEAR</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-gray-400 text-center">
            CLEARER DAYS AHEAD
          </span>
        </div>
      </section>
    </div>
  );
}
