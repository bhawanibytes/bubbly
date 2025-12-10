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

    console.log("Total connections:", connections.length)
    const contactRecord: Record<string, string> = {}
    connections.forEach((person) => {
      const name = person.names?.[0]?.displayName
      const email = person.emailAddresses?.[0]?.value
      const phone = person.phoneNumbers?.[0]?.canonicalForm
      console.log({ name, email, phone })

      // If a phone number exists, add the entry to the object
      if (phone && name) {
        contactRecord[phone] = name
      }
    })

    logger.debug("Connections List:", JSON.stringify(connections))
    logger.info("Object", contactRecord)
  } catch (error) {
    console.error("Error fetching connections:", error)
  }
}

listConnection({
  access_token:
    "",
  refresh_token:
    "",
})

// import path from "node:path"
// import process from "node:process"
// import { authenticate } from "@google-cloud/local-auth"
// import { google } from "googleapis"

// // The scope for reading contacts.
// const SCOPES = ["https://www.googleapis.com/auth/contacts.readonly"]
// // The path to the credentials file.
// const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json")

// /**
//  * Prints the display names of the first 10 connections.
//  */
// async function listConnectionNames() {
//   // Authenticate with Google and get an authorized client.
//   const auth = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   })

//   // Create a new People API client.
//   const service = google.people({ version: "v1", auth })
//   // Get the list of connections.
//   const result = await service.people.connections.list({
//     resourceName: "people/me",
//     pageSize: 10,
//     personFields: "names,emailAddresses,phoneNumbers",
//   })
//   const connections = result.data.connections
//   if (!connections || connections.length === 0) {
//     console.log("No connections found.")
//     return
//   }
//   console.log("Connections:")
//   // Print the display name of each connection.
//   connections.forEach((person) => {
//     if (person.names && person.names.length > 0 && person.phoneNumbers) {
//       console.log(person.names[0].displayName, person.phoneNumbers[0].canonicalForm)
//     } else {
//       console.log("No display name found for connection.")
//     }
//   })
// }

// ;(async () => await listConnectionNames())()
