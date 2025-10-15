import { defineConfig } from "drizzle-kit"
import { env } from "./src/configs/env.config"

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
