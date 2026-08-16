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
      <section style={{ padding: "0 24px 40px" }}>
        <div className="container">
          <StaggerGroup style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 18,
          }}>
            {PARTNERS.map((p) => (
              <StaggerItem key={p.name}>
                <div style={{
                  background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 14,
                  height: 96, display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "0 18px", textAlign: "center",
                }}>
                  <span style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 15, color: "var(--canopy)", lineHeight: 1.3 }}>
                    {p.name}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <p style={{ fontSize: 12, color: "var(--ink-soft)", textAlign: "center", marginTop: 20, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            These are shown as wordmarks rather than real logo files — pulling logo
            images from the web risks using an outdated mark or violating a partner's
            brand guidelines without checking with them first. Drop official logo files
            into <code>public/assets/img/partners/</code> and swap them in here once
            you have them directly from each organization.
          </p>
        </div>
      </section>

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
