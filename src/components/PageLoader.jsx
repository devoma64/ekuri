import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Deep Obsidian & Warm Gold Page Loader
 * Ultra-sleek luxury dark forest backdrop, glowing champagne-gold accents,
 * frosted medallion brand badge, and precision progress indicator.
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
        }, 320);
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
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "radial-gradient(ellipse at 50% 40%, #0d1e10 0%, #071309 55%, #030804 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#f6f4ec",
            overflow: "hidden",
            userSelect: "none",
          }}
        >
          {/* Subtle warm champagne atmospheric ambient glow */}
          <div
            style={{
              position: "absolute",
              width: 560,
              height: 560,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(217, 154, 63, 0.12) 0%, rgba(18, 50, 20, 0.16) 45%, transparent 70%)",
              filter: "blur(50px)",
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
            {/* Logo Medallion with pulsing gold halo */}
            <div style={{ position: "relative", width: 104, height: 104, marginBottom: 28 }}>
              {/* Outer pulsing gold ring */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.2, 0.55, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.6,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: "50%",
                  border: "1px solid rgba(217, 154, 63, 0.6)",
                  pointerEvents: "none",
                }}
              />

              {/* Second subtle dashed orbital ring */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 16,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  inset: -16,
                  borderRadius: "50%",
                  border: "1px dashed rgba(217, 154, 63, 0.2)",
                  pointerEvents: "none",
                }}
              />

              {/* Central Frosted Glass Medallion */}
              <motion.div
                initial={{ scale: 0.82, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "rgba(13, 30, 16, 0.75)",
                  backdropFilter: "blur(16px)",
                  border: "1.5px solid rgba(217, 154, 63, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 16px 40px -10px rgba(0,0,0,0.85), 0 0 28px rgba(217, 154, 63, 0.2)",
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
                    filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.6))",
                  }}
                />
              </motion.div>
            </div>

            {/* Brand Title */}
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.65 }}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(22px, 3.8vw, 30px)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#ffffff",
                margin: 0,
                textTransform: "uppercase",
                textShadow: "0 2px 20px rgba(0,0,0,0.7), 0 0 30px rgba(217,154,63,0.25)",
              }}
            >
              The Ekuri Initiative
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 0.85 }}
              transition={{ delay: 0.25, duration: 0.65 }}
              style={{
                fontSize: 12.5,
                fontFamily: "var(--font-sans)",
                color: "rgba(246, 244, 236, 0.72)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: 10,
                marginBottom: 34,
                fontWeight: 500,
              }}
            >
              Est. 1992 · 33,600 Hectares · Community Rainforest
            </motion.p>

            {/* Precision Gold Progress Bar Container */}
            <div
              style={{
                width: "min(300px, 82vw)",
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
                  height: 3.5,
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: 999,
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #966723 0%, #d99a3f 50%, #fce09b 100%)",
                    boxShadow: "0 0 14px rgba(217, 154, 63, 0.85)",
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
                  fontFamily: "var(--font-sans)",
                  color: "rgba(246, 244, 236, 0.55)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                <span>Protecting Since 1992</span>
                <span style={{ color: "var(--marigold, #d99a3f)", fontWeight: 700 }}>
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom coordinates / credit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              position: "absolute",
              bottom: 24,
              fontSize: 11,
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(246, 244, 236, 0.5)",
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
