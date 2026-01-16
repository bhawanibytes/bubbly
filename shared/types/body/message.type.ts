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

export interface SendMessageBody {
  chatId: MessageTableSelect["chatId"];
  content: MessageTableSelect["content"];
  messageType: MessageTableSelect["messageType"];
  replyTo: MessageTableSelect["replyTo"];
}

