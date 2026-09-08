"use client";

import Link from "next/link";

interface OgEditCardProps {
  onClick?: () => void;
  className?: string;
}

export default function OgEditCard({ onClick, className = "" }: OgEditCardProps) {
  return (
    <Link
      href="/og-edit"
      onClick={onClick}
      className={`group relative w-full rounded-2xl border border-luxury-gold/40 bg-gradient-to-r from-[#141210] via-[#1e1913] to-[#2a2116] p-4 flex items-center justify-between overflow-hidden shadow-xl hover:border-luxury-gold transition-all duration-300 ${className}`}
    >

      {/* Left Content */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-center justify-center px-2 py-1 rounded-md border border-luxury-gold/60 bg-black/40 text-luxury-gold font-serif font-bold text-sm tracking-tight">
          OG
        </div>
        <div className="flex flex-col">
          <span className="font-display text-xs font-extrabold tracking-[0.2em] text-white uppercase group-hover:text-luxury-gold transition-colors">
            OG EDIT
          </span>
          <span className="text-[8px] font-extrabold tracking-[0.2em] text-luxury-gold/80 uppercase">
            Curated by Optic Gallery
          </span>
        </div>
      </div>

      {/* Right Arrow */}
      <div className="relative z-10 text-luxury-gold group-hover:translate-x-1 transition-transform duration-300">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
