import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { NAV_LINKS, ORG, CONTACT } from "../data/content";

export default function Footer() {
  return (
    <footer style={{ background: "var(--canopy-deep)", color: "rgba(246,244,236,0.75)", padding: "60px 24px 28px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src="/assets/img/ekuri-logo.png" alt="" style={{ height: 40, width: 40, objectFit: "contain" }} />
              <h3 style={{ color: "#fff", fontSize: 16.5, fontWeight: 600, margin: 0, lineHeight: 1.25 }}>The Ekuri Initiative</h3>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, maxWidth: 260 }}>
              A community-based conservation organization protecting Nigeria's largest communally owned pristine rainforest.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 13.5 }}>
              {NAV_LINKS.map((l) => (
                <Link key={l.to} to={l.to} style={{ color: "inherit", textDecoration: "none" }}>{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13.5 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <MapPin size={15} style={{ marginTop: 2, flexShrink: 0 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6, lineHeight: 1.5 }}>
                  <div><span style={{ color: "#fff", fontWeight: 600 }}>Field:</span> {CONTACT.field}</div>
                  <div><span style={{ color: "#fff", fontWeight: 600 }}>Calabar:</span> {CONTACT.calabar}</div>
                </div>
              </div>
              <a href={`mailto:${ORG.email}`} style={{ display: "flex", gap: 10, alignItems: "center", color: "inherit", textDecoration: "none" }}>
                <Mail size={15} /> {ORG.email}
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(246,244,236,0.12)", marginTop: 44, paddingTop: 22, fontSize: 12, textAlign: "center" }}>
          © {new Date().getFullYear()} The Ekuri Initiative. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
