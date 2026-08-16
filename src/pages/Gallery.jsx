import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { GALLERY_FILTERS, GALLERY_ITEMS } from "../data/content";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter);

  return (
    <>
      <PageHeader
        title="Gallery"
        copy="Forest patrols, community meetings, workshops, and milestones from the Ekuri Initiative photo slots ready for the real thing."
        crumb="Gallery"
      />

      <section className="section container">
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "9px 20px", borderRadius: 999, border: "1px solid var(--paper-dim)", cursor: "pointer",
                fontSize: 13.5, fontWeight: 600, background: filter === f ? "var(--canopy)" : "#fff",
                color: filter === f ? "#fff" : "var(--ink)", transition: "background .25s ease, color .25s ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <AnimatePresence mode="popLayout">
              {items.map((g) => (
                <motion.div
                  key={g.title}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="card-lift" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--paper-dim)" }}>
                    <ImagePlaceholder label={g.title} aspect="4/3" radius={0} />
                    <div style={{ background: "#fff", padding: "14px 16px" }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--marigold-deep)" }}>
                        {g.category}
                      </span>
                      <h3 style={{ fontSize: 14.5, fontWeight: 600, marginTop: 6 }}>{g.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </section>
    </>
  );
}
