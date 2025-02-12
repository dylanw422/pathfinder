import { updateHotelLink, updateReview } from "@/db/queries";
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.pthfindr.com"
    : "http://localhost:3000";

export async function POST(req: Request) {
  const { threadId, object } = await req.json();
  if (threadId && object) {
    try {
      await updateReview(threadId, object);

      let hotelDetailsRes, hotelURLRes, affiliateLinkRes;

      // RETURN HOTEL DETAILS
      try {
        hotelDetailsRes = await axios.post(
          `${API_BASE_URL}/api/expedia/get-name`,
          { searchTerm: object.hotel_name }
        );
      } catch (error: unknown) {
        console.error("Error fetching hotel details:", error);
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        return Response.json(
          { msg: "failed", step: "hotelDetails", error: errorMessage },
          { status: 500 }
        );
      }

      const { hotelFullName, hotelId, latitude, longitude } =
        hotelDetailsRes.data;

      // PLUG HOTEL DETAILS TO GET URL
      try {
        hotelURLRes = await axios.post(`${API_BASE_URL}/api/expedia/get-link`, {
          regionName: hotelFullName,
          propertyId: hotelId,
          latitude: latitude,
          longitude: longitude,
          guests: object.guests,
        });
      } catch (error: unknown) {
        console.error("Error fetching hotel URL:", error);
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        return Response.json(
          { msg: "failed", step: "hotelURL", error: errorMessage },
          { status: 500 }
        );
      }

      const hotelLink = hotelURLRes.data;

      // PLUG HOTEL LINK TO GET AFFILIATE LINK
      try {
        affiliateLinkRes = await axios.post(
          `${API_BASE_URL}/api/expedia/affiliate-link`,
          {
            url: hotelLink,
          }
        );
      } catch (error: unknown) {
        console.error("Error fetching affiliate link:", error);
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        return Response.json(
          { msg: "failed", step: "affiliateLink", error: errorMessage },
          { status: 500 }
        );
      }

      const affiliateLink = affiliateLinkRes.data;

      await updateHotelLink(threadId, affiliateLink);

      return Response.json({ msg: "success" }, { status: 200 });
    } catch (overallError: unknown) {
      console.error("Overall error in POST function:", overallError);
      let errorMessage = "Unknown error";
      if (overallError instanceof Error) {
        errorMessage = overallError.message;
      }
      return Response.json(
        { msg: "failed", step: "overall", error: errorMessage },
        { status: 500 }
      );
    }
  }

  return Response.json(
    { msg: "failed", step: "initialCheck" },
    { status: 400 }
  );
}

export const maxDuration = 30;
