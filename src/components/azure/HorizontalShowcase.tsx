import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

const properties = [
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    name: "The Skybridge Suite",
    spec: "4,200 sq ft · Ocean View",
    price: "$3.2M",
  },
  {
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    name: "Maison Coldwater",
    spec: "5,800 sq ft · 4 Bed",
    price: "$4.7M",
  },
  {
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
    name: "Atelier Penthouse",
    spec: "6,400 sq ft · Roof Terrace",
    price: "$5.9M",
  },
  {
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    name: "Villa Azure",
    spec: "8,100 sq ft · Infinity Pool",
    price: "$8.4M",
  },
  {
    img: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1600&q=85",
    name: "The Glass Pavilion",
    spec: "3,600 sq ft · Garden",
    price: "$2.8M",
  },
];

export function HorizontalShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const xSpring = useSpring(x, { stiffness: 80, damping: 22, restDelta: 0.001 });

  return (
    <section ref={ref} className="relative h-[400vh] bg-[var(--midnight-deep)]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-20 mb-10">
          <div className="text-[var(--gold)] uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4">
            02 · Collection
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light leading-tight max-w-2xl">
            Five residences. <span className="italic text-[var(--gold)]">One philosophy.</span>
          </h2>
        </div>
        <motion.div style={{ x: xSpring }} className="flex gap-8 px-12 will-change-transform">
          {properties.map((p) => (
            <TiltCard key={p.name} {...p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TiltCard({ img, name, spec, price }: (typeof properties)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxs = useSpring(rx, { stiffness: 200, damping: 18 });
  const rys = useSpring(ry, { stiffness: 200, damping: 18 });

  const shadow = useTransform([rxs, rys], (vals) => {
    const [x, y] = vals as [number, number];
    return `${-y * 1.2}px ${x * 1.2 + 30}px 80px -20px rgba(0,0,0,0.65), ${-y * 0.4}px ${
      x * 0.4
    }px 30px -10px color-mix(in oklab, var(--gold) 24%, transparent)`;
  });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 18);
    rx.set(-py * 18);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rxs, rotateY: rys, boxShadow: shadow, perspective: 800 }}
      className="tilt-3d shrink-0 w-[78vw] md:w-[44vw] lg:w-[36vw] aspect-[4/5] relative preserve-3d bg-[var(--card)] overflow-hidden"
    >
      <div className="absolute inset-0" style={{ transform: "translateZ(0)" }}>
        <img
          src={img}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight-deep)]/95 via-[var(--midnight-deep)]/10 to-transparent" />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 p-7 md:p-10"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="w-12 h-px bg-[var(--gold)] mb-4" />
        <div className="font-display text-2xl md:text-3xl font-light">{name}</div>
        <div className="flex items-end justify-between mt-2">
          <div className="text-foreground/55 text-xs uppercase tracking-[0.2em]">{spec}</div>
          <div className="font-display text-xl text-[var(--gold)]">{price}</div>
        </div>
      </div>
    </motion.div>
  );
}
