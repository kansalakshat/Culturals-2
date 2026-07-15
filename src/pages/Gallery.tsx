import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { CLUBS } from "../data";

const IMAGES = Array.from(
  new Set(CLUBS.flatMap((c) => c.gallery || []).filter(Boolean))
);

// Split the images: first half -> Cultural, the rest (after the green box) -> Inter IIT.
// ponytail: adjust SPLIT to move the boundary.
const SPLIT = Math.ceil(IMAGES.length / 2);
const CULTURAL = IMAGES.slice(0, SPLIT);
const INTER_IIT = IMAGES.slice(SPLIT);

const QUOTE =
  "Moments that made the year — captured, framed, remembered. Every frame tells a story from the stage, the street and the studio.";

/* masonry grid — each image keeps its natural aspect (full, no crop, no gaps) */
const Grid = ({
  imgs,
  green,
  quote,
  onPreview,
}: {
  imgs: string[];
  green?: boolean;
  quote?: string;
  onPreview: (src: string) => void;
}) => (
  <div className="columns-2 sm:columns-3 gap-3">
    {imgs.map((src, i) => (
      <motion.img
        key={i}
        src={src}
        alt=""
        loading="lazy"
        onClick={() => onPreview(src)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={
          "mb-3 w-full h-auto rounded-xl border-2 cursor-zoom-in break-inside-avoid " +
          (green ? "border-cream/20" : "border-green/15")
        }
      />
    ))}
    {quote && (
      <div className="mb-3 break-inside-avoid rounded-xl p-5 text-[15px] leading-snug green-texture text-cream">
        {quote}
      </div>
    )}
  </div>
);

export const Gallery = () => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="pt-28 pb-24">
      {/* ---------- Cultural Gallery ---------- */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <h1 className="display text-6xl mb-3">Cultural Gallery</h1>
        <p className="text-ink/60 text-lg">Moments &amp; memories from campus culture.</p>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <Grid imgs={CULTURAL} quote={QUOTE} onPreview={setPreview} />
      </div>

      {/* ---------- Inter IIT Gallery ---------- */}
      {INTER_IIT.length > 0 && (
        <div className="green-texture py-14 mt-10">
          <div className="max-w-6xl mx-auto px-6 text-center mb-10">
            <h2 className="display text-5xl text-cream mb-2">Inter IIT Gallery</h2>
            <p className="text-cream/70 text-lg">Representing IIT Bhilai across the country.</p>
          </div>
          <div className="max-w-6xl mx-auto px-4">
            <Grid imgs={INTER_IIT} green onPreview={setPreview} />
          </div>
        </div>
      )}

      {/* full-image preview (whole image visible, not cropped) */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button aria-label="Close" className="absolute top-5 right-5 text-cream/80 hover:text-cream">
            <X className="h-8 w-8" />
          </button>
          <img
            src={preview}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};
