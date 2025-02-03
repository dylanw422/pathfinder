import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { Trip } from "./schema";

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai("gpt-4o-mini"),
    schema: Trip,
    prompt: `Generate a trip for this context:` + context,
  });

  return result.toTextStreamResponse();
}
