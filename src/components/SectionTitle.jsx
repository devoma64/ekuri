import Reveal from "./Reveal";

export default function SectionTitle({ eyebrow, title, copy, center = true }) {
  return (
    <Reveal className={`section-title${center ? " center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </Reveal>
  );
}
