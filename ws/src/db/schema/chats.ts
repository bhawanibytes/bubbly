import { relations } from "drizzle-orm";
import { AnyPgColumn, boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { messages } from "./messages";
import { chatMembers } from "./chatMembers";

export const chats = pgTable('chats', {
  id: uuid('id').defaultRandom().primaryKey(),
  isGroup: boolean('is_group').notNull(),
  groupName: text('group_name'),
  groupPicture: text('group_picture'),
  createdBy: uuid('created_by').references(()=>users.id),
  createdAt: timestamp('created_at',{withTimezone: true}).defaultNow(),
  lastMessageId: uuid('last_message_id').references((): AnyPgColumn => messages.id),
  lastMessageContent: text('last_message_content'),
  lastMessageTimestamp: timestamp('last_message_timestamp',{withTimezone:true}),
  lastMessageSender: uuid('last_message_sender').references(()=>users.id),
}, 
)

export const chatsRelations = relations(chats, ({ one, many }) => ({
  creator: one(users, { fields: [chats.createdBy], references: [users.id] }),
  members: many(chatMembers),
  messages: many(messages),
  lastMessage: one(messages, {
    fields: [chats.lastMessageId],
    references: [messages.id],
  }),
  lastMessageSender: one(users, {
    fields: [chats.lastMessageSender],
    references: [users.id],
  }),
}))