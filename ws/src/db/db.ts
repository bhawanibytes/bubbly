import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { dbURI } from '../configs/env.config.js';

const client = postgres(dbURI);
client`SELECT 1`.then(() => console.log("DB connected")).catch(console.error);
export const db = drizzle(client);