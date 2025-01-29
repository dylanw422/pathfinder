import { insertThread, findThreadByLocation } from "@/db/queries";

export async function POST(req: Request) {
  const { userId, location, dates, guests, type, content } = await req.json();

  try {
    const existingThread = await findThreadByLocation(userId, location);
    console.log(existingThread);

    if (existingThread.length === 0) {
      const newThread = await insertThread({
        userId,
        location,
        dates,
        guests,
        type,
        content,
      });

      return Response.json({
        message: "Thread created successfully",
        thread: newThread,
      });
    }

    return Response.json({
      message: "Thread already exists",
      thread: existingThread,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
