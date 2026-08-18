import { AnimatePresence, motion } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";

export default function PdfPreviewModal({ publication, onClose }) {
  return (
    <AnimatePresence>
      {publication && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 100, background: "rgba(11,50,11,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 16, width: "100%", maxWidth: 920, height: "88vh",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: "1px solid var(--paper-dim)" }}>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: 15.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {publication.title}
                </h3>
                <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "3px 0 0" }}>{publication.source}{publication.year ? ` · ${publication.year}` : ""}</p>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 16 }}>
                <a
                  href={publication.file}
                  download
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--paper-dim)", borderRadius: 8, fontSize: 12.5, fontWeight: 600, textDecoration: "none", color: "var(--ink)" }}
                >
                  <Download size={14} /> Download
                </a>
                <a
                  href={publication.file}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--paper-dim)", borderRadius: 8, fontSize: 12.5, fontWeight: 600, textDecoration: "none", color: "var(--ink)" }}
                >
                  <ExternalLink size={14} /> Open
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close preview"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "var(--canopy)", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div style={{ flex: 1, background: "var(--paper-dim)" }}>
              {publication.type === "pdf" ? (
                <iframe title={publication.title} src={publication.file} style={{ width: "100%", height: "100%", border: "none" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
                  <img src={publication.file} alt={publication.title} style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
