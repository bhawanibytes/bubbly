import { relations } from "drizzle-orm"
import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { chats } from "./chats"
import { users } from "./users"
import { timestamps } from "@db/columnHelper"

export const chatMembers = pgTable(
  "chat_members",
  {
    chatId: uuid()
      .notNull()
      .references(() => chats.id),
    userId: uuid()
      .notNull()
      .references(() => users.id),
    role: text().notNull().default("member"),
    ...timestamps,
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
