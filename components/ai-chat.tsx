import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateHotelBooked, updateProcess } from "@/queries/queries";
import { AIChatProps } from "@/types/types";
import { Messages } from "./messages";
import { ConfirmButton } from "./confirm-button";
import { ReviewCard } from "./review-card";
import HotelConfirmationModal from "./hotel-modal";

export function AIChat({
  thread,
  messages,
  user,
  isLoading,
  pendingUpdate,
}: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const processMutation = useMutation({
    mutationFn: (process: string) => updateProcess(thread.id, process),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`thread-${thread.id}`] });
    },
  });

  const hotelBookedMutation = useMutation({
    mutationFn: () => updateHotelBooked(thread.id, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`thread-${thread.id}`] });
    },
  });

  const handleContinue = async (process: string) => {
    await processMutation.mutateAsync(process);
  };

  return (
    <div className="md:mr-16">
      {messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => (
          <Messages key={messages.indexOf(msg)} msg={msg} user={user} />
        ))}
      {messages &&
        messages.length > 0 &&
        thread.process === "itenerary" &&
        thread.hotelLink &&
        !isLoading && <ConfirmButton handleContinue={handleContinue} />}
      {thread.review && thread.process === "review" && !pendingUpdate && (
        <ReviewCard
          hotelBooked={thread.hotelBooked}
          object={thread.review}
          processMutation={processMutation}
          hotelLink={thread.hotelLink}
          setIsOpen={setIsOpen}
        />
      )}
      <HotelConfirmationModal
        hotelBookedMutation={hotelBookedMutation}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
