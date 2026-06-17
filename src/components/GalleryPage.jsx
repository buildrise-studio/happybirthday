import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img2 from "../assets/images/photo_2_2026-06-14_21-46-47.jpg";
import img3 from "../assets/images/photo_3_2026-06-14_21-46-47.jpg";
import img4 from "../assets/images/photo_4_2026-06-14_21-46-47.jpg";
import img6 from "../assets/images/photo_6_2026-06-14_21-46-47.jpg";
import img8 from "../assets/images/photo_8_2026-06-14_21-46-47.jpg";
import img9 from "../assets/images/photo_9_2026-06-14_21-46-47.jpg";
import capture from "../assets/images/Capture.PNG";

// 🔐 Change this to YOUR real birthday (the one Maria should enter)
// Format: { day: "DD", month: "MM", year: "YYYY" }
const SECRET_BIRTHDAY = { day: "29", month: "12", year: "2004" };

// Placeholder gallery images — replace with real photos of Maria
const GALLERY_IMAGES = [
  { src: img2, caption: "Nos fous rires 💕" },
  { src: img3, caption: "Un moment parfait ✨" },
  { src: img4, caption: "Belle comme toujours 🌹" },
  { src: img6, caption: "Joyeux anniversaire ! 🎂" },
  { src: img8, caption: "Un souvenir précieux 💕" },
  { src: img9, caption: "Ma plus belle 🌹" },
];

