import { pgTable, text, uuid, json } from "drizzle-orm/pg-core";

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
  dates: text("dates"),
  guests: text("guests"),
  content: json("content").array(),
});
