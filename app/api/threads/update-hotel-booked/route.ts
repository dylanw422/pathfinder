import { updateHotelBooked } from "@/db/queries";

export async function POST(req: Request) {
  const { threadId, hotelBooked } = await req.json();

  if (threadId && hotelBooked) {
    await updateHotelBooked(threadId, hotelBooked);
    return Response.json("Hotel booked successfully", { status: 200 });
  }

  return Response.json("Failed to update hotel booking status", {
    status: 400,
  });
}
