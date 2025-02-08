"use client";
import React, { useEffect, useLayoutEffect } from "react";
import { ArrowUp, ChevronsRight } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { AIChat } from "./ai-chat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getThreadById, getUser, updateReview } from "@/queries/queries";
import { useChat, experimental_useObject as useObject } from "ai/react";
import { Trip } from "@/app/api/json/schema";
import QuestionCarousel from "./question-carousel";
import { useSidebar } from "./ui/sidebar";
import { queryClient } from "./query-provider";
import { TripDetails } from "@/types/types";

export function ChatInterface({ id }: { id: string }) {
  const { toggleSidebar, state } = useSidebar();
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [messageReceived, setMessageReceived] = React.useState(false);
  const [responseFinished, setResponseFinished] = React.useState(false);
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUser });
  const { data: thread } = useQuery({
    queryKey: [`thread-${id}`],
    queryFn: () => getThreadById(id),
    enabled: !!id,
  });

  const {
    append,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    initialMessages: thread?.content,
    body: {
      threadId: thread?.id,
    },
    onFinish: () => {
      setMessageReceived(true);
      setResponseFinished(true);
    },
  });

  const { object, submit } = useObject({
    api: "/api/json",
    schema: Trip,
    onFinish({ object }) {
      reviewMutation.mutateAsync(object);
    },
  });

  const reviewMutation = useMutation({
    mutationFn: (object: TripDetails | undefined) =>
      updateReview(thread.id, object),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`thread-${thread.id}`] });
    },
  });

  useEffect(() => {
    if (messageReceived) {
      submit(messages.map((msg) => msg.content));
      setMessageReceived(false);
    }
  }, [messageReceived]);

  useEffect(() => {
    if (
      thread &&
      thread.process === "itenerary" &&
      thread.surveyAnswers &&
      thread.content.length === 0
    ) {
      append({
        role: "system",
        content: `You are the world's greatest travel planning expert. I live in Lake Charles, LA. I want to have an unforgettable experience in ${
          thread.location
        }. Your goal is to provide a detailed, user-friendly, day-by-day itenerary that matches these details: ${JSON.stringify(
          thread.surveyAnswers
        )}. Include hotel name and what airports I should fly from from and to. I only fly from major airports. Im willing to drive to the nearest major airport. Include best departure time so that I can arrive in my destination in the morning.`,
      });
    }
  }, [thread]);

  // SCROLL FUNCTIONALITY
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
      });
    }
  };

  useLayoutEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, object, isLoading, thread]);

  // BLANK RENDER FOR LOADING
  if (!thread || !messages) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <div className="md:text-xl flex items-center text-center text-lg font-bold mb-4 border-b p-2">
          <ChevronsRight
            className={`text-sidebar-foreground hover:cursor-pointer hover:bg-sidebar-accent transition rounded-sm p-1  ${
              state === "expanded" ? "md:hidden block" : ""
            }`}
            onClick={toggleSidebar}
          />
          <h1 className="absolute left-1/2 -translate-x-1/2 md:relative md:text-center">
            🌎 {thread.location}
          </h1>
        </div>
        <div
          className="w-full overflow-y-scroll flex-1"
          style={{
            scrollbarWidth: "none",
          }}
          ref={scrollAreaRef}
        >
          {/* SURVEY */}
          {thread.process === "survey" && (
            <QuestionCarousel threadId={thread.id} />
          )}

          {/* ITENERARY, REVIEW, & BOOKING */}
          {(thread.process === "itenerary" || thread.process === "review") && (
            <AIChat
              thread={thread}
              messages={messages}
              user={user}
              isLoading={isLoading}
              submit={submit}
              object={object}
              responseFinished={responseFinished}
              setResponseFinished={setResponseFinished}
            />
          )}
        </div>

        {/* TEXT AREA */}
        <div className="sticky bottom-0 bg-background pb-2 pl-2 pr-2">
          <div className="flex items-end space-x-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Request changes here"
              disabled={thread.process !== "itenerary"}
              className="resize-none text-base focus:outline-none" // Updated class
              rows={3}
            />
            <Button
              size="icon"
              className="mb-0"
              aria-label="Send message"
              onClick={handleSubmit}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
