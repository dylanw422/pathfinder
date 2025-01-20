"use client";
import { ChatInterface } from "@/components/chat-interface";
import axios from "axios";
import React from "react";

export default function TravelChat() {
  const [itenerary, setItenerary] = React.useState<any>({});

  const getCurrentLocation = async () => {
    const ipRes = await axios.get("https://api.ipify.org?format=json");
    const { ip } = ipRes.data;
    const currentLocation = await axios.post("/api/get-location", {
      ip,
    });

    return currentLocation.data;
  };

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const trip = JSON.parse(localStorage.getItem("trip") || "{}");
  //
  //     // Get current location asynchronously
  //     const currentLocation = await getCurrentLocation();
  //
  //     // Fetch itinerary data asynchronously
  //     const itineraryRes = await axios.post("/api/itenerary", {
  //       currentLocation: currentLocation,
  //       location: trip?.location,
  //       dates: trip?.dates,
  //       guests: trip?.guests,
  //     });
  //
  //     setItenerary(itineraryRes.data);
  //   };
  //
  //   fetchData();
  // }, []);

  return <ChatInterface itenerary={itenerary} />;
}
