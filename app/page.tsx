import { FeatureCard } from "@/components/feature-card";
import { FeatureScroll } from "@/components/feature-scroll";
import { HeroSection } from "@/components/hero-section";
import { HomeNav } from "@/components/home-nav";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center text-secondary font-sans p-1">
      <div
        className="w-full h-auto min-h-[80dvh] rounded-t-xl relative overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, 
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0) 60%,
              rgba(255, 255, 255, 0.1) 70%,
              rgba(255, 255, 255, 0.3) 80%,
              rgba(255, 255, 255, 0.6) 90%,
              rgba(255, 255, 255, 0.9) 95%,
              rgba(255, 255, 255, 1) 100%
            ),
            url(/home4.webp)
          `,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <HomeNav />
        <HeroSection />
      </div>
      <Stats />
      <FeatureScroll />
      <FeatureCard />
    </div>
  );
}
