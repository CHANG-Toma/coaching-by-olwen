import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBanner from "@/components/sections/TrustBanner";
import CoachingMoments from "@/components/sections/CoachingMoments";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBanner />
        <CoachingMoments />
        <About />
        <Services />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
