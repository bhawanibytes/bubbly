import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial().primaryKey(),
    name: text().notNull(),
    number: text().unique().notNull(),
    pin: text().notNull(),
    isVerified: boolean().notNull().default(false),
});