// ─── Birthday Gate ───────────────────────────────────────────────────────────
function BirthdayGate({ onSuccess }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const monthRef = { current: null };
  const yearRef = { current: null };

  const triggerShake = () => {
    setShake(true);
    setError(true);
    setTimeout(() => setShake(false), 600);
    setTimeout(() => setError(false), 2500);
  };

  const handleSubmit = () => {
    const d = day.padStart(2, "0");
    const m = month.padStart(2, "0");
    const y = year;
    if (d === SECRET_BIRTHDAY.day && m === SECRET_BIRTHDAY.month && y === SECRET_BIRTHDAY.year) {
      setSuccess(true);
      setTimeout(onSuccess, 1400);
    } else {
      triggerShake();
    }
  };

  const inputStyle = (val) => ({
    background: "rgba(255,249,245,0.7)",
    border: `1.5px solid ${error ? "#BE0822" : "#EFAAB0"}`,
    borderRadius: "12px",
    color: "#5a3a3a",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "1.5rem",
    fontStyle: "italic",
    textAlign: "center",
    outline: "none",
    width: "100%",
    padding: "12px 8px",
    transition: "border-color 0.3s",
    WebkitAppearance: "none",
  });

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-4 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFF9F5 0%, #EED7C8 60%, #EFAAB0 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Floating petals */}
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${(i * 7.3) % 100}%`,
            animationDelay: `${(i * 0.4) % 4}s`,
            animationDuration: `${5 + (i % 5)}s`,
            fontSize: `${9 + (i % 8)}px`,
            color: ["#EFAAB0", "#FD9898", "#EED7C8"][i % 3],
          }}
        >
          {["✿", "❀"][i % 2]}
        </div>
      ))}

      <motion.div
        className="relative w-full max-w-sm"
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card */}
        <div
          className="rounded-3xl px-8 py-10 text-center"
          style={{
            background: "rgba(255, 249, 245, 0.85)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 60px rgba(190,8,34,0.15), 0 4px 20px rgba(0,0,0,0.05)",
            border: "1px solid rgba(239,170,176,0.4)",
          }}
        >
          {/* Lock icon animated */}
          <motion.div
            className="text-5xl mb-4"
            animate={success ? { scale: [1, 1.4, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {success ? "🌹" : "🔒"}
          </motion.div>

          <h2
            className="font-display italic mb-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.6rem",
              color: "#BE0822",
              fontWeight: 700,
            }}
          >
            Section privée
          </h2>
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "#7a4a4a",
              fontStyle: "italic",
            }}
          >
            Entre ma date de naissance<br />pour accéder à notre galerie secrète 🤫
          </p>

          {/* Date inputs */}
          <div className="flex gap-3 mb-6">
            {/* Day */}
            <div className="flex-1">
              <label
                className="block text-xs mb-1 tracking-widest"
                style={{ color: "#EFAAB0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
              >
                Jour
              </label>
              <input
                type="number"
                min="1"
                max="31"
                placeholder="JJ"
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                  if (e.target.value.length >= 2) {
                    document.getElementById("month-input")?.focus();
                  }
                }}
                style={inputStyle(day)}
                maxLength={2}
              />
            </div>

            {/* Separator */}
            <div className="flex items-end pb-3">
              <span style={{ color: "#EFAAB0", fontSize: "1.4rem" }}>·</span>
            </div>

            {/* Month */}
            <div className="flex-1">
              <label
                className="block text-xs mb-1 tracking-widest"
                style={{ color: "#EFAAB0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
              >
                Mois
              </label>
              <input
                id="month-input"
                type="number"
                min="1"
                max="12"
                placeholder="MM"
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  if (e.target.value.length >= 2) {
                    document.getElementById("year-input")?.focus();
                  }
                }}
                style={inputStyle(month)}
                maxLength={2}
              />
            </div>

            {/* Separator */}
            <div className="flex items-end pb-3">
              <span style={{ color: "#EFAAB0", fontSize: "1.4rem" }}>·</span>
            </div>

            {/* Year */}
            <div style={{ flex: 1.6 }}>
              <label
                className="block text-xs mb-1 tracking-widest"
                style={{ color: "#EFAAB0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
              >
                Année
              </label>
              <input
                id="year-input"
                type="number"
                min="1900"
                max="2099"
                placeholder="AAAA"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={inputStyle(year)}
                maxLength={4}
              />
            </div>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs mb-4"
                style={{
                  color: "#BE0822",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                Ce n'est pas la bonne date... réessaie 💔
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.button
            onClick={handleSubmit}
            className="w-full py-3 rounded-2xl font-display italic text-white tracking-wider text-base"
            style={{
              background: success
                ? "linear-gradient(135deg, #EFAAB0, #FD9898)"
                : "linear-gradient(135deg, #BE0822, #FD9898)",
              fontFamily: "'Playfair Display', Georgia, serif",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(190,8,34,0.25)",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 12px 30px rgba(190,8,34,0.35)" }}
            whileTap={{ scale: 0.97 }}
          >
            {success ? "✨ Bienvenue Maria !" : "Entrer ♥"}
          </motion.button>

          {/* Hint decoration */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {["❀", "♥", "❀"].map((s, i) => (
              <motion.span
                key={i}
                style={{ color: "#EFAAB0", fontSize: "0.9rem" }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Photo Card ───────────────────────────────────────────────────────────────
function PhotoCard({ img, index, onClick }) {
  const rotations = [-2, 1.5, -1, 2, -1.5, 1];
  const rotation = rotations[index % rotations.length];
  return (
    <motion.div
      className="cursor-pointer"
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      onClick={() => onClick(index)}
    >
      <div
        className="rounded-lg overflow-hidden"
        style={{
          boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(190,8,34,0.1)",
          background: "#fff",
          padding: "8px 8px 40px",
        }}
      >
        <div className="overflow-hidden rounded-sm">
          <img src={img.src} alt={img.caption} className="w-full h-44 object-cover" />
        </div>
        <p className="font-display italic text-sm text-center mt-2 px-1" style={{ color: "#BE0822", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {img.caption}
        </p>
        <p className="text-xs text-center" style={{ color: "#EFAAB0" }}>{img.date}</p>
      </div>
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ img, onClose, onPrev, onNext, current, total }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(30, 5, 10, 0.92)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-lg w-full"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute -top-10 right-0 text-white text-2xl opacity-70 hover:opacity-100">✕</button>
        <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", padding: "10px 10px 50px" }}>
          <img src={img.src} alt={img.caption} className="w-full rounded object-cover" style={{ maxHeight: "60vh" }} />
          <p className="font-display italic text-lg text-center mt-3 px-2" style={{ color: "#BE0822", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{img.caption}</p>
          <p className="text-xs text-center mt-1" style={{ color: "#EFAAB0" }}>{img.date}</p>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={onPrev} className="text-white opacity-70 hover:opacity-100 text-2xl px-3">←</button>
          <span className="text-white opacity-40 text-sm self-center">{current + 1} / {total}</span>
          <button onClick={onNext} className="text-white opacity-70 hover:opacity-100 text-2xl px-3">→</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const [selected, setSelected] = useState(null);
  const handlePrev = () => setSelected((s) => (s === 0 ? GALLERY_IMAGES.length - 1 : s - 1));
  const handleNext = () => setSelected((s) => (s === GALLERY_IMAGES.length - 1 ? 0 : s + 1));

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "linear-gradient(180deg, #FFF9F5 0%, #EED7C8 40%, #FFF9F5 100%)" }}>
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="petal" style={{ left: `${(i * 7.3) % 100}%`, animationDelay: `${(i * 0.3) % 4}s`, animationDuration: `${5 + (i % 5)}s`, fontSize: `${8 + (i % 10)}px`, color: ["#EFAAB0", "#FD9898", "#EED7C8"][i % 3] }}>
          {["✿", "❀"][i % 2]}
        </div>
      ))}
      <div className="max-w-3xl mx-auto px-6 py-16 relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full mb-6" style={{ background: "rgba(239,170,176,0.2)", border: "1px solid #EFAAB0" }}>
            <span style={{ color: "#BE0822", fontSize: "0.75rem" }}>🔓</span>
            <span className="font-display italic text-xs tracking-widest" style={{ color: "#BE0822" }}>hadi binatna — rien que pour toi</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold italic mb-4" style={{ background: "linear-gradient(135deg, #BE0822, #FD9898)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'Playfair Display', Georgia, serif" }}>
            Notre Galerie
          </h2>
          <p className="font-display italic text-base" style={{ color: "#EFAAB0", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Des moments que je chéris pour toujours avec toi 🌹</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, #EFAAB0)" }} />
            <span style={{ color: "#EFAAB0" }}>✦</span>
            <div className="h-px w-24" style={{ background: "linear-gradient(to left, transparent, #EFAAB0)" }} />
          </div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, i) => <PhotoCard key={i} img={img} index={i} onClick={setSelected} />)}
        </div>
        <motion.div className="mt-20 text-center pb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="inline-block rounded-3xl px-8 py-6" style={{ background: "linear-gradient(135deg, #EFAAB0, #FD9898)", boxShadow: "0 12px 40px rgba(190,8,34,0.2)" }}>
            <p className="font-display italic text-xl text-white mb-2">Joyeux anniversaire, Maria 🌹</p>
            <p className="text-white text-sm opacity-80" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Chaque photo raconte notre histoire — la plus belle que je connaisse.</p>
            <div className="flex justify-center gap-2 mt-4">
              {["♥", "♥", "♥"].map((h, i) => (
                <motion.span key={i} className="text-white" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}>{h}</motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {selected !== null && <Lightbox img={GALLERY_IMAGES[selected]} current={selected} total={GALLERY_IMAGES.length} onClose={() => setSelected(null)} onPrev={handlePrev} onNext={handleNext} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="gate" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
          <BirthdayGate onSuccess={() => setUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <Gallery />
        </motion.div>
      )}
    </AnimatePresence>
  );
}