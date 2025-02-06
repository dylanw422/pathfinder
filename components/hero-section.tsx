"use client";

import type React from "react";
import { useState } from "react";
import { Search, Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertThread, getThreads, getUser } from "@/queries/queries";

export function HeroSection() {
  const [location, setLocation] = useState<string>("");
  const router = useRouter();

  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUser });
  const { data: threads } = useQuery({
    queryKey: ["threads"],
    queryFn: () => getThreads(user?.id),
    enabled: !!user?.id,
  });

  const newThread = useMutation({
    mutationFn: () =>
      insertThread({
        userId: user ? user.id : "",
        location: location ? location : "",
        content: [],
      }),
    onSuccess: (data) => {
      const id = data.thread[0]?.id;
      router.push(`/chat/${id}`);
    },
  });

  const startBooking = async () => {
    if (location && user) {
      newThread.mutate();
    } else if (!user) {
      router.push("/login");
    } else if (!location && user) {
      router.push(`/chat/${threads[0].id}`);
    }
  };

  return (
    <div className="min-w-full min-h-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 py-24 md:py-36">
      <div className="w-full max-w-3xl mx-auto">
        <h1
          className="text-4xl md:text-6xl font-semibold text-center mb-8"
          style={{ textShadow: "0px 0px 10px #000" }}
        >
          Your Next Adventure, Effortlessly Planned
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/20">
          {/* Destination Input */}
          <div className="w-full sm:flex-1 relative">
            <input
              type="text"
              placeholder="Where's your next adventure?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 
                       shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)] 
                       focus:outline-none
                       text-white placeholder-white/60
                       text-base sm:text-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          </div>

          {/* Start Booking Button */}
          <button
            onClick={startBooking}
            className="w-full sm:w-auto px-6 py-4 bg-blue-500
                     text-white font-semibold rounded-xl 
                     shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
                     flex items-center gap-2 justify-center
                     text-base sm:text-lg"
          >
            <Plane className="w-5 h-5" />
            <span>Let&apos;s Fly!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
