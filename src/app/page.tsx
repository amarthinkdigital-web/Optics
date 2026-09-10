"use client";

import { useRef } from "react";
import HeroSection from "@/components/home/hero-section";
import VirtualTryOnSection from "@/components/home/virtual-tryon-section";
import TrendingSection from "@/components/home/trending-section";
import EditorialLookbook from "@/components/home/editorial-lookbook";
import VideoSection from "@/components/home/video-section";
import FullCatalog from "@/components/home/full-catalog";

export default function Home() {
  const catalogRef = useRef<HTMLDivElement>(null);
  const catTabsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col pb-20 bg-[#faf9f6] w-full max-w-full overflow-x-hidden">
      <HeroSection />
      <div className="mt-2 md:mt-8" id="trending">
        <TrendingSection />
      </div>
      <div className="mt-2 md:mt-8" id="catalog">
        <FullCatalog
          catalogRef={catalogRef}
          catTabsRef={catTabsRef}
          stickyBar={false}
        />
      </div>
      <div className="mt-10 md:mt-16" id="favorites">
        <VirtualTryOnSection />
      </div>
       <div className="mt-10 md:mt-16" id="video">
        <VideoSection />
      </div>
      <div className="mt-10 md:mt-16" id="editorial">
        <EditorialLookbook />
      </div>
     
      {/* <div className="mt-16 md:mt-24" id="promo">
        <LuxuryPromo />
      </div> */}
    </div>
  );
}
