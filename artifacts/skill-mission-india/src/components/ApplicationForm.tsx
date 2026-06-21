"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

const PROGRAMS = [
  "Office Automation & Accounting",
  "UNICEF E-Placement",
  "PM VIKAS",
  "MSME Skill Development",
  "CSR Skill Program",
];

type FormData = {
  name: string;
  mobile: string;
  email: string;
  gender: string;
  category: string;
  qualification: string;
  district: string;
  program: string;
  document: string;
};

const initialForm: FormData = {
  name: "", mobile: "", email: "", gender: "",
  category: "", qualification: "", district: "",
  program: "", document: "",
};

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);

  useEffect(() => {
    const handleSelectProgram = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const programTitle = customEvent.detail;
      
      const matched = PROGRAMS.find(
        (p) =>
          p.toLowerCase().replace(/s$/, "").trim() ===
          programTitle.toLowerCase().replace(/s$/, "").trim()
      );
      
      setForm((prev) => ({ ...prev, program: matched || programTitle }));
      setSubmitted(false);
      setStep(0);
    };
    window.addEventListener("select-program", handleSelectProgram);
    return () => window.removeEventListener("select-program", handleSelectProgram);
  }, []);

  const steps = [
    {
      title: "Personal Information",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "name", label: "Full Name", type: "text" },
              { key: "mobile", label: "Mobile Number", type: "tel" },
              { key: "email", label: "Email Address", type: "email" },
            ].map(({ key, label, type }) => (
              <div key={key} className={key === "email" ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key as keyof FormData]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  data-testid={`input-${key}`}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
              Gender
            </label>
            <div className="flex gap-3">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  onClick={() => setForm({ ...form, gender: g })}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    form.gender === g
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                  }`}
                  data-testid={`button-gender-${g.toLowerCase()}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Academic Details",
      content: (
        <div className="space-y-4">
          {[
            { key: "category", label: "Category", options: ["General","OBC","SC/ST","EWS","Minority"] },
            { key: "qualification", label: "Highest Qualification", options: ["Below 10th","10th Pass","12th Pass","Graduate","Post Graduate"] },
            { key: "district", label: "District", options: ["Agra","Ahmedabad","Bengaluru","Bhopal","Chennai","Delhi","Hyderabad","Jaipur","Kolkata","Lucknow","Mumbai","Patna","Pune","Surat","Varanasi"] },
          ].map(({ key, label, options }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                {label}
              </label>
              <select
                value={form[key as keyof FormData]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                data-testid={`select-${key}`}
              >
                <option value="">Select {label}</option>
                {options.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Program & Documents",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Select Program
            </label>
            <div className="space-y-2">
              {PROGRAMS.map((p) => (
                <button
                  key={p}
                  onClick={() => setForm({ ...form, program: p })}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    form.program === p
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background text-foreground hover:border-accent/40"
                  }`}
                  data-testid={`button-program-${p.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <span className={`inline-block w-3.5 h-3.5 rounded-full border mr-3 transition-all ${
                    form.program === p ? "bg-accent border-accent" : "border-muted-foreground"
                  }`} />
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Upload Documents (Aadhaar / Certificate)
            </label>
            <label
              className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-secondary/60 hover:bg-secondary/5 transition-all"
              data-testid="input-document"
            >
              <Upload className="text-muted-foreground mb-2" size={24} />
              <span className="text-sm text-muted-foreground">Click to upload or drag & drop</span>
              <span className="text-xs text-muted-foreground/60 mt-1">PDF, JPG, PNG up to 5MB</span>
              <input type="file" className="hidden" onChange={(e) => setForm({ ...form, document: e.target.files?.[0]?.name || "" })} />
            </label>
            {form.document && (
              <p className="text-xs text-accent mt-1 flex items-center gap-1">
                <CheckCircle2 size={12} /> {form.document}
              </p>
            )}
          </div>
        </div>
      ),
    },
  ];

  async function goNext() {
    if (step < steps.length - 1) {
      setDir(1);
      setStep(step + 1);
    } else {
      try {
        const response = await fetch("/api/enquiries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        if (response.ok) {
          setSubmitted(true);
        } else {
          console.error("Failed to submit application");
          setSubmitted(true);
        }
      } catch (error) {
        console.error("Error submitting application:", error);
        setSubmitted(true);
      }
    }
  }

  return (
    <section id="apply" className="py-24 bg-orange-surface">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-secondary border border-primary/20 text-sm font-semibold tracking-wide mb-4">
            REGISTER NOW
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Apply for a Program
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Fill in your details and take the first step toward a new career.
          </p>
        </motion.div>

        <div className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-1.5 bg-muted flex">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="h-full bg-gradient-to-r from-primary to-secondary"
                animate={{ width: i <= step ? `${100 / steps.length}%` : "0%" }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>

          <div className="p-8">
            {!submitted ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step + 1}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Step {step + 1} of {steps.length}</p>
                    <h3 className="text-lg font-bold text-foreground">{steps[step].title}</h3>
                  </div>
                </div>

                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -dir * 30 }}
                    transition={{ duration: 0.3 }}
                  >
                    {steps[step].content}
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-3 mt-8">
                  {step > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => { setDir(-1); setStep(step - 1); }}
                      className="flex items-center gap-2"
                      data-testid="button-form-prev"
                    >
                      <ArrowLeft size={16} /> Back
                    </Button>
                  )}
                  <Button
                    onClick={goNext}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary))]"
                    data-testid="button-form-next"
                  >
                    {step < steps.length - 1 ? "Next Step" : "Submit Application"}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center py-12"
                data-testid="form-success"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 250, delay: 0.1 }}
                  className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent/40 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="text-accent" size={48} />
                </motion.div>
                <h3 className="text-3xl font-bold text-foreground mb-3">Application Submitted!</h3>
                <p className="text-muted-foreground text-lg mb-2">
                  Thank you, <strong>{form.name || "Applicant"}</strong>!
                </p>
                <p className="text-muted-foreground mb-8">
                  Our team will call you on <strong>{form.mobile}</strong> within 48 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => { setSubmitted(false); setStep(0); setForm(initialForm); }}
                  data-testid="button-form-restart"
                >
                  Submit Another Application
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
