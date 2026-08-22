import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, MapPin, ImagePlus, ArrowUpRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { GALLERY_FILTERS, GALLERY_ITEMS } from "../data/content";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const items = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter);

  // Handle keyboard navigation in Lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
      }
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
      }
    },
    [activePhotoIndex, items.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown, activePhotoIndex]);

  const activePhoto = activePhotoIndex !== null ? items[activePhotoIndex] : null;

  return (
    <>
      <PageHeader
        title="Our Gallery"
        copy="A visual archive of community forest stewardship, biodiversity, cartography, and sustainable agroforestry across 33,600 hectares."
        crumb="Gallery"
      />

      <section style={{ background: "var(--paper)", padding: "56px 24px 104px" }}>
        <div className="container">
          {/* Category Filter Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 52,
              paddingBottom: 24,
              borderBottom: "1px solid rgba(17, 36, 17, 0.08)",
            }}
          >
            {GALLERY_FILTERS.map((f) => {
              const count = f === "All" ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((g) => g.category === f).length;
              const isActive = filter === f;

              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFilter(f);
                    setActivePhotoIndex(null);
                  }}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 999,
                    border: isActive ? "1.5px solid var(--canopy)" : "1px solid var(--paper-dim)",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                    background: isActive ? "var(--canopy)" : "#ffffff",
                    color: isActive ? "#ffffff" : "var(--ink)",
                    boxShadow: isActive ? "0 4px 12px rgba(11,50,11,0.2)" : "none",
                    transition: "all .2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>{f}</span>
                  <span
                    style={{
                      fontSize: 11,
                      padding: "2px 7px",
                      borderRadius: 999,
                      background: isActive ? "rgba(255,255,255,0.22)" : "var(--paper-dim)",
                      color: isActive ? "#ffffff" : "var(--ink-soft)",
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Exhibition Grid (Flat Museum Architecture) */}
          <LayoutGroup>
            <motion.div
              layout
              className="gallery-editorial-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 32,
              }}
            >
              <AnimatePresence mode="popLayout">
                {items.map((g, idx) => (
                  <motion.div
                    key={g.id || g.title}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      onClick={() => setActivePhotoIndex(idx)}
                      className="gallery-item-card"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        height: "100%",
                      }}
                    >
                      {/* Photo Frame (Sharp, Unrounded, Architectural) */}
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "16/11",
                          overflow: "hidden",
                          background: g.src ? "#081608" : "var(--paper-dim)",
                          border: "1px solid rgba(17, 36, 17, 0.12)",
                          marginBottom: 16,
                        }}
                      >
                        {g.src ? (
                          <>
                            <img
                              src={g.src}
                              alt={g.title}
                              loading="lazy"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                              }}
                              className="gallery-thumb-img"
                            />

                            {/* Museum Index Pill */}
                            <div
                              style={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                padding: "4px 10px",
                                background: g.category === "Historical Archive" ? "rgba(11, 36, 15, 0.88)" : "rgba(3, 14, 5, 0.78)",
                                backdropFilter: "blur(6px)",
                                color: g.category === "Historical Archive" ? "var(--marigold)" : "#ffffff",
                                fontSize: 10.5,
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                border: g.category === "Historical Archive" ? "1px solid rgba(217, 154, 63, 0.4)" : "none",
                              }}
                            >
                              {g.year ? `${g.year} · ` : ""}{g.category}
                            </div>

                            {/* Hover Overlay with Zoom Icon */}
                            <div
                              className="gallery-overlay"
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to top, rgba(3,14,5,0.75) 0%, rgba(3,14,5,0.15) 60%, transparent 100%)",
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <div
                                style={{
                                  padding: "8px 16px",
                                  borderRadius: 999,
                                  background: "rgba(255, 255, 255, 0.95)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  color: "var(--canopy-deep)",
                                  fontSize: 12.5,
                                  fontWeight: 700,
                                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                                }}
                              >
                                <ZoomIn size={15} />
                                <span>Expand Photo</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 10,
                              padding: 24,
                              textAlign: "center",
                              background: "linear-gradient(135deg, rgba(22,104,22,0.06) 0%, rgba(17,36,17,0.02) 100%)",
                            }}
                          >
                            <div
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                background: "#ffffff",
                                border: "1px solid var(--paper-dim)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--marigold-deep)",
                                boxShadow: "0 4px 12px rgba(11,50,11,0.06)",
                              }}
                            >
                              <ImagePlus size={20} strokeWidth={1.5} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                              Archival Record Pending
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Editorial Metadata Beneath Photo */}
                      <div>
                        {g.location && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--marigold-deep)",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              marginBottom: 4,
                            }}
                          >
                            <MapPin size={12} />
                            <span>{g.location}</span>
                          </div>
                        )}

                        <h3
                          className="gallery-item-title"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 17.5,
                            fontWeight: 700,
                            lineHeight: 1.35,
                            color: "var(--canopy-deep)",
                            margin: "0 0 6px",
                            transition: "color .2s ease",
                          }}
                        >
                          {g.title}
                        </h3>

                        <p
                          style={{
                            fontSize: 13.5,
                            lineHeight: 1.55,
                            color: "var(--ink-soft)",
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {g.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActivePhotoIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(3, 14, 5, 0.92)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#ffffff",
                borderRadius: 20,
                overflow: "hidden",
                maxWidth: 960,
                width: "100%",
                maxHeight: "92vh",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6)",
                position: "relative",
              }}
            >
              {/* Header Bar */}
              <div
                style={{
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--paper-dim)",
                  background: "var(--paper)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span
                    style={{
                      background: "var(--canopy)",
                      color: "#fff",
                      fontSize: 11.5,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "4px 12px",
                      borderRadius: 999,
                    }}
                  >
                    {activePhoto.category}
                  </span>
                  {activePhoto.year && (
                    <span
                      style={{
                        background: "rgba(217, 154, 63, 0.15)",
                        color: "var(--marigold-deep)",
                        fontSize: 11.5,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(217, 154, 63, 0.3)",
                      }}
                    >
                      {activePhoto.year}
                    </span>
                  )}
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)" }}>
                    {activePhotoIndex + 1} of {items.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(null)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid var(--paper-dim)",
                    background: "#fff",
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all .2s ease",
                  }}
                  aria-label="Close image modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Image View */}
              <div
                style={{
                  position: "relative",
                  background: "#081608",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  maxHeight: "62vh",
                  minHeight: 320,
                  overflow: "hidden",
                }}
              >
                {activePhoto.src ? (
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "62vh",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                ) : (
                  <div style={{ textAlign: "center", padding: "60px 24px", color: "#ffffff" }}>
                    <ImagePlus size={48} strokeWidth={1.5} color="var(--marigold)" style={{ marginBottom: 14 }} />
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "#ffffff", margin: "0 0 8px" }}>
                      Archival Photo Pending
                    </h3>
                    <p style={{ fontSize: 13.5, color: "rgba(246,244,236,0.75)", maxWidth: 440, margin: "0 auto", lineHeight: 1.6 }}>
                      Historical photo documentation for this milestone is currently being digitized and will be added to the gallery archive soon.
                    </p>
                  </div>
                )}

                {/* Left Arrow */}
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
                    }}
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all .2s ease",
                    }}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* Right Arrow */}
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
                    }}
                    style={{
                      position: "absolute",
                      right: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all .2s ease",
                    }}
                    aria-label="Next photo"
                  >
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>

              {/* Caption & Metadata Footer */}
              <div style={{ padding: "20px 28px 24px", overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(18px, 2.2vw, 22px)",
                      fontWeight: 700,
                      color: "var(--canopy-deep)",
                      margin: 0,
                    }}
                  >
                    {activePhoto.title}
                  </h2>
                </div>

                {activePhoto.location && (
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--marigold-deep)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      margin: "0 0 10px",
                    }}
                  >
                    <MapPin size={13} /> {activePhoto.location}
                  </p>
                )}

                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
                  {activePhoto.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-item-card:hover .gallery-thumb-img {
          transform: scale(1.05);
        }
        .gallery-item-card:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .gallery-item-card:hover .gallery-item-title {
          color: var(--marigold-deep) !important;
        }
      `}</style>
    </>
  );
}
