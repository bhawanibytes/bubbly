import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    number: text('number').unique().notNull(),
    pin: text('pin').notNull(),
});