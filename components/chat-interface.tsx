"use client";

import { useUserThreads } from "./user-threads-provider";

export function ChatInterface({ itenerary }: { itenerary: any }) {
  const { user, threads } = useUserThreads();
  const messages = threads[threads.length - 1].content;

  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="font-bold border-b p-2">Pathfinder AI Helper</h1>
      <div className="p-2 flex flex-col h-full">
        <h1 className="text-xl font-bold">🌎 {threads[0]?.location}</h1>
        <div id="chat" className="w-full h-3/4 p-2"></div>
      </div>
    </div>
  );
}
