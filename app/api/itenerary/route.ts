import OpenAI from "openai";
import { updateThread } from "@/db/queries";
const openai = new OpenAI({ apiKey: process.env.OPENAI_TEST_API_KEY });
import { differenceInDays } from "date-fns";

export async function POST(req: Request) {
  const { threadId, currentLocation, location, dates, guests, type } =
    await req.json();
  const totalDays = differenceInDays(dates?.to || dates?.from, dates?.from);
  let message: string | null | undefined = "";

  if (type === "vacation") {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are the world's greatest travel agent. I live in ${currentLocation}. I want to have an unforgettable experience in ${location} while getting an authentic feel of the culture and getting to see all the best attractions that ${location} has to offer. Plan a trip for me for ${totalDays}, departing on ${dates.from} and returning on ${dates.to}. Be extremely detailed in the itenerary. and ${guests} people. Include hotel name and what airport I should fly to. Also include the suggested airport to fly from. I only fly from major airports. Im willing to drive up to 3 hours to the airport. Include best departure time so that i can arrive in my destination in the morning. `,
        },
      ],
      model: "gpt-4o-mini",
      stream: true,
    });

    for await (const chunk of completion) {
        message = chunk.choices[0].delta.content;
       return Response.json({ message: chunk.choices[0].delta.content }, { status: 200 });
    }
  } else if (type === "business") {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `I'm going on a business trip to ${location}. I'm currently in ${currentLocation.city}, ${currentLocation.region}, ${currentLocation.country}. I'm staying `,
        },
      ],
      model: "gpt-4o-mini",
      stream: true,
    });

    for await (const chunk of completion) {
      message = chunk.choices[0].delta.content;
      return Response.json({ message: chunk.choices[0].delta.content }, { status: 200 });
    }
  } else if (type === "family") {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are the world's greatest travel agent. I live in ${currentLocation.city}, ${currentLocation.region}, ${currentLocation.country}. I want to have an unforgettable experience in ${location} while getting an authentic feel of the culture and getting to see all the best attractions that ${location} has to offer. Plan a trip for me for ${totalDays} and ${guests} people. Include hotel name and what airport I should fly to. Also include the suggested airport to fly from. Include best departure time so that i can arrive in my destination in the morning. `,
        },
      ],
      model: "gpt-4o-mini",
      stream: true,
    });

    for await (const chunk of completion) {
      message = chunk.choices[0].delta.content;
      return Response.json({ message: chunk.choices[0].delta.content }, { status: 200 });
    }
  }

  await updateThread(threadId, {
    role: "ai",
    content: message,
  });

  return Response.json({ message: message }, { status: 200 });
}
