import Response from "./response.type";

type TypeOfChatID = {
  chatId: string;
};

export interface fetchMesssagesBody {
  chatId: TypeOfChatID[];
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
export enum MessageEnum {
  text = "text",
  image = "image",
  video = "video",
  voice = "voice",
  doc = "doc",
}
export interface SendMessageBodyType {
  chatId: string;
  messageContent: string;
  messageType: MessageEnum;
  replyedTo: null | string;
  // attachement: null | string;
}
