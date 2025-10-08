import { db } from "@/db/db"
import { UWSReq, UWSRes } from "@/types/type.uws"
import { fetchMesssagesBody } from "@shared/types/messages.type"
import { eq, inArray } from "drizzle-orm"
import Response from "@shared/types/response.type"
import { chats } from "@/db/schema/chats"
import { users } from "@/db/schema/users"
import { chatMembers } from "@/db/schema/chatMembers"

// sendMessage (text, emoji, media, replies)

// firstLoad
export async function fetchAllChatsAndMessages(
  res: UWSRes,
  req: UWSReq,
): Promise<Response> {
  const userId: string = res.user.id
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
        orderBy: (messages, { asc }) => [asc(messages.createdAt)],
      },
    },
    orderBy: (chats, { desc }) => [desc(chats.lastMessageTimestamp)],
  })
  return {
    success: true,
    status: "200 OK",
    message: "Here is your all messages of this chat",
    data: { userId, messageRecords },
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
