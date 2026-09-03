export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  oldPrice?: string;
  image: string;
  colors: string[];
  tag?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Ridge Titanium Aviator Frames",
    brand: "VERSACE",
    price: "AED 870.00",
    oldPrice: "AED 990.00",
    image: "/images/sunglasses_1.png",
    colors: ["#c5a880", "#111", "#4f5e50"],
    tag: "Popular",
  },
  {
    id: "2",
    name: "Oversized Acetate Signature Eyewear",
    brand: "PRADA",
    price: "AED 950.00",
    image: "/images/sunglasses_2.png",
    colors: ["#111", "#693d25"],
    tag: "New",
  },
  {
    id: "3",
    name: "Sleek Round Titanium Optical Frames",
    brand: "GUCCI",
    price: "AED 1,120.00",
    oldPrice: "AED 1,300.00",
    image: "/images/sunglasses_3.png",
    colors: ["#c5a880", "#2c3e50"],
  },
  {
    id: "4",
    name: "Geometric Tortoiseshell Cat Eye Eyewear",
    brand: "CELINE",
    price: "AED 1,050.00",
    image: "/images/sunglasses_4.png",
    colors: ["#693d25", "#111"],
  },
  {
    id: "5",
    name: "Crystal Rimless Titanium Frames",
    brand: "PRADA",
    price: "AED 1,380.00",
    oldPrice: "AED 1,600.00",
    image: "/images/sunglasses_3.png",
    colors: ["#e8e8e8", "#c5a880"],
    tag: "Sale",
  },
  {
    id: "6",
    name: "Angular Rectangle Dark Shield",
    brand: "DIOR",
    price: "AED 1,240.00",
    image: "/images/sunglasses_2.png",
    colors: ["#111", "#2c3e50"],
    tag: "New",
  },
];

export const trendingProducts = [
  {
    id: "t1",
    name: "STRATOS",
    tagline: "NEW ARRIVAL • SPORT TECH",
    price: "AED 1,599",
    oldPrice: "AED 3,000",
    discount: "46% OFF",
    image: "/images/sunglasses_1.png",
    bgStyle: "bg-[#f4f4f4]",
    textColor: "text-luxury-black",
    tagColor: "text-gray-500",
  },
  {
    id: "t2",
    name: "HAWK",
    tagline: "SAGE GREEN RIMLESS",
    price: "AED 1,499",
    oldPrice: "AED 3,500",
    discount: "57% OFF",
    image: "/images/sunglasses_2.png",
    bgStyle: "bg-[#f4f4f4]",
    textColor: "text-luxury-black",
    tagColor: "text-gray-500",
  },
  {
    id: "t3",
    name: "MAJOR",
    tagline: "NEW ARRIVAL • TITANIUM",
    price: "AED 1,999",
    oldPrice: "AED 3,000",
    discount: "33% OFF",
    image: "/images/sunglasses_3.png",
    bgStyle: "bg-[#f4f4f4]",
    textColor: "text-luxury-black",
    tagColor: "text-gray-500",
  },
  {
    id: "t4",
    name: "FLAMMO",
    tagline: "READY FOR FIRE",
    price: "AED 1,299",
    oldPrice: "AED 3,000",
    discount: "56% OFF",
    image: "/images/sunglasses_4.png",
    bgStyle: "bg-[#f4f4f4]",
    textColor: "text-luxury-black",
    tagColor: "text-gray-500",
  },
  {
    id: "t5",
    name: "PRESTIGE",
    tagline: "OWN THE ROOM",
    price: "AED 1,399",
    oldPrice: "AED 3,000",
    discount: "53% OFF",
    image: "/images/sunglasses_1.png",
    bgStyle: "bg-[#f4f4f4]",
    textColor: "text-luxury-black",
    tagColor: "text-gray-500",
  },
];

export interface CatalogSubCategory {
  id: string;
  label: string;
}
export interface CatalogMainCategory {
  id: string;
  label: string;
  subCategories: CatalogSubCategory[];
}

/* Parent categories with their sub-categories (mirrors sidebar menu) */
export const catalogCategories: CatalogMainCategory[] = [
  {
    id: "clip-on",
    label: "Clip-On Glasses",
    subCategories: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
    ],
  },
  {
    id: "eyeglasses",
    label: "Eyeglasses",
    subCategories: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
    ],
  },
  {
    id: "sunglasses",
    label: "Sunglasses",
    subCategories: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
    ],
  },
  {
    id: "accessories",
    label: "Accessories",
    subCategories: [
      { id: "cases", label: "Cases" },
      { id: "cleaning-accessories", label: "Cleaning Accessories" },
      { id: "eyewear-accessories", label: "Eyewear Accessories" },
    ],
  },
];

