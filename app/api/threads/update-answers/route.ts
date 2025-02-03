import { updateSurveyAnswers } from "@/db/queries";

export async function POST(req: Request) {
  const { threadId, answers } = await req.json();
  await updateSurveyAnswers(threadId, answers);

  return Response.json({ message: "Answers updated successfully" });
}
