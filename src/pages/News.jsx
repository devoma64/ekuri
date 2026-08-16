import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { StaggerGroup, StaggerItem } from "../components/Reveal";
import { Calendar, User } from "lucide-react";

const PLACEHOLDER_SLOTS = [
  { category: "Forest Patrol" },
  { category: "Community" },
  { category: "Advocacy" },
];

export default function News() {
  return (
    <>
      <PageHeader title="News & Events" copy="Updates from the forest, campaigns, and community events." crumb="News" />

      <section className="section container">
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {PLACEHOLDER_SLOTS.map((slot, i) => (
            <StaggerItem key={i}>
              <div className="card-lift" style={{ background: "#fff", border: "1px dashed var(--paper-dim)", borderRadius: 16, overflow: "hidden", height: "100%" }}>
                <ImagePlaceholder label="Post image" aspect="16/10" radius={0} />
                <div style={{ padding: "20px 22px" }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--marigold-deep)" }}>
                    {slot.category}
                  </span>
                  <h3 style={{ fontSize: 16.5, fontWeight: 600, margin: "10px 0 16px", color: "var(--ink-soft)" }}>
                    Post title goes here
                  </h3>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--ink-soft)", opacity: 0.7 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><User size={12} /> Author</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Calendar size={12} /> Date</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div style={{ textAlign: "center", marginTop: 48, maxWidth: 460, margin: "48px auto 0" }}>
          <p style={{ fontSize: 14 }}>
            No posts published yet. Once the Initiative has updates to share — boundary
            patrols, community meetings, campaigns, milestones — they'll appear here in
            this same layout.
          </p>
        </div>
      </section>
    </>
  );
}
  