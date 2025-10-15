import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "../configs/env.config"
import * as userSchema from "@schema/users.js"
import * as chatSchema from "@schema/chats.js"
import * as chatMemberSchema from "@schema/chatMembers.js"
import * as messageSchema from "@schema/messages.js"
import * as messageStatusSchema from "@schema/messageStatus.js"

const client = postgres(env.DATABASE_URL)
client`SELECT 1`.then(() => console.log("DB connected")).catch(console.error)
export const db = drizzle(client, {
  schema: {
    ...userSchema,
    ...chatSchema,
    ...chatMemberSchema,
    ...messageSchema,
    ...messageStatusSchema,
  },
  casing: "snake_case",
})
