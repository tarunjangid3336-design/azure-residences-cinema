import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Nav({ onOpenFunnel }: { onOpenFunnel: () => void }) {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between glass-strong"
      style={{ backgroundColor: "color-mix(in oklab, var(--midnight-deep) 40%, transparent)" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 border border-[var(--gold)] rotate-45" />
        <span className="font-display text-2xl tracking-[0.2em] text-foreground">AZURE</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.25em] text-foreground/70">
        <a className="hover:text-[var(--gold)] transition-colors" href="#residence">Residence</a>
        <a className="hover:text-[var(--gold)] transition-colors" href="#gallery">Gallery</a>
        <a className="hover:text-[var(--gold)] transition-colors" href="#tour">Virtual Tour</a>
        <a className="hover:text-[var(--gold)] transition-colors" href="#contact">Contact</a>
      </div>
      <Button
        onClick={onOpenFunnel}
        variant="outline"
        className="border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--midnight-deep)] bg-transparent rounded-none uppercase tracking-[0.2em] text-xs px-5 h-10"
      >
        Private Viewing
      </Button>
    </motion.nav>
  );
}
