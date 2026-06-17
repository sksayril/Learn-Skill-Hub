"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who is eligible to apply for these programs?",
    a: "Any Indian citizen aged 18-45 can apply. Specific programs may have additional criteria based on educational qualification or social category. The eligibility checker on this page can help you find the right program.",
  },
  {
    q: "Are the training programs really free of cost?",
    a: "Yes, all our training programs are fully sponsored by the government or CSR partners. There is no registration fee, course fee, or examination fee charged to students.",
  },
  {
    q: "What certifications will I receive after completing the training?",
    a: "Depending on the program, you will receive certifications from NIELIT, NSDC, MSME, or corporate partners like IBM and Infosys. All certificates are nationally recognized by the Government of India.",
  },
  {
    q: "How does the placement support work?",
    a: "Our dedicated placement team works with 500+ employer partners across India. After completing training, students are connected with job openings, campus drives, and interview preparation sessions.",
  },
  {
    q: "Can I apply for more than one program?",
    a: "You can apply for multiple programs, but enrollment is subject to eligibility and seat availability. Our counselors will guide you to the most suitable program based on your profile.",
  },
  {
    q: "How long does each training program last?",
    a: "Program duration varies: short-term courses are 3 months, standard programs are 6 months, and advanced programs can be up to 12 months. All programs include practical, hands-on training.",
  },
  {
    q: "What is the process for Training Centre onboarding?",
    a: "Training Centres can register through our partner portal. After submitting your application, our team will verify your infrastructure, conduct a site inspection, and onboard you within 15-30 working days.",
  },
  {
    q: "Is there any stipend during training?",
    a: "Selected programs — including PM VIKAS and certain CSR programs — offer monthly stipends ranging from ₹1,500 to ₹4,000 during the training period, subject to attendance and performance criteria.",
  },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06, duration: 0.5 }}
      className="border border-border rounded-2xl overflow-hidden"
      data-testid={`faq-item-${i}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-card hover:bg-muted/50 transition-colors"
        data-testid={`button-faq-${i}`}
      >
        <span className="font-semibold text-foreground text-sm md:text-base">{q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          open ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border bg-card">
              <div className="pt-4">{a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-orange-surface-warm" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-sm font-semibold tracking-wide mb-4">
            FREQUENTLY ASKED
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Got Questions?
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Skill Mission India and our programs.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
