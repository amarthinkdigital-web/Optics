import type { Metadata } from "next";
import InfoPage from "@/components/shop/info-page";

export const metadata: Metadata = { title: "Contact Us | Optics" };

const contactItems = [
  {
    t: "Phone",
    d: "+91 89565 74297",
    href: "tel:+918956574297",
  },
  {
    t: "Location",
    d: "Near Kalidas Art Gallery, Shalimar, Nashik, Maharashtra",
  },
  {
    t: "Hours",
    d: "Monday - Sunday, 10am - 8pm",
  },
  {
    t: "Email",
    d: "support@optics.com",
    href: "mailto:support@optics.com",
  },
];

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Support" title="Contact Us">
      <p className="text-sm text-gray-600 leading-relaxed font-light">
        Visit our store or reach out any time. Our team is here to help with
        orders, styling advice, and everything in between.
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
            {"href" in item && item.href ? (
              <a
                href={item.href}
                className="text-sm font-semibold text-luxury-black hover:text-luxury-gold transition-colors"
              >
                {item.d}
              </a>
            ) : (
              <span className="text-sm font-semibold text-luxury-black">{item.d}</span>
            )}
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
