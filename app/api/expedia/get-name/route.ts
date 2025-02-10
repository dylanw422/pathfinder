import axios from "axios";
import { searchResultHeaders } from "../headers";

export async function POST(req: Request) {
  const { searchTerm } = await req.json();
  try {
    const requestBody = [
      {
        operationName: "SearchLocationSuggestions",
        variables: {
          context: {
            siteId: 1,
            locale: "en_US",
            eapid: 40436,
            tpid: 1,
            currency: "USD",
            device: {
              type: "DESKTOP",
            },
            identity: {
              duaid: "af8af70d-f1f6-4a73-ae3b-974ed4ea5b75",
              authState: "ANONYMOUS",
            },
            privacyTrackingState: "CAN_TRACK",
          },
          searchLocationCriteria: {
            searchTerm: searchTerm,
            lineOfBusiness: "HOTELS",
            isDestination: true,
            isGroundTransfersAirport: false,
          },
        },
        extensions: {
          persistedQuery: {
            version: 1,
            sha256Hash:
              "d59763ac1db048fe52c47398da71f8da6894467cbdd78d703f0138579a3d8ee2",
          },
        },
      },
    ];

    const searchResultsRes = await axios.post(
      "https://www.expedia.com/graphql",
      requestBody,
      {
        headers: searchResultHeaders,
      }
    );

    const hotelFullName =
      searchResultsRes.data[0].data.searchLocation.itemsGroups[0].items[0]
        .locationFullName;

    const hotelId =
      searchResultsRes.data[0].data.searchLocation.itemsGroups[0].items[0]
        .propertyId;

    const latitude =
      searchResultsRes.data[0].data.searchLocation.itemsGroups[0].items[0]
        .coordinates.latitude;
    const longitude =
      searchResultsRes.data[0].data.searchLocation.itemsGroups[0].items[0]
        .coordinates.longitude;

    return Response.json(
      { hotelFullName, hotelId, latitude, longitude },
      { status: 200 }
    );
  } catch (error: unknown) {
    return Response.json(error, { status: 500 });
  }
}
