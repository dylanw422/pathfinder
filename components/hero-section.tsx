"use client";

import type React from "react";
import { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  ChevronDown,
  Briefcase,
  Umbrella,
  Users2,
} from "lucide-react";
import { Calendar } from "./ui/calendar";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertThread, getThreads, getUser } from "@/queries/queries";

type ModalType = "Dates" | "Location" | "Guests" | "TripType" | null;
type TripType = "business" | "vacation" | "family";

export function HeroSection() {
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [location, setLocation] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);
  const [tripType, setTripType] = useState<TripType>("vacation");
  const router = useRouter();

  const formattedDate =
    date?.from && date?.to
      ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d")}`
      : "Dates";

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
        dates: date,
        location: location ? location : "",
        guests: guests.toString(),
        type: tripType,
        content: [],
      }),
    onSuccess: (data) => {
      const id = data.thread[0]?.id;
      router.push(`/chat/${id}`);
    },
  });

  const startBooking = async () => {
    if (date && guests && location && tripType && user) {
      newThread.mutate();
    } else if (!user) {
      router.push("/login");
    } else if ((!date || !guests || !location || !tripType) && user) {
      router.push(`/chat/${threads[0].id}`);
    }
  };

  const handleModalToggle = (modal: ModalType) => {
    setOpenModal((prevModal) => (prevModal === modal ? null : modal));
  };

  const getTripTypeIcon = (type: TripType) => {
    switch (type) {
      case "business":
        return <Briefcase className="w-4 h-4" />;
      case "vacation":
        return <Umbrella className="w-4 h-4" />;
      case "family":
        return <Users2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-48 px-48 relative">
      <h1
        className="text-6xl font-semibold text-center"
        style={{ textShadow: "0px 0px 10px #000" }}
      >
        Your Next Adventure, Effortlessly Planned
      </h1>

      <div id="options" className="mt-8 w-full max-w-5xl mx-auto z-50">
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
                defaultMonth={new Date()}
                selected={date}
                onSelect={(range) => {
                  if (range) {
                    setDate(range);
                  }
                }}
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
            content={<GuestsSelector guests={guests} setGuests={setGuests} />}
          />

          {/* Trip Type Selector */}
          <OptionButton
            icon={getTripTypeIcon(tripType)}
            label="Trip Type"
            isOpen={openModal === "TripType"}
            onClick={() => handleModalToggle("TripType")}
            displayValue={tripType.charAt(0).toUpperCase() + tripType.slice(1)}
            content={
              <TripTypeSelector tripType={tripType} setTripType={setTripType} />
            }
            isLast
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
    <div className="flex w-1/5 relative">
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

function TripTypeSelector({
  tripType,
  setTripType,
}: {
  tripType: TripType;
  setTripType: React.Dispatch<React.SetStateAction<TripType>>;
}) {
  return (
    <div className="bg-white text-black rounded-lg absolute top-16 shadow-lg p-4 w-full">
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => setTripType("business")}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
            tripType === "business"
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Business</span>
        </button>
        <button
          onClick={() => setTripType("vacation")}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
            tripType === "vacation"
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          <Umbrella className="w-4 h-4" />
          <span>Vacation</span>
        </button>
        <button
          onClick={() => setTripType("family")}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
            tripType === "family"
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Family</span>
        </button>
      </div>
    </div>
  );
}