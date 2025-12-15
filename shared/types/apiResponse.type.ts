import { MessageTypeEnum } from "./messages.type";
import Response from "./response.type";
// all-chat-message
export interface allChatMessagesResponse extends Response {
  data: {
    userId: string;
    userNumber: string;
    messageRecords: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      isGroup: boolean;
      groupName: string | null;
      groupPicture: string | null;
      createdBy: string;
      lastMessageId: string | null;
      lastMessageContent: string | null;
      lastMessageTimestamp: Date | null;
      lastMessageSender: string | null;
      membersOfThisChat: {
        createdAt: Date;
        updatedAt: Date;
        chatId: string;
        userId: string;
        role: string;
        userToWhichThisMembershipBelongTo: {
          phoneNumber: string;
        };
      }[];
      allMessagesOfThisChat: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatId: string;
        senderId: string;
        content: string;
        messageType: MessageTypeEnum;
        replyTo: string | null;
        senderOfThisMessage: {
          phoneNumber: string;
        };
      }[];
    }[];
    contactRecords: {
      contactName: string;
      contactNumber: string;
      availableOnPlatform: boolean;
    }[];
  };
}
