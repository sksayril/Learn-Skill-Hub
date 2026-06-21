"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { EDU_IMAGES } from "@/lib/images";
import { Motion3DCard } from "@/components/Motion3DCard";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    program: "Office Automation",
    quote:
      "After completing the NIELIT Office Automation course, I got placed at a reputed CA firm within two months. The free training literally changed my life — I had no idea what Tally was before this program.",
    avatar: EDU_IMAGES.testimonials.avatars[0].src,
    avatarAlt: EDU_IMAGES.testimonials.avatars[0].alt,
    bg: "from-blue-900/60 to-cyan-900/40",
    rating: 5,
  },
  {
    name: "Rahul Meena",
    location: "Patna, Bihar",
    program: "PM VIKAS",
    quote:
      "As a carpenter, I never thought I'd get formal certification. PM VIKAS gave me a government certificate and helped me link with a bank loan for my small furniture workshop. Business is growing now.",
    avatar: EDU_IMAGES.testimonials.avatars[1].src,
    avatarAlt: EDU_IMAGES.testimonials.avatars[1].alt,
    bg: "from-amber-900/60 to-orange-900/40",
    rating: 5,
  },
  {
    name: "Anjali Devi",
    location: "Lucknow, Uttar Pradesh",
    program: "UNICEF E-Placement",
    quote:
      "The UNICEF E-Placement program placed me as a data entry operator in Delhi within 45 days of completing training. I was skeptical at first, but the placement support team was exceptional.",
    avatar: EDU_IMAGES.testimonials.avatars[2].src,
    avatarAlt: EDU_IMAGES.testimonials.avatars[2].alt,
    bg: "from-purple-900/60 to-pink-900/40",
    rating: 5,
  },
  {
    name: "Mohammed Ikbal",
    location: "Hyderabad, Telangana",
    program: "CSR Skill Program",
    quote:
      "Tech Mahindra's CSR program gave me hands-on IT training with real projects. I'm now working as a junior developer. The stipend during training also helped my family financially.",
    avatar: EDU_IMAGES.testimonials.avatars[3].src,
    avatarAlt: EDU_IMAGES.testimonials.avatars[3].alt,
    bg: "from-emerald-900/60 to-teal-900/40",
    rating: 5,
  },
  {
    name: "Kavitha Nair",
    location: "Kochi, Kerala",
    program: "MSME Skill Development",
    quote:
      "I started my own tailoring unit after the MSME program. The entrepreneurship support and bank linkage was invaluable. I now employ 4 other women from my village.",
    avatar: EDU_IMAGES.testimonials.avatars[4].src,
    avatarAlt: EDU_IMAGES.testimonials.avatars[4].alt,
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
    <section className="py-28 bg-orange-surface-alt relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 z-0">
        <img
          src={EDU_IMAGES.testimonials.background.src}
          alt={EDU_IMAGES.testimonials.background.alt}
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-orange-surface-alt/90" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/15 text-orange-800 border border-orange-300 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-orange-950 mb-4">
            Lives Transformed
          </h2>
          <p className="text-orange-900/60 text-lg max-w-xl mx-auto">
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
                i === current ? "border-orange-500 scale-110 shadow-[0_0_20px_rgba(249,115,22,0.4)]" : "border-orange-200 opacity-60 hover:opacity-90"
              }`}
              data-testid={`button-testimonial-avatar-${i}`}
              suppressHydrationWarning
            >
              <img src={t2.avatar} alt={t2.avatarAlt} className="w-full h-full object-cover" />
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
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
            data-testid={`testimonial-card-${current}`}
          >
            <Motion3DCard
              tilt={10}
              hoverScale={1.02}
              lift={6}
              innerClassName="relative overflow-hidden rounded-3xl border border-orange-200 bg-white/90 backdrop-blur-sm shadow-lg shadow-orange-100"
            >
            {/* Decorative quote */}
            <div className="absolute top-6 right-6 text-orange-200">
              <Quote size={100} />
            </div>

            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-orange-200 shadow-lg">
                    <img src={t.avatar} alt={t.avatarAlt} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-black">✓</span>
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
                <p className="text-lg md:text-xl text-orange-900/85 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-bold text-orange-950 text-lg">{t.name}</p>
                  <p className="text-orange-800/60 text-sm">
                    {t.location} ·{" "}
                    <span className="text-orange-600 font-medium">{t.program}</span>
                  </p>
                </div>
              </div>
            </div>
            </Motion3DCard>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go(-1)}
            className="w-11 h-11 rounded-full border border-orange-200 bg-white hover:bg-orange-50 hover:border-orange-400 flex items-center justify-center transition-all text-orange-900"
            data-testid="button-testimonial-prev"
            suppressHydrationWarning
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  i === current ? "w-8 bg-orange-500" : "w-1.5 bg-orange-200"
                }`}
                data-testid={`button-testimonial-dot-${i}`}
                suppressHydrationWarning
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-11 h-11 rounded-full border border-orange-200 bg-white hover:bg-orange-50 hover:border-orange-400 flex items-center justify-center transition-all text-orange-900"
            data-testid="button-testimonial-next"
            suppressHydrationWarning
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
