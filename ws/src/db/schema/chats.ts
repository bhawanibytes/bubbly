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

export const chats = pgTable(
  "chats",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    isGroup: boolean("is_group").notNull(),
    groupName: text("group_name"),
    groupPicture: text("group_picture"),
    createdBy: uuid("created_by")
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    lastMessageId: uuid("last_message_id").references(
      (): AnyPgColumn => messages.id,
    ),
    lastMessageContent: text("last_message_content"),
    lastMessageTimestamp: timestamp("last_message_timestamp", {
      withTimezone: true,
    }),
    lastMessageSender: uuid("last_message_sender").references(() => users.id),
  },
  (table) => ({
    groupNameCheck: sql`CHECK ((is_group = false) OR (is_group = true AND group_name IS NOT NULL))`,
  }),
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
