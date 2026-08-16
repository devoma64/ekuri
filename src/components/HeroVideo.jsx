import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import CanopyScene from "./CanopyScene";

/**
 * Full-bleed hero background: looping muted video of the Ekuri forest with
 * an optional ambient soundtrack (stream + birdsong) the visitor can opt into.
 *
 * Drop your files in:
 *   public/assets/video/forest-hero.mp4   (+ forest-hero.webm optional)
 *   public/assets/audio/forest-ambience.mp3
 *
 * Until those exist, this falls back to an illustrated animated canopy scene
 * (CanopyScene.jsx) rather than a flat placeholder or generic stock footage —
 * see that file's header comment for why.
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
    <section style={{ position: "relative", overflow: "hidden", minHeight: "88vh", display: "flex", alignItems: "flex-end" }}>
      {/* Video layer */}
      {!videoFailed && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/img/hero-poster.jpg"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: videoReady ? 1 : 0, transition: "opacity 1.2s ease",
          }}
        >
          <source src="/assets/video/forest-hero.webm" type="video/webm" />
          <source src="/assets/video/forest-hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback / underlay: an illustrated animated canopy scene, always
          present so there's never a flash of empty space while the video
          loads, and shown outright if no video file exists yet. This is
          intentionally stylized, not a photo/video substitute — see
          CanopyScene.jsx for why. */}
      <div
        style={{
          position: "absolute", inset: 0,
          opacity: videoReady && !videoFailed ? 0 : 1,
          transition: "opacity 1s ease",
        }}
      >
        <CanopyScene />
      </div>

      {/* Darkening gradient so text stays readable over either layer */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(12,31,23,0.55) 0%, rgba(12,31,23,0.35) 35%, rgba(12,31,23,0.85) 100%)",
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
          position: "absolute", top: 110, right: 24, zIndex: 5,
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(246,244,236,0.14)", backdropFilter: "blur(6px)",
          border: "1px solid rgba(246,244,236,0.3)", borderRadius: 999,
          padding: "9px 16px", color: "#f6f4ec", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
        }}
      >
        {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
        {soundOn ? "Sound on" : "Forest sound"}
      </motion.button>

      <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: 80, paddingTop: 160, width: "100%" }}>
        {children}
      </div>
    </section>
  );
}
