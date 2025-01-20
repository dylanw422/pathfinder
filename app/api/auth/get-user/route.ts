import { findUser } from "@/db/queries";

export async function POST(req: Request) {
  const { id } = await req.json();

  const user = await findUser(id);

  if (user) {
    return Response.json(user, { status: 200 });
  } else {
    return Response.json("User not found.", { status: 400 });
  }
}
