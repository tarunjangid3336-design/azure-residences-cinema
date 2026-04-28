import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

export function LeadFunnel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [done, setDone] = useState(false);

  const [size, setSize] = useState([5000]);
  const [view, setView] = useState("Ocean");
  const [budget, setBudget] = useState([8]);
  const [date, setDate] = useState("");
  const [financing, setFinancing] = useState("Cash");
  const [urgency, setUrgency] = useState("This Quarter");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const next = () => {
    setDirection(1);
    if (step < 2) setStep(step + 1);
    else setDone(true);
  };
  const prev = () => {
    setDirection(-1);
    if (step > 0) setStep(step - 1);
  };
  const close = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setDone(false);
    }, 400);
  };

  const progress = done ? 100 : ((step + 1) / 3) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          style={{ background: "color-mix(in oklab, var(--midnight-deep) 75%, transparent)" }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong w-full max-w-2xl relative grain max-h-[92vh] overflow-y-auto"
            style={{ backdropFilter: "blur(40px) saturate(160%)" }}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 text-foreground/60 hover:text-[var(--gold)] z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="h-[2px] w-full bg-white/10">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-[var(--gold)]"
              />
            </div>
            <div className="p-8 md:p-12 min-h-[480px]">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
                    className="mx-auto w-20 h-20 rounded-full border-2 border-[var(--gold)] flex items-center justify-center mb-8"
                  >
                    <Check className="text-[var(--gold)]" size={36} />
                  </motion.div>
                  <h3 className="font-display text-3xl md:text-4xl font-light">
                    Thank you, {name || "guest"}.
                  </h3>
                  <p className="text-foreground/65 mt-4 max-w-md mx-auto">
                    Our concierge will contact you within 2 hours to arrange your private
                    viewing.
                  </p>
                  <Button
                    onClick={close}
                    className="mt-10 bg-[var(--gold)] text-[var(--midnight-deep)] hover:bg-[var(--gold-bright)] rounded-none uppercase tracking-[0.25em] text-xs h-11 px-8"
                  >
                    Close
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    initial={{ x: direction * 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction * -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="text-[var(--gold)] uppercase tracking-[0.3em] text-[10px] mb-3">
                      Step {step + 1} of 3
                    </div>
                    {step === 0 && (
                      <>
                        <h3 className="font-display text-3xl md:text-4xl font-light mb-8">
                          Configure your <span className="italic text-[var(--gold)]">residence</span>
                        </h3>
                        <div className="space-y-8">
                          <div>
                            <Label>Preferred unit size</Label>
                            <div className="text-foreground/80 text-sm mb-3">
                              {size[0].toLocaleString()} sq ft
                            </div>
                            <Slider
                              value={size}
                              onValueChange={setSize}
                              min={2000}
                              max={14000}
                              step={200}
                            />
                          </div>
                          <div>
                            <Label>View preference</Label>
                            <div className="grid grid-cols-3 gap-3 mt-2">
                              {["Ocean", "Garden", "City"].map((v) => (
                                <button
                                  key={v}
                                  onClick={() => setView(v)}
                                  className={`p-4 border text-sm uppercase tracking-[0.2em] transition-all ${
                                    view === v
                                      ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                                      : "border-white/15 text-foreground/70 hover:border-white/40"
                                  }`}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label>Budget range</Label>
                            <div className="text-foreground/80 text-sm mb-3">
                              ${budget[0]}M – ${budget[0] + 4}M
                            </div>
                            <Slider
                              value={budget}
                              onValueChange={setBudget}
                              min={2}
                              max={20}
                              step={1}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <h3 className="font-display text-3xl md:text-4xl font-light mb-8">
                          Your <span className="italic text-[var(--gold)]">timeline</span>
                        </h3>
                        <div className="space-y-8">
                          <div>
                            <Label>Preferred move-in date</Label>
                            <Input
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="bg-white/5 border-white/15 rounded-none h-12 mt-2"
                            />
                          </div>
                          <div>
                            <Label>Financing</Label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                              {["Cash", "Mortgage"].map((v) => (
                                <button
                                  key={v}
                                  onClick={() => setFinancing(v)}
                                  className={`p-4 border text-sm uppercase tracking-[0.2em] transition-all ${
                                    financing === v
                                      ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                                      : "border-white/15 text-foreground/70 hover:border-white/40"
                                  }`}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label>Urgency</Label>
                            <div className="grid grid-cols-3 gap-3 mt-2">
                              {["This Month", "This Quarter", "Exploring"].map((v) => (
                                <button
                                  key={v}
                                  onClick={() => setUrgency(v)}
                                  className={`p-3 text-xs border uppercase tracking-[0.18em] transition-all ${
                                    urgency === v
                                      ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                                      : "border-white/15 text-foreground/70 hover:border-white/40"
                                  }`}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <h3 className="font-display text-3xl md:text-4xl font-light mb-8">
                          Where shall we <span className="italic text-[var(--gold)]">reach you?</span>
                        </h3>
                        <div className="space-y-5">
                          <div>
                            <Label>Full name</Label>
                            <Input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Victoria Hale"
                              className="bg-white/5 border-white/15 rounded-none h-12 mt-2"
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-5">
                            <div>
                              <Label>Email</Label>
                              <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@domain.com"
                                className="bg-white/5 border-white/15 rounded-none h-12 mt-2"
                              />
                            </div>
                            <div>
                              <Label>Phone</Label>
                              <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 (310) 555-0192"
                                className="bg-white/5 border-white/15 rounded-none h-12 mt-2"
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Anything else?</Label>
                            <Textarea
                              value={msg}
                              onChange={(e) => setMsg(e.target.value)}
                              rows={4}
                              placeholder="Tell us about your ideal viewing..."
                              className="bg-white/5 border-white/15 rounded-none mt-2 resize-none"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}

              {!done && (
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
                  <Button
                    onClick={prev}
                    disabled={step === 0}
                    variant="ghost"
                    className="text-foreground/60 hover:text-[var(--gold)] uppercase tracking-[0.25em] text-xs disabled:opacity-30"
                  >
                    <ArrowLeft size={14} className="mr-2" /> Back
                  </Button>
                  <Button
                    onClick={next}
                    className="bg-[var(--gold)] text-[var(--midnight-deep)] hover:bg-[var(--gold-bright)] rounded-none uppercase tracking-[0.25em] text-xs h-11 px-8"
                  >
                    {step === 2 ? "Submit" : "Continue"} <ArrowRight size={14} className="ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/55 mb-1">
      {children}
    </div>
  );
}
