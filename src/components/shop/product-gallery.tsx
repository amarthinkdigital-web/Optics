"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryLabels } from "@/components/home/data";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = images[activeIdx] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square w-full bg-white border border-gray-200/60 rounded-3xl overflow-hidden flex items-center justify-center p-10">
        <Image
          src={activeImage}
          alt={alt}
          fill
          className="object-contain p-10"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-3">
        {images.map((img, idx) => (
          <button
            key={img + idx}
            onClick={() => setActiveIdx(idx)}
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
