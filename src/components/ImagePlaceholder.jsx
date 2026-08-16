import { ImagePlus } from "lucide-react";

/**
 * A clearly-labeled placeholder for a real photo. Used everywhere the design
 * calls for an image but we don't have a verified, licensed photo to use yet
 * (see README for why — several images supplied in the client's planning doc
 * turned out to be unlicensed stock photography, so none of them are used
 * anywhere on this site).
 *
 * Swap these out for real <img> tags once real photography is available —
 * the `label` prop tells you exactly what should go in each slot.
 */
export default function ImagePlaceholder({ label, aspect = "4/3", radius = 16, style = {} }) {
  return (
    <div
      className="img-placeholder"
      style={{
        aspectRatio: aspect,
        borderRadius: radius,
        flexDirection: "column",
        gap: 10,
        ...style,
      }}
    >
      <ImagePlus size={26} strokeWidth={1.5} />
      <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em", maxWidth: "80%", lineHeight: 1.4 }}>
        {label}
      </span>
    </div>
  );
}
