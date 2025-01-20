import { db } from "@/db";
import { usersTable, threadsTable } from "./schema";
import { eq } from "drizzle-orm";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface Thread {
  userId: string;
  location: string;
  dates: string;
  guests: string;
  content: JSON[];
}

export const insertUser = async (data: User) => {
  return await db.insert(usersTable).values(data).returning();
};

export const findUser = async (id: string) => {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
};

export const insertThread = async (data: Thread) => {
  return await db.insert(threadsTable).values(data).returning();
};

export const findThreads = async (id: string) => {
  return await db
    .select()
    .from(threadsTable)
    .where(eq(threadsTable.userId, id));
};
