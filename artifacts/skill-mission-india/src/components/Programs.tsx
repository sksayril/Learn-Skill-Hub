"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { EDU_IMAGES } from "@/lib/images";
import { Motion3DCard } from "@/components/Motion3DCard";

const getIcon = (category: string) => {
  switch (category) {
    case "NIELIT":
      return LucideIcons.BookOpen;
    case "UNICEF":
      return LucideIcons.Globe;
    case "Government":
      return LucideIcons.Landmark;
    case "MSME":
      return LucideIcons.Factory;
    case "Corporate CSR":
      return LucideIcons.HeartHandshake;
    default:
      return LucideIcons.BookOpen;
  }
};

const getThemeClasses = (accent: string) => {
  switch (accent) {
    case "#00C2FF": // Blue
      return {
        accentBg: "bg-blue-500/20",
        accentText: "text-blue-300",
        accentBorder: "border-blue-400/40"
      };
    case "#00E5A8": // Green / Cyan
      return {
        accentBg: "bg-[#00E5A8]/20",
        accentText: "text-[#00E5A8]",
        accentBorder: "border-[#00E5A8]/40"
      };
    case "#F59E0B": // Orange
      return {
        accentBg: "bg-amber-500/20",
        accentText: "text-amber-300",
        accentBorder: "border-amber-400/40"
      };
    case "#A78BFA": // Purple
      return {
        accentBg: "bg-purple-500/20",
        accentText: "text-purple-300",
        accentBorder: "border-purple-400/40"
      };
    default:
      return {
        accentBg: "bg-blue-500/20",
        accentText: "text-blue-300",
        accentBorder: "border-blue-400/40"
      };
  }
};

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
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("/api/courses");
        const json = await res.json();
        if (json.success) {
          setPrograms(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-orange-600" size={32} />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {programs.map((program, i) => {
              const Icon = getIcon(program.category);
              const isHovered = hovered === i;
              const theme = getThemeClasses(program.accent);
              const imageSrc = program.image || "/images/program_office.png";
              const benefitsList = Array.isArray(program.benefits) ? program.benefits : [];

              return (
                <motion.div key={program._id || i} variants={cardVariants} className="h-full">
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
                      src={imageSrc}
                      alt={program.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/program_office.png";
                      }}
                    />
                    {/* Gradient overlays */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col min-h-[380px]">
                    {/* Bottom content pushes up */}
                    <div className="flex items-start justify-between mb-auto">
                      <div className={`w-12 h-12 rounded-xl ${theme.accentBg} border ${theme.accentBorder} backdrop-blur-sm flex items-center justify-center`}>
                        <Icon className={theme.accentText} size={22} />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${theme.accentBg} ${theme.accentText} ${theme.accentBorder} border backdrop-blur-sm`}>
                        {program.category}
                      </span>
                    </div>

                    {/* Bottom content */}
                    <div className="mt-auto pt-20">
                      <p className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2">
                        {program.subtitle}
                      </p>
                      <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                        {program.title}
                      </h3>

                      <div className="space-y-2 mb-5">
                        {benefitsList.map((b: string, j: number) => (
                          <div key={j} className="flex items-center gap-2">
                            <CheckCircle size={13} className={theme.accentText} />
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
        )}
      </div>
    </section>
  );
}
