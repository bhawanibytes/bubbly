interface contactRecords {
  contactMap: Record<string, string>;
  availabilityMap: Record<string, boolean>;
}

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

export interface fetchAllChatsAndMessages {
  success: boolean;
  status: string;
  message: string;
  data: {
    userId: string;
    userNumber: string;
    contactIntergration: boolean;
    chatList: {
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
        userToWhichThisMembershipBelongTo: { phoneNumber: string };
      }[];
      allMessagesOfThisChat: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatId: string;
        senderId: string;
        content: string;
        messageType: "text" | "image" | "video" | "voice" | "doc";
        replyTo: string | null;
        senderOfThisMessage: { phoneNumber: string };
      }[];
    }[];
    contactRecords: contactRecords;
  };
}
// x DocumentFragment()
export interface SendDmResponse {
  success: boolean;
  status: string;
  message: string;
  data: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    chatId: string;
    senderId: string;
    content: string;
    messageType: "text" | "image" | "video" | "voice" | "doc";
    replyTo: string | null;
  };
}
