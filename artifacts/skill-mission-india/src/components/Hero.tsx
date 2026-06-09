"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, GraduationCap, Users, Building, Star } from "lucide-react";

const words = ["Skills", "Employment", "Entrepreneurship", "Future"];

const stats = [
  { icon: GraduationCap, value: "50,000+", label: "Students Trained", color: "from-secondary to-cyan-400" },
  { icon: Building, value: "1,000+", label: "Training Centres", color: "from-accent to-emerald-400" },
  { icon: Users, value: "10,000+", label: "Placements Made", color: "from-purple-400 to-pink-400" },
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
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center scale-110"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F4D]/90 via-[#0B1F4D]/75 to-[#0B1F4D]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D]/60 via-transparent to-[#0B1F4D]/30" />
      </motion.div>

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,194,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] z-0 pointer-events-none" />

      <motion.div style={{ opacity }} className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center md:justify-start mb-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Government of India — Skill Development Initiative
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white leading-[1.05]">
              Empowering India{" "}
              <br className="hidden md:block" />
              Through{" "}
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-cyan-300 to-accent"
              >
                {words[currentWord]}
              </motion.span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              Government, CSR and Industry-backed training programs connecting 
              <strong className="text-white/90 font-semibold"> India's youth </strong>
              with skills, jobs and entrepreneurship opportunities nationwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-secondary to-cyan-400 hover:from-cyan-400 hover:to-secondary text-[#0B1F4D] font-bold text-base px-8 py-6 rounded-2xl shadow-[0_0_40px_-8px_hsl(198,100%,50%)] hover:shadow-[0_0_60px_-5px_hsl(198,100%,50%)] transition-all hover:-translate-y-1 group"
                data-testid="button-hero-apply"
              >
                <span className="relative z-10">Apply Now — It's Free</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 font-semibold text-base px-8 py-6 rounded-2xl transition-all hover:-translate-y-1"
                data-testid="button-hero-partner"
              >
                Become Training Partner
              </Button>
            </div>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5 group"
                  data-testid={`stat-hero-${i}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="text-white" size={22} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <p className="text-xs text-white/60 font-medium">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-10"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
        <ChevronDown size={16} className="opacity-60" />
      </motion.div>
    </section>
  );
}
