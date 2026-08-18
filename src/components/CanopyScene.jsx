import { useMemo } from "react";

/**
 * A stylized, clearly-illustrated forest scene: layered canopy silhouettes drifting
 * at different speeds (parallax), soft mist, and drifting firefly-like light points.
 *
 * This is intentionally illustrative, not photorealistic — it should never be mistaken
 * for real footage of the Ekuri forest. It exists only as a richer placeholder than a
 * flat gradient while real video/audio is sourced (see HeroVideo.jsx / README).
 */

// One tree-canopy "hill" made of overlapping rounded humps, tileable end-to-end.
function canopyPath(seed, baseline, amplitude, bumps) {
  const width = 1600;
  const step = width / bumps;
  let d = `M0,${baseline + amplitude}`;
  for (let i = 0; i <= bumps; i++) {
    const x = i * step;
    const rnd = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
    const wobble = (rnd - Math.floor(rnd)) * amplitude * 0.6;
    const y = baseline - amplitude + wobble;
    d += ` Q${x - step / 2},${y - amplitude * 0.5} ${x},${y}`;
  }
  d += ` L${width},400 L0,400 Z`;
  return d;
}

function CanopyLayer({ seed, baseline, amplitude, bumps, color, opacity, duration, direction = 1 }) {
  const path = useMemo(() => canopyPath(seed, baseline, amplitude, bumps), [seed, baseline, amplitude, bumps]);
  return (
    <div
      style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "100%", width: "200%",
        display: "flex",
        animation: `canopyDrift-${seed} ${duration}s linear infinite`,
        animationDirection: direction > 0 ? "normal" : "reverse",
      }}
    >
      {[0, 1].map((i) => (
        <svg key={i} viewBox="0 0 1600 400" preserveAspectRatio="none" style={{ width: "50%", height: "100%", flexShrink: 0, opacity }}>
          <path d={path} fill={color} />
        </svg>
      ))}
      <style>{`
        @keyframes canopyDrift-${seed} {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function Fireflies({ count = 14 }) {
  const points = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const rnd = (n) => {
          const x = Math.sin(n * 999.123 + i * 37.71) * 43758.5453;
          return x - Math.floor(x);
        };
        return {
          left: `${8 + rnd(1) * 84}%`,
          top: `${30 + rnd(2) * 55}%`,
          size: 2 + rnd(3) * 2.5,
          delay: rnd(4) * 6,
          duration: 4 + rnd(5) * 4,
        };
      }),
    [count]
  );

  return (
    <>
      {points.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute", left: p.left, top: p.top, width: p.size, height: p.size,
            borderRadius: "50%", background: "#e8c97a",
            boxShadow: "0 0 6px 2px rgba(232,201,122,0.8)",
            animation: `fireflyFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes fireflyFloat {
          0%, 100% { opacity: 0; transform: translateY(0); }
          15% { opacity: 0.9; }
          50% { opacity: 0.4; transform: translateY(-14px); }
          85% { opacity: 0.9; }
        }
      `}</style>
    </>
  );
}

export default function CanopyScene() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #092009 0%, #0d3810 45%, #135518 75%, #166816 100%)" }}>
      {/* soft glow near the horizon, like dawn light through the canopy */}
      <div
        style={{
          position: "absolute", left: "50%", bottom: "18%", width: "70%", height: "40%",
          transform: "translateX(-50%)", borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(217,154,63,0.22) 0%, rgba(217,154,63,0) 70%)",
          filter: "blur(2px)",
        }}
      />

      <Fireflies />

      {/* distant ridge */}
      <div style={{ position: "absolute", inset: 0 }}>
        <CanopyLayer seed={1} baseline={190} amplitude={26} bumps={9} color="#0c2e0e" opacity={0.9} duration={70} />
      </div>
      {/* mid canopy */}
      <div style={{ position: "absolute", inset: 0 }}>
        <CanopyLayer seed={2} baseline={250} amplitude={40} bumps={13} color="#134a17" opacity={0.95} duration={46} direction={-1} />
      </div>
      {/* foreground canopy */}
      <div style={{ position: "absolute", inset: 0 }}>
        <CanopyLayer seed={3} baseline={320} amplitude={58} bumps={17} color="#09220a" opacity={1} duration={30} />
      </div>

      {/* drifting mist */}
      <div
        style={{
          position: "absolute", left: 0, right: 0, bottom: "8%", height: "22%",
          background: "linear-gradient(180deg, rgba(246,244,236,0.09), rgba(246,244,236,0))",
          animation: "mistDrift 22s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes mistDrift {
          0%, 100% { transform: translateX(0); opacity: 0.7; }
          50% { transform: translateX(3%); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="canopyDrift"], [style*="fireflyFloat"], [style*="mistDrift"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
