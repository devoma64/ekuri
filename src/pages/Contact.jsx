import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, CheckCircle2, Facebook, Linkedin } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { ORG, CONTACT } from "../data/content";

const inputStyle = {
  width: "100%", padding: "13px 16px", borderRadius: 8, border: "1px solid var(--paper-dim)",
  background: "#fff", fontSize: 14.5, fontFamily: "inherit", color: "var(--ink)", outline: "none",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Front-end demo only — wire to a real backend (Formspree, mailto service,
    // or your own endpoint) before this goes live.
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <PageHeader title="Contact Us" copy="Questions, partnerships, press, or research inquiries — we read every message." crumb="Contact" />
      <section className="section container">
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={18} color="var(--canopy)" />
                </div>
                <div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 600 }}>Location</h3>
                  <p style={{ margin: "3px 0 0", fontSize: 13.5 }}>{CONTACT.location}</p>
                </div>
              </div>
              <a href={`mailto:${ORG.email}`} style={{ display: "flex", gap: 14, alignItems: "flex-start", textDecoration: "none", color: "inherit" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Mail size={18} color="var(--canopy)" />
                </div>
                <div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 600 }}>Email</h3>
                  <p style={{ margin: "3px 0 0", fontSize: 13.5 }}>{ORG.email}</p>
                </div>
              </a>
              <div>
                <h3 style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 10 }}>Social</h3>
                <div style={{ display: "flex", gap: 10 }}>
                  <a href="#" aria-label="Facebook" style={{ width: 38, height: 38, borderRadius: 10, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--canopy)" }}>
                    <Facebook size={17} />
                  </a>
                  <a href="#" aria-label="LinkedIn" style={{ width: 38, height: 38, borderRadius: 10, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--canopy)" }}>
                    <Linkedin size={17} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 16, padding: 30 }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ textAlign: "center", padding: "30px 10px" }}
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }} style={{ display: "inline-flex", marginBottom: 16 }}>
                      <CheckCircle2 size={46} color="var(--canopy)" />
                    </motion.div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Message sent</h3>
                    <p style={{ fontSize: 14, marginBottom: 20 }}>Thanks for reaching out — we'll get back to you as soon as we can.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-lift" style={{ padding: "10px 22px", background: "var(--paper-dim)", border: "none", borderRadius: 999, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <input required name="name" value={form.name} onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Your Name" style={{ ...inputStyle, borderColor: focused === "name" ? "var(--marigold)" : "var(--paper-dim)" }} />
                      <input required type="email" name="email" value={form.email} onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="Your Email" style={{ ...inputStyle, borderColor: focused === "email" ? "var(--marigold)" : "var(--paper-dim)" }} />
                    </div>
                    <textarea required name="message" rows={6} value={form.message} onChange={handleChange} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Message" style={{ ...inputStyle, marginTop: 16, resize: "vertical", borderColor: focused === "message" ? "var(--marigold)" : "var(--paper-dim)" }} />
                    <motion.button type="submit" whileTap={{ scale: 0.97 }} className="btn-lift" style={{ marginTop: 20, padding: "14px 30px", background: "var(--canopy)", color: "#fff", border: "none", borderRadius: 999, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                      Send Message
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
        <style>{`
          @media (min-width: 900px) {
            .contact-grid { grid-template-columns: 0.8fr 1.2fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
