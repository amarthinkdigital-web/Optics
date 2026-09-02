import Image from "next/image";

export default function EditorialLookbook() {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1 text-center mb-2 px-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">Editorial Lookbook</span>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-luxury-black uppercase">
          Signature Tones
        </h2>
      </div>

      <div className="w-full grid grid-cols-3 gap-[1px] bg-gray-200/80 border-y border-gray-200/80 overflow-hidden shadow-sm">
        {/* Row 1 */}
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden group">
          <Image src="/images/hero_model.png" alt="Editorial Model" fill className="object-cover group-hover:scale-105 transition-transform duration-[4000ms] ease-out" />
          <div className="absolute inset-x-0 bottom-3 sm:bottom-4 flex justify-center z-10 pointer-events-none select-none">
            <span className="font-display text-sm sm:text-2xl font-extrabold tracking-widest text-white uppercase drop-shadow-md">OPTICS</span>
          </div>
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="relative aspect-[4/5] bg-white overflow-hidden flex items-center justify-center p-4 sm:p-8 group">
          <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
            <Image src="/images/sunglasses_3.png" alt="Sleek Round Titanium" fill className="object-contain" />
          </div>
        </div>

        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden group">
          <Image src="/images/tryon_model.png" alt="Editorial Model" fill className="object-cover filter brightness-[0.97] saturate-[0.8] group-hover:scale-105 transition-transform duration-[4000ms] ease-out" />
          <div className="absolute inset-x-0 bottom-3 sm:bottom-4 flex justify-center z-10 pointer-events-none select-none">
            <span className="font-display text-sm sm:text-2xl font-extrabold tracking-widest text-white/90 uppercase drop-shadow-md">OPTICS</span>
          </div>
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Row 2 */}
        <div className="relative aspect-[4/5] bg-white overflow-hidden flex items-center justify-center p-4 sm:p-8 group">
          <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
            <Image src="/images/sunglasses_1.png" alt="Ridge Titanium Aviator" fill className="object-contain" />
          </div>
        </div>

        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden group">
          <Image src="/images/hero_model.png" alt="Editorial Model" fill className="object-cover filter grayscale contrast-[1.15] group-hover:scale-105 transition-transform duration-[4000ms] ease-out" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative aspect-[4/5] bg-white overflow-hidden flex items-center justify-center p-4 sm:p-8 group">
          <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
            <Image src="/images/sunglasses_4.png" alt="Geometric Tortoiseshell" fill className="object-contain" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden group">
          <Image src="/images/tryon_model.png" alt="Editorial Model" fill className="object-cover filter sepia-[0.25] contrast-[1.05] brightness-[0.95] group-hover:scale-105 transition-transform duration-[4000ms] ease-out" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="relative aspect-[4/5] bg-white overflow-hidden flex items-center justify-center p-4 sm:p-8 group">
          <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
            <Image src="/images/sunglasses_2.png" alt="Oversized Acetate" fill className="object-contain" />
          </div>
        </div>

        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden group">
          <Image src="/images/hero_model.png" alt="Editorial Model" fill className="object-cover filter contrast-[1.1] saturate-[0.9] brightness-[0.98] group-hover:scale-105 transition-transform duration-[4000ms] ease-out" />
          <div className="absolute inset-0 bg-black/5" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-3 gap-4 pt-1.5 text-center px-6">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-luxury-black leading-tight">
          OPTICS PICCADILLY
        </span>
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-300">•</span>
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-luxury-black leading-tight">
          OPTICS KOYASAN
        </span>
      </div>
    </section>
  );
}
