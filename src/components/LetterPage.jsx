import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Placeholder photo URLs (pastel aesthetic)
const PHOTOS = [
  new URL("../assets/images/photo_1_2026-06-14_21-46-47.jpg", import.meta.url).href,
  new URL("../assets/images/photo_5_2026-06-14_21-46-47.jpg", import.meta.url).href,
];

const LETTER_PARAGRAPHS = [
  {
    text: "Maria ,",
    style: "font-display text-3xl italic font-bold",
    color: "#BE0822",
  },
  {
    text: "Aujourd'hui est un jour qui t'appartient entièrement. Un jour où le soleil se lève juste pour toi, où les fleurs fleurissent dans tes couleurs, et où le monde entier sourit à ton nom.",
    style: "font-body text-lg leading-relaxed",
  },
  {
    text: "Tu es une de ces personnes rares qui illuminent chaque pièce qu'elles traversent. Ton rire résonne comme une mélodie qu'on ne peut s'empêcher d'aimer, et ta présence transforme les moments ordinaires en souvenirs inoubliables.",
    style: "font-body text-lg leading-relaxed",
    photo: PHOTOS[0],
  },
  {
    text: "Je voulais que ce jour soit aussi spécial que tu l'es. Pas un cadeau qu'on range dans un tiroir, mais quelque chose qui te rappelle, chaque fois que tu le regardes, que tu es aimée — profondément, sincèrement, infiniment.",
    style: "font-body text-lg leading-relaxed",
  },
  {
    text: "Tu mérites tout ce que la vie a de plus beau. Chaque étoile dans le ciel, chaque pétale de rose, chaque instant de bonheur pur. Tu mérites d'être célébrée non seulement aujourd'hui, mais chaque jour.",
    style: "font-body text-lg leading-relaxed",
    photo: PHOTOS[1],
  },
  {
    text: "Merci d'exister. Merci d'être toi. Merci de partager ta lumière avec ceux qui ont la chance de te connaître.",
    style: "font-body text-xl leading-relaxed italic",
    color: "#BE0822",
  },
  {
    text: "Joyeux anniversaire, ma plus belle. Que cette nouvelle année t'apporte tout ce que ton cœur désire, et même ce qu'il n'ose pas encore imaginer. 🌹",
    style: "font-body text-lg leading-relaxed",
  },
  {
    text: "Avec tout mon amour,",
    style: "font-display text-2xl italic font-bold",
    color: "#BE0822",
  },
];

