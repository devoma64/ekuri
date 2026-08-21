import Reveal from "./Reveal";

export default function Timeline({ items }) {
  return (
    <div style={{ position: "relative", paddingLeft: 28 }}>
      <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 2, background: "var(--paper-dim)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        {items.map((item, i) => (
          <Reveal key={item.year + item.title} delay={i * 60}>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", left: -28, top: 4, width: 12, height: 12, borderRadius: "50%",
                background: "var(--marigold)", border: "3px solid var(--paper)", boxShadow: "0 0 0 2px var(--marigold)",
              }} />
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 14.5, fontWeight: 700, color: "var(--marigold-deep)" }}>
                {item.year}
              </span>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 6, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>{item.copy}</p>
              <p style={{ fontSize: 12, color: "var(--ink-soft)", fontStyle: "italic", marginTop: 8 }}>
                Source: {item.source}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
