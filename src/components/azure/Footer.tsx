import { Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[var(--midnight-deep)] grain border-t border-[var(--gold)]/40"
    >
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div className="font-display text-[28vw] leading-none text-foreground/[0.04] tracking-tighter">
          AZURE
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-20 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-7 border border-[var(--gold)] rotate-45" />
            <span className="font-display text-2xl tracking-[0.2em]">AZURE</span>
          </div>
          <p className="text-foreground/55 text-sm leading-relaxed mb-6 max-w-xs">
            Architecture for the few who understand silence as luxury.
          </p>
          <div className="flex gap-3">
            {[Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 border border-white/15 hover:border-[var(--gold)] hover:text-[var(--gold)] flex items-center justify-center transition-colors"
                aria-label="Social"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-5">
            Explore
          </div>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li><a className="hover:text-[var(--gold)]" href="#residence">The Residence</a></li>
            <li><a className="hover:text-[var(--gold)]" href="#gallery">Gallery</a></li>
            <li><a className="hover:text-[var(--gold)]" href="#tour">Virtual Tour</a></li>
            <li><a className="hover:text-[var(--gold)]" href="#">Press</a></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-5">
            Legal
          </div>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li><a className="hover:text-[var(--gold)]" href="#">Privacy</a></li>
            <li><a className="hover:text-[var(--gold)]" href="#">Terms</a></li>
            <li><a className="hover:text-[var(--gold)]" href="#">Disclosures</a></li>
            <li><a className="hover:text-[var(--gold)]" href="#">CalDRE #01998765</a></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-5">
            Concierge
          </div>
          <div className="space-y-3 text-sm text-foreground/70">
            <div className="flex items-start gap-3">
              <MapPin size={14} className="mt-0.5 text-[var(--gold)]" />
              <span>9601 Wilshire Blvd<br/>Beverly Hills, CA 90210</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-[var(--gold)]" />
              <span>+1 (310) 555-0192</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-[var(--gold)]" />
              <span>victoria@azureresidences.com</span>
            </div>
          </div>
          <div className="mt-5 h-24 border border-white/10 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=70')] bg-cover bg-center opacity-60" />
        </div>
      </div>
      <div className="relative z-10 border-t border-white/5 px-6 md:px-20 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-foreground/40">
        <div>© 2026 The Azure Residences. All rights reserved.</div>
        <div className="mt-2 md:mt-0">Designed in Beverly Hills · Built for the discerning.</div>
      </div>
    </footer>
  );
}
