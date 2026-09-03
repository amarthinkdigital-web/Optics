import type { Metadata } from "next";
import Link from "next/link";
import ProductBuy from "@/components/shop/product-buy";
import ProductGallery from "@/components/shop/product-gallery";
import RelatedProducts from "@/components/shop/related-products";
import {
  catalogProducts,
  products,
  trendingProducts,
  productDescriptions,
  productGallery,
  slugify,
} from "@/components/home/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getAllProducts = () => {
  return [...catalogProducts, ...products, ...trendingProducts];
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
  const brandName = ("brand" in product && product.brand) ? product.brand : "OPTICS";
  const colorsList = ("colors" in product && product.colors) ? product.colors : ["#111", "#c5a880"];

  const relatedItems = allProds
    .filter((p) => p.id !== product.id)
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      name: p.name,
      brand: ("brand" in p && p.brand) ? p.brand : "OPTICS",
      price: p.price,
      oldPrice: ("oldPrice" in p) ? p.oldPrice : undefined,
      image: p.image,
      slug: slugify(p.name),
      tag: ("tag" in p && p.tag) ? p.tag : undefined,
    }));

  return (
    <div className="min-h-[70vh] bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 py-6 sm:py-8">
        <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-6 sm:mb-8 overflow-x-auto scrollbar-none whitespace-nowrap">
          <Link href="/" className="hover:text-luxury-black">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-luxury-black">Shop All</Link>
          <span>/</span>
          <span className="text-luxury-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Gallery */}
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
            {/* For trending products we can fallback to tagline as a badge */}
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
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">
                {brandName}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-luxury-black">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                {"oldPrice" in product && product.oldPrice && (
                  <span className="text-sm sm:text-base text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                )}
                <span className="text-lg sm:text-xl font-bold text-luxury-black">
                  {product.price}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed font-light">
              {description}
            </p>

            {/* Colors */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Colour Options
              </span>
              <div className="flex gap-2.5">
                {colorsList.map((color: string) => (
                  <span
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-200 ring-1 ring-offset-1 ring-luxury-black"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { t: "UV400 Protection", d: "Maximum eye care" },
                { t: "Lightweight", d: "Featherweight fit" },
                { t: "Italian Acetate", d: "Hand-finished" },
                { t: "2 Years Warranty", d: "Quality guaranteed" },
              ].map((perk) => (
                <div
                  key={perk.t}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-200/60"
                >
                  <span className="h-8 w-8 rounded-full bg-[#eef2f4] flex items-center justify-center text-luxury-black font-bold text-sm shrink-0">
                    ☼
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-luxury-black">{perk.t}</span>
                    <span className="text-[10px] text-gray-500">{perk.d}</span>
                  </div>
                </div>
              ))}
            </div>

            <ProductBuy productId={product.id} />

            <p className="text-[10px] text-gray-400 text-center tracking-widest uppercase">
              Free shipping on orders over AED 1,999
            </p>
          </div>
        </div>
      </div>

      {/* Dark background related products section above footer */}
      <RelatedProducts items={relatedItems} />
    </div>
  );
}
