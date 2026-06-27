"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Megaphone, Calendar, ArrowLeft, RefreshCw, AlertCircle, Home } from "lucide-react";
import Link from "next/link";

export default function NoticePage() {
  const [notice, setNotice] = useState<{ title: string; content: string; image?: string; updatedAt?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNotice = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notice-section");
      const json = await res.json();
      if (json.success && json.data && json.data.active) {
        setNotice(json.data);
      } else {
        setNotice(null);
      }
    } catch (err) {
      console.error("Failed to load notice page:", err);
      setNotice(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  const formattedDate = notice?.updatedAt
    ? new Date(notice.updatedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : null;

  return (
    <div className="min-h-screen bg-orange-surface flex flex-col text-foreground">
      <Navbar />

      {/* Main Container */}
      <main className="flex-grow py-28 relative overflow-hidden">
        {/* Background Gradients */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(ellipse at top right, rgba(234,88,12,0.06) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(249,115,22,0.04) 0%, transparent 60%)"
          }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          {/* Breadcrumbs & Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-800 hover:text-orange-950 transition-colors group cursor-pointer"
              suppressHydrationWarning
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <span className="text-xs font-bold text-orange-900/40 uppercase tracking-widest">
              Notice / Announcement
            </span>
          </div>

          {loading ? (
            /* Loading State */
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-16 border border-orange-200/50 flex flex-col items-center justify-center gap-3 text-orange-700 min-h-[400px]">
              <RefreshCw size={36} className="animate-spin text-orange-500" />
              <p className="text-sm font-bold tracking-wider">Fetching notice board announcement...</p>
            </div>
          ) : notice ? (
            /* Active Notice Content */
            <article className="bg-white rounded-3xl border border-orange-200/80 shadow-xl shadow-orange-500/5 overflow-hidden">
              {/* Header Band */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6 md:p-8 text-white relative">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A8] animate-pulse" />
                  Active Announcement
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-md">
                    <Megaphone size={22} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xs font-bold uppercase tracking-widest text-orange-100 block">Support Mission India</h1>
                    {formattedDate && (
                      <time className="text-[10px] text-orange-200 font-semibold flex items-center gap-1 mt-0.5">
                        <Calendar size={11} />
                        Last Updated: {formattedDate}
                      </time>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight mt-2 text-white">
                  {notice.title}
                </h2>
              </div>

              {/* Main Body Grid */}
              <div className="p-6 md:p-10 space-y-8">
                {/* Embedded Image (Full view if available) */}
                {notice.image && (
                  <div className="rounded-2xl overflow-hidden border border-orange-200 shadow-md bg-orange-50 max-h-[480px] flex items-center justify-center p-2">
                    <img 
                      src={notice.image} 
                      alt={notice.title} 
                      className="max-h-[460px] w-full object-contain rounded-xl"
                    />
                  </div>
                )}

                {/* Announcement Description */}
                <div className="prose max-w-none text-orange-950/80 leading-relaxed text-base md:text-lg whitespace-pre-wrap font-medium">
                  {notice.content}
                </div>

                {/* Bottom Action Area */}
                <div className="pt-6 border-t border-orange-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-orange-900/60 font-semibold italic">
                    * This is a official notification published by the Support Mission India Admin Committee.
                  </div>
                  <Link 
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                    suppressHydrationWarning
                  >
                    <Home size={15} />
                    Go back to Homepage
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            /* Empty / Inactive Notice State */
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-16 border border-orange-200/50 flex flex-col items-center justify-center text-center max-w-lg mx-auto py-20 shadow-lg shadow-orange-500/5">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-black text-orange-950 mb-2 uppercase tracking-wide">
                No Active Announcement
              </h3>
              <p className="text-orange-900/60 text-sm max-w-xs mx-auto leading-relaxed mb-8">
                There are currently no active notices or announcements on the notice board. Please check back later.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                suppressHydrationWarning
              >
                <ArrowLeft size={16} />
                Return to Homepage
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
