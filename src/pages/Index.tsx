import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import TechMarquee from "@/components/TechMarquee";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen relative" style={{ background: "hsl(var(--background))" }}>
      {/* Subtle scanlines effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(152 100% 50% / 0.008) 2px, hsl(152 100% 50% / 0.008) 4px)",
        }}
      />

      <NavBar />
      <main>
        <HeroSection />
        <div id="stack">
          <TechMarquee />
        </div>
        <ProjectsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
