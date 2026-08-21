import { ShieldCheck, Leaf, CloudSun, PawPrint, MapPinned, Wheat, Building2, Megaphone, Compass, GraduationCap } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { StaggerGroup, StaggerItem } from "../components/Reveal";
import { PROGRAMS } from "../data/content";

const ICONS = { ShieldCheck, Leaf, CloudSun, PawPrint, MapPinned, Wheat, Building2, Megaphone, Compass, GraduationCap };

export default function Programs() {
  return (
    <>
      <PageHeader
        title="Programs & Activities"
        copy="Ten interconnected areas of work, run by and for the communities of the Ekuri Clan."
        crumb="Programs"
        bgImage="/assets/img/ekuri-rainforest-flora.jpg"
      />
      <section className="section container">
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {PROGRAMS.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <StaggerItem key={p.title}>
                <div className="card-lift" style={{ background: "#fff", border: "1px solid var(--paper-dim)", borderRadius: 18, padding: 28, height: "100%" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <Icon size={23} color="var(--canopy)" />
                  </div>
                  <h3 style={{ fontSize: 17.5, fontWeight: 600, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 14 }}>{p.copy}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>
    </>
  );
}
