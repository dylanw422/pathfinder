import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProcess } from "@/queries/queries";
import { AIChatProps } from "@/types/types";
import { Messages } from "./messages";
import { ConfirmButton } from "./confirm-button";
import { ReviewCard } from "./review-card";

export function AIChat({
  thread,
  messages,
  user,
  isLoading,
  setResponseFinished,
}: AIChatProps) {
  const queryClient = useQueryClient();

  const processMutation = useMutation({
    mutationFn: (process: string) => updateProcess(thread.id, process),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`thread-${thread.id}`] });
    },
  });

  const handleContinue = async (process: string) => {
    await processMutation.mutateAsync(process);
  };

  return (
    <div className="md:mr-16 px-4">
      {messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => (
          <Messages key={messages.indexOf(msg)} msg={msg} user={user} />
        ))}
      {messages &&
        messages.length > 0 &&
        thread.process === "itenerary" &&
        !isLoading && (
          <ConfirmButton
            handleContinue={handleContinue}
            setResponseFinished={setResponseFinished}
          />
        )}
      {thread.review && thread.process === "review" && (
        <ReviewCard
          object={thread.review}
          processMutation={processMutation}
          hotelLink={thread.hotelLink}
        />
      )}
    </div>
  );
}
