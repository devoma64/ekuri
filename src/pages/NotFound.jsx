import { Link } from "react-router-dom";
import { Compass, Home, BookOpen, Layers, Image as ImageIcon, Mail, Heart } from "lucide-react";
import Reveal from "../components/Reveal";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 100px",
        background: "var(--paper)",
      }}
    >
      <div className="container" style={{ maxWidth: 680, textAlign: "center" }}>
        <Reveal>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(217, 154, 63, 0.14)",
              color: "var(--marigold-deep)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <Compass size={36} />
          </div>

          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--marigold-deep)",
              display: "block",
              marginBottom: 10,
            }}
          >
            404 · Page Not Found
          </span>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: "var(--canopy-deep)",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Looking for a Path in the Forest?
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 17px)",
              color: "var(--ink-soft)",
              lineHeight: 1.65,
              maxWidth: 520,
              margin: "0 auto 36px",
            }}
          >
            The page you are trying to reach might have been relocated, renamed, or does not exist. Explore these main sections instead:
          </p>

          {/* Quick Links Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 14,
              marginBottom: 36,
              textAlign: "left",
            }}
          >
            <Link
              to="/"
              className="card-lift"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background: "#ffffff",
                borderRadius: 12,
                border: "1px solid var(--paper-dim)",
                textDecoration: "none",
                color: "var(--canopy-deep)",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <Home size={18} color="var(--canopy)" />
              <span>Home Page</span>
            </Link>

            <Link
              to="/about"
              className="card-lift"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background: "#ffffff",
                borderRadius: 12,
                border: "1px solid var(--paper-dim)",
                textDecoration: "none",
                color: "var(--canopy-deep)",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <Compass size={18} color="var(--canopy)" />
              <span>About Us</span>
            </Link>

            <Link
              to="/programs"
              className="card-lift"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background: "#ffffff",
                borderRadius: 12,
                border: "1px solid var(--paper-dim)",
                textDecoration: "none",
                color: "var(--canopy-deep)",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <Layers size={18} color="var(--canopy)" />
              <span>Programs</span>
            </Link>

            <Link
              to="/blog"
              className="card-lift"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background: "#ffffff",
                borderRadius: 12,
                border: "1px solid var(--paper-dim)",
                textDecoration: "none",
                color: "var(--canopy-deep)",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <BookOpen size={18} color="var(--canopy)" />
              <span>Blog & News</span>
            </Link>

            <Link
              to="/gallery"
              className="card-lift"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background: "#ffffff",
                borderRadius: 12,
                border: "1px solid var(--paper-dim)",
                textDecoration: "none",
                color: "var(--canopy-deep)",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <ImageIcon size={18} color="var(--canopy)" />
              <span>Photo Gallery</span>
            </Link>

            <Link
              to="/contact"
              className="card-lift"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background: "#ffffff",
                borderRadius: 12,
                border: "1px solid var(--paper-dim)",
                textDecoration: "none",
                color: "var(--canopy-deep)",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <Mail size={18} color="var(--canopy)" />
              <span>Contact Us</span>
            </Link>
          </div>

          <Link
            to="/"
            className="btn-lift"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              background: "var(--canopy)",
              color: "#ffffff",
              borderRadius: 999,
              fontSize: 14.5,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(22, 104, 22, 0.3)",
            }}
          >
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
