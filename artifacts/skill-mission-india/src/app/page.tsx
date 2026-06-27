import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutUs } from "@/components/AboutUs";
import { NoticeSection } from "@/components/NoticeSection";
import { WhySupport } from "@/components/WhySupport";
import { Marquee } from "@/components/Marquee";
import { Programs } from "@/components/Programs";
import { Projects } from "@/components/Projects";
import { CourseDetails } from "@/components/CourseDetails";
import { Benefits } from "@/components/Benefits";
import { Stats } from "@/components/Stats";
import { TrainingPartner } from "@/components/TrainingPartner";
import { EligibilityChecker } from "@/components/EligibilityChecker";
import { Testimonials } from "@/components/Testimonials";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FAQ } from "@/components/FAQ";
import { ContactUs } from "@/components/ContactUs";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-orange-surface text-foreground">
      <Navbar />
      <Hero />
      <AboutUs />
      <WhySupport />
      <NoticeSection />
      <Marquee />
      <Programs />
      <Projects />
      <CourseDetails />
      <Benefits />
      <Stats />
      <TrainingPartner />
      <EligibilityChecker />
      <Testimonials />
      <ApplicationForm />
      <FAQ />
      <ContactUs />
      <Footer />
    </div>
  );
}
