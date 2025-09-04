import { relations } from "drizzle-orm"
import {
  AnyPgColumn,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { chats } from "./chats"
import { users } from "./users"

export const statusEnum = pgEnum("status", ["sent", "delivered", "read"])
export const messageTypeEnum = pgEnum("message_type", [
  "text",
  "image",
  "video",
  "voice",
  "doc",
])
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chats.id),
  senderId: uuid("sender_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  messageType: messageTypeEnum("message_type").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true })
    .defaultNow()
    .notNull(),
  status: statusEnum("status").notNull().default("sent"),
  replyTo: uuid("reply_to").references((): AnyPgColumn => messages.id),
})

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
