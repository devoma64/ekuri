import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Leaf, CloudSun, PawPrint, MapPinned, Wheat, Building2, Megaphone, Compass, GraduationCap } from "lucide-react";
import HeroVideo from "../components/HeroVideo";
import Reveal, { StaggerGroup, StaggerItem } from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { HISTORY, VISION, MISSION, PROGRAMS, COMMUNITIES, PARTNERS, ORG } from "../data/content";

const ICONS = { ShieldCheck, Leaf, CloudSun, PawPrint, MapPinned, Wheat, Building2, Megaphone, Compass, GraduationCap };

export default function Home() {
  return (
    <>
      <HeroVideo>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 20 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 18px",
                borderRadius: 999,
                background: "rgba(246,244,236,0.12)",
                border: "1px solid rgba(246,244,236,0.25)",
                backdropFilter: "blur(10px)",
                fontFamily: "var(--font-sans)",
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--marigold)",
              }}
            >
              🌿 Est. 1992 · Akamkpa, Cross River State
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 5.2vw, 62px)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "0.04em",
              color: "#ffffff",
              maxWidth: 960,
              textTransform: "uppercase",
              textShadow: "0 3px 24px rgba(0, 0, 0, 0.55)",
            }}
          >
            THE EKURI INITIATIVE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.65,
              maxWidth: 1100,
              marginTop: 22,
              color: "rgba(246,244,236,0.95)",
              fontWeight: 400,
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.45)",
            }}
          >
            Nigeria's Largest Community Rainforest, Protected by Its People. 33,600 hectares of pristine rainforest stewarded and defended across 14 Ekuri Clan communities at the buffer zone of Cross River National Park.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}
          >
            <Link
              to="/about"
              className="btn-lift"
              style={{
                padding: "15px 34px",
                background: "var(--marigold)",
                color: "var(--canopy-deep)",
                borderRadius: 999,
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 8px 24px -6px rgba(217,154,63,0.5)",
              }}
            >
              Learn Our Story <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </div>
      </HeroVideo>

      {/* ABOUT PREVIEW */}
      <section className="container" style={{ padding: "96px 24px 64px" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <h2 style={{ fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 600, marginTop: 12, marginBottom: 20 }}>
              Nigeria's largest community owned pristine rainforest
            </h2>
            <p style={{ whiteSpace: "pre-line" }}>{HISTORY.split("\n\n")[0]}</p>
            <p style={{ marginTop: 14 }}>
              This forest has been threatened before a secretly leased logging
              concession in 1989, six community leaders imprisoned rather than concede
              the forest in 1996, a proposed Superhighway route through the community
              forest in 2016. Each time, Ekuri Community chose to defend it.
            </p>
            <Link to="/about" style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, color: "var(--marigold-deep)", fontWeight: 700, fontSize: 14.5, textDecoration: "none" }}>
              Read the full history <ArrowUpRight size={15} />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div style={{ background: "var(--canopy)", borderRadius: 16, padding: 26, color: "#fff" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: "var(--marigold)" }}>33,600</div>
                <div style={{ fontSize: 13, marginTop: 6, color: "rgba(246,244,236,0.8)" }}>hectares of community-owned rainforest</div>
              </div>
              <div style={{ background: "var(--moss)", borderRadius: 16, padding: 26, color: "#fff" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700 }}>1992</div>
                <div style={{ fontSize: 13, marginTop: 6, color: "rgba(246,244,236,0.85)" }}>formally established, registered with the CAC in 1997</div>
              </div>
              <div style={{ background: "var(--paper-dim)", borderRadius: 16, padding: 26 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: "var(--canopy)" }}>14</div>
                <div style={{ fontSize: 13, marginTop: 6, color: "var(--ink-soft)" }}>Ekuri Clan communities involved</div>
              </div>
              <div style={{ background: "var(--marigold)", borderRadius: 16, padding: 26 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: "var(--canopy-deep)" }}>2004</div>
                <div style={{ fontSize: 13, marginTop: 6, color: "var(--canopy-deep)" }}>UNDP Equator Prize winner</div>
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`
          @media (min-width: 900px) {
            .about-grid { grid-template-columns: 1.1fr 0.9fr !important; }
          }
        `}</style>
      </section>

      {/* FEATURED PHOTO SPOTLIGHT */}
      <section className="container" style={{ padding: "0 24px 96px" }}>
        <Reveal>
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 20px 48px -12px rgba(11,50,11,0.16)",
              border: "1px solid var(--paper-dim)",
              background: "#122a16",
            }}
          >
            <img
              src="/assets/img/ekuri-forest-work.jpg"
              alt="Ekuri community members actively stewarding the pristine rainforest"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: 580,
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(11,36,15,0.9) 0%, rgba(11,36,15,0.4) 60%, transparent 100%)",
                padding: "36px 32px 24px",
                color: "#ffffff",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: "var(--marigold)",
                    color: "var(--canopy-deep)",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                  }}
                >
                  On The Ground
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(15px, 1.8vw, 18px)",
                    fontWeight: 500,
                    color: "rgba(246,244,236,0.95)",
                    maxWidth: 700,
                  }}
                >
                  Ekuri villagers actively clearing boundary paths, maintaining conservation corridors, and protecting their 33,600-hectare ancestral forest.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* VISION / MISSION */}
      <section style={{ background: "var(--canopy)", color: "#fff", padding: "88px 24px" }}>
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

      {/* PROGRAMS PREVIEW */}
      <section className="container" style={{ padding: "96px 24px" }}>
        <SectionTitle eyebrow="What we do" title="Programs & Activities" copy="Community-led conservation across ten interconnected areas of work." />
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
          {PROGRAMS.slice(0, 6).map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <StaggerItem key={p.title}>
                <div className="card-lift" style={{ background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 16, padding: 26, height: "100%" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={21} color="var(--canopy)" />
                  </div>
                  <h3 style={{ fontSize: 16.5, fontWeight: 600, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 13.5 }}>{p.copy}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/programs" style={{ fontSize: 14.5, fontWeight: 700, color: "var(--marigold-deep)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            View all programs <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* WHERE WE WORK PREVIEW */}
      <section style={{ background: "var(--paper-dim)", padding: "88px 24px" }}>
        <div className="container">
          <div className="www-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }}>
            <Reveal>
              <p className="eyebrow">Where we work</p>
              <h2 style={{ fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 600, marginTop: 12, marginBottom: 16 }}>
                Fourteen communities of the Ekuri Clan
              </h2>
              <p style={{ marginBottom: 20 }}>
                We operate across the Ekuri Clan forest communities of Akamkpa Local Government Area all contiguous to Cross River National Park.
              </p>
              <Link to="/where-we-work" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--marigold-deep)", fontWeight: 700, fontSize: 14.5, textDecoration: "none" }}>
                See the full map <ArrowUpRight size={15} />
              </Link>
            </Reveal>
            <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {COMMUNITIES.map((c) => (
                <StaggerItem key={c}>
                  <span style={{ display: "inline-block", padding: "9px 16px", background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 999, fontSize: 13, fontWeight: 600, color: "var(--canopy)" }}>
                    {c}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
        <style>{`
          @media (min-width: 900px) {
            .www-grid { grid-template-columns: 0.9fr 1.1fr !important; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section className="container" style={{ padding: "96px 24px" }}>
        <Reveal>
          <div style={{
            background: "var(--marigold)", borderRadius: 24, padding: "52px 40px",
            display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24,
          }}>
            <h2 style={{ fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 600, color: "var(--canopy-deep)", maxWidth: 600, margin: 0 }}>
              A rainforest this size doesn't protect itself. Neither did this one the Ekuri people did.
            </h2>
            <Link to="/donate" className="btn-lift" style={{
              padding: "15px 32px", background: "var(--canopy-deep)", color: "#fff", borderRadius: 999,
              fontWeight: 700, fontSize: 15, textDecoration: "none", whiteSpace: "nowrap",
            }}>
              Support the Forest
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
