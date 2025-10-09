export interface ChatWindowProps {
  messageArr: {
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

export default function ChatWindow({ messageArr }: ChatWindowProps) {
  // console.log(`userId: ${userId}`);
  return (
    <div className="custom-scrollbar w-full overflow-y-scroll scroll-smooth p-2">
      {messageArr?.map((message) => (
        <div
          key={message.id}
          className={`flex w-full p-1 ${localStorage.getItem("userNumber") === message.senderOfThisMessage.phoneNumber ? "justify-end" : "justify-start"}`}
        >
          <div className="max-w-[45%] rounded-xl bg-white px-2 py-1 wrap-break-word shadow">
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
