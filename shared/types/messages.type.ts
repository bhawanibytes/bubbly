import Response from "./response.type";
import type {
  MessageTableSelect,
  MessageTableInsert,
  MessageEnum,
} from "../../ws/src/db/schema/messages";
/**
 * Written Types for Message Controllers' Body.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @export {interfaces} Interfaces to be used in Message Controllers.
 */
export interface fetchMesssagesBody {
  chatId: MessageTableSelect["chatId"];
}
export interface SendMessageBodyType {
  chatId: MessageTableSelect["chatId"];
  content: MessageTableSelect["content"];
  messageType: MessageTableSelect["messageType"];
  replyTo: MessageTableSelect["replyTo"];
}

/**
 * Generated as well altered Types from Message Tables and Message Controllers return types.
 * @export {interfaces} Interfaces to be used in Frontend States And APIs.
 */
export { MessageTableSelect, MessageTableInsert, MessageEnum };
export interface sendDmResponseType extends Response {
  data: MessageTableSelect;
}
export interface fetchAllChatsAndMessagesResponse extends Response {
  id: string;
  isGroup: boolean;
  groupName: string | null;
  groupPicture: string | null;
  createdBy: string;
  createdAt: Date;
  lastMessageId: string | null;
  lastMessageContent: string | null;
  lastMessageTimestamp: Date | null;
  lastMessageSender: string | null;
  membersOfThisChat: {
    chatId: string;
    userId: string;
    role: string;
    joinedAt: Date;
    userToWhichThisMembershipBelongTo: {
      phoneNumber: string;
    };
  }[];
  allMessagesOfThisChat: {
    id: string;
    createdAt: Date;
    chatId: string;
    senderId: string;
    content: string;
    messageType: "text" | "image" | "video" | "voice" | "doc";
    replyTo: string | null;
    senderOfThisMessage: {
      phoneNumber: string;
    };
  }[];
}
