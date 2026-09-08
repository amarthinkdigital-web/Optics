"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";

interface ProductFeatureShowcaseProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    brand?: string;
  };
}

export default function ProductFeatureShowcase({ product }: ProductFeatureShowcaseProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product.id, 1);
    router.push("/cart");
  };

  const handleBuyNow = () => {
    addItem(product.id, 1);
    router.push("/checkout");
  };

  const displayName = product.name.split(" ")[0].toUpperCase();

  return (
    <section className="w-full bg-[#060b14] text-white py-10 sm:py-16 px-4 sm:px-6 relative overflow-hidden border-t border-blue-950/50">
      {/* Background Lighting Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#0d1c38] via-[#060b14] to-[#03060c] pointer-events-none opacity-80" />

      <div className="relative z-10 mx-auto max-w-2xl flex flex-col gap-6 sm:gap-8">
        {/* ──────────────── 1. HERO SHOWCASE CARD ──────────────── */}
        <div className="relative w-full bg-transparent border-0 p-0 shadow-none sm:bg-gradient-to-b sm:from-[#0e1b33] sm:via-[#091224] sm:to-[#060c18] sm:border sm:border-blue-900/30 sm:p-10 sm:rounded-3xl flex flex-col items-center justify-center min-h-[260px] sm:min-h-[380px] sm:shadow-2xl overflow-hidden group">
          <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,80,150,0.15),transparent_70%)]" />

          {/* Top Brand / Model Title */}
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#edd9bc] via-[#f7ebe0] to-[#c5a880] text-center uppercase z-10 drop-shadow-md mb-2">
            {displayName || "CAPTAIN"}
          </h2>

          {/* Glasses Image - True full-width on mobile (breaks out of all parent padding) */}
          <div className="relative sm:hidden w-screen h-60 ">
            <Image
              src={product.image || "/images/sunglasses_1.png"}
              alt={product.name}
              fill
              priority
              sizes="100vw"
              className="object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)]"
            />
          </div>
          {/* Desktop: contained image */}
          <div className="relative hidden sm:flex w-full max-w-sm h-64 my-4 items-center justify-center z-10 transition-transform duration-700 group-hover:scale-105">
            <Image
              src={product.image || "/images/sunglasses_1.png"}
              alt={product.name}
              fill
              priority
              sizes="400px"
              className="object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>

        {/* ──────────────── 2. VIDEO / AUTHORITY SHOWCASE CARD ──────────────── */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0b162b] to-[#070f1e] border border-blue-900/30 p-4 sm:p-8 flex flex-col items-center gap-4 sm:gap-6 shadow-2xl overflow-hidden">
          {/* Header Title */}
          <h3 className="font-serif text-base sm:text-xl font-bold tracking-[0.25em] text-[#edd9bc] text-center uppercase drop-shadow">
            CLARITY DEFINES AUTHORITY
          </h3>

          {/* Dual Video Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Video 1 Container */}
            <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-blue-800/30 bg-black/80 shadow-lg">
              <video
                src="/Videos/video12.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none flex items-end p-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c5a880]">
                  PRECISION POLARIZED
                </span>
              </div>
            </div>

            {/* Video 2 Container */}
            <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-blue-800/30 bg-black/80 shadow-lg">
              <video
                src="/Videos/video11.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none flex items-end p-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c5a880]">
                  360° LUXURY SHIELD
                </span>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="font-serif italic text-sm sm:text-base text-gray-300 text-center tracking-wide mt-1">
            Built for clarity. Engineered for control.
          </p>
        </div>

       

     
      </div>
    </section>
  );
}
