import { findThreadById } from "@/db/queries";

export async function POST(req: Request) {
  const { id } = await req.json();

  const thread = await findThreadById(id);

  if (thread) {
    return Response.json(thread, { status: 200 });
  } else {
    return Response.json("Thread not found.", { status: 400 });
  }
}
