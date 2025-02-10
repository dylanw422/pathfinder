import axios from "axios";
import { affiliateHeaders } from "../headers";

export async function POST(req: Request) {
  const { url } = await req.json();

  function getHotelNameFromLink(link: string) {
    try {
      const url = new URL(link); // Use the URL object for robust parsing
      const pathname = url.pathname;

      // Extract the part after the domain and before the first dot after the city
      const parts = pathname.split("/");

      // Find the part containing the city and hotel name
      let hotelPart = null;
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].includes("-Hotels-")) {
          // Look for the "-Hotels-" segment
          hotelPart = parts[i];
          break;
        }
      }

      if (!hotelPart) {
        return null; // Or handle the case where the pattern isn't found
      }

      // Extract the hotel name (remove city and other parts)
      const hotelNameParts = hotelPart.split("-Hotels-");
      const hotelNameWithCity = hotelNameParts[1];

      if (!hotelNameWithCity) return null; // Handle cases where hotel name not found.

      const hotelName = hotelNameWithCity.substring(
        0,
        hotelNameWithCity.indexOf(".")
      );

      return hotelName.replace(/-/g, " "); // Replace hyphens with spaces
    } catch (error) {
      console.error("Invalid URL:", error);
      return null; // Handle invalid URLs gracefully
    }
  }

  try {
    const requestBody = {
      partnerId: "30bb21a7-e1dd-4354-982a-001c9fb4ee90",
      camref: "1101l4iaNq",
      creativeref: "1100l68075",
      landingPages: [
        {
          generateShortLink: true,
          label: getHotelNameFromLink(url),
          title: "Custom Link",
          text: "Plan and book your whole trip on Expedia",
          url: url,
          type: "custom",
        },
      ],
    };

    const affiliateLinkRes = await axios.post(
      "https://vap.expedia.com/affiliates-bff/api/atlas/urls/pz",
      requestBody,
      {
        headers: affiliateHeaders,
      }
    );

    const affiliateLink = affiliateLinkRes.data.affiliateUrls[0].url;
    return Response.json(affiliateLink, { status: 200 });
  } catch (error: unknown) {
    return Response.json(error, { status: 500 });
  }
}
