"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import HeroSection from "@/components/home/hero-section";
import VirtualTryOnSection from "@/components/home/virtual-tryon-section";
import TrendingSection from "@/components/home/trending-section";
import EditorialLookbook from "@/components/home/editorial-lookbook";
import FullCatalog from "@/components/home/full-catalog";
import LuxuryPromo from "@/components/home/luxury-promo";

export default function Home() {
  const [stickyBar, setStickyBar] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);
  const catTabsRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (catalogRef.current) {
      const top = catalogRef.current.getBoundingClientRect().top;
      setStickyBar(top <= 64);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col pb-20 bg-[#faf9f6]">
      <HeroSection />
      <div className="mt-4 md:mt-12" id="trending">
        <TrendingSection />
      </div>
      <div className="mt-16 md:mt-24" id="catalog">
        <FullCatalog
          catalogRef={catalogRef}
          catTabsRef={catTabsRef}
          stickyBar={stickyBar}
        />
      </div>
      <div className="mt-16 md:mt-24" id="favorites">
        <VirtualTryOnSection />
      </div>
      <div className="mt-16 md:mt-24" id="editorial">
        <EditorialLookbook />
      </div>
      <div className="mt-16 md:mt-24" id="promo">
        <LuxuryPromo />
      </div>
    </div>
  );
}
