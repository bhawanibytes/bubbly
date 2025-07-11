import { foreignKey, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { chats } from "./chats.js";
import { users } from "./users.js";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  chatId: uuid("chatId"),
  senderId: uuid("senderId").references(()=>users.id),
  content: text("content"),
  type: text("type"),
  timestamp: timestamp("timestamp", {withTimezone: true}).defaultNow(),
  status: text("status"),
  replyTo: uuid("replyTo")
}, (table) => ({
  chatFk: foreignKey({
    columns: [table.chatId],
    foreignColumns: [chats.id],
  }),
  // Define the self-referencing foreign key in the callback to avoid TS errors
  replyToFk: foreignKey({
    name: "messages_reply_to_fk", // Naming constraints is good practice
    columns: [table.replyTo],
    foreignColumns: [table.id],
  }).onDelete('set null'), // If a replied-to message is deleted, just nullify the reference
}))



// import { foreignKey, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
// import { chats } from "./chats.js";
// import { users } from "./users.js";

// // Define enums for type-safe columns
// export const messageTypeEnum = pgEnum('message_type', ['text', 'image', 'file']);
// export const messageStatusEnum = pgEnum('message_status', ['sent', 'delivered', 'read']);

// export const messages = pgTable("messages", {
//   id: uuid().defaultRandom().primaryKey(),
//   // It's good practice to make foreign keys not-nullable unless they are optional
//   // and to define onDelete behavior.
//   chatId: uuid().references(() => chats.id, { onDelete: 'cascade' }).notNull(),
//   senderId: uuid().references(() => users.id, { onDelete: 'cascade' }).notNull(),
//   content: text().notNull(),
//   // Use the enums for type safety
//   type: messageTypeEnum('type').default('text').notNull(),
//   timestamp: timestamp({ withTimezone: true }).defaultNow().notNull(),
//   status: messageStatusEnum('status').default('sent').notNull(),
//   // This column is nullable since not all messages are replies
//   replyTo: uuid(),
// }, (table) => ({
//   // Define the self-referencing foreign key in the callback to avoid TS errors
//   replyToFk: foreignKey({
//     name: "messages_reply_to_fk", // Naming constraints is good practice
//     columns: [table.replyTo],
//     foreignColumns: [table.id],
//   }).onDelete('set null'), // If a replied-to message is deleted, just nullify the reference
// }));
