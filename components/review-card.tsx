import { TripDetails } from "@/types/types";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Hotel, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { UseMutationResult } from "@tanstack/react-query";

export function ReviewCard({
  hotelBooked,
  object,
  processMutation,
  hotelLink,
  setIsOpen,
}: {
  hotelBooked: boolean;
  object: TripDetails;
  processMutation: UseMutationResult<unknown, Error, string, unknown>;
  hotelLink: string | undefined;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <motion.div>
      <Card className="mb-4 mt-4 ml-8 text-sm md:text-base">
        <CardHeader>
          <CardTitle>Trip Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1">Destination</h3>
              <p>{object.location}</p>
            </div>
            <div className="flex items-center gap-12">
              <div>
                <h3 className="font-semibold mb-1">Hotel</h3>
                <p className="flex items-center gap-2">{object.hotel_name}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Departure Airport</h3>
              <p>{object.from_airport}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Arrival Airport</h3>
              <p>{object.to_airport}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Dates</h3>
              <p className="gap-1">
                {object.dates?.from} - {object.dates?.to}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Guests</h3>
              <Badge variant="secondary">{object.guests}</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-0">
          <p className="font-semibold md:text-lg pb-4">Start booking? 👇</p>
          <div className="flex lg:flex-row flex-col items-center justify-between w-full space-y-2 lg:space-y-0 lg:space-x-2">
            {!hotelBooked && (
              <Link href={`${hotelLink}`} target="_blank" className="w-full">
                <Button
                  variant="outline"
                  className="w-full md:h-12 h-10 rounded-md bg-green-100 text-green-600 hover:text-green-700 hover:bg-green-200 md:text-sm text-xs"
                  onClick={() => setIsOpen(true)}
                >
                  Checkout Hotel <Hotel className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {/* <Link href={``} target="_blank" className="w-full">
              <Button
                variant="outline"
                className="relative w-full md:h-12 h-10 rounded-md bg-green-100 text-green-600 hover:text-green-700 hover:bg-green-200 md:text-sm text-xs"
              >
                Checkout Flight <Plane className="h-5 w-5 rotate-45" />
              </Button>
            </Link> */}
            <Button
              variant="outline"
              className="w-full md:h-12 h-10 rounded-md text-red-500 hover:text-red-600 bg-red-100 hover:bg-red-200 md:text-sm text-xs"
              onClick={() => {
                processMutation.mutate("itenerary");
              }}
            >
              Make Changes
              <X className="h-6 w-6 text-red-600" />
            </Button>
          </div>
          <p className="p-0 text-xs md:text-sm text-muted-foreground italic pt-2 flex items-center gap-1">
            Pathfinder earns a commission from purchases made through these
            links.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
