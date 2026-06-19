"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EDU_IMAGES } from "@/lib/images";
import { Motion3DCard } from "@/components/Motion3DCard";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@skillmissionindia.gov.in",
    href: "mailto:info@skillmissionindia.gov.in",
  },
  {
    icon: Phone,
    label: "Toll Free",
    value: "1800-XXX-XXXX",
    href: "tel:+911800XXXXXXX",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Ministry of Skill Development, New Delhi - 110001",
    href: null,
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri, 9:00 AM – 6:00 PM IST",
    href: null,
  },
];

export function ContactUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact-us" className="py-28 bg-orange-surface-alt relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Get In Touch / Enquiry
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight">
            Contact & Enquiry Now
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about our programs, projects, or eligibility? Reach out or submit an enquiry below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <Motion3DCard tilt={6} hoverScale={1.02} lift={4} innerClassName="rounded-2xl overflow-hidden border border-orange-200 shadow-lg mb-6">
              <img
                src={EDU_IMAGES.contact.src}
                alt={EDU_IMAGES.contact.alt}
                className="w-full h-48 object-cover"
              />
            </Motion3DCard>

            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <Motion3DCard
                  tilt={10}
                  hoverScale={1.02}
                  lift={5}
                  innerClassName="flex items-start gap-4 p-5 rounded-2xl border border-orange-200 bg-white/80 hover:border-orange-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-300 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-800/60 mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-orange-950 leading-relaxed">{item.value}</p>
                  </div>
                </Motion3DCard>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!submitted ? (
              <Motion3DCard tilt={8} hoverScale={1.01} lift={4} innerClassName="p-6 md:p-8 rounded-2xl border border-orange-200 bg-white/90">
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                data-testid="form-contact"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary transition-all"
                    data-testid="input-contact-name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary transition-all"
                      data-testid="input-contact-email"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-1.5">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary transition-all"
                      data-testid="input-contact-phone"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary transition-all resize-none"
                    data-testid="input-contact-message"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full btn-orange"
                  data-testid="button-contact-submit"
                >
                  Send Enquiry <Send size={16} className="ml-2" />
                </Button>
              </form>
              </Motion3DCard>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl border border-accent/30 bg-accent/10 text-center h-full flex flex-col items-center justify-center"
                data-testid="contact-success"
              >
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Enquiry Sent!</h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for your enquiry. Our team will get back to you within 2 business days.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
