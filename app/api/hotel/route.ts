import { updateHotelLink } from "@/db/queries";
import axios from "axios";

export async function POST(req: Request) {
  const { threadId, method, object } = await req.json();
  if (method && object) {
    if (method === "hotelLink") {
      const res = await axios.post(
        "http://localhost:3001/api/hotels/get-hotel",
        {
          hotelName: object.hotel_name,
          dateFrom: object.dates.from,
          dateTo: object.dates.to,
        }
      );

      await updateHotelLink(threadId, res.data.link);

      return Response.json(res.data);
    }
  }

  return Response.json(
    { msg: "No method or hotel name provided" },
    { status: 400 }
  );
}
