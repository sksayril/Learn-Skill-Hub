"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
const logoImg = "/logo.jpeg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="Skill Mission India Logo"
            className={`object-contain rounded-full border-2 border-white/20 shadow-lg transition-all duration-300 ${
              scrolled ? "w-10 h-10" : "w-12 h-12"
            }`}
          />
          <div className="flex flex-col leading-tight">
            <span className="font-black text-lg tracking-tight text-white drop-shadow-sm">
              Skill Mission India
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/50 hidden md:block">
              Health · Education · Agriculture
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#programs" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Programs</a>
          <a href="#benefits" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Benefits</a>
          <a href="#partners" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Partners</a>
          <a href="#apply" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Apply</a>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button className="hidden md:flex bg-gradient-to-r from-secondary to-cyan-400 hover:from-cyan-400 hover:to-secondary text-[#0B1F4D] font-bold shadow-[0_0_20px_-5px_rgba(0,194,255,0.6)] transition-all hover:shadow-[0_0_30px_-5px_rgba(0,194,255,0.8)] hover:-translate-y-0.5">
            Apply Now
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
