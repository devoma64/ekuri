import { Handshake } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { StaggerGroup, StaggerItem } from "../components/Reveal";
import { PARTNERS } from "../data/content";

export default function Partners() {
  return (
    <>
      <PageHeader title="Partners" copy="Organizations who have worked alongside the Ekuri Initiative to protect this forest." crumb="Partners" />

      {/* Logo strip — wordmark badges, not real logo files (see note below the
          grid for why), styled to read like a template client/partner strip */}

      <section className="section container">
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {PARTNERS.map((p) => (
            <StaggerItem key={p.name}>
              <div className="card-lift" style={{ background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 16, padding: 26, height: "100%" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Handshake size={19} color="var(--canopy)" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontSize: 13.5 }}>{p.copy}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </>
  );
}
