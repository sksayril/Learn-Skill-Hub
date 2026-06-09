"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gift, Award, Briefcase, Monitor, IndianRupee, Rocket } from "lucide-react";

const benefits = [
  {
    icon: Gift,
    title: "Free Training",
    desc: "Zero cost, fully sponsored programs funded by government and CSR partners. No hidden charges ever.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80&auto=format&fit=crop",
    accent: "#00C2FF",
    gradientFrom: "from-blue-900",
    span: "md:col-span-2",
  },
  {
    icon: Award,
    title: "Government Certification",
    desc: "Nationally recognized certificates from NIELIT, NSDC and other accredited government bodies.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80&auto=format&fit=crop",
    accent: "#F59E0B",
    gradientFrom: "from-amber-900",
    span: "",
  },
  {
    icon: Briefcase,
    title: "Placement Support",
    desc: "Dedicated placement cell connecting graduates with 500+ employer partners.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop",
    accent: "#00E5A8",
    gradientFrom: "from-emerald-900",
    span: "",
  },
  {
    icon: Monitor,
    title: "Digital Skills",
    desc: "Hands-on training in latest digital tools, software, and technology platforms.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&auto=format&fit=crop",
    accent: "#A78BFA",
    gradientFrom: "from-purple-900",
    span: "",
  },
  {
    icon: IndianRupee,
    title: "Stipend Opportunities",
    desc: "Earn while you learn — monthly stipends of ₹1,500–4,000 in select programs.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop",
    accent: "#34D399",
    gradientFrom: "from-teal-900",
    span: "",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship",
    desc: "Business development mentorship, bank loan linkage and startup seed funding support.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80&auto=format&fit=crop",
    accent: "#F472B6",
    gradientFrom: "from-pink-900",
    span: "md:col-span-2",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="benefits" className="py-28 bg-[#0A0F1E] relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 0%, rgba(0,229,168,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(0,194,255,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/15 text-accent border border-accent/25 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Why Join Us
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5">
            Everything You Get —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
              Free
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Fully sponsored by Government of India and Industry CSR partners.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]"
        >
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className={`relative rounded-2xl overflow-hidden group cursor-default border border-white/10 hover:border-white/25 transition-all duration-500 ${b.span}`}
                style={{
                  boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
                }}
                data-testid={`card-benefit-${i}`}
              >
                {/* Background image */}
                <img
                  src={b.image}
                  alt={b.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t ${b.gradientFrom}/80 via-black/50 to-black/20`} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 120%, ${b.accent}25 0%, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20"
                    style={{ background: `${b.accent}25` }}
                  >
                    <Icon size={22} style={{ color: b.accent }} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>

                {/* Accent bottom border */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${b.accent}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
