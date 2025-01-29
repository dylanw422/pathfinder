import { deleteThread } from "@/db/queries";

export async function POST(req: Request) {
  const { id } = await req.json();

  await deleteThread(id);

  return Response.json({ message: "Thread deleted successfully" });
}
