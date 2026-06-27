"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Megaphone, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export function NoticeSection() {
  const defaultNotice = {
    title: "Upcoming Batches Announcement",
    content: "Welcome to Support Mission India! New skill development training batch admissions are starting soon. Register now to secure your spot in our upcoming batches.",
    image: "",
    updatedAt: new Date().toISOString(),
  };

  const [notice, setNotice] = useState<{ title: string; content: string; image?: string; updatedAt?: string }>(defaultNotice);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch("/api/notice-section");
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.active === false && json.data.updatedAt) {
            // Admin explicitly disabled it
            setVisible(false);
          } else {
            setNotice({
              title: json.data.title || defaultNotice.title,
              content: json.data.content || defaultNotice.content,
              image: json.data.image || "",
              updatedAt: json.data.updatedAt || defaultNotice.updatedAt,
            });
            setVisible(json.data.active !== false);
          }
        }
      } catch (err) {
        console.error("Failed to load notice section for homepage:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, []);

  if (!visible) return null;

  const formattedDate = notice.updatedAt
    ? new Date(notice.updatedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section 
      id="home-notice-section" 
      className="py-16 bg-orange-surface relative overflow-hidden" 
      ref={ref}
    >
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full border-4 border-orange-500/10" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full border-4 border-orange-500/10" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main Notice Banner Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-6 md:p-10 border border-orange-200/80 shadow-xl shadow-orange-500/5 relative overflow-hidden">
            {/* Corner Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-sm flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Live Announcement
            </div>

            <div className={`grid grid-cols-1 ${notice.image ? "lg:grid-cols-12" : ""} gap-8 items-center`}>
              {/* Notice Details */}
              <div className={`${notice.image ? "lg:col-span-7" : "w-full"} space-y-5`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600 shadow-inner">
                    <Megaphone size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-orange-700 uppercase tracking-widest block">Notice Board</span>
                    {formattedDate && (
                      <span className="text-[10px] text-orange-900/60 font-medium flex items-center gap-1 mt-0.5">
                        <Calendar size={10} />
                        Published: {formattedDate}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3.5xl font-black text-orange-950 leading-tight tracking-tight">
                  {notice.title}
                </h3>

                <p className="text-orange-900/70 text-sm md:text-base leading-relaxed line-clamp-4 whitespace-pre-wrap font-medium">
                  {notice.content}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <Link 
                    href="/notice"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-500/10 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    suppressHydrationWarning
                  >
                    Read Full Notice
                    <ArrowRight size={16} />
                  </Link>
                  <Link 
                    href="/notice"
                    className="text-xs font-bold text-orange-800 hover:text-orange-950 transition-colors underline decoration-2 underline-offset-4"
                    suppressHydrationWarning
                  >
                    View in Separate Page
                  </Link>
                </div>
              </div>

              {/* Notice Image Column */}
              {notice.image && (
                <div className="lg:col-span-5 flex justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-[340px] aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden border border-orange-200 shadow-md bg-white relative p-1.5 shadow-orange-500/10"
                  >
                    <img 
                      src={notice.image} 
                      alt={notice.title} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
