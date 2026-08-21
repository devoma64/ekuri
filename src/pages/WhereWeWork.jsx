import { MapPin } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Reveal, { StaggerGroup, StaggerItem } from "../components/Reveal";
import { COMMUNITIES, WHERE_WE_WORK } from "../data/content";

export default function WhereWeWork() {
  return (
    <>
      <PageHeader
        title="Where We Work"
        copy="The Ekuri Clan forest communities of Akamkpa Local Government Area, Cross River State."
        crumb="Where We Work"
        bgImage="/assets/img/ekuri-forest-work.jpg"
      />

      <section className="container" style={{ padding: "48px 24px 0" }}>
        <Reveal>
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--paper-dim)", boxShadow: "0 12px 32px -8px rgba(11,50,11,0.12)" }}>
            <img
              src="/assets/img/ekuri-forest-work.jpg"
              alt="Ekuri community members actively stewarding and working in the community rainforest"
              style={{ width: "100%", maxHeight: 560, objectFit: "cover", display: "block" }}
            />
          </div>
          <p style={{ fontSize: 12.5, marginTop: 10, color: "var(--ink-soft)", textAlign: "center" }}>
            Ekuri community members actively stewarding, maintaining trails, and safeguarding the 33,600-hectare rainforest.
          </p>
        </Reveal>
      </section>

      <section className="section container">
        <Reveal>
          <p>{WHERE_WE_WORK}</p>
        </Reveal>
      </section>

      <section style={{ background: "var(--paper-dim)", padding: "80px 24px" }}>
        <div className="container">
          <div className="communities-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 44, alignItems: "center" }}>
                <Reveal delay={100}>
              <p className="eyebrow">The Ekuri Clan</p>
              <h2 style={{ fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 600, marginTop: 12, marginBottom: 20 }}>
                Fourteen communities, one forest
              </h2>
              <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {COMMUNITIES.map((c) => (
                  <StaggerItem key={c}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 999, fontSize: 13, fontWeight: 600, color: "var(--canopy)" }}>
                      <MapPin size={13} /> {c}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Reveal>
            <Reveal>
              <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid #fff", boxShadow: "0 20px 50px -30px rgba(11,50,11,0.35)" }}>
                <img
                  src="/assets/img/ekuri-perimeter-survey.jpg"
                  alt="Map of the Ekuri Clan community forest boundary"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </Reveal>
        
          </div>
        </div>
        <style>{`
          @media (min-width: 900px) {
            .communities-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
