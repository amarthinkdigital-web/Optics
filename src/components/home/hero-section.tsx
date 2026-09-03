"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "/images/hero_model.png",
    description: "Discover the ultimate in luxury eyewear."
  },
  {
    image: "/images/hero_slider_1.png",
    description: "Elegance that speaks for itself."
  },
  {
    image: "/images/hero_slider_2.png",
    description: "Crafted for the bold and sophisticated."
  },
  {
    image: "/images/hero_slider_3.png",
    description: "Experience clarity like never before."
  },
  {
    image: "/images/hero_slider_4.png",
    description: "Your perfect companion for the sun."
  },
  {
    image: "/images/hero_slider_5.png",
    description: "Timeless designs for the modern visionary."
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[65vh] sm:h-[75vh] min-h-[400px] overflow-hidden bg-black flex flex-col items-center justify-end pb-12 sm:pb-16">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            fill
            sizes="100vw"
            quality={100}
            className="object-cover object-center"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
      ))}
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mb-8 h-16 sm:h-20 justify-center w-full">
        {slides.map((slide, index) => (
           <p 
             key={index}
             className={`text-white/95 text-lg sm:text-2xl md:text-3xl font-light tracking-wide absolute w-full left-0 px-4 transition-all duration-1000 transform ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
           >
             {slide.description}
           </p>
        ))}
      </div>

      <Link 
        href="#collection" 
        className="relative z-10 bg-white text-luxury-black font-semibold text-sm tracking-widest uppercase px-10 py-4 rounded-full shadow-xl hover:bg-luxury-black hover:text-white hover:scale-105 transition-all duration-300"
      >
        Shop Now
      </Link>
      
      <div className="relative z-10 flex gap-3 mt-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ease-in-out ${index === currentSlide ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/70"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
