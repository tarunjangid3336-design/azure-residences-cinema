import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const PHONE = "13105550192";
const replies = [
  { label: "Schedule a Tour", text: "Hi, I'd like to schedule a private tour of The Azure Residences." },
  { label: "Pricing Details", text: "Could you share pricing details for The Azure Residences?" },
  { label: "Location Info", text: "Could you share location and access details?" },
  { label: "Speak to an Agent", text: "I'd like to speak directly with an agent." },
];

export function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [text, setText] = useState("");

  const toggle = () => {
    setOpen((o) => !o);
    setSeen(true);
  };

  const send = (msg: string) => {
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <motion.button
        onClick={toggle}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 180, damping: 16 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-[var(--gold)] text-[var(--midnight-deep)] flex items-center justify-center shadow-2xl pulse-glow"
        aria-label="Open AI Concierge"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="m" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {!seen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center border-2 border-[var(--midnight-deep)]">
            1
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[90] w-[min(92vw,380px)] glass-strong rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-white/10 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center text-[var(--midnight-deep)] font-display text-lg">
                  A
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--midnight-deep)]" />
              </div>
              <div>
                <div className="font-medium text-sm">Azure AI Concierge</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-green-400">Online</div>
              </div>
            </div>
            <div className="p-5 space-y-3 max-h-[280px] overflow-y-auto">
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[var(--gold)]/80 shrink-0 flex items-center justify-center text-[var(--midnight-deep)] text-[11px] font-medium">
                  A
                </div>
                <div className="bg-white/8 px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm leading-relaxed max-w-[80%]">
                  Welcome to The Azure Residences. How may I assist you today?
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {replies.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => send(r.text)}
                    className="text-xs px-3 py-1.5 border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--midnight-deep)] transition-colors rounded-full"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 border-t border-white/10 flex items-center gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && text && (send(text), setText(""))}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 h-10 text-sm outline-none focus:border-[var(--gold)]"
              />
              <button
                onClick={() => text && (send(text), setText(""))}
                className="w-10 h-10 rounded-full bg-[var(--gold)] text-[var(--midnight-deep)] flex items-center justify-center hover:bg-[var(--gold-bright)]"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
