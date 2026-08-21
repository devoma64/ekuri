import { Heart, TreePine, Users, ShieldCheck } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Reveal, { StaggerGroup, StaggerItem } from "../components/Reveal";
import { ORG } from "../data/content";

const WAYS = [
  { icon: TreePine, title: "Fund forest protection", copy: "Support Community Ranger patrols and annual boundary maintenance across 33,600 hectares." },
  { icon: Users, title: "Back community livelihoods", copy: "Help fund sustainable-livelihood programs that ease pressure on high-value forest products." },
  { icon: ShieldCheck, title: "Strengthen advocacy", copy: "Support the conservation education and advocacy work that has defended this forest before." },
];

export default function Donate() {
  return (
    <>
      <PageHeader
        title="Support the Forest"
        copy="Every gift helps the Ekuri Initiative keep 33,600 hectares of pristine rainforest standing — for the communities who call it home, and for the planet."
        crumb="Donate"
        bgImage="/assets/img/hero-bg.jpg"
      />

      <section className="section container">
        {/* <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 22, marginBottom: 56 }}>
          {WAYS.map((w) => (
            <StaggerItem key={w.title}>
              <div className="card-lift" style={{ background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 16, padding: 26, height: "100%" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <w.icon size={21} color="var(--canopy)" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{w.title}</h3>
                <p style={{ fontSize: 13.5 }}>{w.copy}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup> */}

        <Reveal>
          <div style={{ background: "var(--canopy)", borderRadius: 24, padding: "48px 36px", textAlign: "center", color: "#fff" }}>
            <Heart size={30} color="var(--marigold)" style={{ margin: "0 auto 16px" }} />
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, marginBottom: 14 }}>
              Online giving is coming soon
            </h2>
            <p style={{ maxWidth: 520, margin: "0 auto 24px", color: "rgba(246,244,236,0.85)" }}>
              We're setting up a secure donation processor. In the meantime, reach out directly and
              we'll walk you through how to give — including bank transfer and partnership funding.
            </p>
            <a
              href={`mailto:${ORG.email}?subject=Supporting the Ekuri Initiative`}
              className="btn-lift"
              style={{ display: "inline-flex", padding: "15px 32px", background: "var(--marigold)", color: "var(--canopy-deep)", borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none" }}
            >
              Email us to give
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
