"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  catalogCategories,
  catalogProducts,
  mainOfSub,
  slugify,
} from "@/components/home/data";

interface ProductGridProps {
  initialCategory?: string;
  parentMain?: string;
  heading?: string;
  subheading?: string;
}

export default function ProductGrid({
  initialCategory = "",
  parentMain = "",
  heading = "Full Catalog",
  subheading,
}: ProductGridProps) {
  const isMain = catalogCategories.some((m) => m.id === initialCategory);

  const resolvedMain = isMain
    ? initialCategory
    : parentMain || mainOfSub(initialCategory)?.id || "";
  const activeMain = catalogCategories.find((m) => m.id === resolvedMain) ?? null;

  const activeCategory = isMain ? initialCategory : initialCategory || "all";
  const activeSub = isMain ? null : initialCategory;

  const activeFilter =
    activeCategory === "all"
      ? catalogProducts
      : catalogProducts.filter((p) => p.categories.includes(activeCategory));

  const [selectedColors] = useState<Record<string, number>>({});

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 flex flex-col gap-8 py-8 sm:py-10">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">
          Curated Optics
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-luxury-black uppercase">
          {heading}
        </h2>
        <p className="text-xs text-gray-400">
          {activeFilter.length} styles available
        </p>
        {subheading && <p className="text-xs text-gray-500">{subheading}</p>}
      </div>

      {/* Main category row */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {catalogCategories.map((cat) => (
            <Link
              key={`main-${cat.id}`}
              href={`/category/${cat.id}`}
              className={`shrink-0 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 whitespace-nowrap ${
                activeMain?.id === cat.id
                  ? "bg-luxury-black text-white shadow-md"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-luxury-black"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Sub category row of the active main */}
        {activeMain && activeMain.subCategories.length > 0 && (
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none">
            {activeMain.subCategories.map((sub) => (
              <Link
                key={`sub-${sub.id}`}
                href={`/category/${sub.id}?parent=${activeMain.id}`}
                className={`shrink-0 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 whitespace-nowrap ${
                  activeSub === sub.id
                    ? "bg-luxury-gold text-luxury-black border-luxury-gold shadow-sm"
                    : "bg-transparent text-gray-500 border-gray-200 hover:border-luxury-gold hover:text-luxury-black"
                }`}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {activeFilter.map((product) => {
          const slug = slugify(product.name);
          const activeColorIdx = selectedColors[product.id] || 0;
          return (
            <Link
              key={product.id}
              href={`/products/${slug}`}
              className="group relative flex flex-col bg-white border border-gray-200/60 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300/40 transition-all duration-300"
            >
              <div className="relative aspect-square w-full bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
                {product.tag && (
                  <span
                    className={`absolute top-4 left-4 z-10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${
                      product.tag === "Sale"
                        ? "bg-red-500 text-white"
                        : product.tag === "Trending"
                        ? "bg-luxury-gold text-white"
                        : "bg-luxury-black text-white"
                    }`}
                  >
                    {product.tag}
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="flex flex-col gap-3 p-5 flex-1 justify-between">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                    {product.brand}
                  </span>
                  <h3 className="font-display font-medium text-sm text-luxury-black group-hover:text-luxury-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                  <div className="flex flex-col">
                    {product.oldPrice && (
                      <span className="text-[10px] text-gray-400 line-through leading-none mb-1">
                        {product.oldPrice}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-luxury-black">
                      {product.price}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {product.colors.map((color, colorIdx) => (
                      <span
                        key={color}
                        className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                          activeColorIdx === colorIdx
                            ? "ring-1 ring-offset-1 ring-luxury-black scale-110"
                            : "border-gray-200"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {activeFilter.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-16">
          No styles found in this category yet.
        </p>
      )}
    </div>
  );
}
