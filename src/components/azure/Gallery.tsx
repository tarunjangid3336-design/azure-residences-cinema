import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const items = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=85",
    name: "Infinity Edge",
    size: "2,400 sq ft",
    price: "$1.9M",
    h: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=85",
    name: "Bronze Hall",
    size: "1,800 sq ft",
    price: "$1.4M",
    h: "med",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85",
    name: "Cliffside Suite",
    size: "3,100 sq ft",
    price: "$2.6M",
    h: "med",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
    name: "Library Wing",
    size: "1,200 sq ft",
    price: "$0.9M",
    h: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    name: "Master Pavilion",
    size: "2,800 sq ft",
    price: "$2.1M",
    h: "med",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fe6ba68?auto=format&fit=crop&w=1400&q=85",
    name: "Garden House",
    size: "1,600 sq ft",
    price: "$1.2M",
    h: "tall",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative px-6 md:px-20 py-32 bg-[var(--midnight)]">
      <div className="mb-16 max-w-3xl">
        <div className="text-[var(--gold)] uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4">
          03 · Interiors
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-light leading-tight">
          Cinematic <span className="italic text-[var(--gold)]">interiors</span>, composed in silence.
        </h2>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 [column-fill:_balance]">
        {items.map((it, i) => (
          <GalleryCard key={it.name} {...it} index={i} />
        ))}
      </div>
    </section>
  );
}

function GalleryCard({
  src,
  name,
  size,
  price,
  h,
  index,
}: {
  src: string;
  name: string;
  size: string;
  price: string;
  h: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxs = useSpring(rx, { stiffness: 220, damping: 20 });
  const rys = useSpring(ry, { stiffness: 220, damping: 20 });

  const aspect =
    h === "tall" ? "aspect-[3/4]" : h === "med" ? "aspect-[4/5]" : "aspect-square";

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 md:mb-8 break-inside-avoid"
      style={{ perspective: 900 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rxs, rotateY: rys, transformStyle: "preserve-3d" }}
        className="tilt-3d group relative overflow-hidden bg-black"
      >
        <div className={`relative ${aspect}`}>
          <img
            src={src}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.04] [filter:blur(0px)] group-[&:not(:hover)]:[filter:blur(0px)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight-deep)] via-transparent to-transparent opacity-70" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-8 h-px bg-[var(--gold)] mb-3" />
          <div className="font-display text-2xl">{name}</div>
          <div className="flex justify-between mt-1 text-xs uppercase tracking-[0.2em] text-foreground/65">
            <span>{size}</span>
            <span className="text-[var(--gold)]">{price}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
