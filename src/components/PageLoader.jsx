import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium PageLoader for The Ekuri Initiative
 * - Full-screen initial brand reveal with animated logo pulse, glowing canopy ring,
 *   subtle rainforest particle ambience, and sleek progress counter.
 * - Smooth curtain exit reveal into the main site.
 * - Top route transition bar for instant feedback during client-side navigation.
 */
export default function PageLoader({ onLoaded, minDuration = 1800 }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(Math.round((elapsed / minDuration) * 100), 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onLoaded) onLoaded();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDuration, onLoaded]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="ekuri-page-loader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "radial-gradient(ellipse at 50% 45%, #134816 0%, #0b320b 65%, #061e06 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#f6f4ec",
            overflow: "hidden",
            userSelect: "none",
          }}
        >
          {/* Subtle atmospheric ambient glow */}
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(217,154,63,0.14) 0%, rgba(22,104,22,0.2) 50%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />

          {/* Center Brand Cluster */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 2,
              padding: "0 24px",
            }}
          >
            {/* Logo with pulsating aura rings */}
            <div style={{ position: "relative", width: 100, height: 100, marginBottom: 28 }}>
              {/* Outer pulsing ring */}
              <motion.div
                animate={{
                  scale: [1, 1.28, 1],
                  opacity: [0.25, 0.6, 0.25],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: "50%",
                  border: "1.5px solid var(--marigold, #d99a3f)",
                  pointerEvents: "none",
                }}
              />

              {/* Second soft ring */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  inset: -14,
                  borderRadius: "50%",
                  border: "1px dashed rgba(246,244,236,0.2)",
                  pointerEvents: "none",
                }}
              />

              {/* Central Logo Box */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "rgba(246,244,236,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(217,154,63,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 36px -10px rgba(0,0,0,0.6), 0 0 24px rgba(217,154,63,0.2)",
                  padding: 14,
                }}
              >
                <img
                  src="/assets/img/ekuri-logo.png"
                  alt="Ekuri Initiative"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
                  }}
                />
              </motion.div>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#ffffff",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Ekuri Initiative
            </motion.h1>

            {/* Subtitle / Tagline */}
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              style={{
                fontSize: 13.5,
                color: "rgba(246, 244, 236, 0.75)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: 8,
                marginBottom: 32,
                fontWeight: 500,
              }}
            >
              33,600 Hectares · Community Rainforest
            </motion.p>

            {/* Progress Bar Container */}
            <div
              style={{
                width: "min(280px, 80vw)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* The track */}
              <div
                style={{
                  width: "100%",
                  height: 3,
                  background: "rgba(246,244,236,0.12)",
                  borderRadius: 999,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #b47f2f, #d99a3f, #f7d28b)",
                    boxShadow: "0 0 10px rgba(217, 154, 63, 0.8)",
                    borderRadius: 999,
                    transition: "width 0.05s linear",
                  }}
                />
              </div>

              {/* Progress percentage & status */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11.5,
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(246,244,236,0.6)",
                  letterSpacing: "0.06em",
                }}
              >
                <span>Protecting since 1992</span>
                <span style={{ color: "var(--marigold, #d99a3f)", fontWeight: 600 }}>{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom decorative coordinates / credit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              position: "absolute",
              bottom: 24,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(246,244,236,0.5)",
              textAlign: "center",
            }}
          >
            Akamkpa LGA · Cross River State · Nigeria
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
