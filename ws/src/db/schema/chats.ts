import { relations, sql } from "drizzle-orm"
import {
  AnyPgColumn,
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { users } from "./users"
import { messages } from "./messages"
import { chatMembers } from "./chatMembers"
import { timestamps } from "@db/columnHelper"

export const chats = pgTable(
  "chats",
  {
    id: uuid().defaultRandom().primaryKey(),
    isGroup: boolean().notNull(),
    groupName: text(),
    groupPicture: text(),
    createdBy: uuid()
      .references(() => users.id)
      .notNull(),
    lastMessageId: uuid().references((): AnyPgColumn => messages.id),
    lastMessageContent: text(),
    lastMessageTimestamp: timestamp({
      withTimezone: true,
    }),
    lastMessageSender: uuid().references(() => users.id),
    ...timestamps,
  },
  (table) => [
    sql`CHECK ((is_group = false) OR (is_group = true AND group_name IS NOT NULL))`,
  ],
)

export const chatsRelations = relations(chats, ({ one, many }) => ({
  creatorOfThisChat: one(users, {
    fields: [chats.createdBy],
    references: [users.id],
    relationName: "chatsOfUser",
  }),
  lastMessageSenderOfThisChat: one(users, {
    fields: [chats.lastMessageSender],
    references: [users.id],
    relationName: "chatsInUserIsTheOneWhoSentLastMessage",
  }),
  membersOfThisChat: many(chatMembers),
  allMessagesOfThisChat: many(messages, { relationName: "messageOfChat" }),
  lastMessageOfThisChat: one(messages, {
    fields: [chats.lastMessageId],
    references: [messages.id],
    relationName: "lastMessage",
  }),
}))
