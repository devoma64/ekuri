import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Share2, Check, FileText, ArrowRight, BookOpen } from "lucide-react";

export default function BlogArticleModal({ article, onClose, onSelectArticle, allArticles = [] }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 110,
          background: "rgba(11, 50, 11, 0.78)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 16px",
          overflowY: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 20,
            width: "100%",
            maxWidth: 820,
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 24px",
              borderBottom: "1px solid var(--paper-dim)",
              background: "#fff",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--marigold-deep)",
                  background: "rgba(224, 159, 62, 0.12)",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                {article.category}
              </span>
              <span style={{ fontSize: 12.5, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={13} /> {article.readTime}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                onClick={handleShare}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  borderRadius: 999,
                  border: "1px solid var(--paper-dim)",
                  background: "var(--paper)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "var(--ink)",
                  transition: "all .2s ease",
                }}
              >
                {copied ? <Check size={14} color="#16a34a" /> : <Share2 size={14} />}
                {copied ? "Link Copied!" : "Share"}
              </button>
              <button
                onClick={onClose}
                aria-label="Close article"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background: "var(--paper-dim)",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink)",
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Scrollable Article Body */}
          <div style={{ padding: "28px 32px 40px", overflowY: "auto", flex: 1 }}>
            {/* Title */}
            <h1
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(22px, 3.2vw, 30px)",
                fontWeight: 600,
                lineHeight: 1.25,
                color: "var(--canopy-deep)",
                margin: "0 0 16px",
              }}
            >
              {article.title}
            </h1>

            {/* Author & Date Metadata */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                paddingBottom: 20,
                borderBottom: "1px solid var(--paper-dim)",
                marginBottom: 24,
              }}
            >
              <img
                src={article.author?.avatar || "/assets/img/ekuri-logo-circle.png"}
                alt={article.author?.name}
                style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--paper-dim)" }}
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{article.author?.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", display: "flex", gap: 12, marginTop: 2 }}>
                  <span>{article.author?.role}</span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Calendar size={12} /> {article.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {article.image && (
              <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 28, border: "1px solid var(--paper-dim)" }}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{ width: "100%", maxHeight: 380, objectFit: "cover", display: "block" }}
                />
              </div>
            )}

            {/* Excerpt Callout */}
            <div
              style={{
                padding: "18px 22px",
                background: "rgba(224, 159, 62, 0.08)",
                borderLeft: "4px solid var(--marigold-deep)",
                borderRadius: 8,
                fontSize: 15.5,
                lineHeight: 1.65,
                fontWeight: 500,
                color: "var(--canopy-deep)",
                marginBottom: 28,
              }}
            >
              {article.excerpt}
            </div>

            {/* Main Content Paragraphs */}
            <div style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--ink)" }}>
              {article.content?.map((paragraph, index) => (
                <p key={index} style={{ marginBottom: 18 }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Publication Attachment if available */}
            {article.publicationDoc && (
              <div
                style={{
                  marginTop: 32,
                  padding: "20px 24px",
                  background: "var(--canopy)",
                  borderRadius: 14,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FileText size={22} color="var(--marigold)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--marigold)" }}>
                      Official Document / Reference
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 2 }}>{article.publicationTitle}</div>
                  </div>
                </div>
                <a
                  href={article.publicationDoc}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "9px 18px",
                    background: "var(--marigold)",
                    color: "var(--canopy-deep)",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <BookOpen size={14} /> View Document
                </a>
              </div>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--paper-dim)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-soft)" }}>Tags:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 999,
                      background: "var(--paper-dim)",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--ink)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div style={{ marginTop: 38, paddingTop: 26, borderTop: "1px solid var(--paper-dim)" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--canopy)", marginBottom: 16 }}>
                  Related Stories & Updates
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectArticle(rel)}
                      className="card-lift"
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        background: "var(--paper)",
                        border: "1px solid var(--paper-dim)",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--marigold-deep)", textTransform: "uppercase" }}>
                        {rel.category}
                      </div>
                      <h4 style={{ fontSize: 13.5, fontWeight: 600, margin: "6px 0 8px", lineHeight: 1.35, color: "var(--ink)" }}>
                        {rel.title}
                      </h4>
                      <div style={{ fontSize: 12, color: "var(--marigold-deep)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                        Read story <ArrowRight size={12} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
