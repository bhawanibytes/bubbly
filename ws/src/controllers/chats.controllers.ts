import { db } from "@db/db"
import { chats } from "@schema/chats"
import { users } from "@schema/users"
import logger from "@configs/logger.config"
import { and, eq, inArray, ne } from "drizzle-orm"
import { UWSReq, UWSRes } from "@/types/type.uws"
import { chatMembers } from "@schema/chatMembers"
import Response from "@shared/types/response.type"
import { CreateDmChatBody, leaveGroupBody } from "@shared/types/body/chat.type"
import { messages } from "@db/schema/messages"
// import { messages } from "@schema/messages"

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
    // Todo: message type should be manually checked
    const { receiverNumber, messageContent, messageType, replyTo } = body
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
                and(
                    eq(users.phoneNumber, receiverNumber),
                    eq(users.isVerified, true),
                ),
            )
        logger.info(`receiver:`, receiver)

        // return if receiver not available on platform
        if (!receiver) {
            return {
                success: false,
                status: "404 Not Found",
                message: "User not found",
            }
        }

        // check if sender and receiverNumber has some dm chat in common if yes return common chat also
        const commonChatExits = await db.transaction(async (tx) => {
            // all chats non-group of sender
            const senderAllMembership = await tx
                .select({ chatId: chatMembers.chatId })
                .from(chatMembers)
                .innerJoin(chats, eq(chatMembers.chatId, chats.id))
                .where(
                    and(
                        eq(chatMembers.userId, senderId),
                        eq(chats.isGroup, false),
                    ),
                )
            // return status false if no chat available for sender
            if (!senderAllMembership.length)
                return { status: false, commonId: "" }

            const membershipList = senderAllMembership.map((c) => c.chatId)

            // check if receiver has membership entry for the non-group chat of sender
            const commanChat = await tx
                .select({ chatId: chatMembers.chatId })
                .from(chatMembers)
                .where(
                    and(
                        inArray(chatMembers.chatId, membershipList),
                        eq(chatMembers.userId, receiver.id),
                    ),
                )
            // return status false if there is no dm chat b/w sender and receiver
            if (commanChat.length === 0) return { status: false, commonId: "" }
            // return status true and chat id if dm available already
            return { status: true, commonId: commanChat[0].chatId }
        })

        logger.info(`Result from commonChatExits is:`, commonChatExits)
        if (commonChatExits.status) {
            // send messge on that chat id
            const sendMessageTx = await db.transaction(async (tx) => {
                await tx.insert(messages).values({
                    chatId: commonChatExits.commonId,
                    senderId: senderId,
                    content: messageContent,
                    messageType,
                    replyTo,
                })

                // fetch all details of the chat
                const [chatRecords] = await tx.query.chats.findMany({
                    where: eq(chats.id, commonChatExits.commonId),
                    with: {
                        allMessagesOfThisChat: {
                            with: {
                                senderOfThisMessage: {
                                    columns: {
                                        phoneNumber: true,
                                    },
                                },
                            },
                            orderBy: (messages, { asc }) => [
                                asc(messages.createdAt),
                            ],
                        },
                        membersOfThisChat: {
                            where: ne(chatMembers.userId, senderId),
                            with: {
                                userToWhichThisMembershipBelongTo: {
                                    columns: {
                                        phoneNumber: true,
                                    },
                                },
                            },
                        },
                    },
                    orderBy: (chats, { desc }) => [
                        desc(chats.lastMessageTimestamp),
                    ],
                })
                return chatRecords
            })
            return {
                success: false,
                status: "202 Accepted",
                message: "Message sent on your already created DM",
                data: sendMessageTx,
            }
        }

        // create chat alongwith inserting chat member and message in that chat using sql transaction and retrive all details of chat
        const chatTransaction = await db.transaction(async (tx) => {
            // create chat
            const [chatCreated] = await tx
                .insert(chats)
                .values({
                    isGroup: false,
                    createdBy: senderId,
                })
                .returning()
            // insert membership of both sender and receiver
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
            // insert message in chat
            await tx.insert(messages).values({
                chatId: chatCreated.id,
                senderId: senderId,
                content: messageContent,
                messageType,
                replyTo,
            })
            // fetch all details of the chat
            const [chatRecords] = await tx.query.chats.findMany({
                where: eq(chats.id, chatCreated.id),
                with: {
                    allMessagesOfThisChat: {
                        with: {
                            senderOfThisMessage: {
                                columns: {
                                    phoneNumber: true,
                                },
                            },
                        },
                        orderBy: (messages, { asc }) => [
                            asc(messages.createdAt),
                        ],
                    },
                    membersOfThisChat: {
                        where: ne(chatMembers.userId, senderId),
                        with: {
                            userToWhichThisMembershipBelongTo: {
                                columns: {
                                    phoneNumber: true,
                                },
                            },
                        },
                    },
                },
                orderBy: (chats, { desc }) => [
                    desc(chats.lastMessageTimestamp),
                ],
            })
            return chatRecords
        })
        logger.info(`chatTransaction:`, chatTransaction)
        if (chatTransaction) {
            return {
                success: true,
                status: "201 Created",
                message: "Chat created.",
                data: chatTransaction,
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

// // send a dm message
// export async function sendDm(
//   res: UWSRes,
//   req: UWSReq,
//   body: SendDmBody,
// ): Promise<Response> {
//   const senderId = res.user.id
//   logger.info(`user from middleware in sendDm controller`, res.user)
//   const { chatId, messageContent, receiverNumber, messageType, replyedTo } =
//     body

//   //ensure senderId, chatId, receiverNumber, message received correctly
//   if (!senderId || !chatId || !receiverNumber || !messageContent) {
//     return {
//       success: false,
//       status: "400 Bad Request",
//       message: "All arg required",
//     }
//   }

//   try {
//     // finds if receiver has an account, else returns
//     const [receiver] = await db
//       .select()
//       .from(users)
//       .where(
//         and(eq(users.phoneNumber, receiverNumber), eq(users.isVerified, true)),
//       )
//     logger.info(`receiver from sendDm controller:`, receiver)
//     if (!receiver) {
//       return {
//         success: false,
//         status: "404 Not Found",
//         message: "User not found",
//       }
//     }

//     // is this sender part of this chat? if yes, send message if not return
//     const [senderMembership] = await db
//       .select()
//       .from(chatMembers)
//       .where(
//         and(eq(chatMembers.chatId, chatId), eq(chatMembers.userId, senderId)),
//       )
//     logger.info(
//       `Sender's membership from sendDm controller: ${senderMembership}`,
//       senderMembership,
//     )
//     if (!senderMembership) {
//       return {
//         success: false,
//         status: "400 Bad Request",
//         message: "Dont do this, you will be caught.",
//       }
//     }
//     const [isMessageSaved] = await db
//       .insert(messages)
//       .values({
//         chatId: chatId,
//         senderId: senderId,
//         content: messageContent,
//         messageType: messageType,
//         replyTo: replyedTo,
//       })
//       .returning()

//     return {
//       success: true,
//       status: "201 Created",
//       message: "Message saved",
//       data: isMessageSaved,
//     }
//   } catch (error) {
//     logger.error(`handler crashed with the error:`, error)
//     return {
//       success: false,
//       status: "500 Internal Server Error",
//       message: "Something Went Wrong",
//     }
//   }
// }

// fetch all/few chats of an user
export async function fetchChats(res: UWSRes, req: UWSReq): Promise<Response> {
    const userId = res.user.id
    const rawChatList = await db.query.users.findMany({
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
    // .select({
    //   chatId: chats.id,
    //   isGroup: chats.isGroup,
    //   groupName: chats.groupName,
    // })
    // .from(chats)
    // .innerJoin(chatMembers, eq(chats.id, chatMembers.chatId))
    // .where(eq(chatMembers.userId, userId))

    // const dmChatId = rawChatList
    //   .filter((chat) => chat.isGroup === false)
    //   .map((chat) => chat.chatId)

    // const listWithNumbers = await db
    //   .select({ chatId: chatMembers.chatId, userNumber: users.phoneNumber })
    //   .from(chatMembers)
    //   .innerJoin(users, eq(users.id, chatMembers.userId))
    //   .where(
    //     and(
    //       inArray(chatMembers.chatId, dmChatId),
    //       ne(chatMembers.userId, userId),
    //     ),
    //   )

    return {
        success: true,
        status: "200 OK",
        message: "Here is your all chats",
        data: rawChatList,
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
