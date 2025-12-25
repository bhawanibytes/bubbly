import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "../configs/env.config"
import * as userSchema from "@schema/users"
import * as chatSchema from "@schema/chats"
import * as chatMemberSchema from "@schema/chatMembers"
import * as messageSchema from "@schema/messages"
import * as messageStatusSchema from "@schema/messageStatus"
import * as contactRecordSchema from "@schema/contacts"

const client = postgres(env.DATABASE_URL)
client`SELECT 1`.then(() => console.log("DB connected")).catch(console.error)
export const db = drizzle(client, {
  schema: {
    ...userSchema,
    ...chatSchema,
    ...chatMemberSchema,
    ...messageSchema,
    ...messageStatusSchema,
    ...contactRecordSchema,
  },
  casing: "snake_case",
})
