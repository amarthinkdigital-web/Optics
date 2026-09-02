"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { galleryLabels } from "@/components/home/data";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (idx: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const clamped = Math.max(0, Math.min(idx, images.length - 1));
    scroller.scrollTo({
      left: clamped * scroller.clientWidth,
      behavior: "smooth",
    });
    setActiveIdx(clamped);
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const idx = Math.round(scroller.scrollLeft / scroller.clientWidth);
    if (idx !== activeIdx && idx >= 0 && idx < images.length) {
      setActiveIdx(idx);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main image carousel */}
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="relative flex w-full aspect-square bg-[#faf9f6] overflow-hidden overflow-x-auto snap-x snap-mandatory scrollbar-none"
        >
          {images.map((img, idx) => (
            <div
              key={img + idx}
              className="relative w-full shrink-0 aspect-square snap-center"
            >
              <Image
                src={img}
                alt={galleryLabels[idx] ?? `${alt} view ${idx + 1}`}
                fill
                className="object-contain"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => scrollToIndex(activeIdx - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-md flex items-center justify-center text-luxury-black hover:bg-luxury-gold hover:text-white transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => scrollToIndex(activeIdx + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-md flex items-center justify-center text-luxury-black hover:bg-luxury-gold hover:text-white transition-colors"
            >
              →
            </button>
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold">
            {activeIdx + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {images.map((img, idx) => (
          <button
            key={img + idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={galleryLabels[idx]}
            className={`relative aspect-square rounded-xl overflow-hidden border bg-white transition-all duration-300 ${
              activeIdx === idx
                ? "border-luxury-black ring-1 ring-offset-1 ring-luxury-black"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={galleryLabels[idx] ?? `View ${idx + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}