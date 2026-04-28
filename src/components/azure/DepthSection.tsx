import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSmoothScroll } from "./SmoothScrollContext";

export function DepthSection() {
  const ref = useRef<HTMLDivElement>(null);
  const smooth = useSmoothScroll();
  // Use raw section progress for accurate framing, but smooth via spring already.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Bind to global smooth via combining: still use scrollYProgress (it's per-section).
  // For "spring driven" feel we already have body smoothing visually.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1.5]);
  const midY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["20%", "-25%"]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, 4]);
  const blurFilter = useTransform(blur, (b) => `blur(${b}px) brightness(0.55)`);

  // Tie a slight global drift for added depth
  const globalDrift = useTransform(smooth, (v) => v * -30);

  return (
    <section
      id="residence"
      ref={ref}
      className="relative h-[140vh] w-full overflow-hidden perspective-scene"
    >
      {/* BG layer Z(-4) */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: bgY,
          scale: bgScale,
          filter: blurFilter,
          transform: "translateZ(-4px)",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2400&q=85)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--midnight-deep)] via-transparent to-[var(--midnight-deep)]" />

      {/* Mid layer */}
      <motion.div
        style={{ y: midY, x: globalDrift, transform: "translateZ(-2px)" }}
        className="absolute right-[-4%] top-[18%] w-[55%] aspect-[4/3] hidden md:block will-change-transform"
      >
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
            alt="Pool at dusk"
            loading="lazy"
            className="w-full h-full object-cover shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)]"
          />
          <div className="absolute -bottom-3 -left-3 w-24 h-px bg-[var(--gold)]" />
        </div>
      </motion.div>

      {/* Foreground content Z(0) */}
      <motion.div
        style={{ y: fgY }}
        className="sticky top-0 h-screen flex items-center px-6 md:px-20 z-10"
      >
        <div className="max-w-xl">
          <div className="text-[var(--gold)] uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6">
            01 · The Residence
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.02] font-light">
            A house that
            <br />
            <span className="italic text-[var(--gold)]">listens</span> to light.
          </h2>
          <p className="mt-8 text-foreground/65 text-base md:text-lg leading-relaxed font-light">
            Designed by Atelier Marchand over four years, the Azure Residence threads
            14,200 square feet of cantilevered glass, travertine, and bronze across the
            ridgeline above Coldwater Canyon — a structure carved as much by the sun's
            arc as by its architects.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
            <Stat label="Architect" value="Atelier Marchand" />
            <Stat label="Year" value="2024" />
            <Stat label="Lot" value="2.4 Acres" />
            <Stat label="Elevation" value="1,820 ft" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-[var(--gold)]/40 pl-4">
      <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/45">{label}</div>
      <div className="font-display text-xl mt-1">{value}</div>
    </div>
  );
}
