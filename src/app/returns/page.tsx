import type { Metadata } from "next";
import InfoPage from "@/components/shop/info-page";

export const metadata: Metadata = { title: "Returns & Exchange | Optics" };

const policyItems = [
  {
    t: "30-Day Returns",
    d: "Return any unworn frame within 30 days of delivery for a full refund, no questions asked.",
  },
  {
    t: "Free Exchange",
    d: "Prefer a different size or style? Exchanges ship free within the same country.",
  },
  {
    t: "Try at Home",
    d: "Order up to 3 frames to try in the comfort of your home — keep what you love, return the rest free.",
  },
  {
    t: "Easy Process",
    d: "Start a return from your account, print the prepaid label, and drop your parcel at any pickup point.",
  },
];

export default function ReturnsPage() {
  return (
    <InfoPage eyebrow="Support" title="Returns & Exchange">
      <p className="text-sm text-gray-600 leading-relaxed font-light">
        Shopping with Optics is risk-free. If your frames aren&apos;t a perfect fit,
        we make returns and exchanges simple and free.
      </p>
      <div className="flex flex-col gap-4">
        {policyItems.map((item) => (
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
