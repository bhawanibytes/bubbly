import "dotenv/config";

// db url
if (!process.env.DATABASE_URL) {
  throw new Error("DB URL is not in env");
}
export const dbURI = process.env.DATABASE_URL;

// bcrypt slat rounds
if (!process.env.SLAT_ROUNDS) {
  throw new Error("ROUNDS are not in env");
}
export const slatRounds = parseInt(process.env.SLAT_ROUNDS);

// JWT_SECRET
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET are not in env");
}
export const secret = process.env.JWT_SECRET;

// TWILIO_ACCOUNT_SID
if (!process.env.TWILIO_ACCOUNT_SID) {
  throw new Error("TWILIO_ACCOUNT_SID are not in env");
}
export const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;

// TWILIO_AUTH_TOKEN
if (!process.env.TWILIO_AUTH_TOKEN) {
  throw new Error("TWILIO_AUTH_TOKEN are not in env");
}
export const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

// TWILIO_VIRTUAL_NUMBER
if (!process.env.TWILIO_VIRTUAL_NUMBER) {
  throw new Error("TWILIO_VIRTUAL_NUMBER are not in env");
}
export const twilioVirtualNumber = process.env.TWILIO_VIRTUAL_NUMBER;

// REDIS_URL
if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL are not in env");
}
export const redisUrl = process.env.REDIS_URL;

// FRONTEND_URL
if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL are not in env");
}
export const frontendUrl = process.env.FRONTEND_URL;
