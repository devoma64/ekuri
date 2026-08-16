import PageHeader from "../components/PageHeader";
import SectionTitle from "../components/SectionTitle";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { StaggerGroup, StaggerItem } from "../components/Reveal";
import { TRUSTEES, MANAGEMENT } from "../data/content";

function PersonCard({ name, role }) {
  return (
    <StaggerItem>
      <div className="card-lift" style={{ background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 16, overflow: "hidden", height: "100%" }}>
        <ImagePlaceholder label={`Photo: ${name}`} aspect="1/1" radius={0} />
        <div style={{ padding: "20px 18px", textAlign: "center" }}>
          <h4 style={{ fontSize: 15.5, fontWeight: 600 }}>{name}</h4>
          <span style={{ fontSize: 12.5, color: "var(--marigold-deep)", fontWeight: 600 }}>{role}</span>
        </div>
      </div>
    </StaggerItem>
  );
}

export default function People() {
  return (
    <>
      <PageHeader title="People" copy="The trustees and staff who steward the Ekuri Initiative's programs and governance." crumb="People" />

      <section className="section container">
        <SectionTitle eyebrow="Governance" title="Board of Trustees" />
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 22 }}>
          {TRUSTEES.map((t) => <PersonCard key={t.name} {...t} />)}
        </StaggerGroup>
      </section>

      <section className="section container" style={{ background: "var(--paper-dim)", borderRadius: 24 }}>
        <SectionTitle eyebrow="On the ground" title="Management Team" />
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 22 }}>
          {MANAGEMENT.map((m) => <PersonCard key={m.name + m.role} {...m} />)}
        </StaggerGroup>
      </section>
    </>
  );
}
