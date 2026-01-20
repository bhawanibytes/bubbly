import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
    addMessageToState,
    addNewChat,
    setDraftMessage,
    setSelectedChat,
    updateMessageInState,
} from "@features/chats/chatSlice";
import {
    useCreateDmChatMutation,
    useSendDmMutation,
} from "@/features/chats/chatApi";
export interface MessageComposerType {
    selectedChatId: string;
}

function MessageComposer({ selectedChatId }: MessageComposerType) {
    const [sendDm] = useSendDmMutation();
    const [createDmChat, { data }] = useCreateDmChatMutation();
    const maxHeight = 240;
    const dispatch = useDispatch();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const draftMessage = useSelector(
        (state: RootState) => state.chat.draftMessage
    );
    const activeContact = useSelector(
        (state: RootState) => state.dashboard.activeContact
    );
    const userNumber = localStorage.getItem("userNumber");

    // change height of textarea as the draftMessage changes
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const scrollHeight = textareaRef.current.scrollHeight;
            const newHeight = Math.min(scrollHeight, maxHeight);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [draftMessage]);

    // add new chat in the end of chatList and also set that as selected chat id in store
    useEffect(() => {
        if (data) {
            dispatch(addNewChat({ newchat: data.data }));
            dispatch(setSelectedChat({ chatId: data.data.id }));
        }
    }, [data]);

    // handle Enter key press
    const keyHandler = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            await submitMessage();
        }
    };

    //
    const submitMessage = async () => {
        if (!draftMessage.trim()) return;
        // Generate temporary ID for optimistic update
        const tempId = `temp-${Date.now()}`;
        const data = {
            chatId: selectedChatId,
            content: draftMessage,
            messageType: "text" as const,
            replyTo: null,
            id: tempId,
            senderOfThisMessage: { phoneNumber: userNumber },
            isPending: true, // Optional: mark as pending for UI feedback
        };

        // there is not chat Id, send message without chatid and create new chat and receive the whole chat's properties in result, so it could be sync with chatList
        if (!selectedChatId) {
            await createDmChat({
                messageContent: data.content,
                //@ts-expect-error Todo: Message types should be dynamically managed
                messageType: "text" as const,
                replyTo: data.replyTo,
                receiverNumber: activeContact,
            });
            return;
        }
        console.log(`Sending the Message Data: ${data}`);
        //@ts-expect-error ...
        // optimistic message to ui
        dispatch(addMessageToState({ messageObj: data }));
        console.log("addMessageToState Action is trigger; data:", data);
        dispatch(setDraftMessage({ draftMessage: "" }));
        try {
            const response = await sendDm(data).unwrap();
            if (response.success && userNumber) {
                const messageWithSenderNumber = {
                    ...response.data,
                    senderOfThisMessage: { phoneNumber: userNumber },
                };
                dispatch(
                    updateMessageInState({
                        tempId: tempId,
                        messageFromDb: messageWithSenderNumber,
                    })
                );
            }
            console.log("Message sent Successfully:", response);
        } catch (error) {
            console.log("Failed to send message:", error);
        }
    };
    return (
        <div className="bg-surface flex w-full justify-center px-4 py-3">
            <div
                className={`bg-surface flex w-full items-end gap-2 rounded-3xl px-4 py-3`}
            >
                <textarea
                    className={`custom-scrollbar text-foreground max-h-30 min-h-6 w-[80%] flex-1 resize-none bg-transparent leading-6 placeholder-gray-400 focus:outline-none`}
                    placeholder="Type a message..."
                    name="messageInput"
                    rows={1}
                    ref={textareaRef}
                    value={draftMessage}
                    onChange={(e) => {
                        dispatch(
                            setDraftMessage({ draftMessage: e.target.value })
                        );
                    }}
                    onKeyDown={keyHandler}
                />
                <button
                    onClick={submitMessage}
                    className="text-foreground shrink-0 cursor-pointer pb-1 transition-opacity hover:opacity-70"
                    aria-label="Send message"
                >
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="text-foreground"
                    />
                </button>
            </div>
        </div>
    );
}

export default MessageComposer;
