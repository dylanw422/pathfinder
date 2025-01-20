import { insertThread } from "@/db/queries";

export async function POST(req: Request) {
  const { userId, location, dates, guests, content } = await req.json();

  try {
    await insertThread({
      userId,
      location,
      dates,
      guests,
      content,
    });
    return Response.json({ message: "Thread created successfully" });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
