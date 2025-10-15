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
import { timestamps } from "@db/columnHelper"

export const messageStatusPerPersonEnum = pgEnum("message_status_per_person", [
  "not_delivered",
  "delivered",
  "read",
])
export const messageStatus = pgTable(
  "message_status",
  {
    messageId: uuid()
      .notNull()
      .references(() => messages.id),
    userId: uuid()
      .notNull()
      .references(() => users.id),
    status: messageStatusPerPersonEnum("status")
      .default("not_delivered")
      .notNull(),
    deliveredAt: timestamp({ withTimezone: true }),
    readAt: timestamp({ withTimezone: true }),
    ...timestamps,
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
