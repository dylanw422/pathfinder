"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { getBookedTrips, getUser } from "@/queries/queries";
import { Thread } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Check,
  ChevronsRight,
  Hotel,
  MapPin,
  Plane,
  Users,
  X,
} from "lucide-react";

export default function Booked() {
  const { state, toggleSidebar } = useSidebar();
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUser });

  const { data: bookedTrips } = useQuery({
    queryKey: ["bookedTrips"],
    queryFn: () => getBookedTrips(user?.id),
    enabled: !!user,
  });

  if (!bookedTrips) {
    return <div></div>;
  }

  return (
    <div>
      <div className="md:text-xl flex items-center text-center text-lg font-bold border-b p-2">
        <ChevronsRight
          className={`text-sidebar-foreground hover:cursor-pointer hover:bg-sidebar-accent transition rounded-sm p-1  ${
            state === "expanded" ? "md:hidden block" : ""
          }`}
          onClick={toggleSidebar}
        />
        <h1 className="absolute left-1/2 -translate-x-1/2 md:relative md:text-center">
          Your Booked Trips
        </h1>
      </div>
      <div
        className={`grid gap-4 ${
          state === "collapsed"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        } p-2 md:p-4 overflow-y-scroll`}
      >
        {bookedTrips.map((trip: Thread) => (
          <Card key={trip.id} className="overflow-hidden">
            <CardHeader className="bg-blue-500 text-white p-4">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center truncate mr-2">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span className="truncate text-sm">{trip.location}</span>
                </span>
                <Badge
                  variant="outline"
                  className="whitespace-nowrap text-xs bg-white text-black"
                >
                  {trip.hotelBooked && trip.flightBooked
                    ? "Fully Booked"
                    : "Partially Booked"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm p-4">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-black" />
                <span>
                  {trip.review?.guests} Guest
                  {trip.review?.guests && trip.review.guests > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <Hotel className="mr-2 h-4 w-4 text-black flex-shrink-0" />
                  <span className="truncate">{trip.review?.hotel_name}</span>
                </div>
                <Badge
                  variant="outline"
                  className={`ml-2 text-xs whitespace-nowrap px-2 py-1 w-[90px] flex items-center justify-center ${
                    trip.hotelBooked ? "bg-green-400" : "bg-red-500"
                  }`}
                >
                  <span
                    className={`${
                      trip.hotelBooked ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {trip.hotelBooked ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </span>
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Plane className="mr-2 h-4 w-4 text-black" />
                  <span>Flight</span>
                </div>
                <Badge
                  variant="outline"
                  className={`ml-2 text-xs whitespace-nowrap px-2 py-1 w-[90px] flex items-center justify-center ${
                    trip.flightBooked ? "bg-green-400" : "bg-red-300"
                  }`}
                >
                  <span
                    className={`${
                      trip.flightBooked ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {trip.flightBooked ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </span>
                </Badge>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-black" />
                <span>
                  {trip.review?.dates?.from} - {trip.review?.dates?.to}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
