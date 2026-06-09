import { motion, AnimatePresence, useInView } from "framer-motion";
"use client"

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    program: "Office Automation",
    quote:
      "After completing the NIELIT Office Automation course, I got placed at a reputed CA firm within two months. The free training literally changed my life — I had no idea what Tally was before this program.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8e5?w=120&q=80&auto=format&fit=crop&crop=face",
    bg: "from-blue-900/60 to-cyan-900/40",
    rating: 5,
  },
  {
    name: "Rahul Meena",
    location: "Patna, Bihar",
    program: "PM VIKAS",
    quote:
      "As a carpenter, I never thought I'd get formal certification. PM VIKAS gave me a government certificate and helped me link with a bank loan for my small furniture workshop. Business is growing now.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop&crop=face",
    bg: "from-amber-900/60 to-orange-900/40",
    rating: 5,
  },
  {
    name: "Anjali Devi",
    location: "Lucknow, Uttar Pradesh",
    program: "UNICEF E-Placement",
    quote:
      "The UNICEF E-Placement program placed me as a data entry operator in Delhi within 45 days of completing training. I was skeptical at first, but the placement support team was exceptional.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop&crop=face",
    bg: "from-purple-900/60 to-pink-900/40",
    rating: 5,
  },
  {
    name: "Mohammed Ikbal",
    location: "Hyderabad, Telangana",
    program: "CSR Skill Program",
    quote:
      "Tech Mahindra's CSR program gave me hands-on IT training with real projects. I'm now working as a junior developer. The stipend during training also helped my family financially.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80&auto=format&fit=crop&crop=face",
    bg: "from-emerald-900/60 to-teal-900/40",
    rating: 5,
  },
  {
    name: "Kavitha Nair",
    location: "Kochi, Kerala",
    program: "MSME Skill Development",
    quote:
      "I started my own tailoring unit after the MSME program. The entrepreneurship support and bank linkage was invaluable. I now employ 4 other women from my village.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&q=80&auto=format&fit=crop&crop=face",
    bg: "from-rose-900/60 to-red-900/40",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  function go(dir: number) {
    setDirection(dir);
    setCurrent((p) => (p + dir + testimonials.length) % testimonials.length);
  }

  const t = testimonials[current];

  return (
    <section className="py-28 bg-[#060E1E] relative overflow-hidden" ref={ref}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=60&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-[#060E1E]/90" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/25 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Lives Transformed
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Real stories from real students — across every corner of India.
          </p>
        </motion.div>

        {/* Mini thumbnails */}
        <div className="flex justify-center gap-3 mb-10">
          {testimonials.map((t2, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                i === current ? "border-secondary scale-110 shadow-[0_0_20px_rgba(0,194,255,0.5)]" : "border-white/20 opacity-50 hover:opacity-80"
              }`}
              data-testid={`button-testimonial-avatar-${i}`}
            >
              <img src={t2.avatar} alt={t2.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 80 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${t.bg} backdrop-blur-sm`}
            data-testid={`testimonial-card-${current}`}
          >
            {/* Decorative quote */}
            <div className="absolute top-6 right-6 text-white/5">
              <Quote size={100} />
            </div>

            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                    <span className="text-[#0B1F4D] text-xs font-black">✓</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-white/50 text-sm">
                    {t.location} ·{" "}
                    <span className="text-secondary font-medium">{t.program}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go(-1)}
            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-secondary/50 flex items-center justify-center transition-all text-white"
            data-testid="button-testimonial-prev"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  i === current ? "w-8 bg-secondary" : "w-1.5 bg-white/20"
                }`}
                data-testid={`button-testimonial-dot-${i}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-secondary/50 flex items-center justify-center transition-all text-white"
            data-testid="button-testimonial-next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
