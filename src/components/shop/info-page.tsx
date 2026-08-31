import type { ReactNode } from "react";
import Link from "next/link";

interface InfoPageProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export default function InfoPage({ eyebrow, title, children }: InfoPageProps) {
  return (
    <div className="min-h-[60vh] bg-[#faf9f6]">
      <div className="mx-auto max-w-3xl w-full px-6 py-16 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          <Link href="/" className="hover:text-luxury-black">Home</Link>
          <span>/</span>
          <span className="text-luxury-black">{title}</span>
        </nav>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">
            {eyebrow}
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-luxury-black uppercase">
            {title}
          </h1>
        </div>

        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
