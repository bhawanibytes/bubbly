import { relations } from "drizzle-orm"
import { chats } from "./chats"
import { messages } from "./messages"
import { pgTable, text, boolean, uuid, timestamp } from "drizzle-orm/pg-core"
import { chatMembers } from "./chatMembers"
import { messageStatus } from "./messageStatus"

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phoneNumber: text("phone_number").unique().notNull(),
  pin: text("pin").notNull(),
  profilePicture: text("profile_picture"),
  lastSeen: timestamp("last_seen", { withTimezone: true }),
  isVerified: boolean("is_verified").notNull().default(false),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
})

export const usersRelations = relations(users, ({ many }) => ({
  createdChats: many(chats), // chats.createdBy
  chatMembers: many(chatMembers),
  messages: many(messages),
  messageStatuses: many(messageStatus),
}))
