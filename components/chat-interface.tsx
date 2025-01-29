"use client";
import React from "react";
import { ArrowUp } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MarkdownContent } from "./ui/markdown-content";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getThreadById, getUser } from "@/queries/queries";

interface Message {
  role: "user" | "ai";
  content: string;
}

export function ChatInterface({ id }: { id: string }) {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [aiResponse, setAiResponse] = React.useState<string>("");
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUser });
  const { data: thread } = useQuery({
    queryKey: [`thread-${id}`],
    queryFn: () => getThreadById(id),
    enabled: !!id,
  });

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    let response;

    if (!!thread && thread.content.length === 0) {
      response = await fetch("/api/itenerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: thread?.id,
          currentLocation: "Lake Charles, LA", // update this to get current location
          location: thread?.location,
          dates: thread?.dates,
          guests: thread?.guests,
          type: thread?.type,
          message: message,
        }),
      });
    } else {
      response = await fetch("/api/update-thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: thread?.id,
          message: message,
        }),
      });
    }

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiMessage = "";

    const processStream = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        aiMessage += chunk;
        setAiResponse(aiMessage);
        scrollToBottom();
      }
      setMessages((prev) => [...prev, { role: "ai", content: aiMessage }]);
      setAiResponse("");
    };

    processStream();
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [aiResponse]);

  React.useEffect(() => {
    if (thread && thread.content.length > 0) {
      setMessages(thread.content);
    } else if (thread && thread.content.length === 0) {
      handleSendMessage();
    }
  }, [thread]);

  if (!thread) {
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
          {messages.map((msg, index) => (
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
                {msg.role === "ai" && index === messages.length - 1 && (
                  <div className="p-2 flex items-center gap-2 justify-end">
                    <p className="text-xs text-muted-foreground">
                      Click to proceed
                    </p>
                    <button className="px-4 py-2 rounded-full bg-blue-500 text-white shadow-lg">
                      This looks good 👍
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 bg-background pt-4">
          <div className="flex items-end space-x-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              className="resize-none"
              rows={3}
            />
            <Button
              size="icon"
              className="mb-1"
              aria-label="Send message"
              onClick={handleSendMessage}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

// const getCurrentLocation = async () => {
//   const ipRes = await axios.get("https://api.ipify.org?format=json");
//   const { ip } = ipRes.data;
//   const currentLocation = await axios.post("/api/get-location", {
//     ip,
//   });
//
//   return currentLocation.data;
// };
//
// if (threadsPending || !threads) {
//   return <div></div>;
// }

// const { data: itenerary, isFetching: fetchingItenerary } = useQuery({
//   queryKey: ["itenerary"],
//   queryFn: () =>
//     getItenerary({
//       threadId: thread?.id,
//       currentLocation: "Lake Charles, LA", // update this to get current location
//       location: thread?.location,
//       dates: thread?.dates,
//       guests: thread?.guests,
//       type: thread?.type,
//     }),
//   enabled: !!thread && thread.content.length === 0,
// });
