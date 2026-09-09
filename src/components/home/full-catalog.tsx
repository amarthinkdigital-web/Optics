"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { catalogCategories, catalogProducts, slugify } from "./data";

interface FullCatalogProps {
  catalogRef: React.RefObject<HTMLDivElement | null>;
  catTabsRef: React.RefObject<HTMLDivElement | null>;
  stickyBar: boolean;
}

const INITIAL_VISIBLE = 8;

function CatalogContent({ catalogRef, catTabsRef, stickyBar }: FullCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const [activeMain, setActiveMain] = useState<string>("all");
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) {
      setActiveMain(cat);
      setActiveSub(null);
    }

    if (cat || (typeof window !== "undefined" && window.location.hash === "#full-catalog")) {
      const doScroll = () => {
        const el = catalogRef.current || document.getElementById("full-catalog");
        if (el) {
          const navOffset = 90;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      };

      // Run multiple timers to guarantee scroll after body overflow lock releases
      const t1 = setTimeout(doScroll, 50);
      const t2 = setTimeout(doScroll, 200);
      const t3 = setTimeout(doScroll, 400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [searchParams, catalogRef]);

  const currentMain = catalogCategories.find((m) => m.id === activeMain) ?? null;
  const subRow = currentMain?.subCategories ?? [];
  const currentSub = subRow.find((s) => s.id === activeSub) ?? null;

  const displayCategories = [
    { id: "all", label: "All Eyewear" },
    ...catalogCategories,
  ];

  const filteredCatalog = catalogProducts.filter((p) => {
    const matchesMain =
      !activeMain || activeMain === "all" ? true : p.categories.includes(activeMain);
    const matchesSub = !activeSub ? true : p.categories.includes(activeSub);
    return matchesMain && matchesSub;
  });
  const catalogProductsAll = filteredCatalog;
  const visibleCatalog = showAll ? catalogProductsAll : catalogProductsAll.slice(0, INITIAL_VISIBLE);

  const handleQuickAdd = (id: string) => {
    addItem(id, 1);
    router.push("/cart");
  };

  const handleMainSelect = (id: string) => {
    setActiveMain(id);
    setActiveSub(null);
    const el = catalogRef.current || document.getElementById("full-catalog");
    if (el) {
      const navOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const dynamicHeading =
    activeMain === "all" || !currentMain
      ? "Shop Eyewear"
      : currentSub
        ? `${currentSub.label} · ${currentMain.label}`
        : `Shop ${currentMain.label}`;

  return (
    <>
      <div ref={catalogRef} id="full-catalog" />

      <div
        ref={catTabsRef}
        className={`w-full z-40 transition-all duration-300 ${
          stickyBar
            ? "fixed top-20 left-0 right-0 shadow-lg bg-[#ebd7b5]/95 backdrop-blur-md border-b border-[#cca770]"
            : "relative bg-gradient-to-r from-[#f5ebda] via-[#ebd7b5] to-[#f5ebda] border-y border-[#cca770]/60 shadow-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3.5 sm:py-4">
          <div className="flex flex-col gap-2.5 items-center">
            {/* Dark Gold Header Label */}
            <span className="text-center text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#8b6b3e]">
              Shop by Category
            </span>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {displayCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleMainSelect(cat.id)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeMain === cat.id
                      ? "bg-gradient-to-r from-[#1a1510] via-[#282016] to-[#1a1510] text-[#e8d5bc] border border-[#a88754] shadow-md ring-1 ring-[#a88754]/40 scale-105"
                      : "bg-white text-gray-700 border border-[#b89660]/40 hover:border-[#8b6b3e] hover:bg-[#faf6f0] hover:text-[#8b6b3e] hover:shadow-sm"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {subRow.length > 0 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none pt-0.5">
                {subRow.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSub(activeSub === sub.id ? null : sub.id)}
                    className={`shrink-0 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-all duration-300 whitespace-nowrap ${
                      activeSub === sub.id
                        ? "bg-[#8b6b3e] text-white border-[#8b6b3e] shadow-md shadow-[#8b6b3e]/30"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#8b6b3e] hover:text-[#8b6b3e] hover:bg-[#faf6f0]"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {stickyBar && <div className="h-[60px]" />}

      <section className="mx-auto max-w-7xl w-full px-1 sm:px-6 flex flex-col gap-6 sm:gap-10">
        <div className="flex flex-col gap-2 pt-1">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-luxury-black">
            {dynamicHeading}
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
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
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

export default function FullCatalog(props: FullCatalogProps) {
  return (
    <Suspense fallback={null}>
      <CatalogContent {...props} />
    </Suspense>
  );
}
