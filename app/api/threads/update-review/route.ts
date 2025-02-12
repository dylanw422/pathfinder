import { updateHotelLink, updateReview } from "@/db/queries";
import axios from "axios";

export async function POST(req: Request) {
  const { threadId, object } = await req.json();
  if (threadId && object) {
    // ADD REVIEW OBJECT TO DB
    await updateReview(threadId, object);

    // GET HOTEL DETAILS
    const hotelDetailsRes = await axios.post(
      "http://localhost:3000/api/expedia/get-name",
      {
        searchTerm: object.hotel_name,
      }
    );

    const { hotelFullName, hotelId, latitude, longitude } =
      hotelDetailsRes.data;

    // PASS DETAIULS TO GET HOTEL URL
    const hotelURLRes = await axios.post(
      "http://localhost:3000/api/expedia/get-link",
      {
        regionName: hotelFullName,
        propertyId: hotelId,
        latitude: latitude,
        longitude: longitude,
        guests: object.guests,
      }
    );

    const hotelLink = hotelURLRes.data;

    // GET AFFILIATE LINK
    const affiliateLinkRes = await axios.post(
      "http://localhost:3000/api/expedia/affiliate-link",
      {
        url: hotelLink,
      }
    );

    const affiliateLink = affiliateLinkRes.data;

    // ADD HOTEL LINK TO DB
    await updateHotelLink(threadId, affiliateLink);

    return Response.json({ msg: "success" }, { status: 200 });
  }

  return Response.json({ msg: "failed" }, { status: 400 });
}

export const maxDuration = 30;
