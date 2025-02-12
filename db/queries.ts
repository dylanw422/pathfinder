import { db } from "@/db";
import { usersTable, threadsTable } from "./schema";
import { eq, desc, and, or } from "drizzle-orm";
import {
  DBUser as User,
  ThreadContent,
  NewThread,
  TripDetails,
} from "@/types/types";

export const insertUser = async (data: User) => {
  return await db.insert(usersTable).values(data).returning();
};

export const findUser = async (id: string) => {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
};

export const insertThread = async (data: NewThread) => {
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

export const findThreadByLocation = async (
  userId: string,
  location: string
) => {
  return await db
    .select()
    .from(threadsTable)
    .where(
      and(eq(threadsTable.userId, userId), eq(threadsTable.location, location))
    )
    .limit(1);
};

export const updateThread = async (id: string, newContent: ThreadContent[]) => {
  return await db
    .update(threadsTable)
    .set({
      content: newContent,
    })
    .where(eq(threadsTable.id, id));
};

export const deleteThread = async (id: string) => {
  return await db.delete(threadsTable).where(eq(threadsTable.id, id));
};

export const updateSurveyAnswers = async (
  threadId: string,
  answers: Record<string, string>
) => {
  return await db
    .update(threadsTable)
    .set({
      surveyAnswers: answers,
      process: "itenerary",
    })
    .where(eq(threadsTable.id, threadId));
};

export const updateProcess = async (threadId: string, process: string) => {
  return await db
    .update(threadsTable)
    .set({
      process,
    })
    .where(eq(threadsTable.id, threadId));
};

export const updateReview = async (
  threadId: string,
  object: TripDetails | undefined
) => {
  return await db
    .update(threadsTable)
    .set({
      review: object,
    })
    .where(eq(threadsTable.id, threadId));
};

export const updateHotelLink = async (threadId: string, hotelLink: string) => {
  return await db
    .update(threadsTable)
    .set({
      hotelLink: hotelLink,
    })
    .where(eq(threadsTable.id, threadId));
};

export const updateHotelBooked = async (
  threadId: string,
  hotelBooked: boolean
) => {
  return await db
    .update(threadsTable)
    .set({
      hotelBooked: hotelBooked,
    })
    .where(eq(threadsTable.id, threadId));
};

export const getBookedTrips = async (id: string) => {
  return await db
    .select()
    .from(threadsTable)
    .where(
      and(
        eq(threadsTable.userId, id),
        or(
          eq(threadsTable.hotelBooked, true),
          eq(threadsTable.flightBooked, true)
        )
      )
    );
};
