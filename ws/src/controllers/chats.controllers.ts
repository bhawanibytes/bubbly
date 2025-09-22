import { db } from "@db/db"
import { chats } from "@schema/chats"
import { users } from "@schema/users"
import logger from "@configs/logger.config"
import { and, eq, inArray, sql } from "drizzle-orm"
import { UWSReq, UWSRes } from "@/types/type.uws"
import { chatMembers } from "@schema/chatMembers"
import Response from "@shared/types/response.type"
import {
  CreateDmChatBody,
  leaveGroupBody,
  SendDmBody,
} from "@shared/types/chat.type"
import { messages } from "@/db/schema/messages"

// createChat (1-to-1 or group)

// getChatsForUser (all conversations with latest message preview)

// getChatDetails (members, metadata, pinned msgs)

// leaveChat (exit group)

// deleteChat (remove conversation for self/archive)

// create a dm chat
export async function createDmChat(
  res: UWSRes,
  req: UWSReq,
  body: CreateDmChatBody,
): Promise<Response> {
  const senderId = res.user.id
  logger.info(`user from middleware`, res.user)
  const { receiverNumber } = body
  //ensure both from and receiverNumber received correctly
  if (!senderId || !receiverNumber) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All arg required",
    }
  }
  try {
    // finds if receiver has an account, else returns
    const [receiver] = await db
      .select()
      .from(users)
      .where(
        and(eq(users.phoneNumber, receiverNumber), eq(users.isVerified, true)),
      )
    logger.info(`receiver:`, receiver)
    if (!receiver) {
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
          eq(chatMembers.userId, senderId),
          inArray(
            chatMembers.chatId,
            db
              .select({ chatId: chatMembers.chatId })
              .from(chatMembers)
              .where(eq(chatMembers.userId, receiver.id)),
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
          createdBy: senderId,
        })
        .returning()
      await tx.insert(chatMembers).values([
        {
          chatId: chatCreated.id,
          userId: senderId,
        },
        {
          chatId: chatCreated.id,
          userId: receiver.id,
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

// send a dm message
export async function sendDm(
  res: UWSRes,
  req: UWSReq,
  body: SendDmBody,
): Promise<Response> {
  const senderId = res.user.id
  logger.info(`user from middleware in sendDm controller`, res.user)
  const { chatId, messageContent, receiverNumber, messegeType, replyedTo } =
    body

  //ensure senderId, chatId, receiverNumber, message received correctly
  if (!senderId || !chatId || !receiverNumber || !messageContent) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All arg required",
    }
  }

  try {
    // finds if receiver has an account, else returns
    const [receiver] = await db
      .select()
      .from(users)
      .where(
        and(eq(users.phoneNumber, receiverNumber), eq(users.isVerified, true)),
      )
    logger.info(`receiver from sendDm controller:`, receiver)
    if (!receiver) {
      return {
        success: false,
        status: "404 Not Found",
        message: "User not found",
      }
    }

    // is this sender part of this chat? if yes, send message if not return
    const senderMembership = await db
      .select()
      .from(chatMembers)
      .where(
        and(eq(chatMembers.chatId, chatId), eq(chatMembers.userId, senderId)),
      )
    logger.info(
      `Sender's membership from sendDm controller: ${senderMembership}`,
      senderMembership,
    )
    if (!senderMembership) {
      return {
        success: false,
        status: "400 Bad Request",
        message: "Dont do this, you will be caught.",
      }
    }
    const [isMessageSaved] = await db
      .insert(messages)
      .values({
        chatId: chatId,
        senderId: senderId,
        content: messageContent,
        messageType: messegeType,
        replyTo: replyedTo,
      })
      .returning()

    return {
      success: true,
      status: "201 Created",
      message: "Message saved",
      data: isMessageSaved,
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

// leave a group
export async function leaveGroup(
  res: UWSRes,
  req: UWSReq,
  body: leaveGroupBody,
): Promise<Response> {
  const userId = res.user.id
  const { chatId } = body
  // return if any of chatId , userId not provided
  if (!userId || !chatId) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All arg required",
    }
  }
  try {
    // check if user is member of that chat, if yes retrieved the Id from chatMember, if not
    const [userGroupMembership] = await db
      .select({ membershipId: chatMembers.chatId })
      .from(chatMembers)
      .innerJoin(chats, eq(chatMembers.chatId, chats.id))
      .where(
        and(
          eq(chats.isGroup, true),
          eq(chatMembers.chatId, chatId),
          eq(chatMembers.userId, userId),
        ),
      )
      .limit(1)
    if (!userGroupMembership) {
      return {
        success: false,
        status: "400 Bad Request",
        message: "Don't this you will be caught",
      }
    }
    const [userLeftGroup] = await db
      .delete(chatMembers)
      .where(
        and(
          eq(chatMembers.chatId, userGroupMembership.membershipId),
          eq(chatMembers.userId, userId),
        ),
      )
      .returning({
        deletedId: chatMembers.chatId,
        deletedUser: chatMembers.userId,
      })

    return {
      success: true,
      status: "202 Accepted",
      message: "You left the group",
      data: userLeftGroup,
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
