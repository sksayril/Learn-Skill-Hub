"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { GraduationCap, Building2, FolderOpen, Briefcase } from "lucide-react";
import { EDU_IMAGES } from "@/lib/images";
import { Motion3DCard } from "@/components/Motion3DCard";

const stats = [
  { value: 50000, label: "Students Trained", suffix: "+", icon: GraduationCap, color: "#EA580C" },
  { value: 1000, label: "Training Centres", suffix: "+", icon: Building2, color: "#D97706" },
  { value: 100, label: "Projects Completed", suffix: "+", icon: FolderOpen, color: "#F59E0B" },
  { value: 10000, label: "Placements Made", suffix: "+", icon: Briefcase, color: "#C2410C" },
];

function CountUp({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    v >= 1000 ? `${(v / 1000).toFixed(0)}K${suffix}` : `${Math.round(v)}${suffix}`
  );
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 2.2, ease: "easeOut" });
    return controls.stop;
  }, [inView, count, target]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-black" style={{ color }}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={EDU_IMAGES.stats.src}
          alt={EDU_IMAGES.stats.alt}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4E6]/92 via-[#FFE8CC]/88 to-[#FFD4A8]/90" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(234,88,12,0.8) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/15 text-orange-800 border border-orange-300 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-orange-950 mb-4">
            Numbers That Define Us
          </h2>
          <p className="text-orange-900/60 text-lg max-w-xl mx-auto">
            A movement growing stronger with every student we empower.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
                data-testid={`stat-${i}`}
              >
                <Motion3DCard
                  tilt={14}
                  hoverScale={1.04}
                  lift={10}
                  innerClassName="relative rounded-2xl p-6 md:p-8 text-center border border-orange-200 bg-white/80 backdrop-blur-sm overflow-hidden hover:border-orange-300"
                  style={{ boxShadow: "0 8px 30px rgba(234,88,12,0.08)" }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 100%, ${stat.color}18 0%, transparent 70%)` }}
                  />

                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center border border-orange-200"
                    style={{ background: `${stat.color}20` }}
                  >
                    <Icon size={22} style={{ color: stat.color }} />
                  </div>

                  <div className="relative">
                    <CountUp target={stat.value} suffix={stat.suffix} color={stat.color} />
                  </div>
                  <p className="text-orange-900/65 font-medium text-sm tracking-wide mt-2">
                    {stat.label}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                  />
                </Motion3DCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
