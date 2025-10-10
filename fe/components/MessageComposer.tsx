import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setDraftMessage } from "@features/dashboard/dashboardSlice";
import { useSendDmMutation } from "@/features/dashboard/dashboardApi";
import { MessageEnum } from "@shared/types/messages.type";

export interface MessageComposerType {
  selectedChatId: string;
}

function MessageComposer({ selectedChatId }: MessageComposerType) {
  const [sendDm] = useSendDmMutation();
  const maxHeight = 240;
  const dispatch = useDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [height, setHeight] = useState(48);
  const draftMessage = useSelector(
    (state: RootState) => state.dashboard.draftMessage
  );

  // const adjustHeight = () => {};
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, maxHeight);
      // setHeight(newHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [draftMessage]);

  const keyHandler = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await submitMessage();
      // setHeight(48)
      // dispatch(setDraftMessage({ draftMessage: "" }));
    }
  };
  const submitMessage = async () => {
    if (!draftMessage.trim()) return;
    // setHeight(48);
    const data = {
      chatId: selectedChatId,
      messageContent: draftMessage,
      messageType: MessageEnum.text,
      replyedTo: null,
    };
    console.log(`Sending the Message Data: ${data}`);
    await sendDm(data);
    dispatch(setDraftMessage({ draftMessage: "" }));
  };
  return (
    <div
      className="flex w-full justify-center bg-gray-300 px-4 py-3 text-white"
      // style={{ height: `${height}px`, maxHeight: "240px", minHeight: "48px" }}
    >
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
