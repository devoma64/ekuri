import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Menu, X, MapPin } from "lucide-react";
import { NAV_LINKS, ORG, CONTACT } from "../data/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60 }}>
      <div
        style={{
          background: "var(--canopy-deep)", color: "rgba(246,244,236,0.85)", fontSize: 12.5, padding: "7px 0",
          display: scrolled ? "none" : "block",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
            <a href={`mailto:${ORG.email}`} style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "inherit" }}>
              <Mail size={12.5} /> {ORG.email}
            </a>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={12.5} /> Akamkpa LGA, Cross River State, Nigeria
            </span>
          </div>
        </div>
      </div>

      <div style={{ background: "var(--paper)", boxShadow: scrolled ? "0 6px 24px -18px rgba(12,31,23,0.5)" : "none", transition: "box-shadow .3s ease" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px" }}>
          <Link to="/" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/assets/img/ekuri-logo.png" alt="The Ekuri Initiative logo" style={{ height: 48, width: 48, objectFit: "contain" }} />
            {/* <span style={{ fontFamily: "Fraunces, serif", fontSize: 17.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.2, maxWidth: 150 }}>
              Ekuri Initiative
            </span> */}
          </Link>

          <nav className="desktop-nav" style={{ display: "none", gap: 20, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  fontSize: 13.5, fontWeight: 500, textDecoration: "none",
                  color: location.pathname === l.to ? "var(--marigold-deep)" : "var(--ink)",
                  borderBottom: location.pathname === l.to ? "2px solid var(--marigold)" : "2px solid transparent",
                  paddingBottom: 4,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              to="/donate"
              className="donate-desktop btn-lift"
              style={{ display: "none", padding: "10px 20px", background: "var(--marigold)", color: "var(--canopy-deep)", borderRadius: 999, fontSize: 13.5, fontWeight: 700, textDecoration: "none" }}
            >
              Donate
            </Link>
            <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="menu-btn" style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden", borderTop: "1px solid var(--paper-dim)" }}
            >
              <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 15 }}>
                {NAV_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} onClick={closeMenu} style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}>
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/donate"
                  onClick={closeMenu}
                  style={{ padding: "12px 20px", background: "var(--marigold)", color: "var(--canopy-deep)", borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: "none", textAlign: "center" }}
                >
                  Donate
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (min-width: 1080px) {
          .desktop-nav { display: flex !important; }
          .donate-desktop { display: inline-flex !important; }
          .menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
