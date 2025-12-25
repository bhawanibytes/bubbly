import { randomBytes } from "crypto"
import { URLSearchParams } from "url"
import { UWSReq, UWSRes } from "@/types/type.uws"
import Response from "@shared/types/response.type"
import { env } from "@configs/env.config"
import logger from "@configs/logger.config"
import { getGoogleTokens } from "@utils/getGoogleTokens"
import { db } from "@db/db"
import { users } from "@db/schema/users"
import { and, eq, inArray } from "drizzle-orm"
import cache from "@configs/cache.config"
import { listConnection } from "@utils/fetchContacts"
import { contacts } from "@db/schema/contacts"

// Authorize for Google Contacts
export async function googleAuth(res: UWSRes, req: UWSReq): Promise<Response> {
    logger.info("came in googleAuth")
    logger.debug("user :", res.user)
    const GOOGLE_SCOPE = "https://www.googleapis.com/auth/contacts.readonly"
    const state = randomBytes(16).toString("hex")
    logger.info({ state })
    const userPhoneNumber = res.user.number
    logger.info({ userPhoneNumber })

    try {
        await cache.set(`GoogleState:${state}justnow`, userPhoneNumber, {
            expiration: { type: "EX", value: 300 },
        })
    } catch (error) {
        logger.error("error (Key didn't set to cache): ", JSON.stringify(error))
    }

    const params = new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        redirect_uri: env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: GOOGLE_SCOPE,
        access_type: "offline", // ensures refresh_token
        include_granted_scopes: "true",
        state,
        prompt: "consent", // ensures refresh token on repeat grants
    })
    logger.info(`params: ${params.toString()}\n`)

    return {
        status: "302 Found",
        success: true,
        message: "Redirected successfully",
        headers: {
            "Set-Cookie": `google_oauth_state=${state}; HttpOnly; Path=/; Secure; SameSite=Lax`,
            Location: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
        },
    }
}

export async function googleCallback(
    res: UWSRes,
    req: UWSReq,
): Promise<Response> {
    const query = req.getQuery() // e.g. code=...&state=...
    const params = new URLSearchParams(query)
    const code = params.get("code")
    const state = params.get("state")

    // 1. Validate state
    const cookie = req.getHeader("cookie") || ""
    //
    const userPhoneNumber = await cache.get(`GoogleState:${state}justnow`)

    if (!code || !state || !userPhoneNumber) {
        return {
            status: "400 Bad Request",
            message: "Param is missing",
            success: false,
            data: {
                code,
                state,
                userPhoneNumber,
            },
        }
    }

    // match is function on string in nodejs that accept regex for evaluting
    const match = cookie.match(/google_oauth_state=([^;]+)/)
    if (!match || match[1] !== state) {
        return {
            status: "400 Bad Request",
            message: "State tempared",
            success: false,
        }
    }

    try {
        // 2. Exchange code for tokens
        const payload = await getGoogleTokens({ code: code })
        // will write implementation to save payload to db
        await db.transaction(async (tx) => {
            // update user with google tokens
            const [user] = await tx
                .update(users)
                .set({
                    googleAccessToken: payload.access_token,
                    googleAccessExpiry: payload.expiry_date,
                    googleRefreshToken: payload.refresh_token,
                })
                .where(eq(users.phoneNumber, userPhoneNumber))
                .returning({ id: users.id })

            // fetch contactsRecords
            const contactRecord = await listConnection({
                access_token: payload.access_token!,
                refresh_token: payload.refresh_token!,
            })

            // make an array of phone numbers
            const phoneNumberArray = Object.keys(contactRecord || {})

            // check which contacts are registered and verified users on platform
            const existingUsers = await tx
                .select({ phoneNumber: users.phoneNumber })
                .from(users)
                .where(
                    and(
                        inArray(users.phoneNumber, phoneNumberArray),
                        eq(users.isVerified, true),
                    ),
                )

            // make a set of phone numbers for quick lookup
            const userPhoneSet = new Set(
                existingUsers.map((u) => u.phoneNumber),
            )
            // prepare values to be inserted
            const values = Object.entries(contactRecord || {}).map(
                ([phoneNumber, name]) => ({
                    userId: user.id,
                    contactName: name,
                    contactNumber: phoneNumber,
                    availableOnPlatform: userPhoneSet.has(phoneNumber),
                }),
            )
            // delete existing contacts before inserting new ones
            await tx.delete(contacts).where(eq(contacts.userId, user.id))
            // bulk insert contacts
            if (values.length) {
                await tx.insert(contacts).values(values)
            }
        })
    } catch (error) {
        logger.info({ error })

        return {
            status: "500 Internal Server Error",
            message: "Something Went Wrong",
            success: false,
        }
    }

    return {
        status: "302 Found",
        message: "successfully saved tokens",
        success: true,
        headers: {
            // todo: /settings/integrations?google=success
            Location: `${env.FRONTEND_URL}/dashboard`,
        },
    }
}
