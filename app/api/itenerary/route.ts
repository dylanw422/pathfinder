import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_TEST_API_KEY });
import { differenceInDays } from "date-fns";

export async function POST(req: Request) {
  const { currentLocation, location, dates, guests } = await req.json();
  const totalDays = differenceInDays(dates?.to || dates?.from, dates?.from);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are the world's greatest travel agent. I live in ${currentLocation.city}, ${currentLocation.region}, ${currentLocation.country}. I want to have an unforgettable experience in ${location} while get an authentic feel of the culture and getting to see all the best attractions that ${location} has to offer. Plan a trip for me for ${totalDays} and ${guests} people. Include hotel name and what airport I should fly to. Also include the suggested airport to fly from (I'm located in ${currentLocation} and a suggested departure time so that i can arrive in my destination in the morning.) `,
      },
    ],
    model: "gpt-4o-mini",
  });

  return Response.json(completion.choices[0]);
}
