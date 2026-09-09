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

      <div className="relative z-10 mx-auto max-w-4xl flex flex-col gap-6 sm:gap-8">
        {/* Header Title */}
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#edd9bc] via-[#f7ebe0] to-[#c5a880] uppercase drop-shadow-md">
            {displayName || "CAPTAIN"} SHOWCASE
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-gray-400 tracking-widest uppercase">
            Clarity defines authority • Precision Engineered
          </p>
        </div>

        {/* ──────────────── 3-CARD SHOWCASE GRID ──────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          {/* Card 1: Product Image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-blue-800/40 bg-gradient-to-b from-[#0e1b33] via-[#091224] to-[#060c18] shadow-2xl group transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src={product.image || "/images/sunglasses_1.png"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover filter contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex items-end p-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#c5a880] drop-shadow">
                LUXURY DESIGN
              </span>
            </div>
          </div>

          {/* Card 2: Video 1 */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-blue-800/40 bg-black/90 shadow-2xl group transition-transform duration-500 hover:scale-[1.02]">
            <video
              src="/Videos/video12.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex items-end p-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#c5a880] drop-shadow">
                PRECISION POLARIZED
              </span>
            </div>
          </div>

          {/* Card 3: Video 2 */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-blue-800/40 bg-black/90 shadow-2xl group transition-transform duration-500 hover:scale-[1.02]">
            <video
              src="/Videos/video11.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex items-end p-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#c5a880] drop-shadow">
                360° LUXURY SHIELD
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle / Tagline */}
        <p className="font-serif italic text-xs sm:text-base text-gray-300 text-center tracking-wide mt-2">
          Built for clarity. Engineered for control.
        </p>

       

     
      </div>
    </section>
  );
}