/* Flat list of all category ids + labels (mains and subs) for single-row UIs / routing */
export function flattenCatalogCategories(): { id: string; label: string }[] {
  const flat: { id: string; label: string }[] = [];
  catalogCategories.forEach((main) => {
    flat.push({ id: main.id, label: main.label });
    main.subCategories.forEach((sub) => flat.push({ id: sub.id, label: sub.label }));
  });
  return flat;
}

/* Return every category slug (mains + subs) for static route generation */
export function getAllCategorySlugs(): string[] {
  return flattenCatalogCategories().map((c) => c.id);
}

/* Find the parent main category that contains a given sub-category id */
export function mainOfSub(subId: string): CatalogMainCategory | undefined {
  return catalogCategories.find((main) =>
    main.subCategories.some((sub) => sub.id === subId)
  );
}

export const catalogProducts: (Product & { categories: string[] })[] = [
  { id: "c1", name: "Ridge Titanium Aviator", brand: "VERSACE", price: "AED 870", oldPrice: "AED 990", image: "/images/sunglasses_1.png", colors: ["#c5a880","#111"], tag: "New", categories: ["all","clip-on","men"] },
  { id: "c2", name: "Oversized Acetate Signature", brand: "PRADA", price: "AED 950", oldPrice: undefined, image: "/images/sunglasses_2.png", colors: ["#111","#693d25"], tag: "Trending", categories: ["all","clip-on","women"] },
  { id: "c3", name: "Sleek Round Titanium Frames", brand: "GUCCI", price: "AED 1,120", oldPrice: "AED 1,300", image: "/images/sunglasses_3.png", colors: ["#c5a880","#2c3e50"], tag: undefined, categories: ["all","clip-on","men"] },
  { id: "c4", name: "Geometric Tortoiseshell Cat Eye", brand: "CELINE", price: "AED 1,050", oldPrice: undefined, image: "/images/sunglasses_4.png", colors: ["#693d25","#111"], tag: "New", categories: ["all","eyeglasses","women"] },
  { id: "c5", name: "Sport Wrap Polarized Shield", brand: "VERSACE", price: "AED 780", oldPrice: "AED 990", image: "/images/sunglasses_1.png", colors: ["#1a1a2e","#c5a880"], tag: "Sale", categories: ["all","eyeglasses","men"] },
  { id: "c6", name: "Butterfly Tinted Rimless", brand: "DIOR", price: "AED 1,240", oldPrice: undefined, image: "/images/sunglasses_3.png", colors: ["#e8c0a0","#4f5e50"], tag: "New", categories: ["all","eyeglasses","women"] },
  { id: "c7", name: "Classic Wayfarer Black", brand: "RAY-BAN", price: "AED 650", oldPrice: "AED 750", image: "/images/sunglasses_2.png", colors: ["#111","#3d3d3d"], tag: undefined, categories: ["all","sunglasses","men"] },
  { id: "c8", name: "Round Retro Gold Frame", brand: "GUCCI", price: "AED 890", oldPrice: undefined, image: "/images/sunglasses_4.png", colors: ["#c5a880","#b87333"], tag: "Trending", categories: ["all","sunglasses","women"] },
  { id: "c9", name: "Classic Aviator Gold Lens", brand: "RAY-BAN", price: "AED 720", oldPrice: "AED 850", image: "/images/sunglasses_1.png", colors: ["#c5a880","#2c3e50"], tag: undefined, categories: ["all","sunglasses","men"] },
  { id: "c10", name: "Havana Wayfarer Tortoise", brand: "RAY-BAN", price: "AED 690", oldPrice: undefined, image: "/images/sunglasses_2.png", colors: ["#693d25","#111"], tag: "New", categories: ["all","accessories","cases"] },
  { id: "c11", name: "Crystal Rimless Titanium", brand: "PRADA", price: "AED 1,380", oldPrice: "AED 1,600", image: "/images/sunglasses_3.png", colors: ["#e8e8e8","#c5a880"], tag: "Sale", categories: ["all","accessories","cleaning-accessories"] },
  { id: "c12", name: "Angular Rectangle Dark", brand: "CELINE", price: "AED 1,010", oldPrice: undefined, image: "/images/sunglasses_4.png", colors: ["#111","#2c3e50"], tag: undefined, categories: ["all","accessories","eyewear-accessories"] },
];

