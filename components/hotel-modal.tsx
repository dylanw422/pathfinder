"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Frown } from "lucide-react";
import ClientOnly from "./client-only";
import { UseMutationResult } from "@tanstack/react-query";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function HotelConfirmationModal({
  hotelBookedMutation,
  isOpen,
  setIsOpen,
}: {
  hotelBookedMutation: UseMutationResult<unknown, Error, void, unknown>;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [response, setResponse] = useState<"yes" | "no" | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  const handleResponse = (value: "yes" | "no") => {
    setResponse(value);
    if (value === "yes") {
      hotelBookedMutation.mutate();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setTimeout(() => setIsOpen(false), 3000);
    setTimeout(() => setResponse(null), 3000);
  };

  useEffect(() => {
    if (!isOpen) {
      setResponse(null);
    }
  }, [isOpen]);

  return (
    <>
      <ClientOnly>
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
          />
        )}
      </ClientOnly>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Did you book your hotel?
            </DialogTitle>
            <DialogDescription className="text-center">
              Let us know if you&apos;ve secured your perfect stay!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              onClick={() => handleResponse("yes")}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Yes, I did! <PartyPopper className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => handleResponse("no")}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-100 font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Not yet <Frown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {response && (
            <div
              className={`mt-4 text-center ${
                response === "yes" ? "text-green-500" : "text-red-500"
              } font-semibold animate-fade-in`}
            >
              {response === "yes"
                ? "Woohoo! Enjoy your trip! 🎉✈️"
                : "No worries! There's still time to find your perfect stay. 😊"}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
