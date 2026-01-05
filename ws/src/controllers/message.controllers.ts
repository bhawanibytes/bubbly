import { db } from "@db/db"
import { UWSReq, UWSRes } from "@/types/type.uws"
import {
    fetchMessagesBody,
    SendMessageBodyType,
} from "@shared/types/messages.type"
import { and, eq, inArray, ne } from "drizzle-orm"
import Response from "@shared/types/response.type"
import { chats } from "@db/schema/chats"
import { users } from "@db/schema/users"
import { chatMembers } from "@db/schema/chatMembers"
import logger from "@configs/logger.config"
import { messages } from "@db/schema/messages"
import { contacts } from "@db/schema/contacts"

// sendMessage (text, emoji, media, replies)

// firstLoad
export async function fetchAllChatsAndMessages(
    res: UWSRes,
    req: UWSReq,
): Promise<Response> {
    // Todo Fetch all chats, Messages, Contacts of this user
    const userId: string = res.user.id
    const userNumber: string = res.user.number
    // find all chatIds of which this user is a member
    const allChats = await db.query.chatMembers.findMany({
        where: eq(chatMembers.userId, userId),
        columns: {
            chatId: true,
        },
        orderBy: (chatMembers, { desc }) => [desc(chatMembers.createdAt)],
    })
    const arrOfChat = allChats.map((chatObj) => chatObj.chatId)

    const dbQuery = await db.transaction(async (tx) => {
        const messageRecords = await tx.query.chats.findMany({
            where: inArray(chats.id, arrOfChat),
            with: {
                allMessagesOfThisChat: {
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

        // fetch Contacts in a Array
        const contactRecordsArray = await tx.query.contacts.findMany({
            where: eq(contacts.userId, userId),
            columns: {
                contactName: true,
                contactNumber: true,
                availableOnPlatform: true,
            },
        })

        let contactRecords: Record<
            "contactMap" | "availabilityMap",
            Record<string, string>
        > = {
            contactMap: {},
            availabilityMap: {},
        }

        contactRecordsArray.forEach((c) => {
            contactRecords.contactMap[c.contactName] = c.contactNumber
            contactRecords.availabilityMap[c.contactName] = c.contactNumber
        })

        const googleTokens = await tx.query.users.findFirst({
            where: eq(users.phoneNumber, userNumber),
            columns: {
                googleAccessToken: true,
                googleRefreshToken: true,
            },
        })

        if (
            !googleTokens ||
            !googleTokens.googleAccessToken ||
            !googleTokens.googleRefreshToken
        ) {
            return {
                messageRecords,
                contactRecords,
                contactIntergration: false,
            }
        }
        return { messageRecords, contactRecords, contactIntergration: true }
    })

    return {
        success: true,
        status: "200 OK",
        message: "Here is your all messages of this chat and contacts",
        data: {
            userId,
            userNumber,
            contactIntergration: dbQuery.contactIntergration,
            messageRecords: dbQuery.messageRecords,
            contactRecords: dbQuery.contactRecords,
        },
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
    const { chatId, content, messageType, replyTo } = body
    logger.info(`Body received in controller`, body)

    //ensure minimum required parameters, senderId, chatId, messageContent received correctly
    if (!senderId || !chatId || !content) {
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
                and(
                    eq(chatMembers.chatId, chatId),
                    eq(chatMembers.userId, senderId),
                ),
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
                content,
                messageType: messageType,
                replyTo,
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
    body: fetchMessagesBody,
): Promise<Response> {
    const userId = res.user.id
    // const { chatId } = body
    const listOfChats = await db.query.users.findMany({
        where: eq(users.id, userId),
        with: {
            allChatMembershipOfUser: {
                columns: {
                    chatId: true,
                },
                orderBy: (chatMembers, { desc }) => [
                    desc(chatMembers.createdAt),
                ],
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
