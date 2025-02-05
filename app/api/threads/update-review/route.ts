import { updateReview } from "@/db/queries";

export async function POST(req: Request) {
  const { threadId, object } = await req.json();
  if (threadId && object) {
    await updateReview(threadId, object);
    return Response.json({ msg: "success" }, { status: 200 });
  }

  return Response.json({ msg: "failed" }, { status: 400 });
}
