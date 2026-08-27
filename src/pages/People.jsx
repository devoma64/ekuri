import PageHeader from "../components/PageHeader";
import SectionTitle from "../components/SectionTitle";
import { StaggerGroup, StaggerItem } from "../components/Reveal";
import { TRUSTEES, MANAGEMENT } from "../data/content";

function getInitials(name) {
  return name
    .replace(/^(Barrister|Dr\.|Chief|Madam|Mrs|Mr\.|Pastor)\s+/i, "")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function PersonCard({ name, role }) {
  const initials = getInitials(name);

  return (
    <StaggerItem>
      <div
        className="card-lift"
        style={{
          background: "#ffffff",
          border: "1px solid var(--paper-dim)",
          borderRadius: 20,
          padding: "28px 24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxShadow: "0 4px 16px -4px rgba(11, 50, 11, 0.05)",
        }}
      >
        {/* Avatar Circle with Initials */}
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(22, 104, 22, 0.12) 0%, rgba(34, 123, 34, 0.06) 100%)",
            border: "2px solid rgba(22, 104, 22, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            color: "var(--canopy-deep)",
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "0.04em",
          }}
        >
          {initials}
        </div>

        {/* Name */}
        <h4
          style={{
            fontSize: 16.5,
            fontWeight: 700,
            fontFamily: "var(--font-serif)",
            color: "var(--canopy-deep)",
            marginBottom: 8,
            lineHeight: 1.3,
          }}
        >
          {name}
        </h4>

        {/* Role Pill */}
        <span
          style={{
            fontSize: 12,
            color: "var(--marigold-deep)",
            fontWeight: 600,
            background: "var(--paper)",
            border: "1px solid var(--paper-dim)",
            padding: "5px 12px",
            borderRadius: 999,
            marginTop: "auto",
            lineHeight: 1.4,
            maxWidth: "100%",
          }}
        >
          {role}
        </span>
      </div>
    </StaggerItem>
  );
}

export default function People() {
  return (
    <>
      <PageHeader
        title="Board of Trustees & Management"
        copy="The traditional custodians, trustees, and operational leadership stewarding the Ekuri Initiative's governance and field programs."
        crumb="People"
      />

      {/* BOARD OF TRUSTEES */}
      <section className="section container">
        <SectionTitle title="Board of Trustees" />
        <StaggerGroup
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
          }}
        >
          {TRUSTEES.map((t) => (
            <PersonCard key={t.name + t.role} {...t} />
          ))}
        </StaggerGroup>
      </section>

      {/* MANAGEMENT TEAM */}
      <section
        style={{
          background: "var(--paper-dim)",
          padding: "88px 24px",
          borderTop: "1px solid rgba(17, 36, 17, 0.08)",
        }}
      >
        <div className="container">
          <SectionTitle title="Management Team" />
          <StaggerGroup
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {MANAGEMENT.map((m) => (
              <PersonCard key={m.name + m.role} {...m} />
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
