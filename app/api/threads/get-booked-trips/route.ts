import { getBookedTrips } from "@/db/queries";

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return Response.json([]);
  }

  const bookedTrips = await getBookedTrips(id);
  return Response.json(bookedTrips, { status: 200 });
}
