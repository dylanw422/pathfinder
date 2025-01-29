import { db } from "@/db";
import { usersTable, threadsTable } from "./schema";
import { eq, desc, sql, and } from "drizzle-orm";
import { DateRange } from "react-day-picker";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Thread {
  id?: string | undefined;
  userId: string;
  location: string;
  dates: DateRange;
  guests: string;
  type: string;
  content?: JSON[];
}

export interface ThreadContent {
  role: string;
  content: string | null;
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
    .where(eq(threadsTable.userId, id))
    .orderBy(desc(threadsTable.createdAt));
};

export const findThreadById = async (id: string) => {
  return await db.select().from(threadsTable).where(eq(threadsTable.id, id));
};

export const findThreadByLocation = async (userId: string, location: string) => {
  return await db
    .select()
    .from(threadsTable)
    .where(and(eq(threadsTable.userId, userId), eq(threadsTable.location, location)))
    .limit(1);
};

export const updateThread = async (id: string, newContent: ThreadContent) => {
  return await db
    .update(threadsTable)
    .set({
      content: sql`array_append(${threadsTable.content}, ${newContent})`,
    })
    .where(eq(threadsTable.id, id));
};

export const deleteThread = async (id: string) => {
  return await db.delete(threadsTable).where(eq(threadsTable.id, id));
};
