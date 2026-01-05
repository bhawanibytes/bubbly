export interface fetchAllChatsAndMessages {
  success: boolean;
  status: string;
  message: string;
  data: {
    userId: string;
    userNumber: string;
    contactIntergration: boolean;
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
    contactRecords: Record<
      "contactMap" | "availabilityMap",
      Record<string, string>
    >;
  };
}
