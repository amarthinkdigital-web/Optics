"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { catalogCategories, catalogProducts, slugify } from "./data";

interface FullCatalogProps {
  catalogRef: React.RefObject<HTMLDivElement | null>;
  catTabsRef: React.RefObject<HTMLDivElement | null>;
  stickyBar: boolean;
}

const INITIAL_VISIBLE = 8;

export default function FullCatalog({ catalogRef, catTabsRef, stickyBar }: FullCatalogProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [activeMain, setActiveMain] = useState<string>(catalogCategories[0]?.id ?? "");
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({});
  const [showAll, setShowAll] = useState(false);

  const currentMain = catalogCategories.find((m) => m.id === activeMain) ?? null;
  const subRow = currentMain?.subCategories ?? [];

  const catalogProductsAll = catalogProducts;
  const visibleCatalog = showAll ? catalogProductsAll : catalogProductsAll.slice(0, INITIAL_VISIBLE);

  const handleQuickAdd = (id: string) => {
    addItem(id, 1);
    router.push("/cart");
  };

  return (
    <>
      <div ref={catalogRef} id="full-catalog" />

      <div
        ref={catTabsRef}
        className={`w-full z-40 transition-all duration-300 ${
          stickyBar
            ? "fixed top-20 left-0 right-0 shadow-lg bg-white/95 backdrop-blur-md border-b border-gray-200"
            : "relative bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none pb-1">
              {catalogCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  onMouseEnter={() => setActiveMain(cat.id)}
                  className={`shrink-0 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeMain === cat.id
                      ? "bg-luxury-black text-white shadow-md"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-luxury-black"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {subRow.length > 0 && (
              <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none">
                {subRow.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${sub.id}?parent=${currentMain?.id ?? ""}`}
                    className="shrink-0 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 whitespace-nowrap bg-transparent text-gray-500 border-gray-200 hover:border-luxury-gold hover:text-luxury-black"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {stickyBar && <div className="h-[60px]" />}

      <section className="mx-auto max-w-7xl w-full px-1 sm:px-6 flex flex-col gap-6 sm:gap-10">
        <div className="flex flex-col gap-2 pt-1">
          {/* <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">Curated Optics</span> */}
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-luxury-black">
            Full Catalog
          </h2>
          <p className="text-xs text-gray-400">
            {catalogProductsAll.length} styles to explore
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-3">
          {visibleCatalog.map((product) => {
            const activeColorIdx = selectedColors[product.id] || 0;
            const productSlug = slugify(product.name);
            return (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white border border-gray-200/60 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300/40 transition-all duration-300"
              >
                <Link
                  href={`/products/${productSlug}`}
                  className="relative aspect-square w-full bg-gray-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
                >
                  {product.tag && (
                    <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${
                      product.tag === "Sale" ? "bg-red-500 text-white" :
                      product.tag === "Trending" ? "bg-luxury-gold text-white" :
                      "bg-luxury-black text-white"
                    }`}>
                      {product.tag}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div
                    className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleQuickAdd(product.id);
                      }}
                      className="px-6 py-2.5 bg-luxury-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg hover:bg-luxury-gold transition-colors duration-300 transform active:scale-95 z-20"
                    >
                      Quick Add
                    </button>
                  </div>
                </Link>

                <div className="flex flex-col gap-3 p-3 sm:p-5 flex-1 justify-between">
                  <div className="flex flex-col gap-1.5">
                    <Link href={`/products/${productSlug}`} className="group/title flex flex-col gap-1.5">
                      <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">{product.brand}</span>
                      <h3 className="font-display font-medium text-sm text-luxury-black group-hover/title:text-luxury-gold transition-colors duration-300">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                    <div className="flex flex-col">
                      {product.oldPrice && (
                        <span className="text-[10px] text-gray-400 line-through leading-none mb-1">{product.oldPrice}</span>
                      )}
                      <span className="text-sm font-semibold text-luxury-black">{product.price}</span>
                    </div>

                    <div className="flex gap-1.5">
                      {product.colors.map((color, colorIdx) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColors({ ...selectedColors, [product.id]: colorIdx })}
                          className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                            activeColorIdx === colorIdx ? "ring-1 ring-offset-1 ring-luxury-black scale-110" : "border-gray-200"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {catalogProductsAll.length > INITIAL_VISIBLE && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-luxury-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full hover:bg-luxury-gold transition-colors duration-300 shadow-md"
            >
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
