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
    <div className="flex flex-col gap-16 md:gap-24 pb-20 bg-[#faf9f6] overflow-x-hidden">
      <HeroSection />
      <TrendingSection />
      <VirtualTryOnSection />
      <EditorialLookbook />
      <FullCatalog
        catalogRef={catalogRef}
        catTabsRef={catTabsRef}
        stickyBar={stickyBar}
      />
      <LuxuryPromo />
    </div>
  );
}
