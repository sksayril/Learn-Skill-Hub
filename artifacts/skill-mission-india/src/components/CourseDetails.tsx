"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, GraduationCap, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { Motion3DCard } from "@/components/Motion3DCard";

export function CourseDetails() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const json = await res.json();
        if (json.success) {
          setCourses(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-orange-600" size={32} />
          </div>
        ) : (
          <div className="space-y-5">
            {courses.map((course, i) => {
              const imageSrc = course.image || "/images/program_office.png";
              const syllabusList = Array.isArray(course.syllabus) ? course.syllabus : [];
              const title = course.title || course.name;
              const provider = course.category || course.provider;
              const certificationText = course.certification || `${provider} Certified Certificate`;

              return (
                <motion.div
                  key={course._id || i}
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
                        src={imageSrc}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/program_office.png";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-50/90 md:bg-gradient-to-t md:from-transparent md:to-orange-50/80" />
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                        <div>
                        <span className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-2 block">
                          {provider}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-orange-950">{title}</h3>
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
                            {syllabusList.map((topic: string) => (
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
                            <p className="text-sm font-semibold text-orange-950">{certificationText}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Motion3DCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
