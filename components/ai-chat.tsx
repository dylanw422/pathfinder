import React from "react";
import { AnimatePresence } from "motion/react";
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
  submit,
  object,
}: AIChatProps) {
  const queryClient = useQueryClient();

  const renderObject = thread.review ? thread.review : object;

  const processMutation = useMutation({
    mutationFn: (process: string) => updateProcess(thread.id, process),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`thread-${thread.id}`] });
    },
  });

  const handleContinue = async (process: string) => {
    submit(messages.map((msg) => msg.content));
    await processMutation.mutateAsync(process);
  };

  return (
    <div className="md:mr-16">
      {messages
        .filter((msg) => msg.role !== "system")
        .map((msg, index) => (
          <Messages key={index} index={index} msg={msg} user={user} />
        ))}
      <AnimatePresence>
        {messages &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "assistant" &&
          thread.process === "itenerary" &&
          !isLoading &&
          (thread.process === "itenerary" || thread.process === "review") && (
            <ConfirmButton handleContinue={handleContinue} />
          )}
      </AnimatePresence>
      <AnimatePresence>
        {renderObject && thread.process === "review" && (
          <ReviewCard object={renderObject} processMutation={processMutation} />
        )}
      </AnimatePresence>
    </div>
  );
}
