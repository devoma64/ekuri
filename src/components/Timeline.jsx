import { Camera } from "lucide-react";
import Reveal from "./Reveal";

export default function Timeline({ items }) {
  return (
    <div style={{ position: "relative", paddingLeft: 32 }}>
      <div style={{ position: "absolute", left: 6, top: 8, bottom: 8, width: 2, background: "rgba(17, 36, 17, 0.12)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
        {items.map((item, i) => (
          <Reveal key={item.year + item.title} delay={i * 50}>
            <div style={{ position: "relative" }}>
              {/* Timeline Marker Pin */}
              <div
                style={{
                  position: "absolute",
                  left: -32,
                  top: 4,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "var(--marigold)",
                  border: "3px solid var(--paper)",
                  boxShadow: "0 0 0 2px var(--marigold)",
                }}
              />

              {/* Year & Archival Tag */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--marigold-deep)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.year}
                </span>
                {item.image && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: "rgba(217, 154, 63, 0.15)",
                      color: "var(--marigold-deep)",
                    }}
                  >
                    <Camera size={11} /> Photo Record
                  </span>
                )}
              </div>

              {/* Milestone Title */}
              <h3
                style={{
                  fontSize: "clamp(17px, 2vw, 20px)",
                  fontWeight: 700,
                  fontFamily: "var(--font-serif)",
                  color: "var(--canopy-deep)",
                  marginTop: 4,
                  marginBottom: 10,
                  lineHeight: 1.35,
                }}
              >
                {item.title}
              </h3>

              {/* Story Copy */}
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--ink)", margin: "0 0 12px" }}>
                {item.copy}
              </p>

              {/* Archival Photograph if available */}
              {item.image && (
                <div
                  style={{
                    marginTop: 14,
                    marginBottom: 16,
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(17, 36, 17, 0.12)",
                    background: "#0a180c",
                    maxWidth: 580,
                    boxShadow: "0 8px 24px -6px rgba(11,50,11,0.12)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.imageCaption || item.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: 340,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {item.imageCaption && (
                    <div
                      style={{
                        padding: "10px 14px",
                        background: "#ffffff",
                        borderTop: "1px solid rgba(17, 36, 17, 0.08)",
                        fontSize: 12,
                        color: "var(--ink-soft)",
                        lineHeight: 1.5,
                      }}
                    >
                      📷 {item.imageCaption}
                    </div>
                  )}
                </div>
              )}

              {/* Source Footnote */}
              <p
                style={{
                  fontSize: 12,
                  color: "var(--ink-soft)",
                  fontStyle: "italic",
                  margin: 0,
                  borderLeft: "2px solid rgba(17, 36, 17, 0.1)",
                  paddingLeft: 10,
                }}
              >
                Source: {item.source}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

