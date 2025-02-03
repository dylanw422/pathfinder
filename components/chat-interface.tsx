"use client";
import React from "react";
import { ArrowUp } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { AIChat } from "./ai-chat";
import { useQuery } from "@tanstack/react-query";
import { getThreadById, getUser } from "@/queries/queries";
import { useChat, experimental_useObject as useObject } from "ai/react";
import { Trip } from "@/app/api/json/schema";
import QuestionCarousel from "./question-carousel";

export function ChatInterface({ id }: { id: string }) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
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
  });
  const { object, submit } = useObject({
    api: "/api/json",
    schema: Trip,
  });

  React.useEffect(() => {
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
        )}. Include hotel name and what airports I should from from and to. I only fly from major airports. Im willing to drive to the nearest major airport. Include best departure time so that i can arrive in my destination in the morning.`,
      });
    }
  }, [thread]);

  // SCROLL FUNCTIONALITY
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  React.useLayoutEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, object, isLoading]);

  // BLANK RENDER FOR LOADING
  if (!thread || !messages) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b p-4">
        <h1 className="text-md font-bold">Pathfinder AI Helper</h1>
      </header>
      <main className="flex-1 overflow-hidden p-4 flex flex-col relative">
        <h2 className="text-xl font-bold mb-4">🌎 {thread.location}</h2>
        <div
          className="w-[95%] pr-4 overflow-y-scroll flex-1"
          style={{
            scrollbarWidth: "none",
          }}
          ref={scrollAreaRef}
        >
          {thread.process === "survey" && (
            <QuestionCarousel threadId={thread.id} />
          )}
          {(thread.process === "itenerary" || thread.process === "review") && (
            <AIChat
              thread={thread}
              messages={messages}
              user={user}
              isLoading={isLoading}
              submit={submit}
              object={object}
            />
          )}
        </div>
        <div className="sticky bottom-0 bg-background pt-4">
          <div className="flex items-end space-x-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Request changes here"
              disabled={thread.process !== "itenerary"}
              className="resize-none"
              rows={3}
            />
            <Button
              size="icon"
              className="mb-1"
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
