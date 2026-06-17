"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  BookOpen, 
  Cpu, 
  Eye, 
  Users, 
  Scale, 
  Heart, 
  Award,
  Target,
  Sparkles
} from "lucide-react";
import { Motion3DCard } from "@/components/Motion3DCard";

const coreValues = [
  {
    icon: BookOpen,
    title: "Empowerment through Education",
    desc: "Opening doors to knowledge and lifelong skill building for personal and vocational growth."
  },
  {
    icon: Cpu,
    title: "Innovation and Digital Inclusion",
    desc: "Bridging the digital divide by introducing tech, smart labs, and CBT solutions to everyone."
  },
  {
    icon: Eye,
    title: "Integrity and Transparency",
    desc: "Delivering honest, accountable, and transparent program evaluations and services."
  },
  {
    icon: Users,
    title: "Community-Centric Development",
    desc: "Structuring localized initiatives that align directly with the needs of local communities."
  },
  {
    icon: Scale,
    title: "Equal Opportunity for All",
    desc: "Providing fair access, learning environments, and placements regardless of background."
  },
  {
    icon: Heart,
    title: "Sustainable Social Impact",
    desc: "Targeting long-term welfare, self-reliance, and health advancements nationwide."
  },
  {
    icon: Award,
    title: "Excellence in Assessment and Training",
    desc: "Upholding high educational standards, certified training curricula, and rigorous evaluations."
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function WhySupport() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="why-support-us" className="py-28 bg-orange-surface-alt relative overflow-hidden" ref={ref}>
      {/* Decorative Gradients */}
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(234,88,12,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(249,115,22,0.06) 0%, transparent 60%)"
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/15 text-orange-700 border border-orange-300 text-xs font-bold tracking-[0.2em] uppercase mb-5 animate-pulse">
            Our Purpose & Core Values
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-orange-950 mb-5 leading-tight">
            Why Support Mission India
          </h2>
          <p className="text-orange-900/60 text-lg max-w-2xl mx-auto">
            Fostering an ecosystem where technology, education, and social responsibility work together to uplift local communities.
          </p>
        </motion.div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Mission & Vision */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Motion3DCard
                tilt={8}
                hoverScale={1.02}
                lift={5}
                innerClassName="p-8 rounded-2xl border border-orange-200 bg-white/90 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-300 flex items-center justify-center mb-6">
                  <Target className="text-orange-600" size={24} />
                </div>
                <h3 className="text-2xl font-black text-orange-950 mb-4">Our Mission</h3>
                <p className="text-orange-900/80 text-sm leading-relaxed mb-4">
                  At Support Mission India, our mission is to empower individuals and communities through education, skill development, digitization, Computer-Based Testing (CBT), healthcare awareness, and social welfare initiatives. We are committed to creating opportunities that enhance knowledge, employability, digital inclusion, and community well-being.
                </p>
                <p className="text-orange-900/80 text-sm leading-relaxed">
                  By collaborating with educational institutions, government initiatives, corporate partners, and local communities, we strive to build a more skilled, informed, and self-reliant society. Through innovation, transparency, and sustainable development practices, we aim to make a meaningful impact on the lives of people across India.
                </p>
              </Motion3DCard>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Motion3DCard
                tilt={8}
                hoverScale={1.02}
                lift={5}
                innerClassName="p-8 rounded-2xl border border-orange-200 bg-white/90 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-300 flex items-center justify-center mb-6">
                  <Sparkles className="text-orange-600" size={24} />
                </div>
                <h3 className="text-2xl font-black text-orange-950 mb-4">Our Vision</h3>
                <p className="text-orange-900/80 text-sm leading-relaxed mb-4">
                  Our vision is to become a leading catalyst for social transformation by fostering an ecosystem where education, technology, skill development, and social responsibility work together to create lasting change.
                </p>
                <p className="text-orange-900/80 text-sm leading-relaxed">
                  We envision an India where every individual has access to quality learning opportunities, digital resources, fair assessment systems, and community development programs that enable them to achieve their full potential. Through our initiatives, we aspire to contribute towards building a digitally empowered, socially responsible, and economically progressive nation.
                </p>
              </Motion3DCard>
            </motion.div>
          </div>

          {/* Right Column: Core Values */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <h3 className="text-2xl font-black text-orange-950 mb-6 px-1 flex items-center gap-3">
                Our Core Values
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreValues.map((val) => {
                  const Icon = val.icon;
                  return (
                    <motion.div key={val.title} variants={itemVariants}>
                      <Motion3DCard
                        tilt={10}
                        hoverScale={1.03}
                        lift={6}
                        innerClassName="p-5 rounded-xl border border-orange-200 bg-white/70 hover:bg-white transition-all duration-300 flex gap-4 h-full"
                      >
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="text-orange-600" size={20} />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-orange-950 mb-1 leading-snug">
                            {val.title}
                          </h4>
                          <p className="text-orange-900/65 text-xs leading-relaxed">
                            {val.desc}
                          </p>
                        </div>
                      </Motion3DCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bottom Tagline Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 border border-orange-200 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-orange-500/15 relative overflow-hidden"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "20px 20px"
            }}
          />
          <h4 className="text-2xl md:text-4xl font-extrabold tracking-wide leading-tight mb-4 drop-shadow-md">
            "Transforming Lives Through Education, Technology, Skill Development, and Social Responsibility." 🇮🇳
          </h4>
          <p className="text-white/80 font-medium text-sm md:text-base tracking-wider uppercase">
            Support Mission India Initiative
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}
