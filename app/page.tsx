import Navbar from "./components/Navbar"
import HeroMinimal from "./components/HeroMinimal"
import ProcessMinimal from "./components/ProcessMinimal"
import AboutMinimal from "./components/AboutMinimal"
import ServicesMinimal from "./components/ServicesMinimal"
import TestimonialsMinimal from "./components/TestimonialsMinimal"
import CTAMinimal from "./components/CTAMinimal"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroMinimal />
      <ProcessMinimal />
      <AboutMinimal />
      <ServicesMinimal />
      <TestimonialsMinimal />
      <CTAMinimal />
      <Footer />
    </main>
  )
}
