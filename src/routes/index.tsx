import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import { SmoothScrollContext } from "@/components/azure/SmoothScrollContext";
import { Nav } from "@/components/azure/Nav";
import { Hero } from "@/components/azure/Hero";
import { DepthSection } from "@/components/azure/DepthSection";
import { HorizontalShowcase } from "@/components/azure/HorizontalShowcase";
import { Gallery } from "@/components/azure/Gallery";
import { VirtualTour } from "@/components/azure/VirtualTour";
import { Footer } from "@/components/azure/Footer";
import { LeadFunnel } from "@/components/azure/LeadFunnel";
import { AIConcierge } from "@/components/azure/AIConcierge";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Azure Residences — Beverly Hills" },
      {
        name: "description",
        content:
          "An architectural sanctuary above Coldwater Canyon. 14,200 sq ft of cantilevered glass, travertine, and bronze. By appointment only.",
      },
      { property: "og:title", content: "The Azure Residences — Beverly Hills" },
      {
        property: "og:description",
        content: "Silent luxury in Beverly Hills. By appointment only.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  }),
});

function Index() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <SmoothScrollContext.Provider value={smooth}>
      <div className="dark relative bg-[var(--midnight-deep)] text-foreground">
        <Nav onOpenFunnel={() => setFunnelOpen(true)} />
        <main>
          <Hero />
          <DepthSection />
          <HorizontalShowcase />
          <Gallery />
          <VirtualTour onOpenFunnel={() => setFunnelOpen(true)} />
        </main>
        <Footer />
        <LeadFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} />
        <AIConcierge />
      </div>
    </SmoothScrollContext.Provider>
  );
}
