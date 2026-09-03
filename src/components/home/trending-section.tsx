"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { trendingProducts, slugify } from "./data";

export default function TrendingSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addItem } = useCart();

  const handleAdd = (id: string) => {
    addItem(id, 1);
    router.push("/cart");
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {/* <span className="text-[15px] font-bold uppercase tracking-widest text-luxury-gold">
            Weekly Highlights
          </span> */}
          <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-luxury-black uppercase">
            Trending This Week
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

      <div
        ref={sliderRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 sm:pb-6 pt-2 scrollbar-none"
      >
        {trendingProducts.map((product) => {
          const productSlug = slugify(product.name);
          return (
            <div
              key={product.id}
              onClick={() => router.push(`/products/${productSlug}`)}
              className={`snap-start shrink-0 w-[220px] sm:w-[275px] h-[340px] sm:h-[420px] rounded-[24px] sm:rounded-[32px] relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 ${product.bgStyle} group shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer`}
            >
              {/* Top: Name & Tagline */}
              <div className="relative z-10 flex flex-col gap-1">
                <h3 className={`font-display font-extrabold text-lg sm:text-2xl tracking-widest leading-none ${product.textColor}`}>
                  {product.name}
                </h3>
                <span className={`text-[8px] sm:text-[9px] font-bold tracking-[0.2em] ${product.tagColor}`}>
                  {product.tagline}
                </span>
              </div>

              {/* Center: Product Image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-6 sm:mt-8">
                <div className="relative w-[110%] sm:w-[120%] aspect-square group-hover:scale-105 transition-transform duration-[6000ms] ease-out filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 250px, 320px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Bottom: Price & Cart */}
              <div className="relative z-10 w-full bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 flex items-center justify-center text-center shadow-lg group-hover:bg-white transition-colors duration-300">
                <div className="flex flex-col items-center">
                  <span className="text-[12px] sm:text-[14px] font-extrabold text-luxury-black leading-none tracking-wide">
                    {product.price}
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                    <span className="text-[9px] font-extrabold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                      {product.discount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
