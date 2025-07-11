import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { chats } from "./chats.js";
import { users } from "./users.js";

export const chatMembers = pgTable( "chatMembers", {
  chatId: uuid().references(()=>chats.id),
  userId: uuid().references(()=> users.id),
  role: text(),
  joinedAt: timestamp({withTimezone:true}),
})