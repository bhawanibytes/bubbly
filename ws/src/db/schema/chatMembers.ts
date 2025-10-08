import { relations } from "drizzle-orm"
import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { chats } from "./chats"
import { users } from "./users"

export const chatMembers = pgTable(
  "chatMembers",
  {
    chatId: uuid("chat_id")
      .notNull()
      .references(() => chats.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    role: text("role").notNull().default("member"),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.chatId, table.userId] })],
)

export const chatMembersRelations = relations(chatMembers, ({ one }) => ({
  chatToWhichThisMembershipBelongTo: one(chats, {
    fields: [chatMembers.chatId],
    references: [chats.id],
  }),
  userToWhichThisMembershipBelongTo: one(users, {
    fields: [chatMembers.userId],
    references: [users.id],
  }),
}))
