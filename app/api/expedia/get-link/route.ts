import axios from "axios";
import { URLHeaders } from "../headers";

export async function POST(req: Request) {
  const { regionName, propertyId, latitude, longitude, guests } =
    await req.json();
  try {
    const requestBody = {
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
        criteria: {
          primary: {
            dateRange: {
              checkInDate: {
                day: 2,
                month: 4,
                year: 2025,
              },
              checkOutDate: {
                day: 9,
                month: 4,
                year: 2025,
              },
            },
            destination: {
              regionName: regionName,
              regionId: null,
              coordinates: {
                latitude: latitude,
                longitude: longitude,
              },
              pinnedPropertyId: propertyId,
              propertyIds: null,
              mapBounds: null,
            },
            rooms: [
              {
                adults: guests,
                children: [],
              },
            ],
          },
          secondary: {
            counts: [
              {
                id: "resultsStartingIndex",
                value: 0,
              },
              {
                id: "resultsSize",
                value: 3,
              },
            ],
            booleans: [],
            selections: [
              {
                id: "privacyTrackingState",
                value: "CAN_TRACK",
              },
              {
                id: "searchId",
                value: "5ac50244-951c-42a0-9feb-4050a0851059",
              },
              {
                id: "sort",
                value: "RECOMMENDED",
              },
              {
                id: "useRewards",
                value: "SHOP_WITHOUT_POINTS",
              },
            ],
            ranges: [],
          },
        },
        destination: {
          regionName: null,
          regionId: null,
          coordinates: null,
          pinnedPropertyId: null,
          propertyIds: null,
          mapBounds: null,
        },
        shoppingContext: {
          multiItem: null,
        },
        returnPropertyType: false,
        includeDynamicMap: false,
      },
      operationName: "PropertyListingQuery",
      extensions: {
        persistedQuery: {
          sha256Hash:
            "0549aa17c435f3ae66de06a6ae5bff69e9aecf4d7e9dbd932a3c4d23228f67af",
          version: 1,
        },
      },
    };

    const hotelLinkRes = await axios.post(
      "https://www.expedia.com/graphql",
      requestBody,
      {
        headers: URLHeaders,
      }
    );

    const URL =
      hotelLinkRes.data.data.propertySearch.propertySearchListings[0].cardLink
        .resource.value;

    return Response.json(URL, { status: 200 });
  } catch (error: unknown) {
    return Response.json(error, { status: 500 });
  }
}
