import { relations } from "drizzle-orm";
import { AnyPgColumn, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { chats } from "./chats";
import { users } from "./users";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  chatId: uuid("chat_id").references(()=>chats.id),
  senderId: uuid("sender_id").references(()=>users.id),
  content: text("content"),
  type: text("type"),
  timestamp: timestamp("timestamp", {withTimezone: true}).defaultNow(),
  status: text("status"),
  replyTo: uuid("reply_to").references((): AnyPgColumn => messages.id)
},
)

export const messagesRelations = relations(messages, ({ one, many }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  replyMessage: one(messages, {
    fields: [messages.replyTo],
    references: [messages.id],
  }),
  chatsWhereLastMessage: many(chats, {
    relationName: "lastMessage",
  }),
}))