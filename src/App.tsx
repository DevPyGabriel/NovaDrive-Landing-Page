import { useEffect } from "react";
import Lenis from "lenis";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import Services from "./components/sections/Services";
import BookingProcess from "./components/sections/BookingProcess";
import Faq from "./components/sections/Faq";
import CtaSection from "./components/sections/CtaSection";
import Contact from "./components/sections/Contact";
import Review from "./components/sections/Review";
import { LegalProvider } from "./components/legal/LegalContext";
import { CookieConsent } from "./components/legal/CookieConsent";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      respectReducedMotion: true,
      wheelMultiplier: 0.8,
      lerp: 0.05,
    });

    return () => lenis.destroy();
  }, []);

  return (
    <LegalProvider>
      <div className="font-geist">
        <Header />
        <main>
          <Hero />
          <Services />
          <BookingProcess />
          <Review />
          <Faq />
          <Contact />
          <CtaSection />
        </main>
        <Footer />
        <CookieConsent />
      </div>
      <Analytics />
    </LegalProvider>
  );
}

export default App;
