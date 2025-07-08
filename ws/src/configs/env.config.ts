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

// JWT_ACCESS_TOKEN_EXPIRY
if (!process.env.JWT_REFRESH_TOKEN_EXPIRY){
    throw new Error ("JWT_REFRESH_TOKEN_EXPIRY are not in env")
}
export const refreshExpiry = ms(process.env.JWT_REFRESH_TOKEN_EXPIRY as StringValue)