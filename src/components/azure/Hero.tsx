import { motion, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSmoothScroll } from "./SmoothScrollContext";

export function Hero() {
  const scroll = useSmoothScroll();

  // Background parallax (40% of scroll)
  const bgY = useTransform(scroll, [0, 0.2], ["0%", "40%"]);
  const bgScale = useTransform(scroll, [0, 0.2], [1.1, 1.25]);
  const bgBlur = useTransform(scroll, [0, 0.15], [0, 6]);
  const bgFilter = useTransform(bgBlur, (b) => `blur(${b}px) brightness(0.6)`);

  // Headline recedes (Z-axis camera pull-back)
  const headlineZ = useTransform(scroll, [0, 0.18], [80, -200]);
  const headlineScale = useTransform(scroll, [0, 0.18], [1.15, 0.85]);
  const headlineOpacity = useTransform(scroll, [0, 0.12, 0.2], [1, 0.6, 0]);
  const headlineY = useTransform(scroll, [0, 0.2], [0, -80]);

  const subY = useTransform(scroll, [0, 0.15], [0, -40]);
  const subOpacity = useTransform(scroll, [0, 0.1], [1, 0]);

  const statsY = useTransform(scroll, [0, 0.15], [0, 60]);
  const statsOpacity = useTransform(scroll, [0, 0.1], [1, 0]);

  const stats = [
    { v: "$12.5M", l: "Price" },
    { v: "8", l: "Beds" },
    { v: "12", l: "Baths" },
    { v: "14,200", l: "Sq Ft" },
    { v: "Beverly Hills", l: "Location" },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden perspective-scene grain">
      {/* Background image at translateZ(-2px) scale(3) effect via motion */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: bgY,
          scale: bgScale,
          filter: bgFilter,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "translateZ(-2px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--midnight-deep)]/60 via-transparent to-[var(--midnight-deep)]" />

      {/* Foreground content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 preserve-3d">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-[var(--gold)] uppercase tracking-[0.5em] text-[10px] md:text-xs mb-8"
        >
          A Private Estate · Beverly Hills
        </motion.div>

        <motion.h1
          style={{
            translateZ: headlineZ,
            scale: headlineScale,
            opacity: headlineOpacity,
            y: headlineY,
            willChange: "transform",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="font-display text-center text-foreground leading-[0.95] text-[clamp(3.5rem,11vw,11rem)] font-light"
        >
          The Azure
          <br />
          <span className="italic text-[var(--gold)]">Residences</span>
        </motion.h1>

        <motion.p
          style={{ y: subY, opacity: subOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-xl text-center text-foreground/65 text-base md:text-lg font-light leading-relaxed"
        >
          An architectural sanctuary above the canyons. Where light, glass, and silence
          compose the most coveted address in Los Angeles.
        </motion.p>

        {/* Stat bar */}
        <motion.div
          style={{ y: statsY, opacity: statsOpacity }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-[min(94vw,1100px)] glass rounded-none px-4 md:px-10 py-5 md:py-6 grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-2"
        >
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`text-center ${i !== 0 ? "md:border-l md:border-white/15" : ""}`}
            >
              <div className="font-display text-2xl md:text-3xl text-foreground">{s.v}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-foreground/55 mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[var(--gold)]/70"
        >
          <ChevronDown size={22} />
        </motion.div>
      </div>
    </section>
  );
}
