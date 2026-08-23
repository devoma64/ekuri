import { Link } from "react-router-dom";
import Reveal from "./Reveal";

/**
 * Clean Typographic Subpage Header
 * Lightweight, airy, and centered with refined typography and breadcrumb navigation.
 * Optionally supports a background image overlay for visual richness.
 */
export default function PageHeader({ title, copy, crumb, bgImage }) {
  return (
    <section
      style={{
        position: "relative",
        background: bgImage
          ? "linear-gradient(135deg, rgba(7,26,7,0.92) 0%, rgba(11,50,11,0.88) 100%)"
          : "linear-gradient(180deg, var(--paper-dim) 0%, rgba(246,244,236,0.6) 100%)",
        borderBottom: "1px solid rgba(17, 36, 17, 0.08)",
        padding: "clamp(48px, 6vw, 70px) 24px",
        overflow: "hidden",
        color: bgImage ? "#ffffff" : "inherit",
      }}
    >
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 0,
              opacity: 0.28,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background: "radial-gradient(ellipse at 50% 50%, rgba(7,26,7,0.4) 0%, rgba(7,26,7,0.88) 100%)",
            }}
          />
        </>
      )}

      <div className="container" style={{ textAlign: "center", maxWidth: 780, position: "relative", zIndex: 2 }}>
        <Reveal>
          {/* Breadcrumb Capsule */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12.5,
              fontWeight: 600,
              color: bgImage ? "rgba(246,244,236,0.85)" : "var(--ink-soft)",
              marginBottom: 16,
              padding: "5px 16px",
              borderRadius: 999,
              background: bgImage ? "rgba(255,255,255,0.12)" : "#ffffff",
              backdropFilter: bgImage ? "blur(8px)" : "none",
              border: bgImage ? "1px solid rgba(255,255,255,0.2)" : "1px solid var(--paper-dim)",
              boxShadow: "0 2px 8px rgba(11,50,11,0.04)",
            }}
          >
            <Link
              to="/"
              style={{
                color: "var(--marigold)",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Home
            </Link>
            <span style={{ color: bgImage ? "rgba(255,255,255,0.4)" : "var(--paper-dim)", fontWeight: 400 }}>/</span>
            <span style={{ color: bgImage ? "#ffffff" : "var(--canopy)", fontWeight: 700 }}>{crumb || title}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: "-0.015em",
              color: bgImage ? "#ffffff" : "var(--canopy-deep)",
              margin: 0,
            }}
          >
            {title}
          </h1>

          {/* Description */}
          {copy && (
            <p
              style={{
                fontSize: "clamp(14.5px, 1.6vw, 16.5px)",
                lineHeight: 1.65,
                color: bgImage ? "rgba(246,244,236,0.9)" : "var(--ink-soft)",
                marginTop: 14,
                marginBottom: 0,
                maxWidth: 640,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {copy}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
