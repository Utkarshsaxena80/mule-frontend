import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { WhyMuleShieldSection } from "@/components/WhyMuleShieldSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhyMuleShieldSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
