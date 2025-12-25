import { env } from "@configs/env.config"
import logger from "@configs/logger.config"
import { google } from "googleapis"

export interface ListConnectionParam {
  access_token: string
  refresh_token: string
}

export async function listConnection({
  access_token,
  refresh_token,
}: ListConnectionParam) {
  const oAuth2Client = new google.auth.OAuth2({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    redirectUri: env.GOOGLE_REDIRECT_URI,
  })

  oAuth2Client.setCredentials({
    access_token,
    refresh_token,
  })

  const people = google.people({ version: "v1", auth: oAuth2Client })

  try {
    // 4. Fetch connections
    const res = await people.people.connections.list({
      resourceName: "people/me",
      personFields: "names,emailAddresses,phoneNumbers",
      // pageSize: 100,
    })

    const connections = res.data.connections || []

    logger.info("Total connections:", connections.length)
    const contactRecord: Record<string, string> = {}
    connections.forEach((person) => {
      const name = person.names?.[0]?.displayName
      const email = person.emailAddresses?.[0]?.value
      const phone = person.phoneNumbers?.[0]?.canonicalForm
      logger.info({ name, email, phone })

      // If a phone number exists, add the entry to the object
      if (phone && name) {
        contactRecord[phone] = name
      }
    })

    logger.debug("Connections List:", connections)
    logger.info("Object", contactRecord)

    return contactRecord
  } catch (error) {
    logger.error("Error fetching connections:", error)
  }
}
