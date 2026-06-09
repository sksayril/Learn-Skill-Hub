import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

const PROGRAMS = [
  "Office Automation & Accounting",
  "UNICEF E-Placement",
  "PM VIKAS",
  "MSME Skill Development",
  "CSR Skill Program",
];

const DISTRICTS = [
  "Agra", "Ahmedabad", "Bengaluru", "Bhopal", "Chennai",
  "Delhi", "Hyderabad", "Jaipur", "Kolkata", "Lucknow",
  "Mumbai", "Patna", "Pune", "Surat", "Varanasi",
];

export function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "", mobile: "", gender: "",
    category: "", qualification: "", district: "",
    program: "",
  });

  const steps = [
    {
      title: "Personal Details",
      fields: (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="peer w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              data-testid="input-name"
            />
            <label className="absolute left-4 top-3 text-muted-foreground text-sm transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs bg-background px-1">
              Full Name
            </label>
          </div>
          <div className="relative">
            <input
              type="tel"
              placeholder=" "
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="peer w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              data-testid="input-mobile"
            />
            <label className="absolute left-4 top-3 text-muted-foreground text-sm transition-all peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs bg-background px-1">
              Mobile Number
            </label>
          </div>
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
      ),
    },
    {
      title: "Academic & Background",
      fields: (
        <div className="space-y-4">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            data-testid="select-category"
          >
            <option value="">Select Category</option>
            <option>General</option>
            <option>OBC</option>
            <option>SC/ST</option>
            <option>EWS</option>
            <option>Minority</option>
          </select>
          <select
            value={form.qualification}
            onChange={(e) => setForm({ ...form, qualification: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            data-testid="select-qualification"
          >
            <option value="">Highest Qualification</option>
            <option>Below 10th</option>
            <option>10th Pass</option>
            <option>12th Pass</option>
            <option>Graduate</option>
            <option>Post Graduate</option>
          </select>
          <select
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            data-testid="select-district"
          >
            <option value="">Select District</option>
            {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      ),
    },
    {
      title: "Choose Your Program",
      fields: (
        <div className="space-y-3">
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
              <span className={`inline-block w-4 h-4 rounded-full border mr-3 transition-all ${
                form.program === p ? "bg-accent border-accent" : "border-border"
              }`} />
              {p}
            </button>
          ))}
        </div>
      ),
    },
  ];

  function next() {
    if (step < steps.length - 1) { setDir(1); setStep(step + 1); }
    else { setDone(true); }
  }
  function prev() { setDir(-1); setStep(step - 1); }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-sm font-semibold tracking-wide mb-4">
            CHECK ELIGIBILITY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Are You Eligible?
          </h2>
          <p className="text-muted-foreground text-lg">
            Answer a few quick questions to find the right program for you.
          </p>
        </motion.div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
          {!done ? (
            <>
              <div className="flex gap-2 mb-6">
                {steps.map((_, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      animate={{ width: i <= step ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                ))}
              </div>

              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                Step {step + 1} of {steps.length}
              </p>
              <h3 className="text-xl font-bold text-foreground mb-6">
                {steps[step].title}
              </h3>

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -dir * 40 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {steps[step].fields}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3 mt-8">
                {step > 0 && (
                  <Button
                    variant="outline"
                    onClick={prev}
                    className="flex-1"
                    data-testid="button-eligibility-prev"
                  >
                    <ChevronLeft size={16} className="mr-1" /> Back
                  </Button>
                )}
                <Button
                  onClick={next}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  data-testid="button-eligibility-next"
                >
                  {step < steps.length - 1 ? "Continue" : "Check Eligibility"}
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center py-8"
              data-testid="eligibility-success"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="text-accent" size={40} />
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground mb-2">You Are Eligible!</h3>
              <p className="text-muted-foreground mb-6">
                Based on your profile, you qualify for <strong>{form.program || "our programs"}</strong>.
                Our team will contact you shortly.
              </p>
              <Button
                onClick={() => { setDone(false); setStep(0); setForm({ name:"",mobile:"",gender:"",category:"",qualification:"",district:"",program:"" }); }}
                variant="outline"
                data-testid="button-eligibility-restart"
              >
                Start Over
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
