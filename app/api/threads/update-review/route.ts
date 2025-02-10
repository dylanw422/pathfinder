import { updateHotelLink, updateReview } from "@/db/queries";
import axios from "axios";

// interface CoordinateObject {
//   coordinateType: string;
//   latitude: number;
//   longitude: number;
//   accuracy: number;
// }

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

// // HELPER FUNCTIONS TO FORMAT DATES
// const formatDate = (date: string | undefined) => {
//   if (!date) return "";
//   return new Date(date).toISOString().split("T")[0];
// };
// const formattedDateForHotelRequest = (date: string | undefined) => {
//   if (!date) return "";
//   const [month, day, year] = date.split("/");
//   const formattedDay = day.startsWith("0") ? day.slice(1) : day;
//   return `${year}${month}${formattedDay}`;
// };

// // TRIP.COM SEARCH API
// const searchRes = await axios.post(
//   "https://us.trip.com/htls/getKeywordSearch",
//   {
//     code: 0,
//     codeType: "",
//     keyWord: object.hotel_name,
//     searchType: "D",
//     scenicCode: 0,
//     cityCodeOfUser: 0,
//     searchConditions: [
//       { type: "D_PROVINCE", value: "T" },
//       { type: "SupportNormalSearch", value: "T" },
//       { type: "DisplayTagIcon", value: "F" },
//     ],
//     head: {
//       platform: "PC",
//       clientId: "1738928746456.7668jL2gd2RQ",
//       bu: "ibu",
//       group: "TRIP",
//       aid: "",
//       sid: "",
//       ouid: "",
//       currency: "USD",
//       region: "US",
//       locale: "en-US",
//       timeZone: "-6",
//       device: "PC",
//       deviceID: "PC",
//       clientVersion: "0",
//       frontend: {
//         vid: "1738928746456.7668jL2gd2RQ",
//         sessionID: "1",
//         pvid: "28",
//       },
//       extension: [
//         { name: "cityId", value: "" },
//         { name: "checkIn", value: "" },
//         { name: "checkOut", value: "" },
//       ],
//       cid: "1738928746456.7668jL2gd2RQ",
//       hotelExtension: { webpSupport: true },
//       traceLogID: "83abecb251fac",
//       ticket: "",
//       hasAidInUrl: "false",
//       href: "https://us.trip.com/?locale=en-us&curr=USD",
//     },
//   }
// );

// // DESTRUCTURE TRIP.COM SEARCH API RESPONSE
// const result = searchRes.data.keyWordSearchResults[0];
// const hotelId = result.code;
// const cityId = result.city.geoCode;
// const cityName = result.city.enusName;
// const provinceId = result.province.geoCode;
// const countryId = result.country.geoCode;
// const checkIn = formatDate(object.dates.from);
// const checkOut = formatDate(object.dates.to);
// const lat = result.coordinateInfos.find(
//   (item: CoordinateObject) => item.coordinateType === "NORMAL"
// ).latitude;
// const lon = result.coordinateInfos.find(
//   (item: CoordinateObject) => item.coordinateType === "NORMAL"
// ).latitude;
// const districtId = 0;
// const searchWord = result.resultWord.split(" ").join("%20");
// const searchValue = `${result.item.data.filterId}*${result.item.data.type}*${result.item.data.value}*${result.item.data.subType}`;
// const searchCoordinate = result.coordinateInfos
//   .map((item: CoordinateObject) => {
//     return `${item.coordinateType}_${item.latitude}_${item.longitude}_${item.accuracy}`;
//   })
//   .join("|");
// const adults = object.guests;
// const children = 0;
// const href = `https://us.trip.com/hotels/list?city=${cityId}&cityName=${cityName}&provinceId=${provinceId}&countryId=${countryId}&checkIn=${checkIn}&checkOut=${checkOut}&lat=${lat}&lon=${lon}&districtId=${districtId}&barCurr=USD&searchType=H&searchWord=${searchWord}&searchValue=${searchValue}&searchCoordinate=${searchCoordinate}&crn=1&adult=${adults}&children=${children}&searchBoxArg=t&ctm_ref=ix_sb_dl&travelPurpose=0&domestic=false`;

// // TRIP.COM HOTEL API
// const hotelRes = await axios.post(
//   "https://us.trip.com/htls/getBrowseRecord?x-traceID=1738928746456.7668jL2gd2RQ-1738939654050-1327751997",
//   {
//     hotelIds: [
//       {
//         cityId: cityId,
//         hotelId: hotelId,
//       },
//     ],
//     search: {
//       checkIn: formattedDateForHotelRequest(object.dates.from),
//       checkOut: formattedDateForHotelRequest(object.dates.to),
//       roomQuantity: 1,
//       pageCode: "10320668148",
//     },
//     head: {
//       platform: "PC",
//       clientId: "1738928746456.7668jL2gd2RQ",
//       bu: "ibu",
//       group: "TRIP",
//       aid: "",
//       sid: "",
//       ouid: "",
//       caid: "",
//       csid: "",
//       couid: "",
//       region: "US",
//       locale: "en-US",
//       timeZone: "-6",
//       currency: "USD",
//       p: "94116289106",
//       pageID: "10320668148",
//       deviceID: "PC",
//       clientVersion: "0",
//       frontend: {
//         vid: "1738928746456.7668jL2gd2RQ",
//         sessionID: "3",
//         pvid: "4",
//       },
//       extension: [
//         {
//           name: "cityId",
//           value: cityId,
//         },
//         {
//           name: "checkIn",
//           value: formatDate(object.dates.from),
//         },
//         {
//           name: "checkOut",
//           value: formatDate(object.dates.to),
//         },
//         {
//           name: "region",
//           value: "US",
//         },
//       ],
//       tripSub1: "",
//       qid: "425884526949",
//       pid: "52c134eb-0950-4bf3-bdc5-f217aa72843d",
//       hotelExtension: {},
//       cid: "1738928746456.7668jL2gd2RQ",
//       traceLogID: "ea79b87e0caa2",
//       ticket: "",
//       href: href,
//     },
//   }
// );

// // DESTRUCTURE TRIP.COM HOTEL API RESPONSE
// const hotelLink = hotelRes.data.hotelList[0].hotelBasicInfo.jumpUrl;
// const hotelURL = new URL(`https://us.trip.com${hotelLink}`);
// const params = new URLSearchParams(hotelURL.search);
// params.set("checkIn", formatDate(object.dates.from));
// params.set("checkOut", formatDate(object.dates.to));
// params.set("adult", object.guests);
// hotelURL.search = params.toString();
// const finalHotelLink = hotelURL.toString();
