import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export default function PageHeader({ title, copy, crumb }) {
  return (
    <div style={{ background: "var(--paper-dim)", padding: "52px 24px" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <Reveal>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600 }}>{title}</h1>
          {copy && <p style={{ maxWidth: 680, margin: "14px auto 0", color: "var(--ink-soft)" }}>{copy}</p>}
          <div style={{ marginTop: 16, fontSize: 13, color: "var(--ink-soft)" }}>
            <Link to="/" style={{ color: "var(--marigold-deep)", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span>{crumb}</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