function Envelope({ onOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1200);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ background: "linear-gradient(160deg, #FFF9F5 0%, #EED7C8 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating petals */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${5 + Math.random() * 4}s`,
            fontSize: `${10 + Math.random() * 10}px`,
            color: ["#EFAAB0", "#FD9898"][i % 2],
          }}
        >
          ✿
        </div>
      ))}

      <motion.p
        className="font-display italic text-base mb-8 tracking-widest"
        style={{ color: "#BE0822", opacity: 0.7 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Une lettre t'attend...
      </motion.p>

      {/* Envelope */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="w-80 md:w-96 relative" style={{ filter: "drop-shadow(0 20px 40px rgba(190,8,34,0.2))" }}>
          {/* Envelope body */}
          <svg viewBox="0 0 400 260" className="w-full">
            {/* Body */}
            <rect x="0" y="40" width="400" height="220" rx="8" fill="#EED7C8" />
            {/* Bottom triangle */}
            <path d="M0 260 L200 150 L400 260 Z" fill="#E8C8B8" />
            {/* Left fold */}
            <path d="M0 40 L200 150 L0 260 Z" fill="#E0BEA8" />
            {/* Right fold */}
            <path d="M400 40 L200 150 L400 260 Z" fill="#E8C8B8" />

            {/* Flap — animated open */}
            <motion.path
              d="M0 40 L200 155 L400 40 L400 10 Q200 -30 0 10 Z"
              fill="#EFAAB0"
              animate={opening ? { rotateX: 180, y: -80, opacity: 0 } : isHovered ? { y: -10 } : { y: 0 }}
              style={{ transformOrigin: "50% 40px" }}
              transition={{ duration: 0.7 }}
            />

            {/* Wax seal */}
            <circle cx="200" cy="160" r="28" fill="#BE0822" opacity="0.9" />
            <text x="200" y="167" textAnchor="middle" fontSize="22" fill="#FFF9F5">♥</text>

            {/* Decorative lines on envelope */}
            <path d="M30 220 L170 220" stroke="#EFAAB0" strokeWidth="1.5" opacity="0.5" />
            <path d="M230 220 L370 220" stroke="#EFAAB0" strokeWidth="1.5" opacity="0.5" />
          </svg>

          
        </div>

        {/* Click hint */}
        <motion.p
          className="font-display italic text-sm mt-6 text-center tracking-wider"
          style={{ color: "#BE0822" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {opening ? "Ouverture..." : "Clique pour ouvrir ✨"}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function Letter({ onScrollEnd }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [showSecret, setShowSecret] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
      setAtBottom(nearBottom);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 overflow-y-auto"
      style={{ background: "#FFF9F5" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 5}s`,
            fontSize: `${8 + Math.random() * 12}px`,
            color: ["#EFAAB0", "#FD9898", "#EED7C8"][i % 3],
            zIndex: 0,
          }}
        >
          {["✿", "❀", "✾"][i % 3]}
        </div>
      ))}

      {/* Letter paper */}
      <div className="max-w-2xl mx-auto px-6 py-16 relative z-10">
        {/* Paper header decoration */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #EFAAB0)" }} />
            <span className="text-2xl" style={{ color: "#BE0822" }}>♥</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #EFAAB0)" }} />
          </div>
          <p className="font-display italic text-sm tracking-widest" style={{ color: "#EFAAB0" }}>
            Une lettre du fond du cœur
          </p>
        </motion.div>

        {/* Letter content */}
        <div className="space-y-8">
          {LETTER_PARAGRAPHS.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
            >
              {para.photo && (
                <motion.div
                  className="my-6 rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 12px 40px rgba(190,8,34,0.15)",
                    transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.5deg)",
                  }}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={para.photo}
                    alt="Maria"
                    className="w-full h-100 object-cover"
                  />
                  <div
                    className="px-4 py-2 text-center font-display italic text-sm"
                    style={{ background: "#EED7C8", color: "#BE0822" }}
                  >
                    ❀ Un souvenir précieux ❀
                  </div>
                </motion.div>
              )}
              <p
                className={`${para.style} leading-relaxed`}
                style={{ color: para.color || "#5a3a3a", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {para.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Signature & date */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block">
            <p className="font-display text-4xl italic" style={{ color: "#BE0822" }}>
              ~ avec amour ~
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              {["❀", "♥", "❀"].map((s, i) => (
                <motion.span
                  key={i}
                  style={{ color: "#EFAAB0", fontSize: "1.5rem" }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Audio message placeholder */}
        <motion.div
          className="mt-12 rounded-2xl p-6 text-center"
          style={{
            background: "linear-gradient(135deg, #EED7C8, #EFAAB0)",
            boxShadow: "0 8px 30px rgba(190,8,34,0.1)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display italic text-xl mb-3" style={{ color: "#BE0822" }}>
            🎵 Un message pour toi...
          </p>
          <p className="text-sm" style={{ color: "#7a4a4a", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Ferme les yeux, pense à tous les beaux moments qu'on a vécus ensemble,<br />
            et sache que tu es et seras toujours dans mon cœur. 💕
          </p>
          <motion.div
            className="mt-4 flex items-center justify-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: "4px",
                  background: "#BE0822",
                  height: `${8 + Math.sin(i) * 8}px`,
                  opacity: 0.6,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Divider before secret button */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 w-full">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #EFAAB0)" }} />
            <span style={{ color: "#EFAAB0", fontSize: "1.2rem" }}>✦</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #EFAAB0)" }} />
          </div>

          {/* Secret button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p
              className="font-display italic text-xs tracking-widest mb-3"
              style={{ color: "#EFAAB0", opacity: 0.6 }}
            >
              ↓ quelque chose de spécial t'attend ici ↓
            </p>
            <motion.button
              onClick={onScrollEnd}
              className="font-display italic text-xs px-6 py-2 rounded-full border transition-all"
              style={{
                borderColor: "#EFAAB0",
                color: "#BE0822",
                background: "transparent",
                letterSpacing: "0.1em",
              }}
              whileHover={{
                background: "#EED7C8",
                scale: 1.05,
                boxShadow: "0 4px 20px rgba(190,8,34,0.2)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              hadi binatna 🤫
            </motion.button>
          </motion.div>

          <div className="pb-16" />
        </div>
      </div>
    </motion.div>
  );
}

export default function LetterPage({ onGallery }) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!envelopeOpen ? (
        <motion.div key="envelope" exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }}>
          <Envelope onOpen={() => setEnvelopeOpen(true)} />
        </motion.div>
      ) : (
        <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Letter onScrollEnd={onGallery} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
