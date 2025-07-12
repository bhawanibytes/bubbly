import { defineConfig } from "drizzle-kit";
import { dbURI } from "./src/configs/env.config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: dbURI,
  },
});
