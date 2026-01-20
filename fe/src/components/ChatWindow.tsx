import { RootState } from "@/redux/store";
import MessageComposer from "@components/MessageComposer";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MessageTableSelect } from "@shared/types/response/messages.type";
interface ChatWindowMessageType extends MessageTableSelect {
    senderOfThisMessage: {
        phoneNumber: string;
    };
    isPending?: boolean;
}
export interface ChatWindowProps {
    messageArr: ChatWindowMessageType[];
    contactName: string;
}
export default function ChatWindow({
    messageArr,
    contactName,
}: ChatWindowProps) {
    const selectedChat = useSelector(
        (state: RootState) => state.chat.selectedChatId
    );
    const chatList = useSelector((state: RootState) => state.chat.chatList);
    const prevChatIdRef = useRef("");
    const justBelowLatestMessageRef = useRef<HTMLDivElement>(null);
    // side Effect
    useEffect(() => {
        const isChatSwitch = prevChatIdRef.current !== selectedChat;
        if (isChatSwitch) {
            justBelowLatestMessageRef.current?.scrollIntoView({
                behavior: "instant",
            });
        } else {
            justBelowLatestMessageRef.current?.scrollIntoView({
                behavior: "smooth",
            });
        }
        prevChatIdRef.current = selectedChat;
    }, [selectedChat, messageArr.length]);

    return (
        <div className="bg-background text-foreground flex h-full w-full flex-col justify-end">
            <div className="custom-scrollbar flex flex-1 flex-col overflow-y-auto scroll-smooth px-5 pt-5">
                {messageArr?.map((message) => (
                    <div
                        key={message.id}
                        className={`flex w-full p-1 ${localStorage.getItem("userNumber") === message.senderOfThisMessage.phoneNumber ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[45%] rounded-xl ${message.isPending ? "opacity-60" : ""} bg-surface px-3 py-2 wrap-break-word shadow`}
                        >
                            {message.content}
                            {message.isPending && (
                                <span className="ml-2 text-xs text-gray-400">
                                    Sending...
                                </span>
                            )}
                        </div>
                    </div>
                ))}
                {messageArr.length === 0 ? (
                    <div className="text-foreground flex h-full items-center justify-center">
                        Send your first message to {contactName}
                    </div>
                ) : (
                    <></>
                )}
                <div ref={justBelowLatestMessageRef} />
            </div>
            <div className="flex shrink-0">
                <MessageComposer
                    selectedChatId={`${messageArr[0] ? messageArr[0].chatId : ""}`}
                />
            </div>
        </div>
    );
}
