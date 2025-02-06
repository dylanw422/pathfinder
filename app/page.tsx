import { HeroSection } from "@/components/hero-section";
import { HomeNav } from "@/components/home-nav";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <div className="w-full min-h-[100dvh]flex flex-col text-secondary font-sans p-1">
      <div
        className="w-full h-auto min-h-[80dvh] rounded-lg sm:rounded-xl md:rounded-2xl relative overflow-hidden"
        style={{
          backgroundImage: "url(/home4.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <HomeNav />
        <HeroSection />
        <Stats />
      </div>
    </div>
  );
}
