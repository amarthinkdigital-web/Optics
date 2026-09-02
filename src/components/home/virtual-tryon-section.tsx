"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { products, framesOverlay } from "./data";

export default function VirtualTryOnSection() {
  const router = useRouter();
  const { addItem } = useCart();
  const [tryonFrame, setTryonFrame] = useState<string>("aviator");

  const handleAdd = (id: string) => {
    addItem(id, 1);
    router.push("/cart");
  };

  return (
    <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left Column: Interactive Virtual Try-On Studio */}
      <div className="lg:col-span-4 rounded-[2px] border border-gray-200/80 bg-white p-5 md:p-8 flex flex-col justify-between gap-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880] animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold-dark">FITTING ROOM</span>
          </div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-luxury-black uppercase">
            Virtual Try-On
          </h2>
          <p className="text-xs text-gray-500">
            Swap frames below to preview premium optical styles live on our model.
          </p>
        </div>

        <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-[24px] overflow-hidden bg-[#eae9e4] border border-gray-100 flex items-center justify-center">
          <Image
            src="/images/tryon_model.png"
            alt="Try-on Assistant"
            fill
            className="object-cover"
          />
          {framesOverlay[tryonFrame]}
          <div className="absolute inset-4 border border-white/10 rounded-xl pointer-events-none flex flex-col justify-between p-2">
            <div className="flex justify-between">
              <div className="w-3 h-3 border-t border-l border-luxury-gold/50" />
              <div className="w-3 h-3 border-t border-r border-luxury-gold/50" />
            </div>
            <div className="flex justify-between">
              <div className="w-3 h-3 border-b border-l border-luxury-gold/50" />
              <div className="w-3 h-3 border-b border-r border-luxury-gold/50" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-4 gap-2">
            {["aviator", "classic", "round", "cateye"].map((style) => (
              <button
                key={style}
                onClick={() => setTryonFrame(style)}
                className={`py-2 text-[10px] font-bold tracking-wider uppercase rounded-xl border text-center transition-all duration-300 ${
                  tryonFrame === style
                    ? "border-luxury-black bg-luxury-black text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Most Loved Frames */}
      <div className="lg:col-span-8 flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">Discover Favorites</span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-luxury-black uppercase">
            Our Most Loved Frames
          </h2>
          <p className="text-xs text-gray-500">
            Discover the premium signature styles our customers can&apos;t stop wearing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6" id="collection">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white border border-gray-200/50 rounded-3xl p-4 hover:shadow-xl hover:border-gray-300/40 transition-all duration-300"
            >
              <div className="relative aspect-square w-full bg-gray-50 rounded-2xl flex items-center justify-center p-4 overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1 justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">{product.brand}</span>
                  <h3 className="font-display font-bold text-xs text-luxury-black line-clamp-1">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                  <span className="text-xs font-bold text-luxury-black">{product.price}</span>
                  <button
                    onClick={() => handleAdd(product.id)}
                    className="px-3 py-1.5 bg-luxury-black text-white text-[9px] font-bold tracking-widest uppercase rounded-full hover:bg-luxury-gold transition-colors duration-300"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
