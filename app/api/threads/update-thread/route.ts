import { updateThread } from "@/db/queries";

export async function POST(req: Request) {
  const { threadId, userMsg, threadContext } = await req.json();

  await updateThread(threadId, {
    role: "user",
    content: userMsg,
  });

  return Response.json({ message: "Thread updated successfully" });
}
