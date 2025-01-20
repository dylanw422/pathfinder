"use client";

import React, { useState } from "react";
import { Search, MapPin, Users, ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type ModalType = "Dates" | "Location" | "Guests" | null;

export function HomeBooking() {
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const trip = JSON.parse(localStorage.getItem("trip") || "{}");
  const [date, setDate] = useState<DateRange | undefined>({
    from: trip?.dates?.from || undefined,
    to: trip?.dates?.to || undefined,
  });
  const [guests, setGuests] = useState<number>(trip?.guests || 1);
  const [location, setLocation] = useState<string | undefined>(trip?.location);
  const router = useRouter();

  const formattedDate =
    date?.from && date?.to
      ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d")}`
      : "Dates";

  const startBooking = async () => {
    if (date && guests && location) {
      localStorage.setItem(
        "trip",
        JSON.stringify({ dates: date, location, guests }),
      );

      router.push("/travel");
    }
  };

  const handleModalToggle = (modal: ModalType) => {
    setOpenModal((prevModal) => (prevModal === modal ? null : modal));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-48 px-48 relative">
      <h1
        className="text-6xl font-semibold text-center"
        style={{ textShadow: "0px 0px 10px #000" }}
      >
        Your Next Adventure, Effortlessly Planned
      </h1>

      <div id="options" className="mt-8 w-full max-w-4xl mx-auto z-50">
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-2 text-sm text-white/90 shadow-lg border-t border-white/20">
          {/* Date Selector */}
          <OptionButton
            icon={<Search className="w-4 h-4" />}
            label="Dates"
            isOpen={openModal === "Dates"}
            onClick={() => handleModalToggle("Dates")}
            displayValue={formattedDate}
            content={
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="bg-primary-foreground text-primary rounded-lg absolute top-16 shadow-lg text-xs -translate-x-1/4"
              />
            }
          />

          {/* Location Selector */}
          <OptionButton
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            isOpen={openModal === "Location"}
            onClick={() => handleModalToggle("Location")}
            displayValue={location || "Location"}
            content={
              <div className="absolute w-full bg-white rounded-lg top-16 shadow-lg right-0">
                <div className="p-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Where?"
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
              </div>
            }
          />

          {/* Guests Selector */}
          <OptionButton
            icon={<Users className="w-4 h-4" />}
            label="Guests"
            isOpen={openModal === "Guests"}
            onClick={() => handleModalToggle("Guests")}
            displayValue={`Guests: ${guests}`}
            isLast
            content={<GuestsSelector guests={guests} setGuests={setGuests} />}
          />

          {/* Start Booking Button */}
          <button
            onClick={startBooking}
            className="flex-1 px-6 py-3 bg-white text-primary font-medium rounded-full"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionButton({
  icon,
  isOpen,
  onClick,
  content,
  displayValue,
  isLast = false,
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  onClick: () => void;
  content: React.ReactNode;
  displayValue: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex w-1/4 relative">
      <button
        onClick={onClick}
        className={`flex-1 group px-6 py-3 flex items-center justify-center ${
          !isLast ? "border-r border-white/20" : ""
        }`}
      >
        <div className="flex items-center justify-center">
          {icon}
          <span className="ml-2">{displayValue}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${isOpen ? "-rotate-180" : ""}`}
        />
      </button>
      {isOpen && content}
    </div>
  );
}

function GuestsSelector({
  guests,
  setGuests,
}: {
  guests: number;
  setGuests: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="bg-white text-black rounded-lg absolute top-16 shadow-lg p-4 w-full">
      <div className="flex items-center justify-between">
        <span>Guests</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
            className="px-3 py-1 bg-gray-200 rounded-full"
          >
            -
          </button>
          <span>{guests}</span>
          <button
            onClick={() => setGuests((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-200 rounded-full"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
