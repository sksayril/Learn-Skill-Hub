import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Programs } from "@/components/Programs";
import { Benefits } from "@/components/Benefits";
import { Stats } from "@/components/Stats";
import { TrainingPartner } from "@/components/TrainingPartner";
import { EligibilityChecker } from "@/components/EligibilityChecker";
import { Testimonials } from "@/components/Testimonials";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <Programs />
      <Benefits />
      <Stats />
      <TrainingPartner />
      <EligibilityChecker />
      <Testimonials />
      <ApplicationForm />
      <FAQ />
      <Footer />
    </div>
  );
}
