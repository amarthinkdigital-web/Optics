"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="w-full bg-gradient-to-b from-[#e3eef4] via-[#faf9f6] to-[#faf9f6] pt-12 flex flex-col gap-12 md:gap-16">
      {/* HERO PART 1: ASYMMETRICAL BRAND SHOWCASE */}
      <section className="mx-auto max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Bold Text & CTA */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.1] text-luxury-black uppercase">
            All Your Signature <br />
            Eyewear In <span className="italic font-serif font-light lowercase text-luxury-gold-dark">One</span> <br />
            Collection
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed max-w-sm">
            Upgrade your everyday look with handcrafted premium frames designed for comfort, clarity, and confidence. Find your perfect pair in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
            <button className="flex items-center gap-4 pl-6 pr-2 py-2 bg-luxury-black text-white font-semibold text-xs tracking-widest uppercase rounded-full shadow-lg hover:bg-luxury-gold transition-colors duration-300 group">
              Shop the Collection
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-luxury-black group-hover:bg-luxury-black group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            <a href="#collection" className="text-xs font-bold tracking-wider text-luxury-black hover:text-luxury-gold transition-colors underline underline-offset-4 decoration-luxury-gold/50">
              Explore Best Sellers &rarr;
            </a>
          </div>
        </div>

        {/* Center Column: Big Lifestyle Image Container */}
        <div className="lg:col-span-4 relative aspect-[4/5] w-full max-w-[680px] mx-auto rounded-[10px] overflow-hidden shadow-2xl bg-[#eae9e4] border-4 border-white">
          <Image
            src="/images/hero2.jpg"
            alt="Luxury Signature Sunglasses"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            quality={100}
            className="object-cover hover:scale-105 transition-transform duration-[6000ms] ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-dark text-white flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="inline-block h-7 w-7 rounded-full border border-luxury-black bg-gray-300 overflow-hidden relative">
                  <Image src="/images/tryon_model.png" alt="User" fill className="object-cover" />
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold">4.9/5</span>
                <span className="text-[10px] text-luxury-gold">★★★★★</span>
              </div>
              <p className="text-[9px] text-gray-400">Trusted by 25,000+ Customers</p>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Product Accent Card */}
        <div className="lg:col-span-3 flex flex-col gap-4 max-w-[260px] mx-auto lg:mx-0">
          <Link
            href="/products/ridge-titanium-aviator-frames"
            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-gray-100 p-4 shadow-sm block hover:shadow-md transition-shadow duration-300"
          >
            <Image
              src="/images/sunglasses_1.png"
              alt="Product Spotlight"
              fill
              sizes="(max-width: 1024px) 100vw, 20vw"
              quality={100}
              className="object-contain p-4 hover:scale-105 transition-transform duration-500"
            />
          </Link>
          <p className="text-xs text-gray-600 leading-relaxed font-light">
            Frames that match your vibe—bold, stylish, and crafted with precision for everyday luxury flex.
          </p>
        </div>
      </section>

      {/* HERO PART 2: LUXURY FEATURES BAR */}
      <section className="mx-auto max-w-7xl w-full px-6 py-6 border-y border-gray-200/50 bg-white/40 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {[
            { title: "UV400 Protection", desc: "Maximum Eye Care", bg: "bg-[#e8eff2]" },
            { title: "Lightweight Frames", desc: "Featherweight Fit", bg: "bg-[#f2efe8]" },
            { title: "Italian Acetate", desc: "Premium Hand-Finished", bg: "bg-[#e8f2ef]" },
            { title: "2 Years Warranty", desc: "Quality Guaranteed", bg: "bg-[#f2e8ea]" },
          ].map((feat) => (
            <div key={feat.title} className="flex items-center gap-4">
              <div className={`h-10 w-10 rounded-full ${feat.bg} flex items-center justify-center text-luxury-black font-bold shrink-0`}>
                ☼
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-luxury-black">{feat.title}</span>
                <span className="text-[10px] text-gray-500">{feat.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FULL PAGE HERO IMAGE - COMMENTED OUT */}
      {/* <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-black">
        <Image
          src="/images/hero_model.png"
          alt="Luxury Signature Sunglasses"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </section> */}
    </div>
  );
}
