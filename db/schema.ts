import { pgTable, text, uuid, json, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text("id").notNull().primaryKey().unique(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
});

export const threadsTable = pgTable("threads", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  location: text("location"),
  process: text("process").default("survey"),
  surveyAnswers: json("survey_answers"),
  createdAt: timestamp("created_at").defaultNow(),
  content: json("content").array(),
  hotelLink: text("hotel_link"),
  review: json("review"),
});
