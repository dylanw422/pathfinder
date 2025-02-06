import { ProcessMutation, TripDetails } from "@/types/types";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function ReviewCard({
  object,
  processMutation,
}: {
  object: TripDetails;
  processMutation: ProcessMutation;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
        <CardFooter className="flex flex-col items-start space-y-4">
          <p className="font-semibold md:text-lg">Start booking? 👇</p>
          <div className="flex justify-between w-full">
            <div className="md:space-x-4 space-x-2">
              <Button
                variant="outline"
                className="md:p-4 md:h-12 h-10 rounded-md bg-green-100 text-green-600 hover:text-green-700 hover:bg-green-200 md:text-sm text-xs"
                onClick={() => {
                  console.log("Trip confirmed");
                }}
              >
                View Hotel
                <Check className="h-6 w-6 text-green-600" />
              </Button>
              <Button
                variant="outline"
                className="px-4 md:h-12 h-10 rounded-md text-red-500 hover:text-red-600 bg-red-100 hover:bg-red-200 md:text-sm text-xs"
                onClick={() => {
                  processMutation.mutateAsync("itenerary");
                }}
              >
                Make Changes
                <X className="h-6 w-6 text-red-600" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
