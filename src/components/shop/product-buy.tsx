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

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleAdd}
        className="w-full py-4 rounded-full text-xs font-black uppercase tracking-widest text-center text-white bg-luxury-black hover:bg-luxury-gold transition-colors duration-300"
      >
        Add to Cart
      </button>
      <button
        onClick={handleAdd}
        className="w-full py-4 rounded-full border border-luxury-black text-xs font-black uppercase tracking-widest text-center text-luxury-black hover:bg-luxury-black hover:text-white transition-colors duration-300"
      >
        Buy Now
      </button>
    </div>
  );
}
