import { Link } from "react-router-dom";
import Reveal from "./Reveal";

/**
 * Clean Typographic Subpage Header
 * Lightweight, airy, and centered with refined typography and breadcrumb navigation.
 */
export default function PageHeader({ title, copy, crumb }) {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, var(--paper-dim) 0%, rgba(246,244,236,0.5) 100%)",
        borderBottom: "1px solid rgba(17, 36, 17, 0.08)",
        padding: "clamp(52px, 7vw, 76px) 24px",
      }}
    >
      <div className="container" style={{ textAlign: "center", maxWidth: 780 }}>
        <Reveal>
          {/* Breadcrumb Capsule */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12.5,
              fontWeight: 600,
              color: "var(--ink-soft)",
              marginBottom: 16,
              padding: "5px 16px",
              borderRadius: 999,
              background: "#ffffff",
              border: "1px solid var(--paper-dim)",
              boxShadow: "0 2px 8px rgba(11,50,11,0.04)",
            }}
          >
            <Link
              to="/"
              style={{
                color: "var(--marigold-deep)",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Home
            </Link>
            <span style={{ color: "var(--paper-dim)", fontWeight: 400 }}>/</span>
            <span style={{ color: "var(--canopy)", fontWeight: 700 }}>{crumb || title}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(30px, 4.2vw, 46px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              color: "var(--canopy-deep)",
              margin: 0,
            }}
          >
            {title}
          </h1>

          {/* Description */}
          {copy && (
            <p
              style={{
                fontSize: "clamp(15px, 1.7vw, 17.5px)",
                lineHeight: 1.65,
                color: "var(--ink-soft)",
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
