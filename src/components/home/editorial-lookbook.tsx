import Image from "next/image";
import Link from "next/link";

export default function EditorialLookbook() {
  const lookbookItems = [
    { src: "/images/hero_model.png", type: "model", alt: "Editorial Model" },
    { src: "/images/sunglasses_3.png", type: "product", alt: "Round Sunglasses" },
    { src: "/images/sunglasses_4.png", type: "product", alt: "Tortoiseshell Glasses" },
    { src: "/images/tryon_model.png", type: "model", alt: "Editorial Model" },
    { src: "/images/hero_model.png", type: "model", alt: "Editorial Model" },
    { src: "/images/sunglasses_1.png", type: "product", alt: "Black Sunglasses" },
  ];

  return (
    <section className="w-full flex flex-col gap-8 items-center px-4 sm:px-6 py-12 sm:py-16 bg-[#faf9f6]">
      {/* Header */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a880]">
          Social Lookbook
        </span>
        <h2 className="font-display text-[1.75rem] sm:text-4xl font-extrabold tracking-tight text-[#111111] uppercase mt-1">
          Follow Us On Instagram
        </h2>
        {/* <span className="text-sm font-medium tracking-widest text-gray-500 mt-1">
          @optic.gallery
        </span> */}
      </div>

      {/* Grid */}
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {lookbookItems.map((item, i) => (
          <div
            key={i}
            className="relative aspect-square sm:aspect-[4/5] bg-[#e4dfd7] rounded-xl sm:rounded-2xl overflow-hidden group"
          >
            {item.type === "model" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
              />
            ) : (
              <div className="relative w-full h-full p-4 sm:p-8 flex items-center justify-center">
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* View All Button */}
      {/* <Link
        href="#"
        className="mt-2 px-8 py-4 sm:px-10 sm:py-4 bg-[#d8c2a8] text-[#111111] font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#c8b093] transition-colors flex items-center gap-2"
      >
        View All Looks
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link> */}

      {/* WhatsApp Help Box */}
      {/* <Link
        href="#"
        className="w-full max-w-md sm:max-w-lg mt-6 bg-[#f8f5f0] border border-[#e8dfd2] rounded-2xl p-4 sm:p-5 flex items-center justify-between group hover:bg-[#f3eadf] transition-colors"
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#d8c2a8] flex items-center justify-center text-[#c5a880] bg-white group-hover:bg-[#faf9f6] transition-colors">
       
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-bold text-[#111111] tracking-widest">
              NEED HELP?
            </span>
            <span className="text-[10px] sm:text-[11px] text-gray-500 tracking-wide mt-0.5">
              Chat with us on WhatsApp
            </span>
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link> */}
    </section>
  );
}
