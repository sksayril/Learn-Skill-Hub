"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, X } from "lucide-react";

export default function NoticeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    // Fetch notice configuration
    const fetchNotice = async () => {
      try {
        const res = await fetch("/api/notice");
        const json = await res.json();
        
        if (json.success && json.data && json.data.active) {
          // Check if already dismissed in session storage to avoid annoying the user on every route click
          const isDismissed = sessionStorage.getItem("smi_notice_dismissed");
          if (!isDismissed) {
            setNotice(json.data);
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.error("Failed to load notice:", err);
      }
    };
    fetchNotice();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("smi_notice_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && notice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop with strong blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#080e21]/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="relative max-w-md w-full bg-gradient-to-br from-[#0B1F4D] to-[#071330] rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl shadow-[#00C2FF]/15 text-center overflow-hidden z-10"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {/* Glowing background highlights */}
            <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-[#00C2FF]/10 blur-[50px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-[#00E5A8]/5 blur-[50px] pointer-events-none" />

            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white hover:bg-white/5 p-1.5 rounded-lg transition-colors cursor-pointer"
              aria-label="Close notice"
              suppressHydrationWarning
            >
              <X size={18} />
            </button>

            {/* Icon Header */}
            <div className="flex justify-center mb-6">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#00C2FF]/20"
                style={{ background: "linear-gradient(135deg, #00C2FF, #00E5A8)" }}
              >
                <Megaphone className="text-[#0B1F4D]" size={28} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-black text-white mb-4 uppercase tracking-wide">
              {notice.title}
            </h3>

            {/* Content Divider */}
            <div className="h-[2px] w-12 mx-auto mb-5 bg-gradient-to-r from-[#00C2FF] to-[#00E5A8] rounded-full" />

            {/* Notice Body */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6 max-h-60 overflow-y-auto">
              <p className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                {notice.content}
              </p>
            </div>

            {/* Close CTA Button */}
            <button
              onClick={handleClose}
              className="w-full py-3.5 bg-gradient-to-r from-[#00C2FF] to-[#00E5A8] hover:from-[#00E5A8] hover:to-[#00C2FF] text-[#0B1F4D] hover:scale-[1.02] active:scale-[0.99] font-bold text-sm md:text-base rounded-xl transition-all shadow-md shadow-[#00C2FF]/15 cursor-pointer"
              suppressHydrationWarning
            >
              Acknowledge & Continue
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
