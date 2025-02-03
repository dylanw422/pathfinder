import React, { useEffect } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { MarkdownContent } from "./ui/markdown-content";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AnimatePresence, motion } from "motion/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { updateProcess } from "@/queries/queries";
import { User } from "@supabase/supabase-js";
import { Thread, Message, TripDetails } from "@/types/types";

export function AIChat({
  thread,
  messages,
  user,
  isLoading,
  submit,
  object,
}: {
  thread: Thread;
  messages: Message[];
  user: User | null | undefined;
  isLoading: boolean;
  submit: (messages: string[]) => void;
  object: TripDetails | undefined;
}) {
  const queryClient = useQueryClient();

  const threadMutation = useMutation({
    mutationFn: (process: string) => updateProcess(thread.id, process),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`thread-${thread.id}`] });
    },
  });

  const handleContinue = async (process: string) => {
    submit(messages.map((msg) => msg.content));
    await threadMutation.mutateAsync(process);
  };

  useEffect(() => {
    if (thread.process === "review") {
      submit(messages.map((msg) => msg.content));
    }
  }, []);

  return (
    <div>
      {messages
        .filter((msg) => msg.role !== "system")
        .map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 mb-4 ${
              msg.role === "user" ? "flex-row-reverse w-full gap-2" : ""
            }`}
          >
            <Avatar>
              <AvatarFallback
                className={`${
                  msg.role === "user" ? "bg-secondary" : "bg-blue-500"
                }`}
              >
                {msg.role === "user" ? (
                  <h1>{user?.user_metadata?.first_name.slice(0, 1)}</h1>
                ) : (
                  <em className="font-bold text-white text-xl">P</em>
                )}
              </AvatarFallback>
            </Avatar>
            <div
              className={`p-0 ${
                msg.role === "user"
                  ? "py-2 bg-secondary text-primary-foreground rounded-xl"
                  : "text-secondary-foreground"
              }`}
            >
              <MarkdownContent content={msg.content} />
            </div>
          </div>
        ))}
      <AnimatePresence>
        {messages &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "assistant" &&
          thread.process === "itenerary" &&
          !isLoading &&
          (thread.process === "itenerary" || thread.process === "review") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex items-center justify-end space-x-2"
            >
              <p className="text-sm text-muted-foreground">Click to proceed</p>
              <button
                onClick={() => handleContinue("review")}
                className="px-4 py-2 rounded-full bg-blue-500 text-white"
              >
                This looks good! 👍
              </button>
            </motion.div>
          )}
      </AnimatePresence>
      <AnimatePresence>
        {object && thread.process === "review" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="mb-4 mt-4 ml-8">
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
                      <p className="flex items-center gap-2">
                        {object.hotel_name}
                      </p>
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
                    <p className="flex items-center gap-1">
                      {object.dates?.from} <ArrowRight className="p-1" />{" "}
                      {object.dates?.to}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Guests</h3>
                    <Badge variant="secondary">{object.guests}</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-4">
                <p className="font-semibold text-lg">Start booking? 👇</p>
                <div className="flex justify-between w-full">
                  <div className="space-x-4">
                    <Button
                      variant="outline"
                      className="p-4 h-12 rounded-md bg-green-100 text-green-600 hover:text-green-700 hover:bg-green-200"
                      onClick={() => {
                        console.log("Trip confirmed");
                      }}
                    >
                      View Hotel
                      <Check className="h-6 w-6 text-green-600" />
                    </Button>
                    <Button
                      variant="outline"
                      className="px-4 h-12 rounded-md text-red-500 hover:text-red-600 bg-red-100 hover:bg-red-200"
                      onClick={() => {
                        threadMutation.mutateAsync("itenerary");
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
        )}
      </AnimatePresence>
    </div>
  );
}
