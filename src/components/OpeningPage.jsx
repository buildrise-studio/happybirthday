import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OpeningPage({ onComplete }) {
  const [cracked, setCracked] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [done, setDone] = useState(false);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 4,
      size: 8 + Math.random() * 14,
      color: ["#EFAAB0", "#FD9898", "#EED7C8", "#BE0822"][Math.floor(Math.random() * 4)],
    }));
    setPetals(arr);
  }, []);

  const handleClick = () => {
    if (cracked || splitting) return;
    setCracked(true);
    setTimeout(() => setSplitting(true), 900);
    setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 600);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center overflow-hidden cursor-pointer select-none"
          style={{ background: "linear-gradient(135deg, #FFF9F5 0%, #EED7C8 50%, #EFAAB0 100%)" }}
          onClick={handleClick}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Floating petals */}
          {petals.map((p) => (
            <div
              key={p.id}
              className="petal"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                fontSize: `${p.size}px`,
                color: p.color,
              }}
            >
              ✿
            </div>
          ))}

          {/* Background decorative text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span
              className="font-display text-9xl font-bold text-center"
              style={{ color: "#BE0822", letterSpacing: "0.3em" }}
            >
              MARIA
            </span>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Top text */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center"
            >
              <p
                className="font-display italic text-lg tracking-widest"
                style={{ color: "#BE0822", opacity: 0.7 }}
              >
                Un cadeau spécial pour
              </p>
            </motion.div>

            {/* MARIA title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="font-display text-7xl md:text-9xl font-bold text-center shimmer"
              style={{ lineHeight: 1 }}
            >
              Maria
            </motion.h1>

            {/* Heart SVG — broken heart crack animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8, type: "spring", bounce: 0.5 }}
              className="relative"
            >
              <div className="relative w-48 h-44">
                {/* Left half of heart */}
                <motion.div
                  className="absolute inset-0"
                  animate={
                    splitting
                      ? { x: -60, rotate: -8, opacity: 0 }
                      : { x: 0, rotate: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 200 180" className="w-full h-full">
                    <defs>
                      <clipPath id="left-half">
                        <rect x="0" y="0" width="100" height="180" />
                      </clipPath>
                    </defs>
                    <path
                      d="M100,160 C100,160 10,100 10,55 C10,30 30,10 55,10 C70,10 85,18 100,35 C115,18 130,10 145,10 C170,10 190,30 190,55 C190,100 100,160 100,160 Z"
                      fill="#BE0822"
                      clipPath="url(#left-half)"
                    />
                    {/* Crack line */}
                    {cracked && (
                      <motion.path
                        d="M100,35 L95,60 L105,85 L92,110 L100,160"
                        stroke="#FFF9F5"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        clipPath="url(#left-half)"
                      />
                    )}
                  </svg>
                </motion.div>

                {/* Right half of heart */}
                <motion.div
                  className="absolute inset-0"
                  animate={
                    splitting
                      ? { x: 60, rotate: 8, opacity: 0 }
                      : { x: 0, rotate: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 200 180" className="w-full h-full">
                    <defs>
                      <clipPath id="right-half">
                        <rect x="100" y="0" width="100" height="180" />
                      </clipPath>
                    </defs>
                    <path
                      d="M100,160 C100,160 10,100 10,55 C10,30 30,10 55,10 C70,10 85,18 100,35 C115,18 130,10 145,10 C170,10 190,30 190,55 C190,100 100,160 100,160 Z"
                      fill="#BE0822"
                      clipPath="url(#right-half)"
                    />
                    {/* Crack line right side */}
                    {cracked && (
                      <motion.path
                        d="M100,35 L95,60 L105,85 L92,110 L100,160"
                        stroke="#FFF9F5"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        clipPath="url(#right-half)"
                      />
                    )}
                  </svg>
                </motion.div>

                {/* Sparkles on crack */}
                {cracked && (
                  <>
                    {[
                      { top: "35%", left: "48%", delay: 0.3 },
                      { top: "55%", left: "52%", delay: 0.5 },
                      { top: "20%", left: "46%", delay: 0.4 },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-yellow-300 text-xs"
                        style={{ top: s.top, left: s.left }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                        transition={{ delay: s.delay, duration: 0.5 }}
                      >
                        ✦
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>

            {/* Instruction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: cracked ? 0 : 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.p
                className="font-display italic text-base tracking-wider"
                style={{ color: "#BE0822" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Clique pour ouvrir ✨
              </motion.p>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#EFAAB0" }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ delay: i * 0.2, duration: 0.8, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map(
            (pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} text-2xl`}
                style={{ color: "#EFAAB0", opacity: 0.4 }}
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
              >
                ❀
              </motion.div>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
