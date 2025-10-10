import { db } from "@/db/db"
import { UWSReq, UWSRes } from "@/types/type.uws"
import {
  fetchMesssagesBody,
  SendMessageBodyType,
} from "@shared/types/messages.type"
import { and, eq, inArray, ne } from "drizzle-orm"
import Response from "@shared/types/response.type"
import { chats } from "@/db/schema/chats"
import { users } from "@/db/schema/users"
import { chatMembers } from "@/db/schema/chatMembers"
import logger from "@/configs/logger.config"
import { messages } from "@/db/schema/messages"

// sendMessage (text, emoji, media, replies)

// firstLoad
export async function fetchAllChatsAndMessages(
  res: UWSRes,
  req: UWSReq,
): Promise<Response> {
  const userId: string = res.user.id
  const userNumber: string = res.user.number
  const allChats = await db.query.chatMembers.findMany({
    where: eq(chatMembers.userId, userId),
    columns: {
      chatId: true,
    },
    orderBy: (chatMembers, { desc }) => [desc(chatMembers.joinedAt)],
  })
  const arrOfChat = allChats.map((chatObj) => chatObj.chatId)
  const messageRecords = await db.query.chats.findMany({
    where: inArray(chats.id, arrOfChat),
    with: {
      allMessagesOfThisChat: {
        // columns: {}
        with: {
          senderOfThisMessage: {
            columns: {
              phoneNumber: true,
            },
          },
        },
        orderBy: (messages, { asc }) => [asc(messages.createdAt)],
      },
      membersOfThisChat: {
        where: ne(chatMembers.userId, userId),
        with: {
          userToWhichThisMembershipBelongTo: {
            columns: {
              phoneNumber: true,
            },
          },
        },
      },
    },
    orderBy: (chats, { desc }) => [desc(chats.lastMessageTimestamp)],
  })
  return {
    success: true,
    status: "200 OK",
    message: "Here is your all messages of this chat",
    data: { userId, userNumber, messageRecords },
  }
}

// send a message in a given chatId of DM
export async function sendDM(
  res: UWSRes,
  req: UWSReq,
  body: SendMessageBodyType,
): Promise<Response> {
  const senderId = res.user.id
  // logger.info(`user from middleware in sendDm controller`, res.user)
  const { chatId, messageContent, messageType, replyedTo } = body
  logger.info(`Body received in controller`, body)

  //ensure minimum required parameters, senderId, chatId, messageContent received correctly
  if (!senderId || !chatId || !messageContent) {
    return {
      success: false,
      status: "400 Bad Request",
      message: "All arg required",
    }
  }

  try {
    // is this sender part of this chat? if yes, send message if not return
    const [senderMembership] = await db
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
        messageType: messageType,
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

// getMessages (with pagination & filters like date)// fetch all/few message of an chat
export async function fetchMessages(
  res: UWSRes,
  req: UWSReq,
  body: fetchMesssagesBody,
): Promise<Response> {
  const userId = res.user.id
  const { chatId } = body
  const listOfChats = await db.query.users.findMany({
    where: eq(users.id, userId),
    with: {
      allChatMembershipOfUser: {
        columns: {
          chatId: true,
        },
        orderBy: (chatMembers, { desc }) => [desc(chatMembers.joinedAt)],
      },
      // chatMembers: {      orderBy: (chatMembers, { desc }) => [desc(chatMembers.joinedAt)],    },    messages:       orderBy: (messages, { desc }) => [desc(messages.createdAt)],    },
    },
  })

  // const chatMessages = await db
  //   .select()
  //   .from(messages)
  //   .innerJoin(chatMembers, eq(chatMembers.chatId, messages.chatId))
  //   .where(and(eq(messages.chatId, chatId), eq(chatMembers.userId, userId)))
  //   .orderBy(messages.createdAt)
  const dmChatId = listOfChats
    // .filter((chat) => chat.isGroup === false)
    .map((chat) => chat.allChatMembershipOfUser)
    .map((chat) => chat)
  const chatMessages = db.query.chats.findMany({
    // where: inArray(chats.id, dmChatId),
    with: {
      allMessagesOfThisChat: {
        orderBy: (messages, { desc }) => [desc(messages.createdAt)],
      },
    },
    orderBy: (chats, { desc }) => [desc(chats.lastMessageTimestamp)],
  })
  return {
    success: true,
    status: "200 OK",
    message: "Here is your all messages of this chat",
    // data: chatMessages,
  }
}
// editMessage

// deleteMessage (soft delete for sender, hard delete for admins)

// reactToMessage (emoji reactions)

// markAsRead (read receipts / delivery status)

// pinMessage / unpinMessage

// forwardMessage
