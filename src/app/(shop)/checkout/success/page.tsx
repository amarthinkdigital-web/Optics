"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const [orderNo] = useState(() =>
    `OC-${Math.floor(100000 + Math.random() * 900000)}`
  );

  return (
    <div className="min-h-[60vh] bg-[#faf9f6]">
      <div className="mx-auto max-w-xl w-full px-6 py-20 flex flex-col items-center gap-6 text-center">
        <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">
            Order Placed
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-luxury-black uppercase">
            Thank You
          </h1>
          <p className="text-sm text-gray-500 max-w-sm">
            Your order has been received. A confirmation email is on its way.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 p-6 bg-white border border-gray-200/60 rounded-2xl">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Order Number</span>
            <span className="font-bold text-luxury-black">{orderNo}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Estimated Delivery</span>
            <span className="font-bold text-luxury-black">3–5 business days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment</span>
            <span className="font-bold text-luxury-black">Confirmed</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/products"
            className="flex-1 py-3.5 rounded-full bg-luxury-black text-white text-xs font-black uppercase tracking-widest hover:bg-luxury-gold transition-colors duration-300"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 py-3.5 rounded-full border border-luxury-black text-luxury-black text-xs font-black uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
