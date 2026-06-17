import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningPage from "./components/OpeningPage";
import LetterPage from "./components/LetterPage";
import GalleryPage from "./components/GalleryPage";

const STEPS = { OPENING: "opening", LETTER: "letter", GALLERY: "gallery" };

export default function App() {
  const [step, setStep] = useState(STEPS.OPENING);
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {step === STEPS.OPENING && (
          <motion.div key="opening" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <OpeningPage onComplete={() => setStep(STEPS.LETTER)} />
          </motion.div>
        )}
        {step === STEPS.LETTER && (
          <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <LetterPage onGallery={() => setStep(STEPS.GALLERY)} />
          </motion.div>
        )}
        {step === STEPS.GALLERY && (
          <motion.div key="gallery" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <GalleryPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
