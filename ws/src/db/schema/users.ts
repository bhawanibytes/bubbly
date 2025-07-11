import { pgTable, text, boolean, uuid, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    phoneNumber: text().unique().notNull(),
    pin: text().notNull(),
    profilePicture: text(),
    lastSeen: timestamp({ withTimezone: true}),
    isVerified: boolean().notNull().default(false),
});