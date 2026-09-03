"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products, slugify } from "./data";

export default function VirtualTryOnSection() {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 flex flex-col gap-4 sm:gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">Discover Favorites</span>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-luxury-black uppercase">
            Our Most Loved Frames
          </h2>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={scrollLeft}
            aria-label="Scroll Left"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-luxury-black hover:bg-luxury-gold hover:text-white hover:border-luxury-gold transition-all duration-300 shadow-sm"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            aria-label="Scroll Right"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-luxury-black hover:bg-luxury-gold hover:text-white hover:border-luxury-gold transition-all duration-300 shadow-sm"
          >
            →
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        id="collection"
        className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 sm:pb-6 pt-2 scrollbar-none"
      >
        {products.map((product) => {
          const productSlug = slugify(product.name);
          return (
            <div
              key={product.id}
              onClick={() => router.push(`/products/${productSlug}`)}
              className="snap-start shrink-0 w-[200px] sm:w-[250px] group flex flex-col bg-white border border-gray-200/50 rounded-3xl p-4 hover:shadow-xl hover:border-gray-300/40 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-square w-full bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden mb-3">
                {product.tag && (
                  <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-widest bg-luxury-gold text-white shadow">
                    {product.tag}
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 200px, 250px"
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1.5 flex-1 justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{product.brand}</span>
                  <h3 className="font-display font-bold text-xs text-luxury-black line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mt-1 pt-2 border-t border-gray-100">
                  <span className="text-xs font-extrabold text-luxury-black">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-[10px] text-gray-400 line-through">{product.oldPrice}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