/* Map sidebar / URL slugs to catalog category filter ids */
export const slugToCategory: Record<string, string> = {
  "clip-on": "clip-on",
  "clip-on-glasses": "clip-on",
  eyeglasses: "eyeglasses",
  sunglasses: "sunglasses",
  accessories: "accessories",
  cases: "cases",
  "cleaning-accessories": "cleaning-accessories",
  "eyewear-accessories": "eyewear-accessories",
  men: "men",
  women: "women",
  unisex: "",
  polarized: "polarized",
  wayfarer: "wayfarer",
  round: "round",
  rimless: "rimless",
  aviator: "aviator",
  rectangle: "rectangle",
  "cat-eye": "cateye",
  cateye: "cateye",
  "new-arrivals": "",
  "best-sellers": "",
  limited: "",
  summer: "",
};

export const slugLabels: Record<string, string> = {
  "clip-on": "Clip-On Glasses",
  "clip-on-glasses": "Clip-On Glasses",
  eyeglasses: "Eyeglasses",
  sunglasses: "Sunglasses",
  accessories: "Accessories",
  cases: "Cases",
  "cleaning-accessories": "Cleaning Accessories",
  "eyewear-accessories": "Eyewear Accessories",
  men: "Men",
  women: "Women",
  unisex: "Unisex",
  polarized: "Polarized",
  wayfarer: "Wayfarer",
  round: "Round",
  rimless: "Rimless",
  aviator: "Aviator",
  rectangle: "Rectangle",
  "cat-eye": "Cat-Eye",
  "new-arrivals": "New Arrivals",
  "best-sellers": "Best Sellers",
  limited: "Limited Edition",
  summer: "Summer Edit",
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProductBySlug(slug: string) {
  return catalogProducts.find((p) => slugify(p.name) === slug);
}

/* Resolve any product (catalog, most-loved, or trending) by id for cart/checkout */
export interface CartProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  oldPrice?: string;
  image: string;
}

export function getProductInfo(id: string): CartProduct | undefined {
  const found =
    catalogProducts.find((p) => p.id === id) ??
    products.find((p) => p.id === id) ??
    trendingProducts.find((p) => p.id === id);
  if (!found) return undefined;
  return {
    id: found.id,
    name: found.name,
    brand: "brand" in found ? found.brand : "Optics",
    price: found.price,
    oldPrice: "oldPrice" in found ? found.oldPrice : undefined,
    image: found.image,
  };
}

export const productDescriptions: Record<string, string> = {
  c1: "A bold aviator silhouette rendered in feather-light titanium with smoke-gradient polarized lenses for all-day clarity and a timeless edge.",
  c2: "An oversized acetate frame with a sculpted signature profile, crafted with hand-polished Italian acetate and premium optical lenses.",
  c3: "Sleek round titanium optical frames with a refined minimal profile, engineered for a featherweight, all-day comfortable fit.",
  c4: "Geometric tortoiseshell cat-eye eyewear with a sculpted brow and gold-tone accents—bold, feminine, and unmistakably statement.",
  c5: "A sport-ready polarized wrap shield engineered for performance, with impact-resistant lenses and a secure, lightweight fit.",
  c6: "Butterfly-tinted rimless frames with a soft crystal profile, pairing airy lightness with luxury Dior styling.",
  c7: "The classic wayfarer in glossy black acetate with a comfortable fit and timeless Ray-Ban character.",
  c8: "Round retro frames in warm gold with gradient lenses, blending vintage charm with contemporary polish.",
  c9: "Classic aviator with gold lenses and refined detailing—iconic Ray-Ban styling that never goes out of season.",
  c10: "Havana-wayfarer tortoiseshell acetate with warm tones, a modern classic that flatters every face.",
  c11: "Crystal rimless titanium frames that are virtually weightless, paired with polarized crystal lenses.",
  c12: "Angular rectangle frames in a deep, dark finish for a sharp, confident, modern profile.",
  "1": "A bold aviator silhouette rendered in feather-light titanium with smoke-gradient polarized lenses for all-day clarity and a timeless edge.",
  "2": "An oversized acetate frame with a sculpted signature profile, crafted with hand-polished Italian acetate and premium optical lenses.",
  "3": "Sleek round titanium optical frames with a refined minimal profile, engineered for a featherweight, all-day comfortable fit.",
  "4": "Geometric tortoiseshell cat-eye eyewear with a sculpted brow and gold-tone accents—bold, feminine, and unmistakably statement.",
  "5": "Crystal rimless titanium frames that are virtually weightless, paired with polarized crystal lenses for total clarity.",
  "6": "Angular rectangle frames in a deep, dark finish for a sharp, confident, and unmistakably modern profile.",
  t1: "Sport-tech performance frames designed for the bold. Ultralight, impact-resistant lenses with a contemporary wraparound silhouette.",
  t2: "Sage green rimless frames with a refined, barely-there aesthetic. Perfect for everyday wear with a clean, minimalist edge.",
  t3: "New-arrival titanium frames with a featherlight build and precision-crafted hinges for the ultimate in comfort and luxury.",
  t4: "Bold and fearless—Flammo frames deliver high-contrast style with striking lens geometry built for those who own every room.",
  t5: "Prestige-level luxury eyewear with a refined silhouette and premium materials that command attention effortlessly.",
};

