"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Building2 } from "lucide-react";
import { EDU_IMAGES } from "@/lib/images";
import { Motion3DCard } from "@/components/Motion3DCard";

const highlights = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To empower India's youth with industry-relevant skills, connecting them with dignified employment and entrepreneurship opportunities across the nation.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "A skilled India where every young person has access to quality training, certification, and placement support — regardless of background or geography.",
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Inclusivity, excellence, and accountability drive every program we deliver in partnership with government bodies and corporate CSR initiatives.",
  },
];

const pillars = [
  { icon: Users, value: "50,000+", label: "Youth Trained" },
  { icon: Building2, value: "1,000+", label: "Training Centres" },
  { icon: Award, value: "15+", label: "Certified Programs" },
];

const gallery = [
  EDU_IMAGES.about.classroom,
  EDU_IMAGES.about.graduation,
  EDU_IMAGES.about.workshop,
];

export function AboutUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about-us" className="py-28 bg-orange-surface relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight">
            About Support Mission India
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Support Mission India is a initiative dedicated to bridging the gap between
            education and employment. We partner with ministries, CSR corporates, and accredited training
            providers to deliver free, certified skill development programs nationwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <Motion3DCard tilt={8} hoverScale={1.02} lift={6} innerClassName="relative rounded-2xl overflow-hidden">
              <div className="rounded-2xl overflow-hidden border border-orange-200 shadow-xl aspect-[4/3]">
                <img
                  src={EDU_IMAGES.about.main.src}
                  alt={EDU_IMAGES.about.main.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl overflow-hidden border-4 border-orange-50 shadow-lg hidden sm:block z-10">
                <img
                  src={EDU_IMAGES.about.graduation.src}
                  alt={EDU_IMAGES.about.graduation.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </Motion3DCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            {gallery.map((img) => (
              <Motion3DCard
                key={img.alt}
                tilt={14}
                hoverScale={1.05}
                lift={8}
                className={img === gallery[1] ? "mt-6" : img === gallery[2] ? "mt-3" : ""}
                innerClassName="relative rounded-xl overflow-hidden border border-orange-200 shadow-md"
              >
                <img src={img.src} alt={img.alt} className="w-full h-36 md:h-44 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-[10px] font-semibold text-white/90 uppercase tracking-wide">{img.topic}</p>
                </div>
              </Motion3DCard>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Motion3DCard
                  tilt={10}
                  hoverScale={1.03}
                  lift={6}
                  innerClassName="p-6 rounded-2xl border border-orange-200 bg-white/80 hover:border-orange-300 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-300 flex items-center justify-center mb-4">
                    <Icon className="text-orange-600" size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-orange-950 mb-2">{item.title}</h3>
                  <p className="text-orange-900/70 text-sm leading-relaxed">{item.desc}</p>
                </Motion3DCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Motion3DCard
                key={pillar.label}
                tilt={12}
                hoverScale={1.04}
                lift={6}
                innerClassName="flex items-center gap-4 p-5 rounded-2xl bg-white/70 border border-orange-200 hover:border-orange-300"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-orange-600" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-black text-orange-950">{pillar.value}</p>
                  <p className="text-sm text-orange-800/65">{pillar.label}</p>
                </div>
              </Motion3DCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
