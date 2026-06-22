"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NAV_ITEMS } from "@/lib/navigation";
import { User, ShieldCheck } from "lucide-react";

const logoImg = "/logo.jpeg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = "text-sm font-medium text-orange-900/80 hover:text-orange-950 transition-colors";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-white/85 backdrop-blur-lg border-b border-orange-200 shadow-sm shadow-orange-100"
          : "py-4 bg-orange-50/60 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3.5">
          <img
            src={logoImg}
            alt="Support Mission India Logo"
            className={`object-contain rounded-full border-2 border-orange-200 shadow-lg transition-all duration-300 ${
              scrolled ? "w-12 h-12" : "w-16 h-16"
            }`}
          />
          <div className="flex flex-col leading-tight">
            <span className="font-black text-xl tracking-tight text-orange-950">
              Support Mission India
            </span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-orange-800/70 hidden md:block">
              Health · Education · Agriculture
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={linkClass}
              data-testid={`nav-link-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full text-orange-800/70 hover:text-orange-950 hover:bg-orange-100"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <Button
            asChild
            variant="outline"
            className="hidden md:flex rounded-xl shadow-sm border-orange-200 text-orange-950 hover:bg-orange-50 hover:text-orange-900"
          >
            <a href="/smiv1.apk" download>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download App
            </a>
          </Button>

          <Button
            onClick={() => setLoginOpen(true)}
            className="hidden md:flex btn-orange rounded-xl shadow-orange-500/30 hover:-translate-y-0.5 cursor-pointer"
          >
            Apply Now
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full text-orange-800/70 hover:text-orange-950"
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-orange-surface">
              <nav className="flex flex-col gap-1 mt-8">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="px-4 py-3 rounded-xl text-base font-medium text-orange-950 hover:bg-orange-100 transition-colors"
                      data-testid={`nav-mobile-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
                  <button
                    onClick={() => { setLoginOpen(true); setMobileOpen(false); }}
                    className="mt-4 px-4 py-3 rounded-xl text-center text-base font-bold btn-orange w-full block"
                  >
                    Apply Now
                  </button>
                <SheetClose asChild>
                  <a
                    href="/smiv1.apk"
                    download
                    className="mt-2 flex items-center justify-center px-4 py-3 rounded-xl text-center text-base font-bold border border-orange-200 text-orange-950 hover:bg-orange-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Download App
                  </a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md bg-orange-surface border-orange-200">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-black text-orange-950 mb-4">
              Select Login Type
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://app.smi.in.net/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-300 transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User size={24} />
              </div>
              <div>
                <h3 className="font-bold text-orange-950">Student Login</h3>
                <p className="text-xs text-orange-900/60 mt-1">Access your learning portal</p>
              </div>
            </a>
            
            <a
              href="https://app.smi.in.net/admin/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-300 transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-orange-950">Admin Login</h3>
                <p className="text-xs text-orange-900/60 mt-1">Administrative dashboard</p>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </motion.nav>
  );
}
