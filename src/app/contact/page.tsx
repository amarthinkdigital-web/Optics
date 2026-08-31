import type { Metadata } from "next";
import InfoPage from "@/components/shop/info-page";

export const metadata: Metadata = { title: "Contact Us | Optics" };

const contactItems = [
  { t: "Email", d: "support@optics.com" },
  { t: "Phone", d: "+971 50 123 4567" },
  { t: "Location", d: "Dubai, United Arab Emirates" },
  { t: "Hours", d: "Mon–Sat, 9:00 AM – 6:00 PM GST" },
];

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Support" title="Contact Us">
      <p className="text-sm text-gray-600 leading-relaxed font-light">
        Our concierge team is here to help with orders, styling advice, and
        everything in between. Reach out any time.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactItems.map((item) => (
          <div
            key={item.t}
            className="p-5 rounded-2xl bg-white border border-gray-200/60 flex flex-col gap-1"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">
              {item.t}
            </span>
            <span className="text-sm font-semibold text-luxury-black">{item.d}</span>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
