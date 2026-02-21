import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import BridgeQuestion from "@/components/BridgeQuestion";
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
      <BridgeQuestion question="Profesionalų darbų istorija dažnai lieka nepatvirtinta ir neužfiksuota." />
      <HowItWorksCarousel />
      <BridgeQuestion question="Atsiliepimai išsibarstę per platformas, o klientų patvirtinimai — nestandartizuoti." />
      <TrustSection />
      <BridgeQuestion question="Visi patvirtinimai vienoje vietoje — standartizuoti, patikrinti ir visada pasiekiami." />
      <BottomCTA />
      <Footer />
      <CookieNotice />
    </>
  );
}
