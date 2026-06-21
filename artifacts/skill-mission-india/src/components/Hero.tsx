"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, GraduationCap, Users, Building, Star } from "lucide-react";
import { EDU_IMAGES } from "@/lib/images";
import { Motion3DCard } from "@/components/Motion3DCard";

const words = ["Skills", "Employment", "Entrepreneurship", "Future"];

const stats = [
  { icon: GraduationCap, value: "50,000+", label: "Students Trained", color: "from-orange-500 to-amber-400" },
  { icon: Building, value: "1,000+", label: "Training Centres", color: "from-amber-500 to-orange-400" },
  { icon: Users, value: "10,000+", label: "Placements Made", color: "from-orange-600 to-red-400" },
];

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-orange-surface">
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <img
          src={EDU_IMAGES.hero.src}
          alt={EDU_IMAGES.hero.alt}
          className="w-full h-full object-cover object-center scale-110 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4E6]/95 via-[#FFE8CC]/90 to-[#FFD4A8]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/80 via-transparent to-amber-100/60" />
      </motion.div>

      <div
        className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(234,88,12,1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-orange-300/30 rounded-full blur-[120px] z-0 pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-300/30 rounded-full blur-[100px] z-0 pointer-events-none"
      />

      <motion.div style={{ opacity }} className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center md:justify-start mb-8"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-orange-200 text-orange-900 text-sm font-medium shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              Government of India — Skill Development Initiative
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-500 text-amber-500" />)}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-orange-950 leading-[1.05]">
              Empowering India{" "}
              <br className="hidden md:block" />
              Through{" "}
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500"
              >
                {words[currentWord]}
              </motion.span>
            </h1>

            <p className="text-lg md:text-xl text-orange-900/75 mb-10 max-w-2xl leading-relaxed">
              Government, CSR and Industry-backed training programs connecting
              <strong className="text-orange-950 font-semibold"> India's youth </strong>
              with skills, jobs and entrepreneurship opportunities nationwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 flex-wrap">
              <Button
                size="lg"
                className="btn-orange text-base px-8 py-6 rounded-2xl hover:-translate-y-1"
                data-testid="button-hero-apply"
                onClick={() => {
                  const element = document.getElementById("apply");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Apply Now — It's Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-300 bg-white/70 backdrop-blur-sm text-orange-900 hover:bg-orange-50 hover:border-orange-400 font-semibold text-base px-8 py-6 rounded-2xl transition-all hover:-translate-y-1"
                data-testid="button-hero-download"
                asChild
              >
                <a href="/smiv1.apk" download>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download App
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-300 bg-white/70 backdrop-blur-sm text-orange-900 hover:bg-orange-50 hover:border-orange-400 font-semibold text-base px-8 py-6 rounded-2xl transition-all hover:-translate-y-1"
                data-testid="button-hero-partner"
                onClick={() => window.open("https://app.smi.in.net/agent/login", "_blank")}
              >
                Become Training Partner
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Motion3DCard
                  key={i}
                  tilt={12}
                  hoverScale={1.04}
                  lift={8}
                  innerClassName="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md border border-orange-200 p-5 group shadow-md shadow-orange-200/40"
                  data-testid={`stat-hero-${i}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="text-white" size={22} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-orange-950">{stat.value}</p>
                      <p className="text-xs text-orange-800/65 font-medium">{stat.label}</p>
                    </div>
                  </div>
                </Motion3DCard>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-orange-800/50 z-10"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-orange-300 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 bg-orange-500/60 rounded-full" />
        </motion.div>
        <ChevronDown size={16} className="opacity-60" />
      </motion.div>
    </section>
  );
}
