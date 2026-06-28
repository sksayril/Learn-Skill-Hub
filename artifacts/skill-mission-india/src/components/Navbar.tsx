"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/navigation";
import { User } from "lucide-react";

const logoImg = "/logo.jpeg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
            asChild
            variant="outline"
            className="hidden md:flex rounded-xl shadow-sm border-orange-200 text-orange-950 hover:bg-orange-50 hover:text-orange-900"
          >
            <a href="https://app.smi.in.net/login" target="_blank" rel="noopener noreferrer">
              <User size={16} className="mr-2" />
              Student Login
            </a>
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

                <SheetClose asChild>
                  <a
                    href="https://app.smi.in.net/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center px-4 py-3 rounded-xl text-center text-base font-bold border border-orange-200 text-orange-950 hover:bg-orange-50"
                  >
                    <User size={18} className="mr-2" />
                    Student Login
                  </a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>


    </motion.nav>
  );
}