export const galleryLabels = [
  "Front",
  "Angle",
  "On Model",
  "Detail",
  "Lifestyle",
];

/* Multi-view gallery per product (uses existing shared assets) */
export const productGallery: Record<string, string[]> = {
  c1: ["/images/sunglasses_1.png", "/images/sunglasses_2.png", "/images/tryon_model.png", "/images/sunglasses_3.png", "/images/hero_model.png"],
  c2: ["/images/sunglasses_2.png", "/images/sunglasses_1.png", "/images/tryon_model.png", "/images/sunglasses_4.png", "/images/hero_model.png"],
  c3: ["/images/sunglasses_3.png", "/images/sunglasses_1.png", "/images/tryon_model.png", "/images/sunglasses_2.png", "/images/hero_model.png"],
  c4: ["/images/sunglasses_4.png", "/images/sunglasses_2.png", "/images/tryon_model.png", "/images/sunglasses_1.png", "/images/hero_model.png"],
  c5: ["/images/sunglasses_1.png", "/images/sunglasses_3.png", "/images/tryon_model.png", "/images/sunglasses_2.png", "/images/hero_model.png"],
  c6: ["/images/sunglasses_3.png", "/images/sunglasses_4.png", "/images/tryon_model.png", "/images/sunglasses_1.png", "/images/hero_model.png"],
  c7: ["/images/sunglasses_2.png", "/images/sunglasses_1.png", "/images/tryon_model.png", "/images/sunglasses_4.png", "/images/hero_model.png"],
  c8: ["/images/sunglasses_4.png", "/images/sunglasses_3.png", "/images/tryon_model.png", "/images/sunglasses_1.png", "/images/hero_model.png"],
  c9: ["/images/sunglasses_1.png", "/images/sunglasses_2.png", "/images/tryon_model.png", "/images/sunglasses_3.png", "/images/hero_model.png"],
  c10: ["/images/sunglasses_2.png", "/images/sunglasses_4.png", "/images/tryon_model.png", "/images/sunglasses_1.png", "/images/hero_model.png"],
  c11: ["/images/sunglasses_3.png", "/images/sunglasses_1.png", "/images/tryon_model.png", "/images/sunglasses_4.png", "/images/hero_model.png"],
  c12: ["/images/sunglasses_4.png", "/images/sunglasses_2.png", "/images/tryon_model.png", "/images/sunglasses_3.png", "/images/hero_model.png"],
  "1": ["/images/sunglasses_1.png", "/images/sunglasses_2.png", "/images/tryon_model.png", "/images/sunglasses_3.png", "/images/hero_model.png"],
  "2": ["/images/sunglasses_2.png", "/images/sunglasses_1.png", "/images/tryon_model.png", "/images/sunglasses_4.png", "/images/hero_model.png"],
  "3": ["/images/sunglasses_3.png", "/images/sunglasses_1.png", "/images/tryon_model.png", "/images/sunglasses_2.png", "/images/hero_model.png"],
  "4": ["/images/sunglasses_4.png", "/images/sunglasses_2.png", "/images/tryon_model.png", "/images/sunglasses_1.png", "/images/hero_model.png"],
  "5": ["/images/sunglasses_3.png", "/images/sunglasses_1.png", "/images/tryon_model.png", "/images/sunglasses_4.png", "/images/hero_model.png"],
  "6": ["/images/sunglasses_2.png", "/images/sunglasses_4.png", "/images/tryon_model.png", "/images/sunglasses_1.png", "/images/hero_model.png"],
  t1: ["/images/sunglasses_1.png", "/images/sunglasses_3.png", "/images/tryon_model.png", "/images/sunglasses_2.png", "/images/hero_model.png"],
  t2: ["/images/sunglasses_2.png", "/images/sunglasses_4.png", "/images/tryon_model.png", "/images/sunglasses_1.png", "/images/hero_model.png"],
  t3: ["/images/sunglasses_3.png", "/images/sunglasses_2.png", "/images/tryon_model.png", "/images/sunglasses_4.png", "/images/hero_model.png"],
  t4: ["/images/sunglasses_4.png", "/images/sunglasses_1.png", "/images/tryon_model.png", "/images/sunglasses_3.png", "/images/hero_model.png"],
  t5: ["/images/sunglasses_1.png", "/images/sunglasses_4.png", "/images/tryon_model.png", "/images/sunglasses_2.png", "/images/hero_model.png"],
};

