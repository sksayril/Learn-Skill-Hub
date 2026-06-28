"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BellRing, Sparkles, ShieldCheck } from "lucide-react";

export function WhatsAppSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const channelUrl = "https://whatsapp.com/channel/0029VbCERS01XquXz7bWu72Z";

  return (
    <>
      {/* 1. SECTION CARD CTA */}
      <section
        id="whatsapp-channel-section"
        className="py-16 bg-orange-surface relative overflow-hidden"
        ref={ref}
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-300/30 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-emerald-50/90 via-white/80 to-orange-50/80 rounded-3xl p-6 md:p-10 border border-emerald-100 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
              {/* Corner Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-500 text-white font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Live Channel
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-inner">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.62.962 3.21 1.48 4.887 1.481 5.352 0 9.702-4.325 9.705-9.636 0-2.573-1.002-4.991-2.822-6.812-1.821-1.82-4.244-2.82-6.82-2.82-5.356 0-9.707 4.325-9.71 9.637-.001 1.834.48 3.626 1.392 5.201l-.928 3.39 3.493-.917zm12.56-5.836c-.079-.13-.29-.209-.609-.369-.318-.16-1.88-.927-2.172-1.034-.292-.107-.505-.16-.718.16-.213.32-.823 1.034-.99 1.22-.166.188-.333.209-.652.049-.319-.16-1.348-.497-2.566-1.583-.948-.847-1.59-1.893-1.777-2.213-.186-.32-.02-.492.14-.65.143-.142.318-.369.479-.553.16-.184.213-.314.318-.524.107-.21.053-.393-.027-.553-.079-.16-.718-1.73-.984-2.373-.26-.625-.523-.54-.718-.55l-.612-.012c-.213 0-.558.08-.85.399-.292.319-1.116 1.092-1.116 2.664 0 1.571 1.143 3.09 1.298 3.303.159.213 2.247 3.428 5.446 4.808.761.328 1.355.525 1.819.672.764.243 1.46.209 2.01.127.613-.092 1.88-.769 2.145-1.472.266-.703.266-1.306.187-1.433z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">Stay Connected</span>
                      <span className="text-[10px] text-orange-900/60 font-semibold block mt-0.5">
                        Official Updates Channel
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3.5xl font-black text-slate-900 leading-tight tracking-tight">
                    Join Support Mission India on WhatsApp
                  </h3>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                    Subscribe to our WhatsApp channel to get instant updates about new computer course batches, exam notifications, study guides, class schedules, and direct notifications from the administration panel.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <BellRing size={15} className="text-emerald-600 flex-shrink-0" />
                      <span>Live Batch Alerts</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Sparkles size={15} className="text-emerald-600 flex-shrink-0" />
                      <span>Free Exam Prep Docs</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <ShieldCheck size={15} className="text-emerald-600 flex-shrink-0" />
                      <span>Direct Admin News</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <a
                      href={channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-500/10 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      Join WhatsApp Channel
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Right Column: Visual CTA Card */}
                <div className="lg:col-span-5 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.03, rotate: -0.5 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-[320px] bg-white rounded-2xl border border-emerald-100 shadow-md p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-8 -mt-8" />
                    
                    {/* Channel Mockup Info */}
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-black shadow-md">
                        SMI
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">Support Mission India</h4>
                        <p className="text-[10px] text-emerald-600 font-bold">Verified Channel ✓</p>
                      </div>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-600">
                      <div className="bg-emerald-50/50 border border-emerald-100/60 p-3 rounded-xl">
                        <p className="font-semibold text-slate-800 mb-1">📢 Batch Starts Soon</p>
                        <p className="text-[11px] leading-relaxed">Computer Office Application batch admissions are opening this Monday. Click link below to view course details.</p>
                      </div>
                      
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                        <p className="font-semibold text-slate-800 mb-1">📝 Exam Notification</p>
                        <p className="text-[11px] leading-relaxed">Admit cards for UNICEF E-Placement exams have been generated. Check portal now.</p>
                      </div>
                    </div>

                    <a
                      href={channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 w-full py-2.5 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold text-xs transition-all text-center block"
                    >
                      Follow Channel
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FLOATING STICKY WHATSAPP CHAT/CHANNEL BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20 cursor-pointer group"
          title="Join our WhatsApp Channel"
        >
          {/* Pulsing ring animation */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping opacity-75 pointer-events-none group-hover:animate-none" />
          
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.62.962 3.21 1.48 4.887 1.481 5.352 0 9.702-4.325 9.705-9.636 0-2.573-1.002-4.991-2.822-6.812-1.821-1.82-4.244-2.82-6.82-2.82-5.356 0-9.707 4.325-9.71 9.637-.001 1.834.48 3.626 1.392 5.201l-.928 3.39 3.493-.917zm12.56-5.836c-.079-.13-.29-.209-.609-.369-.318-.16-1.88-.927-2.172-1.034-.292-.107-.505-.16-.718.16-.213.32-.823 1.034-.99 1.22-.166.188-.333.209-.652.049-.319-.16-1.348-.497-2.566-1.583-.948-.847-1.59-1.893-1.777-2.213-.186-.32-.02-.492.14-.65.143-.142.318-.369.479-.553.16-.184.213-.314.318-.524.107-.21.053-.393-.027-.553-.079-.16-.718-1.73-.984-2.373-.26-.625-.523-.54-.718-.55l-.612-.012c-.213 0-.558.08-.85.399-.292.319-1.116 1.092-1.116 2.664 0 1.571 1.143 3.09 1.298 3.303.159.213 2.247 3.428 5.446 4.808.761.328 1.355.525 1.819.672.764.243 1.46.209 2.01.127.613-.092 1.88-.769 2.145-1.472.266-.703.266-1.306.187-1.433z" />
          </svg>
        </motion.a>
      </div>
    </>
  );
}
