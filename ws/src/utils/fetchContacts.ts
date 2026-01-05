import logger from "@configs/logger.config"
import { peopleApiEndpoint } from "./googleApiClient"

export interface ListConnectionParam {
    access_token: string
    refresh_token: string
    userNumber: string
}

export async function listConnection({
    access_token,
    refresh_token,
    userNumber
}: ListConnectionParam) {
    // attached Configs to People Api Endpoint
    const people = peopleApiEndpoint(access_token, refresh_token, userNumber)

    try {
        // 4. Fetch connections
        const res = await people.people.connections.list({
            resourceName: "people/me",
            personFields: "names,emailAddresses,phoneNumbers",
        })

        const connections = res.data.connections || []

        const contactRecord: Record<string, string> = {}
        connections.forEach((person) => {
            const name = person.names?.[0]?.displayName
            const email = person.emailAddresses?.[0]?.value
            const phone = person.phoneNumbers?.[0]?.canonicalForm

            // If a phone number exists, add the entry to the object
            if (phone && name) {
                contactRecord[phone] = name
            }
        })

        return contactRecord
    } catch (error) {
        logger.error("Error fetching connections:", error)
    }
}
