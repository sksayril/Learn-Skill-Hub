"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/navigation";
const logoImg = "/logo.jpeg";

const links = {
  Programs: ["Office Automation", "UNICEF E-Placement", "PM VIKAS", "MSME Skills", "CSR Programs"],
  Resources: ["Student Portal", "Training Centre Login", "Certification Verify", "Career Guidance", "Downloads"],
};

const socialLinks = [
  { label: "Twitter/X", href: "#", icon: "𝕏" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "YouTube", href: "#", icon: "▶" },
  { label: "Facebook", href: "#", icon: "f" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-orange-surface-warm border-t border-orange-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            {/* Logo + name */}
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logoImg}
                alt="Skill Mission India Logo"
                className="w-14 h-14 object-contain rounded-full border-2 border-border shadow-lg flex-shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-black text-lg text-foreground tracking-tight">
                  Skill Mission India
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                  Health · Education · Agriculture
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              A Government of India initiative connecting youth with skills, employment and entrepreneurship through industry and CSR partnerships.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="mailto:info@skillmissionindia.gov.in"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-email"
              >
                <Mail size={14} className="text-secondary" />
                info@skillmissionindia.gov.in
              </a>
              <a
                href="tel:+911800XXXXXXX"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-phone"
              >
                <Phone size={14} className="text-secondary" />
                1800-XXX-XXXX (Toll Free)
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-secondary mt-0.5 flex-shrink-0" />
                Ministry of Skill Development, New Delhi - 110001
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-secondary/50 transition-all text-sm font-bold"
                  data-testid={`link-social-${s.label.toLowerCase().replace("/", "-")}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#our-program"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${item.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border border-border rounded-2xl bg-muted/30 p-6 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-1">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">Get notified about new programs, openings and events.</p>
            </div>
            {!subscribed ? (
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary transition-all"
                  data-testid="input-newsletter"
                />
                <Button
                  onClick={() => { if (email) setSubscribed(true); }}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-5"
                  data-testid="button-newsletter-subscribe"
                >
                  Subscribe <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm font-medium text-accent flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent">✓</span>
                You're subscribed!
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="" className="w-6 h-6 object-contain rounded-full opacity-60" />
            <p className="text-xs text-muted-foreground">
              © 2025 Skill Mission India. Government of India. All rights reserved.
            </p>
          </div>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">RTI</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
