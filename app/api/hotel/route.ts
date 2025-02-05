import axios from "axios";

export async function POST(req: Request) {
  const { method, object } = await req.json();
  if (method && object) {
    if (method === "hotelImage") {
      const res = await axios.post(
        "http://localhost:3001/api/hotels/get-hotel",
        {
          hotelName: object.hotel_name,
          dateFrom: object.dates.from,
          dateTo: object.dates.to,
        }
      );
      return Response.json(res.data);
    }

    if (method === "hotelCheckout") {
      return Response.json({ msg: "hotelCheckout", status: 200 });
    }
  }

  return Response.json(
    { msg: "No method or hotel name provided" },
    { status: 400 }
  );
}
