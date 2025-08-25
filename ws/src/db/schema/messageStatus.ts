import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { messages } from "./messages"
import { users } from "./users"
import { relations } from "drizzle-orm"

export const messageStatus = pgTable(
  "messageStatus",
  {
    messageId: uuid("message_id")
      .notNull()
      .references(() => messages.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    status: text("status"),
    deliveredAt: timestamp("delivered_at", { withTimezone: true }),
    readAt: timestamp("read_at", { withTimezone: true }),
  },
  (table) => [primaryKey({ columns: [table.messageId, table.userId] })],
)

export const messageStatusRelations = relations(messageStatus, ({ one }) => ({
  message: one(messages, {
    fields: [messageStatus.messageId],
    references: [messages.id],
  }),
  user: one(users, {
    fields: [messageStatus.userId],
    references: [users.id],
  }),
}))
