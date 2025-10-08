type TypeOfChatID = {
  chatId: string;
};

export interface fetchMesssagesBody {
  chatId: TypeOfChatID[];
}
import Response from "./response.type";

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
  allMessagesOfThisChat: {
    id: string;
    createdAt: Date;
    chatId: string;
    senderId: string;
    content: string;
    messageType: "text" | "image" | "video" | "voice" | "doc";
    replyTo: string | null;
  }[];
}
