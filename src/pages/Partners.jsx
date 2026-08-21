import { Handshake } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { StaggerGroup, StaggerItem } from "../components/Reveal";
import { PARTNERS } from "../data/content";

export default function Partners() {
  return (
    <>
      <PageHeader
        title="Partners"
        copy="Organizations who have worked alongside the Ekuri Initiative to protect this forest."
        crumb="Partners"
        bgImage="/assets/img/ekuri-agroforestry-farming.jpg"
      />

      {/* Logo strip — wordmark badges, not real logo files (see note below the
          grid for why), styled to read like a template client/partner strip */}

      <section className="section container">
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {PARTNERS.map((p) => (
            <StaggerItem key={p.name}>
              <div className="card-lift" style={{ background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 16, padding: 26, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ width: 64, height: 64, borderRadius: 12, background: "var(--paper-dim)", border: "1px solid rgba(17,36,17,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, padding: 8, overflow: "hidden" }}>
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  ) : (
                    <Handshake size={24} color="var(--canopy)" />
                  )}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: "var(--font-serif)", color: "var(--canopy-deep)", marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: "auto" }}>{p.copy}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </>
  );
}
