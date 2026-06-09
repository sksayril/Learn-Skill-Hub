import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Building2, ShieldCheck, Users, LayoutDashboard, ArrowRight } from "lucide-react";

const features = [
  { icon: TrendingUp, label: "Revenue Opportunities", value: "₹2L+/mo", color: "text-accent" },
  { icon: ShieldCheck, label: "CSR Projects", value: "50+ Active", color: "text-secondary" },
  { icon: Building2, label: "Govt. Projects", value: "Pan-India", color: "text-amber-400" },
  { icon: Users, label: "Student Support", value: "Dedicated", color: "text-purple-400" },
  { icon: LayoutDashboard, label: "Central Dashboard", value: "Real-time", color: "text-pink-400" },
];

const barData = [65, 80, 55, 90, 72, 88, 95];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export function TrainingPartner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-secondary border border-primary/20 dark:border-secondary/20 text-sm font-semibold tracking-wide mb-4">
              FOR TRAINING CENTRES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Become a Training Partner
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Join our national network of training centres. Access government projects, CSR funding, a centralized management dashboard, and a pipeline of motivated students — all under one roof.
            </p>

            <div className="space-y-3 mb-10">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-card border border-border hover:border-secondary/40 transition-colors"
                    data-testid={`feature-partner-${i}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0">
                      <Icon className={f.color} size={18} />
                    </div>
                    <span className="text-foreground font-medium flex-1">{f.label}</span>
                    <span className="text-sm font-bold text-muted-foreground">{f.value}</span>
                  </motion.div>
                );
              })}
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_25px_-5px_hsl(var(--primary))] hover:shadow-[0_0_35px_-5px_hsl(var(--primary))] transition-all hover:-translate-y-1"
              data-testid="button-register-partner"
            >
              Register as Training Partner
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl rotate-2 scale-105 border border-border" />
            <div className="relative bg-card border border-border rounded-3xl p-6 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-foreground">Centre Dashboard</h4>
                  <p className="text-xs text-muted-foreground">Student Enrolments — 2025</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20">
                  LIVE
                </span>
              </div>

              <div className="flex items-end gap-2 h-32 mb-4">
                {barData.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-secondary"
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                    style={{ height: `${h}%`, transformOrigin: "bottom" }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {months.map((m) => (
                  <div key={m} className="flex-1 text-center text-xs text-muted-foreground">{m}</div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { label: "Active Students", val: "342" },
                  { label: "Placed", val: "128" },
                  { label: "Projects", val: "8" },
                ].map((d, i) => (
                  <div key={i} className="bg-background rounded-xl p-3 border border-border text-center">
                    <p className="text-xl font-black text-foreground">{d.val}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{d.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
