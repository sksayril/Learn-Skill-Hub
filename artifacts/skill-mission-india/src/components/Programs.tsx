"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Globe, Landmark, Factory, HeartHandshake, ArrowUpRight, CheckCircle } from "lucide-react";
import { EDU_IMAGES } from "@/lib/images";
import { Motion3DCard } from "@/components/Motion3DCard";

const programs = [
  {
    icon: BookOpen,
    title: "Office Automation & Accounting",
    subtitle: "NIELIT Certified Program",
    category: "NIELIT",
    image: EDU_IMAGES.programs.officeAutomation,
    gradient: "from-blue-900/90 via-blue-800/70 to-transparent",
    accent: "#00C2FF",
    accentBg: "bg-blue-500/20",
    accentText: "text-blue-300",
    accentBorder: "border-blue-400/40",
    benefits: ["MS Office & Tally ERP", "DTP & Design Tools", "Govt. Certification"],
    seats: "240 Seats Available",
    duration: "6 Months",
  },
  {
    icon: Globe,
    title: "UNICEF E-Placement",
    subtitle: "Pan-India Digital Employment",
    category: "UNICEF",
    image: EDU_IMAGES.programs.unicef,
    gradient: "from-cyan-900/90 via-cyan-800/70 to-transparent",
    accent: "#00E5A8",
    accentBg: "bg-cyan-500/20",
    accentText: "text-cyan-300",
    accentBorder: "border-cyan-400/40",
    benefits: ["Digital Employment Platform", "Pan-India Placement", "Industry Mentorship"],
    seats: "180 Seats Available",
    duration: "3 Months",
  },
  {
    icon: Landmark,
    title: "PM VIKAS",
    subtitle: "PM Vishwakarma Scheme",
    category: "Government",
    image: EDU_IMAGES.programs.pmVikas,
    gradient: "from-amber-900/90 via-amber-800/70 to-transparent",
    accent: "#F59E0B",
    accentBg: "bg-amber-500/20",
    accentText: "text-amber-300",
    accentBorder: "border-amber-400/40",
    benefits: ["Artisan & Craftsman Training", "Financial Assistance", "Tool Kit Support"],
    seats: "320 Seats Available",
    duration: "6 Months",
  },
  {
    icon: Factory,
    title: "MSME Skill Development",
    subtitle: "Ministry of MSME",
    category: "MSME",
    image: EDU_IMAGES.programs.msme,
    gradient: "from-emerald-900/90 via-emerald-800/70 to-transparent",
    accent: "#00E5A8",
    accentBg: "bg-emerald-500/20",
    accentText: "text-emerald-300",
    accentBorder: "border-emerald-400/40",
    benefits: ["Manufacturing & MSME Focus", "Entrepreneurship Support", "Bank Loan Linkage"],
    seats: "150 Seats Available",
    duration: "4 Months",
  },
  {
    icon: HeartHandshake,
    title: "CSR Skill Programs",
    subtitle: "IBM · Infosys · Tech Mahindra",
    category: "Corporate CSR",
    image: EDU_IMAGES.programs.csr,
    gradient: "from-purple-900/90 via-purple-800/70 to-transparent",
    accent: "#A78BFA",
    accentBg: "bg-purple-500/20",
    accentText: "text-purple-300",
    accentBorder: "border-purple-400/40",
    benefits: ["Industry-Funded Training", "Placement Guarantee", "Stipend During Training"],
    seats: "200 Seats Available",
    duration: "3–6 Months",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Programs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<number | null>(null);

  const handleApply = (programTitle: string) => {
    const event = new CustomEvent("select-program", { detail: programTitle });
    window.dispatchEvent(event);
    const element = document.getElementById("apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="our-program" className="py-28 bg-orange-surface-alt relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(0,194,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,229,168,0.08) 0%, transparent 60%)"
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/15 text-orange-700 border border-orange-300 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Govt. & CSR Programs
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-orange-950 mb-5 leading-tight">
            Our Programs
          </h2>
          <p className="text-orange-900/60 text-lg max-w-2xl mx-auto">
            Government-approved, industry-recognized training — fully funded for eligible candidates.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {programs.map((program, i) => {
            const Icon = program.icon;
            const isHovered = hovered === i;
            return (
              <motion.div key={i} variants={cardVariants} className="h-full">
              <Motion3DCard
                tilt={16}
                hoverScale={1.03}
                lift={12}
                innerClassName="relative group rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/25 h-full min-h-[380px]"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  boxShadow: isHovered ? `0 30px 60px -15px ${program.accent}40` : "0 4px 20px rgba(0,0,0,0.25)",
                }}
                data-testid={`card-program-${i}`}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img
                    src={program.image.src}
                    alt={program.image.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col min-h-[380px]">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-auto">
                    <div className={`w-12 h-12 rounded-xl ${program.accentBg} border ${program.accentBorder} backdrop-blur-sm flex items-center justify-center`}>
                      <Icon className={program.accentText} size={22} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${program.accentBg} ${program.accentText} ${program.accentBorder} border backdrop-blur-sm`}>
                      {program.category}
                    </span>
                  </div>

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-1">
                    {program.image.topic}
                  </p>

                  {/* Bottom content */}
                  <div className="mt-auto pt-20">
                    <p className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2">
                      {program.subtitle}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                      {program.title}
                    </h3>

                    <div className="space-y-2 mb-5">
                      {program.benefits.map((b, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <CheckCircle size={13} className={program.accentText} />
                          <span className="text-white/75 text-sm">{b}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-3">
                        <span className="text-xs text-white/50 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {program.duration}
                        </span>
                        <span className="text-xs text-white/50 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                          Free
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full rounded-xl font-bold text-sm py-5 transition-all duration-300 group/btn"
                      style={{
                        background: isHovered ? program.accent : "rgba(255,255,255,0.15)",
                        color: isHovered ? "#0B1F4D" : "white",
                        backdropFilter: "blur(8px)",
                        border: `1px solid ${isHovered ? program.accent : "rgba(255,255,255,0.2)"}`,
                      }}
                      data-testid={`button-apply-program-${i}`}
                      onClick={() => handleApply(program.title)}
                    >
                      Apply for This Program
                      <ArrowUpRight size={14} className="ml-1.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Motion3DCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
