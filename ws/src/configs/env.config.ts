import 'dotenv/config';
import ms, { StringValue } from 'ms';

// db url
if (!process.env.DATABASE_URL) {
    throw new Error ("DB URL is not in env")
}
export const dbURI = process.env.DATABASE_URL

// bcrypt slat rounds
if (!process.env.SLAT_ROUNDS) {
    throw new Error ("ROUNDS are not in env")
}
export const rounds = parseInt( process.env.SLAT_ROUNDS)

// JWT_SECRET
if (!process.env.JWT_SECRET){
    throw new Error ("JWT_SECRET are not in env")
}
export const secret = process.env.JWT_SECRET

// JWT_ACCESS_TOKEN_EXPIRY
if (!process.env.JWT_ACCESS_TOKEN_EXPIRY){
    throw new Error ("JWT_ACCESS_TOKEN_EXPIRY are not in env")
}
export const accessExpiry = ms(process.env.JWT_ACCESS_TOKEN_EXPIRY as StringValue)

// JWT_REFRESH_TOKEN_EXPIRY
if (!process.env.JWT_REFRESH_TOKEN_EXPIRY){
    throw new Error ("JWT_REFRESH_TOKEN_EXPIRY are not in env")
}
export const refreshExpiry = ms(process.env.JWT_REFRESH_TOKEN_EXPIRY as StringValue)

// TWILIO_ACCOUNT_SID
if (!process.env.TWILIO_ACCOUNT_SID){
    throw new Error ("TWILIO_ACCOUNT_SID are not in env")
}
export const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID

// TWILIO_AUTH_TOKEN
if (!process.env.TWILIO_AUTH_TOKEN){
    throw new Error ("TWILIO_AUTH_TOKEN are not in env")
}
export const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN

// TWILIO_VIRTUAL_NUMBER
if (!process.env.TWILIO_VIRTUAL_NUMBER){
    throw new Error ("TWILIO_VIRTUAL_NUMBER are not in env")
}
export const twilioVirtualNumber = process.env.TWILIO_VIRTUAL_NUMBER