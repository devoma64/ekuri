import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Menu, X, MapPin, Heart } from "lucide-react";
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
      <div style={{ background: "var(--paper)", boxShadow: scrolled ? "0 6px 24px -18px rgba(11,50,11,0.4)" : "none", transition: "box-shadow .3s ease" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px" }}>
          <Link to="/" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/assets/img/ekuri-logo.png" alt="The Ekuri Initiative logo" style={{ height: 48, width: 48, objectFit: "contain" }} />
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
              style={{
                display: "none",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                background: "linear-gradient(135deg, #1f7a36 0%, #155e27 100%)",
                color: "#ffffff",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(31, 122, 54, 0.32)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              {/* <Heart size={14} fill="currentColor" /> */}
              <span>Donate</span>
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "14px 20px",
                    background: "linear-gradient(135deg, #1f7a36 0%, #155e27 100%)",
                    color: "#ffffff",
                    borderRadius: 999,
                    fontSize: 14.5,
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 4px 14px rgba(31, 122, 54, 0.32)",
                  }}
                >
                  <Heart size={15} fill="currentColor" />
                  <span>Donate</span>
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
