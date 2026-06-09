"use client"

import { motion } from "framer-motion";

const partners = [
  { name: "NIELIT", abbr: "NL" },
  { name: "UNICEF", abbr: "UC" },
  { name: "Infosys", abbr: "IN" },
  { name: "IBM", abbr: "IB" },
  { name: "Tech Mahindra", abbr: "TM" },
  { name: "MSME", abbr: "MS" },
  { name: "PM VIKAS", abbr: "PV" },
  { name: "PNB", abbr: "PB" },
  { name: "NRLM", abbr: "NR" },
];

const doubled = [...partners, ...partners, ...partners];

export function Marquee() {
  return (
    <section id="partners" className="py-12 border-y border-border bg-background overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 text-center mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Trusted by government bodies & industry leaders
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex items-center w-max"
          style={{
            animation: "marquee-scroll 35s linear infinite",
          }}
        >
          {doubled.map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mx-6 px-5 py-2.5 rounded-full border border-border bg-card hover:border-secondary/40 hover:bg-secondary/5 transition-colors duration-300 cursor-default group flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-black text-primary tracking-wide">{partner.abbr}</span>
              </div>
              <span className="text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
