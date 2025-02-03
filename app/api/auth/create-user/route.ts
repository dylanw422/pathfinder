import { insertUser } from "@/db/queries";

export async function POST(req: Request) {
  const { id, email, firstName, lastName } = await req.json();

  console.log("id", id);

  try {
    await insertUser({ id, email, firstName, lastName });
    return Response.json({ message: "User created successfully" });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
