import {
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { messages } from "./messages"
import { users } from "./users"
import { relations } from "drizzle-orm"

export const messageStatusPerPersonEnum = pgEnum("message_status_per_person", [
  "not-delivered",
  "delivered",
  "read",
])
export const messageStatus = pgTable(
  "messageStatus",
  {
    messageId: uuid("message_id")
      .notNull()
      .references(() => messages.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    status: messageStatusPerPersonEnum("status")
      .default("not-delivered")
      .notNull(),
    deliveredAt: timestamp("delivered_at", { withTimezone: true }),
    readAt: timestamp("read_at", { withTimezone: true }),
  },
  (table) => [primaryKey({ columns: [table.messageId, table.userId] })],
)

export const messageStatusRelations = relations(messageStatus, ({ one }) => ({
  thisMessageStatusBelongsToWhichMessage: one(messages, {
    fields: [messageStatus.messageId],
    references: [messages.id],
  }),
  thisMessageStatusBelongsToWhichUser: one(users, {
    fields: [messageStatus.userId],
    references: [users.id],
  }),
}))
