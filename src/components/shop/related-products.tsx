"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface RelatedItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  oldPrice?: string;
  image: string;
  slug: string;
  tag?: string;
}

interface RelatedProductsProps {
  items: RelatedItem[];
}

export default function RelatedProducts({ items }: RelatedProductsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 280, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section className="w-full bg-[#0d0d0d] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a880]">
              You Might Also Love
            </span>
            <h2 className="font-display text-xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              Related Styles
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Scroll Left"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-300"
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll Right"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-none"
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.slug}`}
              className="snap-start shrink-0 w-[180px] sm:w-[230px] group flex flex-col gap-3 cursor-pointer"
            >
              {/* Image card */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 group-hover:border-[#c5a880]/40 transition-all duration-500">
                {item.tag && (
                  <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-widest bg-[#c5a880] text-black">
                    {item.tag}
                  </span>
                )}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 180px, 230px"
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Hover shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#c5a880]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1 px-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a880]/70">
                  {item.brand}
                </span>
                <h3 className="text-xs font-semibold text-white/90 line-clamp-2 leading-tight group-hover:text-white transition-colors duration-200">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm font-extrabold text-white">{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-[10px] text-white/30 line-through">{item.oldPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-widest text-white/60 hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-300"
          >
            View All Eyewear
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
