import { HeroSection } from "@/components/hero-section";
import { HomeNav } from "@/components/home-nav";
import { Stats } from "@/components/stats";
import React from "react";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col text-secondary font-sans p-1">
      <h1 className="hidden">Awin</h1>
      <div
        className="w-full h-4/5 rounded-2xl relative min-w-[1200px]"
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
