"use client";
import { HomeBooking } from "@/components/home-booking";
import { HomeNav } from "@/components/home-nav";
import { Stats } from "@/components/stats";
import { useQuery } from "@tanstack/react-query";
import { getThreads, getUser } from "@/queries/queries";
import React from "react";

export default function Home() {
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUser });

  useQuery({
    queryKey: ["threads"],
    queryFn: () => getThreads(user?.id),
    enabled: !!user?.id,
  });

  return (
    <div className="w-full h-screen flex flex-col text-secondary font-sans p-1">
      <div
        className="w-full h-4/5 rounded-2xl relative min-w-[1200px]"
        style={{
          backgroundImage: "url(/home4.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <HomeNav />
        <HomeBooking />
        <Stats />
      </div>
    </div>
  );
}
