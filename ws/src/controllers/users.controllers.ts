import { UWSReq, UWSRes } from "@/types/type.uws"
import logger from "@configs/logger.config"
import { db } from "@db/db"
import { users } from "@db/schema/users"
import { UserExistsBody } from "@shared/types/body/user.type"
import Response from "@shared/types/response.type"
import { and, eq } from "drizzle-orm"

// getUserProfile (fetch user info)

// updateUserProfile (name, avatar, status, bio)

// searchUsers (for finding contacts)

// setOnlineStatus (online/offline/last seen)

// block/unblockUser

// user exists on bubbly
export async function userExists(
    res: UWSRes,
    req: UWSReq,
    body: UserExistsBody,
): Promise<Response> {
    // sender id from JWT for caching and rate limiting purpose
    const senderId = res.user.id
    const { userNumber } = body
    logger.info(`Body received in users controller`, body)

    //ensure minimum required parameters, senderId, userNumber received correctly
    if (!senderId || !userNumber) {
        return {
            success: false,
            status: "400 Bad Request",
            message: "All arg required",
        }
    }

    try {
        let [userDetails] = await db
            .select({ id: users.id })
            .from(users)
            .where(
                and(
                    eq(users.phoneNumber, userNumber),
                    eq(users.isVerified, true),
                ),
            )

        // return availability false if user not available
        if (!userDetails) {
            return {
                success: true,
                status: "200 OK",
                message: "User is not available on Bubbly",
                data: {
                    available: false,
                },
            }
        }

        return {
            success: true,
            status: "200 OK",
            message: "User is available on Bubbly",
            data: {
                available: true,
            },
        }
    } catch (error) {
        logger.error(`handler crashed with the error:`, error)
        return {
            success: false,
            status: "500 Internal Server Error",
            message: "Something Went Wrong",
        }
    }
}
