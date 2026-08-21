import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, CheckCircle2, Facebook, Linkedin, Loader2, AlertCircle, Send } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { ORG, CONTACT } from "../data/content";

const inputStyle = {
  width: "100%", padding: "13px 16px", borderRadius: 8, border: "1px solid var(--paper-dim)",
  background: "#fff", fontSize: 14.5, fontFamily: "inherit", color: "var(--ink)", outline: "none",
  transition: "border-color .2s ease, box-shadow .2s ease",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", _honey: "" });
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._honey) {
      // Honeypot triggered by bot
      setStatus("success");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const targetEmail = import.meta.env.VITE_CONTACT_EMAIL || ORG.email;
    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || `https://formsubmit.co/ajax/${targetEmail}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || "General Inquiry via Website",
          message: form.message,
          _subject: form.subject ? `[Ekuri Website] ${form.subject}` : `New message from ${form.name} via Ekuri Website`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === "true" || data.success === true || response.status === 200)) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", _honey: "" });
      } else {
        throw new Error(data.message || "Failed to deliver message. Please try again or email us directly.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setErrorMsg(err.message || "Unable to send message right now. Please try again or email us directly.");
    }
  };

  const targetEmail = import.meta.env.VITE_CONTACT_EMAIL || ORG.email;
  const mailtoFallback = `mailto:${targetEmail}?subject=${encodeURIComponent(form.subject || "Inquiry via Ekuri Website")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;

  return (
    <>
      <PageHeader
        title="Contact Us"
        copy="Questions, partnerships, press, or research inquiries — we read every message."
        crumb="Contact"
        bgImage="/assets/img/ekuri-rainforest-flora.jpg"
      />
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
            <div style={{ background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 16, padding: 30, boxShadow: "0 10px 30px -10px rgba(11,50,11,0.06)" }}>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ textAlign: "center", padding: "30px 10px" }}
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }} style={{ display: "inline-flex", marginBottom: 16 }}>
                      <CheckCircle2 size={48} color="var(--canopy)" />
                    </motion.div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Message Sent</h3>
                    <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>
                      Thank you for reaching out to the Ekuri Initiative. We have received your message and will respond shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="btn-lift"
                      style={{ padding: "10px 24px", background: "var(--paper-dim)", border: "none", borderRadius: 999, fontSize: 13.5, fontWeight: 600, cursor: "pointer", color: "var(--ink)" }}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    {/* Honeypot field for bot protection */}
                    <input
                      type="text"
                      name="_honey"
                      value={form._honey}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: "14px 16px",
                          borderRadius: 8,
                          background: "rgba(220, 38, 38, 0.08)",
                          border: "1px solid rgba(220, 38, 38, 0.2)",
                          color: "#991b1b",
                          fontSize: 13.5,
                          marginBottom: 18,
                        }}
                      >
                        <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 500 }}>{errorMsg}</p>
                          <p style={{ margin: "6px 0 0", fontSize: 12.5 }}>
                            You can also{" "}
                            <a href={mailtoFallback} style={{ color: "#991b1b", fontWeight: 700, textDecoration: "underline" }}>
                              send your message directly via email
                            </a>.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: "var(--ink)" }}>Full Name *</label>
                        <input
                          required
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          placeholder="Your Name"
                          disabled={status === "loading"}
                          style={{ ...inputStyle, borderColor: focused === "name" ? "var(--marigold)" : "var(--paper-dim)" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: "var(--ink)" }}>Email Address *</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          placeholder="your.email@example.com"
                          disabled={status === "loading"}
                          style={{ ...inputStyle, borderColor: focused === "email" ? "var(--marigold)" : "var(--paper-dim)" }}
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: 16 }}>
                      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: "var(--ink)" }}>Subject</label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                        placeholder="e.g. Partnership inquiry, Conservation research, General question"
                        disabled={status === "loading"}
                        style={{ ...inputStyle, borderColor: focused === "subject" ? "var(--marigold)" : "var(--paper-dim)" }}
                      />
                    </div>

                    <div style={{ marginTop: 16 }}>
                      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, marginBottom: 6, color: "var(--ink)" }}>Message *</label>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        placeholder="Write your message here..."
                        disabled={status === "loading"}
                        style={{ ...inputStyle, resize: "vertical", borderColor: focused === "message" ? "var(--marigold)" : "var(--paper-dim)" }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                      className="btn-lift"
                      style={{
                        marginTop: 20,
                        padding: "13px 32px",
                        background: status === "loading" ? "var(--ink-soft)" : "var(--canopy)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 999,
                        fontWeight: 700,
                        fontSize: 14.5,
                        cursor: status === "loading" ? "not-allowed" : "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={18} className="spin-animation" style={{ animation: "spin 1s linear infinite" }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
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
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    </>
  );
}

