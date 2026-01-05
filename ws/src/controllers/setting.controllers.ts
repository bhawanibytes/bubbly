// updatePreferences (theme, notification settings)

// updatePrivacySettings (last seen, profile pic visibility)

// muteChat / unmuteChat

import { UWSReq, UWSRes } from "@/types/type.uws"
import { db } from "@db/db"
import { users } from "@db/schema/users"
import Response from "@shared/types/response.type"
import { and, eq } from "drizzle-orm"
import { oAuth2Endpoint } from "@utils/googleApiClient"

// Contact Integration Details
export async function contactIntegrationDetails(
    res: UWSRes,
    req: UWSReq,
): Promise<Response> {
    if (!res.user.id) {
        return {
            success: false,
            status: "400 Bad Request",
            message: "Invalid Session",
        }
    }

    try {
        // get the access token of user
        const [usersDetail] = await db
            .select()
            .from(users)
            .where(and(eq(users.id, res.user.id), eq(users.isVerified, true)))

        if (!usersDetail.googleAccessToken || !usersDetail.googleRefreshToken) {
            return {
                success: false,
                status: "400 Bad Request",
                message: "No email is linked",
            }
        }

        const oauth2 = oAuth2Endpoint(
            usersDetail.googleAccessToken,
            usersDetail.googleRefreshToken,
            usersDetail.phoneNumber,
        )
        const data = await oauth2.userinfo.get()

        return {
            success: true,
            status: "200 OK",
            message: "Contact records fetched successfully",
            data: {
                
                userProfileDetailsFromGoogle: data.data,
            },
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                status: "500 Internal Server Error",
                message: "Something went Wrong",
                error: error?.message,
            }
        } else {
            return {
                success: false,
                status: "500 Internal Server Error",
                message: "Something went Wrong",
                error: error,
            }
        }
    }
}
