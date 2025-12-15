/**
 * Written Types for Message Controllers' Body.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @export {interfaces} Interfaces to be used in Message Controllers.
 */

/**
 * Generated as well altered Types from Message Tables and Message Controllers return types.
 * @export {interfaces} Interfaces to be used in Frontend States And APIs.
 */

import Response from "./response.type";

export enum MessageTypeEnum {
  text = "text",
  image = "image",
  video = "video",
  voice = "voice",
  doc = "doc",
}

export type MessageTableInsert = {
  chatId: string;
  senderId: string;
  content: string;
  messageType: "text" | "image" | "video" | "voice" | "doc";
  id?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  replyTo?: string | null | undefined;
};

export type MessageTableSelect = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  chatId: string;
  senderId: string;
  content: string;
  messageType: "text" | "image" | "video" | "voice" | "doc";
  replyTo: string | null;
};

export interface fetchMessagesBody {
  chatId: MessageTableSelect["chatId"];
}
export interface SendMessageBodyType {
  chatId: MessageTableSelect["chatId"];
  content: MessageTableSelect["content"];
  messageType: MessageTableSelect["messageType"];
  replyTo: MessageTableSelect["replyTo"];
}

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
    updatedAt: Date;
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
