import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { messages } from "./messages.js";
import { users } from "./users.js";

export const messageStatus = pgTable("messageStatus", {
  messageId: uuid().references(()=> messages.id),
  userId: uuid().references(()=>users.id),
  status: text(),
  deliveredAt: timestamp({withTimezone: true}),
  readAt: timestamp({withTimezone: true}),
})