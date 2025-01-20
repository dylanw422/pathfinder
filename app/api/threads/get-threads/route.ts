import { findThreads } from "@/db/queries";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const threads = await findThreads(id);

    return Response.json(threads, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
