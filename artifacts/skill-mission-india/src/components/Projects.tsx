"use client";
 
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Droplet, 
  Leaf, 
  Zap, 
  GraduationCap, 
  School, 
  Cpu, 
  Activity, 
  HeartHandshake, 
  ArrowUpRight, 
  CheckCircle,
  FolderOpen
} from "lucide-react";
import { EDU_IMAGES } from "@/lib/images";
import { Motion3DCard } from "@/components/Motion3DCard";

const categories = [
  "All",
  "Agriculture",
  "Education",
  "Healthcare & Hygiene",
  "Infrastructure & Tech"
];

const projectsData = [
  {
    icon: Droplet,
    title: "BKSY (Banglar Krishi Sech Yojana)",
    subtitle: "Bengal Agricultural Irrigation Scheme",
    category: "Agriculture",
    image: EDU_IMAGES.projects.bksy,
    gradient: "from-blue-900/90 via-blue-800/70 to-transparent",
    accent: "#00C2FF",
    accentBg: "bg-blue-500/20",
    accentText: "text-blue-300",
    accentBorder: "border-blue-400/40",
    benefits: ["Micro-irrigation installation", "Solar water pump subsidy", "Water conservation guidelines"],
    stats: "1,200+ Pumps Distributed",
  },
  {
    icon: Leaf,
    title: "Matir Kotha",
    subtitle: "Farmer Advisory & Soil Portal",
    category: "Agriculture",
    image: EDU_IMAGES.projects.matirKotha,
    gradient: "from-emerald-900/90 via-emerald-800/70 to-transparent",
    accent: "#10B981",
    accentBg: "bg-emerald-500/20",
    accentText: "text-emerald-300",
    accentBorder: "border-emerald-400/40",
    benefits: ["Soil health card generation", "Live meteorological advisories", "Agricultural toll-free support"],
    stats: "25k+ Soil Tests Completed",
  },
  {
    icon: Zap,
    title: "Alosree Project",
    subtitle: "Solar & LED Street Lighting Initiative",
    category: "Infrastructure & Tech",
    image: EDU_IMAGES.projects.alosree,
    gradient: "from-amber-900/90 via-amber-800/70 to-transparent",
    accent: "#F59E0B",
    accentBg: "bg-amber-500/20",
    accentText: "text-amber-300",
    accentBorder: "border-amber-400/40",
    benefits: ["Energy efficiency mapping", "Solar panels configuration", "LED institutional upgrades"],
    stats: "10k+ Solar Street Lights",
  },
  {
    icon: GraduationCap,
    title: "Skill Training",
    subtitle: "National Vocational Certifications",
    category: "Education",
    image: EDU_IMAGES.projects.skillTraining,
    gradient: "from-cyan-900/90 via-cyan-800/70 to-transparent",
    accent: "#06B6D4",
    accentBg: "bg-cyan-500/20",
    accentText: "text-cyan-300",
    accentBorder: "border-cyan-400/40",
    benefits: ["Free computing curricula", "Tally & office administration", "Interview placement support"],
    stats: "15k+ Certified Trainees",
  },
  {
    icon: School,
    title: "School Project",
    subtitle: "Smart Digital Classrooms",
    category: "Education",
    image: EDU_IMAGES.projects.schoolProject,
    gradient: "from-purple-900/90 via-purple-800/70 to-transparent",
    accent: "#A78BFA",
    accentBg: "bg-purple-500/20",
    accentText: "text-purple-300",
    accentBorder: "border-purple-400/40",
    benefits: ["Interactive board installations", "Digital computer labs", "Teacher technology courses"],
    stats: "45+ Rural Schools Covered",
  },
  {
    icon: Cpu,
    title: "Digitization Project",
    subtitle: "E-Governance Records Digitalization",
    category: "Infrastructure & Tech",
    image: EDU_IMAGES.projects.digitization,
    gradient: "from-indigo-900/90 via-indigo-800/70 to-transparent",
    accent: "#6366F1",
    accentBg: "bg-indigo-500/20",
    accentText: "text-indigo-300",
    accentBorder: "border-indigo-400/40",
    benefits: ["Secure database transition", "Rapid retrieval database design", "E-Governance system audits"],
    stats: "200k+ Documents Cataloged",
  },
  {
    icon: Activity,
    title: "Free Health Camp",
    subtitle: "Rural Diagnostics & Checkups",
    category: "Healthcare & Hygiene",
    image: EDU_IMAGES.projects.healthCamp,
    gradient: "from-rose-900/90 via-rose-800/70 to-transparent",
    accent: "#F43F5E",
    accentBg: "bg-rose-500/20",
    accentText: "text-rose-300",
    accentBorder: "border-rose-400/40",
    benefits: ["Free diagnostics & advice", "Free medicine handouts", "Sanitation awareness sessions"],
    stats: "8,500+ Patients Treated",
  },
  {
    icon: HeartHandshake,
    title: "Sanitary Napkin Distribution",
    subtitle: "Hygiene Literacy & Free Kits",
    category: "Healthcare & Hygiene",
    image: EDU_IMAGES.projects.sanitaryDistribution,
    gradient: "from-pink-900/90 via-pink-800/70 to-transparent",
    accent: "#EC4899",
    accentBg: "bg-pink-500/20",
    accentText: "text-pink-300",
    accentBorder: "border-pink-400/40",
    benefits: ["High-quality sanitary kit supply", "Menstrual hygiene workshops", "Academic counseling booths"],
    stats: "50k+ Packs Distributed",
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

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeTab, setActiveTab] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filteredProjects = activeTab === "All"
    ? projectsData
    : projectsData.filter(project => project.category === activeTab);

  return (
    <section id="our-projects" className="py-28 bg-orange-surface relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(249,115,22,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(234,88,12,0.06) 0%, transparent 60%)"
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/15 text-orange-700 border border-orange-300 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Key Initiatives & Impact
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-orange-950 mb-5 leading-tight animate-fade-in">
            Our Projects
          </h2>
          <p className="text-orange-900/60 text-lg max-w-2xl mx-auto">
            Explore our diverse community-focused, governmental, and technological initiatives promoting regional growth.
          </p>
        </motion.div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setActiveTab(cat)}
              variant={activeTab === cat ? "default" : "outline"}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                activeTab === cat
                  ? "bg-orange-600 hover:bg-orange-700 text-white border-transparent"
                  : "border-orange-200 text-orange-900/75 hover:bg-orange-50 hover:text-orange-950"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProjects.map((project, i) => {
            const Icon = project.icon;
            const isHovered = hovered === i;
            return (
              <motion.div key={project.title} variants={cardVariants} className="h-full">
                <Motion3DCard
                  tilt={12}
                  hoverScale={1.02}
                  lift={8}
                  innerClassName="relative group rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 h-full min-h-[420px] flex flex-col justify-between"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    boxShadow: isHovered ? `0 20px 40px -10px ${project.accent}30` : "0 4px 15px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlays */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20" />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 p-5 flex flex-col justify-between h-full min-h-[420px]">
                    {/* Top Row */}
                    <div className="flex items-start justify-between">
                      <div className={`w-11 h-11 rounded-xl ${project.accentBg} border ${project.accentBorder} backdrop-blur-sm flex items-center justify-center`}>
                        <Icon className={project.accentText} size={20} />
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${project.accentBg} ${project.accentText} ${project.accentBorder} border backdrop-blur-sm`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="mt-auto pt-16">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                        {project.stats}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight mt-1">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-xs font-medium tracking-wide mb-4 line-clamp-2">
                        {project.subtitle}
                      </p>

                      <div className="space-y-1.5 mb-5">
                        {project.benefits.map((b, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <CheckCircle size={12} className={`${project.accentText} mt-0.5 shrink-0`} />
                            <span className="text-white/80 text-xs">{b}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        className="w-full rounded-xl font-bold text-xs py-4 transition-all duration-300 group/btn"
                        style={{
                          background: isHovered ? project.accent : "rgba(255,255,255,0.12)",
                          color: isHovered ? "#0B1F4D" : "white",
                          backdropFilter: "blur(6px)",
                          border: `1px solid ${isHovered ? project.accent : "rgba(255,255,255,0.18)"}`,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent("select-program", { detail: project.title }));
                          document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Learn More
                        <ArrowUpRight size={13} className="ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
