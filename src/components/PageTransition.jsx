import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingTop: 116 }}
    >
      {children}
    </motion.main>
  );
}
