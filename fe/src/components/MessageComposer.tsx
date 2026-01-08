import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addMessageToState,
  setDraftMessage,
  updateMessageInState,
} from "@features/dashboard/dashboardSlice";
import { useSendDmMutation } from "@/features/dashboard/dashboardApi";
export interface MessageComposerType {
  selectedChatId: string;
}

function MessageComposer({ selectedChatId }: MessageComposerType) {
  const [sendDm] = useSendDmMutation();
  const maxHeight = 240;
  const dispatch = useDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const draftMessage = useSelector(
    (state: RootState) => state.dashboard.draftMessage
  );
  const userNumber = localStorage.getItem("userNumber");
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [draftMessage]);

  const keyHandler = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await submitMessage();
    }
  };
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
    <div className="flex w-full justify-center bg-gray-300 px-4 py-3 text-white">
      <div
        className={`flex w-full items-end gap-2 rounded-3xl bg-gray-600 px-4 py-3`}
      >
        <textarea
          className={`custom-scrollbar max-h-30 min-h-6 w-[80%] flex-1 resize-none bg-transparent leading-6 text-white placeholder-gray-400 focus:outline-none`}
          placeholder="Type a message"
          name="messageInput"
          rows={1}
          ref={textareaRef}
          value={draftMessage}
          onChange={(e) => {
            dispatch(setDraftMessage({ draftMessage: e.target.value }));
          }}
          onKeyDown={keyHandler}
        />
        <button
          onClick={submitMessage}
          className="shrink-0 cursor-pointer pb-1 text-white transition-opacity hover:opacity-70"
          aria-label="Send message"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default MessageComposer;