export const framesOverlay: Record<string, React.ReactNode> = {  aviator: (
    <svg viewBox="0 0 200 60" className="absolute top-[41%] left-[17%] w-[66%] h-auto drop-shadow-md animate-fade-in">
      <ellipse cx="60" cy="30" rx="30" ry="24" fill="rgba(20, 80, 40, 0.75)" stroke="#c5a880" strokeWidth="2.5" />
      <ellipse cx="60" cy="30" rx="20" ry="14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <ellipse cx="140" cy="30" rx="30" ry="24" fill="rgba(20, 80, 40, 0.75)" stroke="#c5a880" strokeWidth="2.5" />
      <ellipse cx="140" cy="30" rx="20" ry="14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M90 22 Q100 16 110 22" fill="none" stroke="#c5a880" strokeWidth="3" />
      <path d="M90 28 Q100 24 110 28" fill="none" stroke="#c5a880" strokeWidth="2" />
      <path d="M30 25 Q15 20 5 35" fill="none" stroke="#c5a880" strokeWidth="2" />
      <path d="M170 25 Q185 20 195 35" fill="none" stroke="#c5a880" strokeWidth="2" />
    </svg>
  ),
  classic: (
    <svg viewBox="0 0 200 60" className="absolute top-[41%] left-[17%] w-[66%] h-auto drop-shadow-md animate-fade-in">
      <path d="M25 15 H175 L165 48 C155 52 125 50 120 40 C115 50 85 52 75 48 Z" fill="none" />
      <path d="M25 14 C45 12 75 14 85 18 C85 28 82 46 60 48 C40 49 30 38 25 14 Z" fill="#111" />
      <ellipse cx="56" cy="31" rx="22" ry="13" fill="rgba(0,0,0,0.85)" />
      <path d="M175 14 C155 12 125 14 115 18 C115 28 118 46 140 48 C160 49 170 38 175 14 Z" fill="#111" />
      <ellipse cx="144" cy="31" rx="22" ry="13" fill="rgba(0,0,0,0.85)" />
      <rect x="85" y="14" width="30" height="6" fill="#111" rx="2" />
    </svg>
  ),
  round: (
    <svg viewBox="0 0 200 60" className="absolute top-[41%] left-[18%] w-[64%] h-auto drop-shadow-md animate-fade-in">
      <circle cx="58" cy="30" r="26" fill="rgba(90, 20, 110, 0.65)" stroke="#c5a880" strokeWidth="3" />
      <ellipse cx="58" cy="30" rx="16" ry="16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <circle cx="142" cy="30" r="26" fill="rgba(90, 20, 110, 0.65)" stroke="#c5a880" strokeWidth="3" />
      <ellipse cx="142" cy="30" rx="16" ry="16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <path d="M84 25 Q100 15 116 25" fill="none" stroke="#c5a880" strokeWidth="2.5" />
    </svg>
  ),
  cateye: (
    <svg viewBox="0 0 200 60" className="absolute top-[39%] left-[16%] w-[68%] h-auto drop-shadow-lg animate-fade-in">
      <path d="M20 12 C60 10 85 25 88 32 C75 52 40 48 26 36 C18 28 15 18 20 12 Z" fill="#693d25" />
      <path d="M26 16 C55 14 78 26 80 30 C70 46 42 43 31 34 C25 28 22 20 26 16 Z" fill="rgba(120, 70, 40, 0.8)" />
      <path d="M180 12 C140 10 115 25 112 32 C125 52 160 48 174 36 C182 28 185 18 180 12 Z" fill="#693d25" />
      <path d="M174 16 C145 14 122 26 120 30 C130 46 158 43 169 34 C175 28 178 20 174 16 Z" fill="rgba(120, 70, 40, 0.8)" />
      <path d="M88 20 Q100 14 112 20" fill="none" stroke="#693d25" strokeWidth="3" />
    </svg>
  ),
};
