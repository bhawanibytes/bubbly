import { db } from "@db/db"
import { users } from "@db/schema/users"
import { eq } from "drizzle-orm"

export async function onTokenRefresh({
    access_token,
    refresh_token,
    userId,
}: {
    access_token: string
    refresh_token: string
    userId: string
}) {
    if (userId || access_token || refresh_token) {
        throw new Error("All param need for saving refreshed token")
    }
    try {
        await db
            .update(users)
            .set({
                googleAccessToken: access_token,
                googleRefreshToken: refresh_token,
            })
            .where(eq(users.id, userId))
    } catch (error) {
        throw new Error(`${error}`)
    }
}
