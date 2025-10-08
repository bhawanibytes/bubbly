interface ChatWindowProps {
  messageArr: {
    id: string;
    createdAt: Date;
    chatId: string;
    senderId: string;
    content: string;
    messageType: "text" | "video" | "image" | "voice" | "doc";
    replyTo: string | null;
  }[];
  userId: string;
}

export default function ChatWindow({ messageArr, userId }: ChatWindowProps) {
  console.log(`userId: ${userId}`);
  return (
    <div className="h-full w-full p-2">
      {messageArr?.map((message) => (
        <div
          key={message.id}
          className={`flex ${localStorage.getItem("userId") === message.senderId ? "justify-end" : "justify-start"}`}
        >
          <div className="max-w-[45%] rounded-xl px-2 py-1 shadow">
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
