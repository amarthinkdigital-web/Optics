"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { getProductInfo } from "@/components/home/data";

function parseAED(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, reset } = useCart();

  const items = lines
    .map((line) => {
      const product = getProductInfo(line.id);
      return product ? { product, quantity: line.quantity } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + parseAED(product.price) * quantity,
    0
  );
  const formattedTotal = `AED ${subtotal.toFixed(2)}`;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setPlacing(true);
    window.setTimeout(() => {
      reset();
      router.push("/checkout/success");
    }, 900);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-[#faf9f6] flex flex-col items-center justify-center gap-5 px-6 py-20 text-center">
        <span className="text-5xl">🕶</span>
        <p className="text-sm text-gray-500">Your cart is empty. Add a frame before checkout.</p>
        <Link
          href="/products"
          className="px-6 py-3 rounded-full bg-luxury-black text-white text-xs font-black uppercase tracking-widest hover:bg-luxury-gold transition-colors duration-300"
        >
          Shop All Frames
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] bg-[#faf9f6]">
      <div className="mx-auto max-w-6xl w-full px-6 py-12 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          <Link href="/" className="hover:text-luxury-black">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-luxury-black">Cart</Link>
          <span>/</span>
          <span className="text-luxury-black">Checkout</span>
        </nav>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">
            Almost There
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-luxury-black uppercase">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <section className="flex flex-col gap-4 bg-white border border-gray-200/60 rounded-2xl p-6">
              <h2 className="font-display text-sm font-bold text-luxury-black uppercase">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={form.fullName}
                  onChange={set("fullName")}
                  placeholder="Full Name"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
                <input
                  value={form.email}
                  onChange={set("email")}
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="Phone"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
                <input
                  value={form.address}
                  onChange={set("address")}
                  placeholder="Street Address"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
                <input
                  value={form.city}
                  onChange={set("city")}
                  placeholder="City"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
                <input
                  value={form.state}
                  onChange={set("state")}
                  placeholder="State"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
                <input
                  value={form.pincode}
                  onChange={set("pincode")}
                  placeholder="Pincode / ZIP"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
              </div>
            </section>

            <section className="flex flex-col gap-4 bg-white border border-gray-200/60 rounded-2xl p-6">
              <h2 className="font-display text-sm font-bold text-luxury-black uppercase">
                Payment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  placeholder="Card Number"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
                <input
                  placeholder="Name on Card"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
                <input
                  placeholder="Expiry (MM/YY)"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
                <input
                  placeholder="CVV"
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-luxury-black placeholder:text-gray-400 focus:outline-none focus:border-luxury-black transition-colors"
                />
              </div>
              <p className="text-[10px] text-gray-400">🔒 Demo checkout — no real payment is processed.</p>
            </section>
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-5 p-6 bg-white border border-gray-200/60 rounded-2xl h-fit">
            <h2 className="font-display text-lg font-bold text-luxury-black uppercase">
              Order Summary
            </h2>
            <div className="flex flex-col gap-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-xs font-medium text-luxury-black line-clamp-1">
                      {product.name}
                    </span>
                    <span className="text-[10px] text-gray-400">Qty {quantity}</span>
                  </div>
                  <span className="text-xs font-semibold text-luxury-black">
                    {product.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between">
              <span className="font-bold text-luxury-black">Total</span>
              <span className="font-bold text-luxury-black">{formattedTotal}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full py-3.5 rounded-full bg-luxury-black text-white text-xs font-black uppercase tracking-widest hover:bg-luxury-gold transition-colors disabled:opacity-60"
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>
            <Link
              href="/cart"
              className="text-center text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-luxury-black transition-colors"
            >
              &larr; Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
