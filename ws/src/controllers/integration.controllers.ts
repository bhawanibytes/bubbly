import { randomBytes } from "crypto"
import { URLSearchParams } from "url"
import { UWSReq, UWSRes } from "@/types/type.uws"
import Response from "@shared/types/response.type"
import { env } from "@configs/env.config"
import logger from "@configs/logger.config"
import { getGoogleTokens } from "@utils/getGoogleTokens"
import { db } from "@db/db"
import { users } from "@db/schema/users"
import { eq } from "drizzle-orm"
import cache from "@configs/cache.config"

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
  logger.info({ query })
  const params = new URLSearchParams(query)
  logger.info("param:", { params })
  const code = params.get("code")
  logger.info({ code })
  const state = params.get("state")
  logger.info({ state })

  // 1. Validate state
  const cookie = req.getHeader("cookie") || ""
  logger.info({ cookie })
  //
  const userPhoneNumber = await cache.get(`GoogleState:${state}justnow`)
  logger.info({ userPhoneNumber })

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
  logger.info({ match })

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
    logger.info("from integrations controller", { payload })

    // will write implementation to save payload to db
    await db
      .update(users)
      .set({
        googleAccessToken: payload.access_token,
        googleAccessExpiry: payload.expiry_date,
        googleRefreshToken: payload.refresh_token,
      })
      .where(eq(users.phoneNumber, userPhoneNumber))
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
