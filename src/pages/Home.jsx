import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Leaf, CloudSun, PawPrint, MapPinned, Wheat, Building2, Megaphone, Compass, GraduationCap, Handshake, Camera } from "lucide-react";
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
            {/* <span
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
            </span> */}
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
            A community-based conservation organization protecting Nigeria's largest communally owned pristine rainforest, located at the buffer zone of Cross River National Park.
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
                padding: "16px 36px",
                background: "linear-gradient(135deg, #1f7a36 0%, #155e27 100%)",
                color: "#ffffff",
                borderRadius: 999,
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 15.5,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 8px 24px -4px rgba(31, 122, 54, 0.45)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <span>Learn Our Story</span>
              <ArrowUpRight size={18} />
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
              src="/assets/img/archive/road-bridge-1990s-04.jpg"
              alt="Ekuri community members actively stewarding the pristine rainforest and building communal infrastructure"
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

      {/* VISION / MISSION (BOTANICAL LIGHT GREEN THEME) */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #1d6e30 0%, #155424 50%, #0d3816 100%)",
          color: "#ffffff",
          padding: "96px 24px",
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

      {/* PROGRAMS PREVIEW */}
      <section className="container" style={{ padding: "96px 24px" }}>
        <SectionTitle eyebrow="What we do" title="Programs & Activities" copy="Community-led conservation across ten interconnected areas of work." />
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
          {PROGRAMS.slice(0, 6).map((p) => {
            const Icon = ICONS[p.icon] || Leaf;
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

      {/* WHERE WE WORK (EDITORIAL TERRITORY & REGISTRY) */}
      <section
        style={{
          background: "var(--paper-dim)",
          padding: "96px 24px 104px",
          borderTop: "1px solid rgba(17, 36, 17, 0.08)",
        }}
      >
        <div className="container">
          {/* Magazine Split Header */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              marginBottom: 48,
              paddingBottom: 20,
              borderBottom: "1px solid rgba(17, 36, 17, 0.12)",
            }}
          >
            <Reveal>
              <p className="eyebrow" style={{ color: "var(--marigold-deep)", marginBottom: 8 }}>
                Where we work
              </p>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.4vw, 36px)",
                  fontWeight: 700,
                  fontFamily: "var(--font-serif)",
                  color: "var(--canopy-deep)",
                  margin: "0 0 8px",
                  letterSpacing: "-0.015em",
                }}
              >
                Fourteen communities of the Ekuri Clan
              </h2>
              <p style={{ margin: 0, fontSize: 14.5, color: "var(--ink-soft)", maxWidth: 580 }}>
                We operate across the Ekuri Clan forest communities of Akamkpa Local Government Area all contiguous to Cross River National Park.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Link
                to="/where-we-work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--canopy)",
                  textDecoration: "none",
                  padding: "10px 20px",
                  border: "1.5px solid var(--canopy)",
                  borderRadius: 999,
                  transition: "all .2s ease",
                }}
              >
                <span>Explore Full Territory & Map</span>
                <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>

          {/* 2-Column Sharp Architecture: Map Showcase + 14 Communities Registry */}
          <div
            className="home-www-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 36,
              alignItems: "stretch",
            }}
          >
            {/* Left: Territory Visual & Metric Facts */}
            <Reveal>
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(17, 36, 17, 0.12)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden",
                }}
              >
                {/* Map Image Frame */}
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10", background: "#0c1e0e" }}>
                  <img
                    src="/assets/img/superhighway-map.jpg"
                    alt="Ekuri Community Forest Territory Map"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      padding: "4px 12px",
                      background: "rgba(3, 14, 5, 0.8)",
                      backdropFilter: "blur(6px)",
                      color: "var(--marigold)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    33,600 Hectares Under Community Title
                  </div>
                </div>

                {/* Key Geographic Metrics */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    borderTop: "1px solid rgba(17, 36, 17, 0.1)",
                    background: "var(--paper)",
                  }}
                >
                  <div style={{ padding: "18px 16px", borderRight: "1px solid rgba(17, 36, 17, 0.1)" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-serif)", color: "var(--canopy-deep)" }}>
                      14
                    </div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>
                      Clan Communities
                    </div>
                  </div>
                  <div style={{ padding: "18px 16px", borderRight: "1px solid rgba(17, 36, 17, 0.1)" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-serif)", color: "var(--canopy-deep)" }}>
                      Akamkpa
                    </div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>
                      Local Govt Area
                    </div>
                  </div>
                  <div style={{ padding: "18px 16px" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-serif)", color: "var(--canopy-deep)" }}>
                      CRNP
                    </div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>
                      Contiguous Buffer
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: The 14 Communities Registry Grid */}
            <Reveal delay={100}>
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(17, 36, 17, 0.12)",
                  padding: "24px 28px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--marigold-deep)",
                    marginBottom: 16,
                    paddingBottom: 12,
                    borderBottom: "1px solid rgba(17, 36, 17, 0.08)",
                  }}
                >
                  Ekuri Clan Communities Registry
                </div>

                <div
                  className="communities-editorial-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: 24,
                    rowGap: 10,
                  }}
                >
                  {COMMUNITIES.map((name, idx) => (
                    <div
                      key={name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 12px",
                        borderBottom: "1px solid rgba(17, 36, 17, 0.06)",
                        transition: "background .15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--marigold-deep)",
                          }}
                        >
                          {String(idx + 1).padStart(2, "0")}.
                        </span>
                        <span
                          style={{
                            fontSize: 14.5,
                            fontWeight: 700,
                            color: "var(--canopy-deep)",
                            fontFamily: "var(--font-serif)",
                          }}
                        >
                          {name}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: 11,
                          color: "var(--ink-soft)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Clan
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (min-width: 920px) {
            .home-www-layout {
              grid-template-columns: 1fr 1.15fr !important;
            }
          }
          .communities-editorial-grid > div:hover {
            background: rgba(11, 50, 11, 0.03);
          }
        `}</style>
      </section>

      {/* EDITORIAL GALLERY SECTION (MUSEUM / ARCHIVE LAYOUT) */}
      <section
        style={{
          background: "var(--paper)",
          padding: "96px 24px 104px",
          borderTop: "1px solid var(--paper-dim)",
        }}
      >
        <div className="container">
          {/* Magazine Split Header */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              marginBottom: 48,
              paddingBottom: 20,
              borderBottom: "1px solid rgba(17, 36, 17, 0.1)",
            }}
          >
            <Reveal>
              <p className="eyebrow" style={{ color: "var(--marigold-deep)", marginBottom: 8 }}>
                Our Gallery
              </p>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.4vw, 36px)",
                  fontWeight: 700,
                  fontFamily: "var(--font-serif)",
                  color: "var(--canopy-deep)",
                  margin: "0 0 8px",
                  letterSpacing: "-0.015em",
                }}
              >
                Life, Forest & Stewardship
              </h2>
              <p style={{ margin: 0, fontSize: 14.5, color: "var(--ink-soft)", maxWidth: 560 }}>
                A glimpse into community-led conservation, biodiversity, and daily life across the 33,600 hectares of Ekuri.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Link
                to="/gallery"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--canopy)",
                  textDecoration: "none",
                  padding: "10px 20px",
                  border: "1.5px solid var(--canopy)",
                  borderRadius: 999,
                  transition: "all .2s ease",
                }}
              >
                <span>View Full Gallery</span>
                <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>

          {/* Clean 4-Column Flat Photo Exhibition Grid */}
          <div
            className="home-editorial-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            {[
              {
                num: "01",
                category: "HISTORICAL ARCHIVE · 1999",
                title: "Pan-African Community Forestry Assembly",
                location: "Obudu Cattle Ranch & Old Ekuri",
                src: "/assets/img/archive/obudu-1999-opening-lodge.jpg",
              },
              {
                num: "02",
                category: "SELF-RELIANCE · 1990s",
                title: "Communal Road & River Timber Bridge",
                location: "Ekuri Rainforest Corridor",
                src: "/assets/img/archive/road-bridge-1990s-04.jpg",
              },
              {
                num: "03",
                category: "DIPLOMACY · 2017",
                title: "US Embassy Delegation & Traditional Chiefs",
                location: "Old and New Ekuri Communities",
                src: "/assets/img/archive/us-embassy-2017-09.jpg",
              },
              {
                num: "04",
                category: "PRIMARY CANOPY",
                title: "33,600 Hectares of Pristine Rainforest",
                location: "Central Forest Reserve & Buffer Corridor",
                src: "/assets/img/hero-bg.jpg",
              },
            ].map((photo, idx) => (
              <Reveal key={photo.title} delay={idx * 70}>
                <Link
                  to="/gallery"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    color: "inherit",
                    group: "true",
                  }}
                >
                  {/* Photo Frame (Sharp, Unrounded, Architectural) */}
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      aspectRatio: "16/11",
                      background: "#0c1e0e",
                      border: "1px solid rgba(17, 36, 17, 0.12)",
                      marginBottom: 16,
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform .5s ease, filter .3s ease",
                      }}
                    />

                    {/* Subtle Index Pill */}
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        padding: "3px 10px",
                        background: "rgba(3, 14, 5, 0.75)",
                        backdropFilter: "blur(6px)",
                        color: "var(--marigold)",
                        fontSize: 10.5,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {photo.num} · {photo.category}
                    </div>
                  </div>

                  {/* Caption Beneath Photo */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "var(--canopy-deep)",
                        margin: "0 0 4px",
                        lineHeight: 1.35,
                      }}
                    >
                      {photo.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                      {photo.location}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          .home-editorial-grid a:hover img {
            transform: scale(1.05);
          }
          .home-editorial-grid a:hover h3 {
            color: var(--marigold-deep) !important;
          }
        `}</style>
      </section>

      {/* PARTNERS DEDICATED FULL SECTION */}
      <section
        style={{
          padding: "96px 0 104px",
          background: "linear-gradient(180deg, #ffffff 0%, var(--paper) 100%)",
          borderTop: "1px solid var(--paper-dim)",
          borderBottom: "1px solid var(--paper-dim)",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ marginBottom: 52, textAlign: "center" }}>
          <Reveal>
            <p className="eyebrow" style={{ color: "var(--marigold-deep)" }}>
              Institutional Alliances
            </p>
            <h2
              style={{
                fontSize: "clamp(26px, 3.4vw, 36px)",
                fontWeight: 700,
                fontFamily: "var(--font-serif)",
                color: "var(--canopy-deep)",
                marginTop: 12,
                marginBottom: 14,
              }}
            >
              Our Conservation & Governance Partners
            </h2>
            <p
              style={{
                maxWidth: 640,
                margin: "0 auto",
                fontSize: "clamp(14.5px, 1.6vw, 16px)",
                color: "var(--ink-soft)",
                lineHeight: 1.65,
              }}
            >
              Collaborating with international foundations, ecological scientists, and statutory agencies to safeguard West Africa's flagship community rainforest.
            </p>
          </Reveal>
        </div>

        {/* Marquee Track Container with luxury edge fades */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            padding: "16px 0",
            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div className="partner-marquee-track" style={{ display: "flex", gap: 28, width: "max-content" }}>
            {[...PARTNERS, ...PARTNERS].map((p, idx) => (
              <div
                key={`${p.name}-${idx}`}
                className="card-lift"
                title={p.name}
                aria-label={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 230,
                  height: 115,
                  padding: "18px 28px",
                  background: "#ffffff",
                  border: "1.5px solid var(--paper-dim)",
                  borderRadius: 20,
                  flexShrink: 0,
                  boxShadow: "0 10px 30px -6px rgba(11,50,11,0.08)",
                  transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                  cursor: "pointer",
                }}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    filter: "grayscale(15%) contrast(105%)",
                    transition: "filter .25s ease, transform .25s ease",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link
            to="/partners"
            style={{
              fontSize: 14.5,
              fontWeight: 700,
              color: "var(--marigold-deep)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            View partner roles & history <ArrowUpRight size={15} />
          </Link>
        </div>

        <style>{`
          @keyframes partnerScrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .partner-marquee-track {
            animation: partnerScrollLeft 28s linear infinite;
          }
          .partner-marquee-track:hover {
            animation-play-state: paused;
          }
          .card-lift:hover img {
            filter: grayscale(0%) contrast(110%) !important;
            transform: scale(1.05);
          }
        `}</style>
      </section>

      {/* CTA */}
      <section className="container" style={{ padding: "96px 24px" }}>
        <Reveal>
          <div
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #1d6e30 0%, #155424 50%, #0d3816 100%)",
              borderRadius: 24,
              padding: "clamp(40px, 5vw, 60px) clamp(32px, 4vw, 56px)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              boxShadow: "0 24px 60px -12px rgba(11, 50, 11, 0.28)",
              overflow: "hidden",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            {/* Ambient Background Aura */}
            <div
              style={{
                position: "absolute",
                top: "-40%",
                right: "-20%",
                width: "600px",
                height: "600px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(217, 154, 63, 0.18) 0%, rgba(29, 110, 48, 0) 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Left Column: Heading & Subtitle */}
            <div style={{ maxWidth: 640, position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 14px",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "var(--marigold)",
                  fontSize: 11.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                }}
              >
                {/* <span>🌿 Community-Led Rainforest Stewardship</span> */}
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(24px, 3.2vw, 36px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.3,
                  margin: "0 0 14px",
                  letterSpacing: "-0.015em",
                }}
              >
                A rainforest this size doesn’t protect itself. Neither did this one the Ekuri people did.
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(14px, 1.6vw, 15.5px)",
                  color: "rgba(255, 255, 255, 0.88)",
                  lineHeight: 1.65,
                }}
              >
                Every contribution directly powers 33,600 hectares of community boundary defense, legal advocacy, and sustainable indigenous livelihoods.
              </p>
            </div>

            {/* Right Column: High-Contrast CTA Action */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <Link
                to="/donate"
                className="btn-lift"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 36px",
                  background: "var(--marigold)",
                  color: "white",
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 15.5,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "0 10px 28px rgba(0, 0, 0, 0.25)",
                }}
              >
                <span>Support the Forest</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
