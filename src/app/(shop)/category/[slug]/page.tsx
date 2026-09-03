import type { Metadata } from "next";
import ProductGrid from "@/components/shop/product-grid";
import {
  slugToCategory,
  slugLabels,
  getAllCategorySlugs,
} from "@/components/home/data";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ parent?: string }>;
};

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const label = slugLabels[slug] ?? "Collection";
  return { title: `${label} | Optics` };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { parent } = await searchParams;
  const label = slugLabels[slug];

  if (!label) {
    return (
      <div className="min-h-[50vh] bg-[#faf9f6] flex flex-col items-center justify-center gap-4 px-6 py-20">
        <h1 className="font-display text-2xl font-bold text-luxury-black uppercase">
          Collection not found
        </h1>
        <p className="text-sm text-gray-500">
          The collection you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  const filter = slugToCategory[slug] ?? "";

  return (
    <div className="min-h-[60vh] bg-[#faf9f6] pb-16">
      <ProductGrid
        initialCategory={filter}
        parentMain={parent}
        heading={label}
        subheading={
          filter === ""
            ? "A curated selection from across our collections."
            : undefined
        }
      />
    </div>
  );
}
