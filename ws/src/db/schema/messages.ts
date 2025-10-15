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
import { timestamps } from "@db/columnHelper"

export const messageTypeEnum = pgEnum("message_type", [
  "text",
  "image",
  "video",
  "voice",
  "doc",
])
export const messages = pgTable("messages", {
  id: uuid().defaultRandom().primaryKey(),
  chatId: uuid()
    .notNull()
    .references(() => chats.id),
  senderId: uuid()
    .notNull()
    .references(() => users.id),
  content: text().notNull(),
  messageType: messageTypeEnum().notNull(),
  replyTo: uuid().references((): AnyPgColumn => messages.id),
  ...timestamps,
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
export type MessageEnum = (typeof messageTypeEnum.enumValues)[number]
