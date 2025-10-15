import "dotenv/config"
import * as z from "zod"
// Schema to parse Env Variable
const envSchema = z.object({
  SERVER_PORT: z.coerce.number<number>(),
  NODE_ENV: z.enum(["development", "production"], {
    error: (issue) => `NODE_ENV has to specified ${issue.values.join(" | ")}`,
  }),

  FRONTEND_URL: z.url(),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),

  SLAT_ROUNDS: z.coerce.number<number>(),
  JWT_SECRET: z.string().nonempty(),

  TWILIO_ACCOUNT_SID: z.string().nonempty(),
  TWILIO_AUTH_TOKEN: z.string().nonempty(),
  TWILIO_VIRTUAL_NUMBER: z.string().nonempty(),

  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_REDIRECT_URI: z.url(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
})

const createEnv = (env: NodeJS.ProcessEnv) => {
  // Parse Env
  const result = envSchema.safeParse(env)
  if (!result.success) {
    // logger.error("Failed to validate Env:", result.error)
    console.error("Failed to validate Env:", result.error)
    process.exit(1)
  }
  return result.data
}

export const env = createEnv(process.env)
// db url
if (!process.env.DATABASE_URL) {
  throw new Error("DB URL is not in env")
}
export const dbURI = process.env.DATABASE_URL

// bcrypt slat rounds
if (!process.env.SLAT_ROUNDS) {
  throw new Error("ROUNDS are not in env")
}
export const slatRounds = parseInt(process.env.SLAT_ROUNDS)

// JWT_SECRET
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET are not in env")
}
export const secret = process.env.JWT_SECRET

// TWILIO_ACCOUNT_SID
if (!process.env.TWILIO_ACCOUNT_SID) {
  throw new Error("TWILIO_ACCOUNT_SID are not in env")
}
export const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID

// TWILIO_AUTH_TOKEN
if (!process.env.TWILIO_AUTH_TOKEN) {
  throw new Error("TWILIO_AUTH_TOKEN are not in env")
}
export const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN

// TWILIO_VIRTUAL_NUMBER
if (!process.env.TWILIO_VIRTUAL_NUMBER) {
  throw new Error("TWILIO_VIRTUAL_NUMBER are not in env")
}
export const twilioVirtualNumber = process.env.TWILIO_VIRTUAL_NUMBER

// REDIS_URL
if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL are not in env")
}
export const redisUrl = process.env.REDIS_URL

// FRONTEND_URL
if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL are not in env")
}
export const frontendUrl = process.env.FRONTEND_URL

// NODE_ENV
if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV are not in env")
}
export const nodeEnv = process.env.NODE_ENV

// GOOGLE_CLIENT_ID
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID are not in env")
}
export const googleClient = process.env.GOOGLE_CLIENT_ID

// GOOGLE_REDIRECT_URI
if (!process.env.GOOGLE_REDIRECT_URI) {
  throw new Error("GOOGLE_REDIRECT_URI are not in env")
}
export const googleRedirectURI = process.env.GOOGLE_REDIRECT_URI

// GOOGLE_CLIENT_SECRET
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET are not in env")
}
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
