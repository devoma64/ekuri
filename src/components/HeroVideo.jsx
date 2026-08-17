import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Full-bleed hero background featuring the Ekuri rainforest canopy image
 * with optional ambient sound and video support.
 */
export default function HeroVideo({ children }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setVideoReady(true);
    const onError = () => setVideoFailed(true);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("error", onError);
    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("error", onError);
    };
  }, []);

  const toggleSound = () => {
    const a = audioRef.current;
    if (!a) return;
    if (soundOn) {
      a.pause();
      setSoundOn(false);
    } else {
      a.volume = 0.5;
      a.play().catch(() => {});
      setSoundOn(true);
    }
  };

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
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
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

      {/* Video layer if available */}
      {!videoFailed && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/img/hero-bg.jpg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
            opacity: videoReady ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          <source src="/assets/video/forest-hero.webm" type="video/webm" />
          <source src="/assets/video/forest-hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Cinematic gradient overlays for contrast and depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(180deg, rgba(12,31,23,0.7) 0%, rgba(12,31,23,0.38) 42%, rgba(12,31,23,0.88) 100%)",
        }}
      />

      {/* Subtle warm radial highlight matching sun rays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(217, 154, 63, 0.18) 0%, rgba(12,31,23,0) 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient audio, only mounted once the visitor opts in */}
      <audio ref={audioRef} loop preload="none">
        <source src="/assets/audio/forest-ambience.mp3" type="audio/mpeg" />
      </audio>

      {/* Sound toggle */}
      <motion.button
        onClick={toggleSound}
        whileTap={{ scale: 0.94 }}
        aria-label={soundOn ? "Mute forest ambience" : "Play forest ambience — stream and birdsong"}
        style={{
          position: "absolute",
          top: 110,
          right: 24,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(246,244,236,0.14)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(246,244,236,0.3)",
          borderRadius: 999,
          padding: "9px 16px",
          color: "#f6f4ec",
          fontSize: 12.5,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
        {soundOn ? "Sound on" : "Forest sound"}
      </motion.button>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          paddingBottom: 90,
          paddingTop: 160,
          width: "100%",
        }}
      >
        {children}
      </div>
    </section>
  );
}
