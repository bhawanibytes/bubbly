import MessageComposer from "@components/MessageComposer";
import { useEffect } from "react";

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
  useEffect(() => {
    document.getElementById(messageArr[0].id)?.scrollIntoView();
  }, [messageArr]);

  return (
    <div className="flex h-full w-[80%] flex-col justify-end bg-gray-300">
      <div className="custom-scrollbar flex flex-1 flex-col overflow-y-auto scroll-smooth">
        {messageArr?.map((message) => (
          <div
            id={message.id}
            key={message.id}
            className={`flex w-full p-1 ${localStorage.getItem("userNumber") === message.senderOfThisMessage.phoneNumber ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[45%] rounded-xl bg-white px-3 py-2 wrap-break-word shadow">
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex shrink-0">
        <MessageComposer selectedChatId={messageArr[0].chatId} />
      </div>
    </div>
  );
}
