import { db } from "../db/db"
import { chats } from "../db/schema/chats"
import { users } from "../db/schema/users"
import { and, eq, inArray } from "drizzle-orm"
import { UWSReq, UWSRes } from "../types/types.uws"
import { chatMembers } from "../db/schema/chatMembers"
import Response from "../types/type.response"
import logger from "../configs/logger.config"

interface CreateChatBody {
  to: string
}

// create a dm chat
export async function createChat(
  res: UWSRes,
  req: UWSReq,
  body: CreateChatBody,
): Promise<Response> {
  const from = res.user.number
  logger.info(`user from middleware`, res.user)
  const { to } = body
  //ensure both from and to received correctly
  if (!from || !to) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All arg required",
    }
  }
  try {
    // finds if receiver has an account, else returns
    const [receiverExists] = await db
      .select()
      .from(users)
      .where(and(eq(users.phoneNumber, to), eq(users.isVerified, true)))
    logger.info(`receiverExists:`, receiverExists)
    if (!receiverExists) {
      return {
        success: false,
        status: "404 Not Found",
        message: "User not found",
      }
    }

    // return chat.id if chat already there else undefine
    const checkChatExistance = await db
      .select({ chatId: chatMembers.chatId })
      .from(chatMembers)
      .innerJoin(chats, eq(chatMembers.chatId, chats.id))
      .where(
        and(
          eq(chats.isGroup, false),
          eq(chatMembers.userId, res.user.id),
          inArray(
            chatMembers.chatId,
            db
              .select({ chatId: chatMembers.chatId })
              .from(chatMembers)
              .where(eq(chatMembers.userId, receiverExists.id)),
          ),
        ),
      )
    logger.info(`Result from checkChatExistance is:`, checkChatExistance)
    if (1 <= checkChatExistance.length) {
      return {
        success: false,
        status: "409 Conflict",
        message: "Chat already Existed",
      }
    }

    // create chat alongwith inserting chat member using sql transaction
    const chatTransaction = await db.transaction(async (tx) => {
      const [chatCreated] = await tx
        .insert(chats)
        .values({
          isGroup: false,
          createdBy: res.user.id,
        })
        .returning()
      await tx.insert(chatMembers).values([
        {
          chatId: chatCreated.id,
          userId: res.user.id,
        },
        {
          chatId: chatCreated.id,
          userId: receiverExists.id,
        },
      ])
      return chatCreated
    })
    logger.info(`chatTransaction:`, chatTransaction)
    if (chatTransaction) {
      return {
        success: true,
        status: "201 Created",
        message: "Chat created.",
        data: { chatId: chatTransaction.id },
      }
    }
    throw new Error("Unexpected code path")
  } catch (error) {
    logger.error(`handler crashed with the error:`, error)
    return {
      success: false,
      status: "500 Internal Server Error",
      message: "Something Went Wrong",
    }
  }
}
