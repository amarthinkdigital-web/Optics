import type { Metadata } from "next";
import InfoPage from "@/components/shop/info-page";

export const metadata: Metadata = { title: "Our Stores | Optics" };

const storeList = [
  { t: "Dubai Mall", d: "Ground Floor, Fashion Avenue, Dubai, UAE" },
  { t: "Mall of the Emirates", d: "Level 1, Fashion District, Dubai, UAE" },
  { t: "Abu Dhabi Galleria", d: "The Galleria, Al Maryah Island, Abu Dhabi, UAE" },
];

export default function StoresPage() {
  return (
    <InfoPage eyebrow="Visit Us" title="Our Stores">
      <p className="text-sm text-gray-600 leading-relaxed font-light">
        Experience the full Optics collection in person. Our boutiques offer
        personalized styling and one-on-one fittings with our eyewear specialists.
      </p>
      <div className="flex flex-col gap-4">
        {storeList.map((store) => (
          <div
            key={store.t}
            className="p-5 rounded-2xl bg-white border border-gray-200/60 flex flex-col gap-1"
          >
            <span className="text-sm font-bold text-luxury-black">{store.t}</span>
            <span className="text-xs text-gray-500 leading-relaxed">{store.d}</span>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}