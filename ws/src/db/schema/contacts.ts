import { relations } from "drizzle-orm"
import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core"
import { timestamps } from "@db/columnHelper"
import { users } from "./users"

export const contacts = pgTable("contacts", {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => users.id),
    contactName: varchar({ length: 255 }).notNull(),
    contactNumber: varchar({ length: 255 }).notNull(),
    availableOnPlatform: boolean().notNull().default(false),
    ...timestamps,
})

export const contactsRelations = relations(contacts, ({ one }) => ({
    thisContactBelongs: one(users),
}))
