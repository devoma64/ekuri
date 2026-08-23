import { motion } from "framer-motion";

/**
 * Full-bleed hero background featuring the Ekuri rainforest canopy image
 * with cinematic gradient overlays and entrance animations.
 */
export default function HeroVideo({ children }) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Image Layer with subtle cinematic entrance and scaling */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/assets/img/hero-bg.jpg"
          alt="Lush rainforest canopy in Ekuri with sunbeams breaking through morning mist"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />
      </motion.div>

      {/* Cinematic gradient overlays for strong contrast and depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(180deg, rgba(7,26,7,0.85) 0%, rgba(7,26,7,0.68) 45%, rgba(7,26,7,0.92) 100%)",
        }}
      />

      {/* Center focus vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(11,50,11,0.2) 0%, rgba(7,26,7,0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          paddingBottom: 110,
          paddingTop: "clamp(190px, 24vh, 250px)",
          width: "100%",
        }}
      >
        {children}
      </div>
    </section>
  );
}
