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
import { messageStatus } from "./messageStatus"

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
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  replyTo: uuid("reply_to").references((): AnyPgColumn => messages.id),
})

export const messagesRelations = relations(messages, ({ one, many }) => ({
  chatToWhichThisMessageBelongsTo: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
    relationName: "messageOfChat",
  }),
  senderOfThisMessage: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  replyedToWhichMessage: one(messages, {
    fields: [messages.replyTo],
    references: [messages.id],
  }),
  thisMessageIsLastMessageInWhichChat: many(chats, {
    relationName: "lastMessage",
  }),
  messageStatusesOfThisMessageToDifferentUsers: many(messageStatus),
}))

export type MessageTableSelect = typeof messages.$inferSelect
export type MessageTableInsert = typeof messages.$inferInsert
export type MessageEnum = typeof messageTypeEnum.enumValues[number]