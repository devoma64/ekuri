import PageHeader from "../components/PageHeader";
import Reveal, { StaggerGroup, StaggerItem } from "../components/Reveal";
import Timeline from "../components/Timeline";
import { Quote, Award, Users } from "lucide-react";
import { HISTORY, VISION, MISSION, APPROACH, ORG, TIMELINE, FOUNDER_QUOTE, HISTORICAL_LEADERS } from "../data/content";

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
                src="/assets/img/archive/obudu-1999-opening-lodge.jpg"
                alt="Ekuri community and Pan-African delegates gathered at Obudu"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "4/3" }}
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

      {/* VISION / MISSION (BOTANICAL LIGHT GREEN THEME) */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #1d6e30 0%, #155424 50%, #0d3816 100%)",
          color: "#ffffff",
          padding: "88px 24px",
          overflow: "hidden",
        }}
      >
        {/* Ambient Radial Aura */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217, 154, 63, 0.15) 0%, rgba(29, 110, 48, 0) 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="vm-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
            <Reveal>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  borderRadius: 20,
                  padding: "clamp(28px, 4vw, 40px)",
                  height: "100%",
                  boxShadow: "0 14px 36px -10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--marigold)",
                    marginBottom: 14,
                  }}
                >
                  Our Vision
                </span>
                <p style={{ fontSize: 16.5, lineHeight: 1.75, margin: 0, color: "rgba(255, 255, 255, 0.95)", fontWeight: 400 }}>
                  {VISION}
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  borderRadius: 20,
                  padding: "clamp(28px, 4vw, 40px)",
                  height: "100%",
                  boxShadow: "0 14px 36px -10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--marigold)",
                    marginBottom: 14,
                  }}
                >
                  Our Mission
                </span>
                <p style={{ fontSize: 16.5, lineHeight: 1.75, margin: 0, color: "rgba(255, 255, 255, 0.95)", fontWeight: 400 }}>
                  {MISSION}
                </p>
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

      {/* APPROACH */}
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

      {/* HISTORICAL LEADERSHIP SPOTLIGHT */}
      <section style={{ background: "linear-gradient(180deg, var(--paper-dim) 0%, #ffffff 100%)", padding: "80px 24px" }}>
        <div className="container" style={{ maxWidth: 1020 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p className="eyebrow" style={{ color: "var(--marigold-deep)" }}>
                Ancestral Custodians
              </p>
              <h2 style={{ fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 700, fontFamily: "var(--font-serif)", color: "var(--canopy-deep)", marginTop: 8, marginBottom: 12 }}>
                Pioneering Traditional Leaders
              </h2>
              <p style={{ maxWidth: 660, margin: "0 auto", fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.65 }}>
                The traditional rulers whose unyielding refusal to surrender ancestral forests laid the groundwork for Nigeria's largest community-managed rainforest.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {HISTORICAL_LEADERS.map((leader, idx) => (
              <Reveal key={leader.name} delay={idx * 100}>
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(17, 36, 17, 0.12)",
                    borderRadius: 18,
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 8px 24px -6px rgba(11,50,11,0.08)",
                  }}
                >
                  <div style={{ position: "relative", height: 240, overflow: "hidden", background: "#0c1e0e" }}>
                    <img
                      src={leader.image}
                      alt={leader.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        padding: "3px 10px",
                        borderRadius: 999,
                        background: "rgba(3,14,5,0.8)",
                        color: "var(--marigold)",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {leader.era}
                    </div>
                  </div>
                  <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: "var(--canopy-deep)", margin: "0 0 4px" }}>
                      {leader.name}
                    </h3>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--marigold-deep)", textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 12px" }}>
                      {leader.village}
                    </p>
                    <p style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.65, margin: 0 }}>
                      {leader.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE OF FOREST DEFENSE */}
      <section style={{ background: "var(--paper-dim)", padding: "88px 24px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <Reveal>
            <p className="eyebrow">The forest didn't protect itself</p>
            <h2 style={{ fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 700, fontFamily: "var(--font-serif)", color: "var(--canopy-deep)", marginTop: 12, marginBottom: 12 }}>
              A history of defending this forest
            </h2>
            <p style={{ marginBottom: 44, fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.65 }}>
              This forest has been threatened more than once, and each time the Ekuri
              Community chose to defend it — sometimes at real personal cost. Sourced directly from verified archival records, court cases, and photographic logs.
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

