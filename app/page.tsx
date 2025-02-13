import { FAQ } from "@/components/faq";
import { FeatureCard } from "@/components/feature-card";
import { FeatureScroll } from "@/components/feature-scroll";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { HomeNav } from "@/components/home-nav";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center text-secondary font-sans p-1">
      <div
        className="w-full h-auto min-h-[80dvh] rounded-t-xl relative overflow-hidden"
        style={{
          backgroundImage: 'url("/home4.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <HomeNav />
        <HeroSection />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-white"></div>
      </div>
      <Stats />
      <FeatureScroll />
      <FeatureCard />
      <FAQ />
      <Footer />
    </div>
  );
}
