import { boolean, foreignKey, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { messages } from "./messages.js";

export const chats = pgTable('chats', {
  id: uuid().defaultRandom().primaryKey(),
  isGroup: boolean().notNull(),
  groupName: text(),
  groupPicture: text(),
  createdBy: uuid().references(()=>users.id),
  createdAt: timestamp({withTimezone: true}),
  lastMessageId: uuid(),
  lastMessageContent: text(),
  lastMessageTimestamp: timestamp({withTimezone:true}),
  lastMessageSender: uuid().references(()=>users.id),
}, (table) => ({
  lastMessageFk: foreignKey({
    columns: [table.lastMessageId],
    foreignColumns: [messages.id],
  }).onDelete('set null'), // If the last message is deleted, nullify the reference
}))