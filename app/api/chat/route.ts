import { updateThread } from "@/db/queries";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages, threadId } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    onFinish: async ({ text }) => {
      const updatedMessages = [
        ...messages,
        { role: "assistant", content: text },
      ];

      await updateThread(threadId, updatedMessages);
    },
  });

  return result.toDataStreamResponse();
}

export const maxDuration = 30;
