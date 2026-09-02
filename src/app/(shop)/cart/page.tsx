"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { getProductInfo, getProductBySlug, slugify } from "@/components/home/data";

function parseAED(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}

export default function CartPage() {
  const { lines, updateQuantity, removeItem, reset } = useCart();

  const items = lines
    .map((line) => {
      const product = getProductInfo(line.id);
      if (!product) return null;
      const slug = slugify(product.name);
      const hasDetails = !!getProductBySlug(slug);
      return {
        product,
        quantity: line.quantity,
        detailsHref: hasDetails ? `/products/${slug}` : null,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + parseAED(product.price) * quantity,
    0
  );
  const formattedTotal = `AED ${subtotal.toFixed(2)}`;

  return (
    <div className="min-h-[60vh] bg-[#faf9f6]">
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 overflow-x-auto scrollbar-none whitespace-nowrap">
          <Link href="/" className="hover:text-luxury-black">Home</Link>
          <span>/</span>
          <span className="text-luxury-black">Cart</span>
        </nav>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">
            Your Selection
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-luxury-black uppercase">
            Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
            <span className="text-5xl">🕶</span>
            <p className="text-sm text-gray-500">
              Your cart is currently empty.
            </p>
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-luxury-black text-white text-xs font-black uppercase tracking-widest hover:bg-luxury-gold transition-colors duration-300"
            >
              Shop All Frames
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map(({ product, quantity, detailsHref }) => (
                <div
                  key={product.id}
                  className="flex gap-3 sm:gap-4 p-4 bg-white border border-gray-200/60 rounded-2xl"
                >
                  {detailsHref ? (
                    <Link
                      href={detailsHref}
                      className="relative h-28 w-28 shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-3"
                      />
                    </Link>
                  ) : (
                    <div className="relative h-28 w-28 shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                        {product.brand}
                      </span>
                      {detailsHref ? (
                        <Link
                          href={detailsHref}
                          className="font-display font-medium text-sm text-luxury-black hover:text-luxury-gold transition-colors"
                        >
                          {product.name}
                        </Link>
                      ) : (
                        <span className="font-display font-medium text-sm text-luxury-black">
                          {product.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="h-8 w-8 rounded-full border border-gray-200 text-luxury-black hover:border-luxury-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="h-8 w-8 rounded-full border border-gray-200 text-luxury-black hover:border-luxury-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between shrink-0">
                    {product.oldPrice && (
                      <span className="text-[10px] text-gray-400 line-through">
                        {product.oldPrice}
                      </span>
                    )}
                    <span className="text-sm font-bold text-luxury-black">
                      {product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-5 p-6 bg-white border border-gray-200/60 rounded-2xl h-fit">
              <h2 className="font-display text-lg font-bold text-luxury-black uppercase">
                Order Summary
              </h2>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-luxury-black font-semibold">
                    {formattedTotal}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-xs">Free over AED 1,999</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between">
                <span className="font-bold text-luxury-black">Total</span>
                <span className="font-bold text-luxury-black">
                  {formattedTotal}
                </span>
              </div>
              <Link
                href="/checkout"
                className="w-full py-3.5 rounded-full bg-luxury-black text-white text-xs font-black uppercase tracking-widest text-center hover:bg-luxury-gold transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={reset}
                className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
