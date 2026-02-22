import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import BridgeQuestion from "@/components/BridgeQuestion";
import WorkLogBubbles from "@/components/WorkLogBubbles";
import HowItWorksCarousel from "@/components/HowItWorksCarousel";
import TrustSection from "@/components/TrustSection";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";
import CookieNotice from "@/components/CookieNotice";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <SocialProofBar />
      <BridgeQuestion question="Profesionalų darbų istorija dažnai lieka nepatvirtinta ir neužfiksuota.">
        <p className="mt-3 text-base text-text-on-dark-secondary/50 md:text-lg">
          Paskui ieškai kaip įrodyti, papasakoti, kaip išsiskirti iš kitų.
        </p>
      </BridgeQuestion>
      <WorkLogBubbles />
      <HowItWorksCarousel />
      <div className="flex justify-center bg-bg-secondary py-8">
        <a
          href="#final-form"
          className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-3 text-sm font-medium text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-200"
        >
          Pasiruošęs pradėti?
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </a>
      </div>
      <BridgeQuestion question="Bet ar galima pasitikėti atsiliepimais internete?" />
      <TrustSection />
      <BridgeQuestion question="Kuo ilgiau lauki — tuo daugiau darbų lieka be patvirtinimo." />
      <BottomCTA />
      <Footer />
      <CookieNotice />
    </>
  );
}
