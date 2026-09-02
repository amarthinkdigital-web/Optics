import type { Metadata } from "next";
import InfoPage from "@/components/shop/info-page";

export const metadata: Metadata = { title: "Shipping & Delivery | Optics" };

const shippingItems = [
  { t: "Free Shipping", d: "Complimentary express shipping on all orders over AED 1,999." },
  { t: "Standard Delivery", d: "2–4 business days within the UAE and GCC." },
  { t: "Express Delivery", d: "Next-day delivery available for orders placed before 2 PM GST." },
  { t: "International", d: "Worldwide shipping available with duties calculated at checkout." },
  { t: "Order Tracking", d: "Receive a tracking link by email the moment your order ships." },
];

export default function ShippingPage() {
  return (
    <InfoPage eyebrow="Delivery" title="Shipping & Delivery">
      <p className="text-sm text-gray-600 leading-relaxed font-light">
        We deliver every frame in premium, protective packaging with insured,
        trackable shipping — so your eyewear always arrives in perfect condition.
      </p>
      <div className="flex flex-col gap-4">
        {shippingItems.map((item) => (
          <div
            key={item.t}
            className="p-5 rounded-2xl bg-white border border-gray-200/60 flex flex-col gap-1"
          >
            <span className="text-sm font-bold text-luxury-black">{item.t}</span>
            <span className="text-xs text-gray-500 leading-relaxed">{item.d}</span>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}