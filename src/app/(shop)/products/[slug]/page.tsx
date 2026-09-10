import type { Metadata } from "next";
import Link from "next/link";
import ProductBuy from "@/components/shop/product-buy";
import ProductGallery from "@/components/shop/product-gallery";
import RelatedProducts from "@/components/shop/related-products";
import {
  catalogProducts,
  ogEditProducts,
  products,
  trendingProducts,
  productDescriptions,
  productGallery,
  slugify,
} from "@/components/home/data";

import ProductFeatureShowcase from "@/components/shop/product-feature-showcase";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getAllProducts = () => {
  return [...catalogProducts, ...ogEditProducts, ...products, ...trendingProducts];
};

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: slugify(p.name) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getAllProducts().find((p) => slugify(p.name) === slug);
  return { title: `${product?.name ?? "Product"} | Optics` };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const allProds = getAllProducts();
  const product = allProds.find((p) => slugify(p.name) === slug);

  if (!product) {
    return (
      <div className="min-h-[50vh] bg-[#faf9f6] flex flex-col items-center justify-center gap-4 px-6 py-20">
        <h1 className="font-display text-2xl font-bold text-luxury-black uppercase">
          Product not found
        </h1>
        <Link
          href="/products"
          className="text-sm text-luxury-gold underline underline-offset-4"
        >
          Back to shop all frames
        </Link>
      </div>
    );
  }

  const description = productDescriptions[product.id] || "Premium eyewear handcrafted for ultimate clarity, comfort, and luxury style.";
  const colorsList = ("colors" in product && product.colors) ? product.colors : ["#111", "#c5a880"];

  const relatedItems = allProds
    .filter((p) => p.id !== product.id)
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      oldPrice: ("oldPrice" in p) ? p.oldPrice : undefined,
      image: p.image,
      slug: slugify(p.name),
      tag: ("tag" in p && p.tag) ? p.tag : undefined,
    }));

  return (
    <div className="bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 pt-4 pb-0 sm:py-8">
        <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-6 sm:mb-8 overflow-x-auto scrollbar-none whitespace-nowrap">
          <Link href="/" className="hover:text-luxury-black">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-luxury-black">Shop All</Link>
          <span>/</span>
          <span className="text-luxury-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pb-0 sm:pb-10">
          {/* Gallery with Colour Options directly below thumbnails */}
          <div className="relative -mx-4 sm:mx-0">
            {"tag" in product && product.tag && (
              <span className={`absolute top-5 left-5 z-20 px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${
                product.tag === "Sale" ? "bg-red-500 text-white" :
                product.tag === "Trending" ? "bg-luxury-gold text-white" :
                "bg-luxury-black text-white"
              }`}>
                {product.tag}
              </span>
            )}
            {!("tag" in product) && "tagline" in product && (
              <span className="absolute top-5 left-5 z-20 px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-luxury-gold text-white">
                {(product as any).tagline.split("•")[0].trim()}
              </span>
            )}
            <ProductGallery
              images={productGallery[product.id] ?? [product.image]}
              alt={product.name}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 sm:gap-5 px-4 sm:px-0">
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-luxury-black">
                {product.name}
              </h1>

              {/* Price: selling price first → strikethrough old price → discount badge */}
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <span className="text-xl sm:text-2xl font-extrabold text-luxury-black">
                  {product.price}
                </span>
                {"oldPrice" in product && product.oldPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through font-normal">
                      {product.oldPrice}
                    </span>
                    {(() => {
                      const p = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
                      const op = parseInt((product.oldPrice as string).replace(/[^0-9]/g, ""), 10);
                      if (!isNaN(p) && !isNaN(op) && op > p) {
                        return (
                          <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">
                            {Math.round(((op - p) / op) * 100)}% OFF
                          </span>
                        );
                      }
                      return null;
                    })()}
                  </>
                )}
              </div>
            </div>

            {/* Colour Options */}
            {colorsList && colorsList.length > 0 && (
              <div className="flex flex-col gap-2 pt-1 sm:pt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Colour Options
                </span>
                <div className="flex items-center gap-2.5">
                  {colorsList.map((color: string, idx: number) => (
                    <span
                      key={color + idx}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 ring-1 ring-offset-1 ring-luxury-black transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-gray-600 leading-relaxed font-light">
              {description}
            </p>

            <p className="text-[10px] text-gray-400 tracking-widest uppercase flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free shipping on orders
            </p>

            <ProductBuy productId={product.id} />
          </div>
        </div>
      </div>

      {/* Showcase section – appears directly below, no gap */}
      <ProductFeatureShowcase product={product} />

      {/* Related products */}
      <RelatedProducts items={relatedItems} />
    </div>
  );
}
