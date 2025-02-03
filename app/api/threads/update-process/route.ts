import { updateProcess } from "@/db/queries";

export async function POST(req: Request) {
  const { threadId, process } = await req.json();

  const updatedThread = await updateProcess(threadId, process);
  return Response.json(updatedThread);
}
