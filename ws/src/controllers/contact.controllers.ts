// syncContacts (phone-based apps like WhatsApp)
// addContact / removeContact
// getContactList

import { UWSReq, UWSRes } from "@/types/type.uws"
import { db } from "@db/db"
import { users } from "@db/schema/users"
import Response from "@shared/types/response.type"
import { listConnection } from "@utils/fetchContacts"
import { and, eq } from "drizzle-orm"

// getContactRecords
export async function getContactRecords(
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

  const [usersDetail] = await db
    .select()
    .from(users)
    .where(and(eq(users.id, res.user.id), eq(users.isVerified, true)))

  if (!usersDetail.googleAccessToken || !usersDetail.googleRefreshToken) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "link your google to fetch contacts",
    }
  }

  const contactRecord = await listConnection({
    access_token: usersDetail.googleAccessToken,
    refresh_token: usersDetail.googleRefreshToken,
  })

  return {
    success: true,
    status: "200 OK",
    message: "Contact records fetched successfully",
    data: {
      contactRecord,
    },
  }
}
