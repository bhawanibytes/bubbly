import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import 'dotenv/config';

if (!process.env.DATABASE_URL){
    throw new Error("DB URL is not there");
}

const client = postgres(process.env.DATABASE_URL);
client`SELECT 1`.then(() => console.log("DB connected")).catch(console.error);
export const db = drizzle(client);