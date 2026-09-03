"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";

interface ProductBuyProps {
  productId: string;
}

export default function ProductBuy({ productId }: ProductBuyProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(productId, 1);
    router.push("/cart");
  };

  const handleBuyNow = () => {
    addItem(productId, 1);
    router.push("/checkout");
  };

  return (
    <>
      {/* Desktop: inline buttons */}
      <div className="hidden sm:flex flex-col gap-4">
        <button
          onClick={handleAdd}
          className="w-full py-4 rounded-full text-xs font-black uppercase tracking-widest text-center text-white bg-luxury-black hover:bg-luxury-gold transition-colors duration-300"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="w-full py-4 rounded-full border border-luxury-black text-xs font-black uppercase tracking-widest text-center text-luxury-black hover:bg-luxury-black hover:text-white transition-colors duration-300"
        >
          Buy Now
        </button>
      </div>

      {/* Mobile: sticky bottom bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 py-3 flex gap-3 items-center">
        <button
          onClick={handleAdd}
          className="flex-1 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest text-center text-white bg-luxury-black hover:bg-luxury-gold transition-colors duration-300"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 py-3.5 rounded-full border-2 border-luxury-black text-[11px] font-black uppercase tracking-widest text-center text-luxury-black hover:bg-luxury-black hover:text-white transition-colors duration-300"
        >
          Buy Now
        </button>
      </div>

      {/* Spacer so content doesn't hide behind the sticky bar on mobile */}
      <div className="sm:hidden h-20" />
    </>
  );
}
