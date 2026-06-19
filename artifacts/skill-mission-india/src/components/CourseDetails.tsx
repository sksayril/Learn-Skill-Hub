"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, GraduationCap, MapPin, CheckCircle } from "lucide-react";
import { EDU_IMAGES } from "@/lib/images";
import { Motion3DCard } from "@/components/Motion3DCard";

const courses = [
  {
    name: "Office Automation & Accounting",
    provider: "NIELIT",
    duration: "6 Months",
    mode: "Classroom + Lab",
    eligibility: "10th Pass & Above",
    syllabus: ["MS Office Suite", "Tally ERP", "DTP & Design", "Accounting Basics"],
    certification: "NIELIT 'O' Level Certificate",
    image: EDU_IMAGES.programs.officeAutomation,
  },
  {
    name: "UNICEF E-Placement",
    provider: "UNICEF",
    duration: "3 Months",
    mode: "Online + Placement",
    eligibility: "12th Pass, Age 18–35",
    syllabus: ["Digital Literacy", "Soft Skills", "Interview Prep", "Job Portal Training"],
    certification: "UNICEF E-Placement Certificate",
    image: EDU_IMAGES.programs.unicef,
  },
  {
    name: "PM VIKAS",
    provider: "Government of India",
    duration: "6 Months",
    mode: "On-site Training",
    eligibility: "Artisans & Craftsmen",
    syllabus: ["Trade Skills", "Financial Literacy", "Marketing", "Tool Kit Usage"],
    certification: "PM Vishwakarma Certificate",
    image: EDU_IMAGES.programs.pmVikas,
  },
  {
    name: "MSME Skill Development",
    provider: "Ministry of MSME",
    duration: "4 Months",
    mode: "Classroom + Industry Visit",
    eligibility: "8th Pass & Above",
    syllabus: ["Manufacturing Basics", "Quality Control", "Entrepreneurship", "Bank Linkage"],
    certification: "MSME Skill Certificate",
    image: EDU_IMAGES.programs.msme,
  },
  {
    name: "CSR Skill Programs",
    provider: "IBM · Infosys · Tech Mahindra",
    duration: "3–6 Months",
    mode: "Hybrid",
    eligibility: "Graduate / Diploma Holders",
    syllabus: ["IT Fundamentals", "Coding Basics", "Communication", "Corporate Readiness"],
    certification: "Industry Partner Certificate",
    image: EDU_IMAGES.programs.csr,
  },
];

export function CourseDetails() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="course-details" className="py-28 bg-orange-surface relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/15 text-orange-700 border border-orange-300 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Curriculum & Eligibility
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-orange-950 mb-5 leading-tight">
            Course Details
          </h2>
          <p className="text-orange-900/60 text-lg max-w-2xl mx-auto">
            Explore duration, eligibility, syllabus, and certification for each program we offer.
          </p>
        </motion.div>

        <div className="space-y-5">
          {courses.map((course, i) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Motion3DCard
                tilt={10}
                hoverScale={1.02}
                lift={6}
                innerClassName="rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-sm overflow-hidden hover:border-orange-300"
                data-testid={`course-detail-${i}`}
              >
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="relative h-48 md:h-auto min-h-[180px]">
                  <img
                    src={course.image.src}
                    alt={course.image.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-50/90 md:bg-gradient-to-t md:from-transparent md:to-orange-50/80" />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-2 block">
                      {course.provider}
                    </span>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-800/50 mb-1">
                      {course.image.topic}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-orange-950">{course.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-orange-900/70 bg-orange-100 px-3 py-1.5 rounded-full">
                      <Clock size={12} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-orange-900/70 bg-orange-100 px-3 py-1.5 rounded-full">
                      <MapPin size={12} /> {course.mode}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-orange-900/70 bg-orange-100 px-3 py-1.5 rounded-full">
                        <GraduationCap size={12} /> {course.eligibility}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-orange-800/50 mb-3">Syllabus</p>
                      <ul className="space-y-2">
                        {course.syllabus.map((topic) => (
                          <li key={topic} className="flex items-center gap-2 text-sm text-orange-900/80">
                            <CheckCircle size={14} className="text-orange-600 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-end">
                      <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 w-full">
                        <p className="text-xs font-bold uppercase tracking-widest text-orange-700/70 mb-1">
                          Certification
                        </p>
                        <p className="text-sm font-semibold text-orange-950">{course.certification}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Motion3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
