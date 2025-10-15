import { relations } from "drizzle-orm"
import { chats } from "./chats"
import { messages } from "./messages"
import {
  pgTable,
  text,
  boolean,
  uuid,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core"
import { chatMembers } from "./chatMembers"
import { messageStatus } from "./messageStatus"
import { timestamps } from "@db/columnHelper"

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  phoneNumber: varchar({ length: 255 }).unique().notNull(),
  pin: varchar({ length: 255 }).notNull(),
  profilePicture: text(),
  lastSeen: timestamp({ withTimezone: true }),
  isVerified: boolean().notNull().default(false),
  verifiedAt: timestamp({ withTimezone: true }),
  googleEmail: varchar({ length: 255 }),
  googleAccessToken: text(),
  googleAccessExpiry: integer(),
  googleRefreshToken: text(),
  googleRefreshExpiry: text(),
  ...timestamps,
})

export const usersRelations = relations(users, ({ many }) => ({
  chatInitatedByUser: many(chats, {
    relationName: "chatsOfUser",
  }),
  lastMessageSentInChats: many(chats, {
    relationName: "chatsInUserIsTheOneWhoSentLastMessage",
  }),
  allChatMembershipOfUser: many(chatMembers),
  allMessagesOfUser: many(messages),
  messageStatusesOfUser: many(messageStatus), // Plural for many relation
}))
