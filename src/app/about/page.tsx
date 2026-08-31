import type { Metadata } from "next";
import InfoPage from "@/components/shop/info-page";

export const metadata: Metadata = { title: "Our Story | Optics" };

export default function AboutPage() {
  return (
    <InfoPage eyebrow="Optics" title="Our Story">
      <p className="text-sm text-gray-600 leading-relaxed font-light">
        Optics is a premium eyewear house curating the world&apos;s finest
        sunglasses and optical frames. Since 2020 we&apos;ve paired handcrafted
        Italian acetate, feather-light titanium, and precision optical lenses
        with a distinctly modern, confident aesthetic.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { t: "2020", d: "House founded in Dubai" },
          { t: "25,000+", d: "Trusted customers worldwide" },
          { t: "2 Years", d: "Warranty on every frame" },
        ].map((stat) => (
          <div
            key={stat.t}
            className="p-5 rounded-2xl bg-white border border-gray-200/60 flex flex-col gap-1"
          >
            <span className="font-display text-2xl font-bold text-luxury-black">
              {stat.t}
            </span>
            <span className="text-xs text-gray-500">{stat.d}</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed font-light">
        Every collection is designed around comfort, clarity, and confidence —
        because the right pair of frames should feel as good as it looks.
      </p>
    </InfoPage>
  );
}
