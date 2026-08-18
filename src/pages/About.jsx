import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Timeline from "../components/Timeline";
import { Quote } from "lucide-react";
import { HISTORY, VISION, MISSION, APPROACH, ORG, TIMELINE, FOUNDER_QUOTE } from "../data/content";

export default function About() {
  return (
    <>
      <PageHeader title="About Us" copy={ORG.registered} crumb="About" />

      <section className="section container">
        <div className="about-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
          <Reveal>
            <p className="eyebrow">Brief history</p>
            <div style={{ marginTop: 14 }}>
              {HISTORY.split("\n\n").map((p, i) => (
                <p key={i} style={{ marginBottom: 16 }}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 32px -8px rgba(11,50,11,0.15)", border: "1px solid var(--paper-dim)" }}>
              <img
                src="/assets/img/wild-life.jpeg"
                alt="Wildlife in the Ekuri Community pristine rainforest"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "4/5" }}
              />
            </div>
          </Reveal>
        </div>
        <style>{`
          @media (min-width: 900px) {
            .about-hero-grid { grid-template-columns: 1.15fr 0.85fr !important; }
          }
        `}</style>
      </section>


      <section style={{ background: "var(--canopy)", color: "#fff", padding: "80px 24px" }}>
        <div className="container">
          <div className="vm-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
            <Reveal>
              <div style={{ background: "rgba(246,244,236,0.06)", border: "1px solid rgba(246,244,236,0.14)", borderRadius: 18, padding: 32, height: "100%" }}>
                <p className="eyebrow" style={{ color: "var(--marigold)" }}>Vision</p>
                <p style={{ fontSize: 16.5, lineHeight: 1.7, marginTop: 14, color: "rgba(246,244,236,0.9)" }}>{VISION}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ background: "rgba(246,244,236,0.06)", border: "1px solid rgba(246,244,236,0.14)", borderRadius: 18, padding: 32, height: "100%" }}>
                <p className="eyebrow" style={{ color: "var(--marigold)" }}>Mission</p>
                <p style={{ fontSize: 16.5, lineHeight: 1.7, marginTop: 14, color: "rgba(246,244,236,0.9)" }}>{MISSION}</p>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`
          @media (min-width: 800px) {
            .vm-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </section>

      <section className="section container" style={{ maxWidth: 820 }}>
        <Reveal>
          <p className="eyebrow">Our approach</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600, marginTop: 12, marginBottom: 20 }}>
            Community-Based Conservation
          </h2>
          {APPROACH.split("\n\n").map((p, i) => (
            <p key={i} style={{ marginBottom: 16 }}>{p}</p>
          ))}
        </Reveal>
      </section>

      <section style={{ background: "var(--paper-dim)", padding: "80px 24px" }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <Reveal>
            <p className="eyebrow">The forest didn't protect itself</p>
            <h2 style={{ fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 600, marginTop: 12, marginBottom: 12 }}>
              A history of defending this forest
            </h2>
            <p style={{ marginBottom: 44 }}>
              This forest has been threatened more than once, and each time the Ekuri
              Community chose to defend it — sometimes at real personal cost. This is
              that record, sourced directly from the documentation of those events.
            </p>
          </Reveal>
          <Timeline items={TIMELINE} />
        </div>
      </section>

      <section className="section container" style={{ maxWidth: 720 }}>
        <Reveal>
          <div style={{ background: "var(--canopy)", borderRadius: 20, padding: "40px 36px", color: "#fff" }}>
            <Quote size={26} color="var(--marigold)" style={{ marginBottom: 16 }} />
            <p style={{ fontSize: 17, lineHeight: 1.7, fontStyle: "italic", color: "rgba(246,244,236,0.92)" }}>
              "{FOUNDER_QUOTE.quote}"
            </p>
            <p style={{ marginTop: 20, fontSize: 14, fontWeight: 600, color: "var(--marigold)" }}>
              {FOUNDER_QUOTE.name}, {FOUNDER_QUOTE.role}
            </p>
            <p style={{ fontSize: 12, color: "rgba(246,244,236,0.6)", marginTop: 2 }}>Source: {FOUNDER_QUOTE.source}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
