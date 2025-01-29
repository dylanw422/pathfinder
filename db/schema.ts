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
  dates: json("dates"),
  guests: text("guests"),
  type: text("type"),
  createdAt: timestamp("created_at").defaultNow(),
  content: json("content").array(),
});
