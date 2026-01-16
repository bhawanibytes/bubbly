import { env } from "@configs/env.config"
import { google } from "googleapis"
import { onTokenRefresh } from "./onTokenRefresh"

export function googleApiClient(
    access_token: string,
    refresh_token: string,
    userId: string,
) {
    const oauth2Client = new google.auth.OAuth2({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectUri: env.GOOGLE_REDIRECT_URI,
    })
    // set tokens
    oauth2Client.setCredentials({
        access_token: access_token,
        refresh_token: refresh_token,
    })

    oauth2Client.on("tokens", (tokens) => {
        if (onTokenRefresh && tokens.access_token && tokens.refresh_token) {
            onTokenRefresh({
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                userId: userId,
            })
        }
    })

    return oauth2Client
}

export function peopleApiEndpoint(
    access_token: string,
    refresh_token: string,
    userId: string,
) {
    // get ApiClient Configs
    const oAuth2Client = googleApiClient(access_token, refresh_token, userId)
    // attached ApiClient Configs to People Api Endpoint
    const people = google.people({ version: "v1", auth: oAuth2Client })
    return people
}

export function oAuth2Endpoint(
    access_token: string,
    refresh_token: string,
    userId: string,
) {
    // get ApiClient Configs
    const oAuth2Client = googleApiClient(access_token, refresh_token, userId)
    // attached ApiClient Configs to oauth2 Api Endpoint
    const oauth2 = google.oauth2({
        auth: oAuth2Client,
        version: "v2",
    })
    return oauth2
}
