import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import RouteProgressBar from "./components/RouteProgressBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import WhereWeWork from "./pages/WhereWeWork";
import Gallery from "./pages/Gallery";
import People from "./pages/People";
import Partners from "./pages/Partners";
import Publications from "./pages/Publications";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";

export default function App() {
  const location = useLocation();

  return (
    <>
      <RouteProgressBar />
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/programs" element={<PageTransition><Programs /></PageTransition>} />
          <Route path="/where-we-work" element={<PageTransition><WhereWeWork /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/people" element={<PageTransition><People /></PageTransition>} />
          <Route path="/partners" element={<PageTransition><Partners /></PageTransition>} />
          <Route path="/publications" element={<PageTransition><Publications /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><News /></PageTransition>} />
          <Route path="/news" element={<PageTransition><News /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/donate" element={<PageTransition><Donate /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
