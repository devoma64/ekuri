import { useState } from "react";
import { FileText, Image as ImageIcon, Eye, Download, Clock, ExternalLink } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PdfPreviewModal from "../components/PdfPreviewModal";
import { StaggerGroup, StaggerItem } from "../components/Reveal";
import { PUBLICATIONS } from "../data/publications";

export default function Publications() {
  const [active, setActive] = useState(null);

  return (
    <>
      <PageHeader
        title="Resources & Publications"
        copy="Case studies, laws, maps, and correspondence documenting the Ekuri Initiative's history and the fight to protect this forest."
        crumb="Publications"
        bgImage="/assets/img/ekuri-perimeter-survey.jpg"
      />

      <section className="section container">
        <StaggerGroup style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {PUBLICATIONS.map((pub) => (
            <StaggerItem key={pub.title}>
              <div className="card-lift" style={{
                background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 16, padding: 24,
                display: "grid", gridTemplateColumns: "1fr", gap: 16,
              }}>
                <div className="pub-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 16 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 10, background: "var(--paper-dim)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {pub.type === "image" ? <ImageIcon size={20} color="var(--canopy)" /> : <FileText size={20} color="var(--canopy)" />}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4, marginBottom: 6 }}>{pub.title}</h3>
                      <p style={{ fontSize: 12.5, color: "var(--marigold-deep)", fontWeight: 600, marginBottom: 8 }}>
                        {pub.source}{pub.year ? ` · ${pub.year}` : ""}
                      </p>
                      <p style={{ fontSize: 13.5 }}>{pub.copy}</p>
                      {pub.citation && (
                        <p style={{ fontSize: 12, color: "var(--ink-soft)", fontStyle: "italic", marginTop: 8, borderLeft: "2px solid var(--paper-dim)", paddingLeft: 10 }}>
                          As cited by the Initiative: {pub.citation}
                        </p>
                      )}
                    </div>
                  </div>

                  {pub.type === "unavailable" ? (
                    <div style={{ justifySelf: "start", display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--ink-soft)", background: "var(--paper-dim)", padding: "9px 16px", borderRadius: 999, whiteSpace: "nowrap" }}>
                      <Clock size={14} /> Available on request
                    </div>
                  ) : pub.type === "external" || pub.link ? (
                    <div style={{ justifySelf: "start", display: "flex", gap: 10 }}>
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-lift"
                        style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "var(--canopy)", color: "#fff", borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
                      >
                        <ExternalLink size={15} /> Read Online
                      </a>
                    </div>
                  ) : (
                    <div style={{ justifySelf: "start", display: "flex", gap: 10 }}>
                      <button
                        onClick={() => setActive(pub)}
                        className="btn-lift"
                        style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "var(--canopy)", color: "#fff", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
                      >
                        <Eye size={15} /> Preview
                      </button>
                      <a
                        href={pub.file}
                        download
                        style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "var(--paper-dim)", color: "var(--ink)", borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
                      >
                        <Download size={15} /> Download
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <PdfPreviewModal publication={active} onClose={() => setActive(null)} />

      <style>{`
        @media (min-width: 760px) {
          .pub-row { grid-template-columns: 1fr auto !important; }
        }
      `}</style>
    </>
  );
}
