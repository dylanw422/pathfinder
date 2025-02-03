import { findThreads } from "@/db/queries";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const threads = await findThreads(id);
    if (threads.length === 0) {
      return Response.json([], { status: 200 });
    } else {
      return Response.json(threads, { status: 200 });
    }
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
