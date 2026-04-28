import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VirtualTour({ onOpenFunnel }: { onOpenFunnel: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1.35]);

  return (
    <section
      id="tour"
      ref={ref}
      className="relative h-[110vh] w-full overflow-hidden perspective-scene"
    >
      <motion.div
        style={{
          y: bgY,
          scale: bgScale,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2400&q=85)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "translateZ(-3px)",
        }}
        className="absolute inset-0 will-change-transform"
      />
      <div className="absolute inset-0 bg-[var(--midnight-deep)]/70" />
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="glass-strong w-full max-w-4xl p-10 md:p-16 text-center grain">
          <div className="relative mx-auto w-40 h-40 md:w-52 md:h-52 mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-[var(--gold)]/40"
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--gold)] rounded-full" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--gold)]/50 rounded-full" />
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1 bg-[var(--gold)]/50 rounded-full" />
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-1 bg-[var(--gold)]/50 rounded-full" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 rounded-full border border-[var(--gold)]/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="mx-auto mb-2 w-fit text-[var(--gold)]"
                >
                  <Compass size={26} />
                </motion.div>
                <div className="font-display text-3xl md:text-4xl text-[var(--gold)]">360°</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/60 mt-1">
                  Virtual Walk
                </div>
              </div>
            </div>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
            Step inside before <span className="italic text-[var(--gold)]">stepping in.</span>
          </h2>
          <p className="mt-5 text-foreground/65 max-w-xl mx-auto leading-relaxed">
            A private, fully-immersive walkthrough of every wing — accompanied by our
            head concierge, Victoria Hale.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onOpenFunnel}
              className="relative overflow-hidden bg-transparent border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--midnight-deep)] rounded-none uppercase tracking-[0.25em] text-xs h-12 px-8 group"
            >
              <span className="relative z-10">Schedule Private Tour</span>
              <span className="absolute inset-0 gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <button className="flex items-center gap-3 text-foreground/70 hover:text-[var(--gold)] transition-colors text-xs uppercase tracking-[0.25em]">
              <span className="w-9 h-9 rounded-full border border-current flex items-center justify-center">
                <Play size={12} />
              </span>
              Watch Film (2:14)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
