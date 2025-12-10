import { env } from "@configs/env.config"
import logger from "@configs/logger.config"
import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client({
  client_id: env.GOOGLE_CLIENT_ID,
  client_secret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: env.GOOGLE_REDIRECT_URI,
})

export const getGoogleTokens = async ({ code }: { code: string }) => {
  if (!code) {
    throw new Error("Google Authorization code is required")
  }

  let payload

  try {
    const ticket = await client.getToken({ code: code })
    logger.info({ ticket })

    payload = ticket.tokens
    logger.info(`payload from util:`, payload)
  } catch (error) {
    logger.error("verifyGoogleToken Error", error)
    throw new Error("Invalid Google token")
  }

  // throw Error if no payload is received
  if (!payload) {
    throw new Error("Payload is not received")
  }

  return payload
}


{
  level: "info"
  message: {
    ticket: {
      res: {
        config: {
          body: {
          }
          data: {
          }
          duplex: "half"
          headers: {
          }
          method: "POST"
          responseType: "unknown"
          retry: true
          retryConfig: {
            httpMethodsToRetry: [
              "GET",
              "PUT",
              "POST",
              "HEAD",
              "OPTIONS",
              "DELETE",
            ]
          }
          url: "https://oauth2.googleapis.com/token"
        }
        data: {
          access_token: "access_token"
          expiry_date: 1765329183186
          refresh_token: "refresh_token"
          refresh_token_expires_in: 604799
          scope: "https://www.googleapis.com/auth/contacts.readonly"
          token_type: "Bearer"
        }
        size: 0
      }
      tokens: {
        access_token: "access_token"
        expiry_date: 1765329183186
        refresh_token: "refresh_token"
        refresh_token_expires_in: 604799
        scope: "https://www.googleapis.com/auth/contacts.readonly"
        token_type: "Bearer"
      }
    }
  }
  metadata: {
  }
  timestamp: "2025-12-10 05:43:04"
}