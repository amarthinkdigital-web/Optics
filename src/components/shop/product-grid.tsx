"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  catalogCategories,
  catalogProducts,
  slugify,
} from "@/components/home/data";

interface ProductGridProps {
  initialCategory?: string;
  heading?: string;
  subheading?: string;
}

const catalogCategoryIds = new Set(catalogCategories.map((c) => c.id));

export default function ProductGrid({
  initialCategory = "",
  heading = "Full Catalog",
  subheading,
}: ProductGridProps) {
  const preselected = catalogCategoryIds.has(initialCategory)
    ? initialCategory
    : "all";
  const [catalogCategory, setCatalogCategory] = useState<string>(preselected);

  const activeFilter =
    catalogCategory === "all"
      ? catalogProducts
      : catalogProducts.filter((p) => p.categories.includes(catalogCategory));

  return (
    <div className="mx-auto max-w-7xl w-full px-6 flex flex-col gap-8 py-10">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">
          Curated Optics
        </span>
        <h2 className="font-display text-3xl font-bold tracking-tight text-luxury-black uppercase">
          {heading}
        </h2>
        <p className="text-xs text-gray-400">
          {activeFilter.length} styles available
        </p>
        {subheading && <p className="text-xs text-gray-500">{subheading}</p>}
      </div>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        {catalogCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCatalogCategory(cat.id)}
            className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 whitespace-nowrap ${
              catalogCategory === cat.id
                ? "bg-luxury-black text-white shadow-md"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-luxury-black"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeFilter.map((product) => {
          const slug = slugify(product.name);
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
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="w-3.5 h-3.5 rounded-full border border-gray-200"
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
