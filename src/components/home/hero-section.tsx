"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[65vh] sm:h-[75vh] min-h-[400px] overflow-hidden bg-black flex flex-col items-center justify-end pb-12 sm:pb-16">
      <Image
        src="/images/hero_model.png"
        alt="Luxury Signature Sunglasses"
        fill
        sizes="100vw"
        quality={100}
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      <Link 
        href="#collection" 
        className="relative z-10 bg-white text-luxury-black font-semibold text-sm tracking-widest uppercase px-10 py-4 rounded-full shadow-xl hover:bg-luxury-black hover:text-white hover:scale-105 transition-all duration-300"
      >
        Shop Now
      </Link>
    </section>
  );
}
