import { setActiveContact } from "@/features/dashboard/dashboardSlice";
import { RootState } from "@/redux/store";
import { setSelectedChat } from "@features/chats/chatSlice";
import { useDispatch, useSelector } from "react-redux";
export interface ChatTilesType {
    chatDisplayName: string;
    lastMessage: string | null;
    chatId: string;
    phoneNumber: string;
}

export default function ChatTiles({
    chatDisplayName,
    lastMessage,
    chatId = "",
    phoneNumber,
}: ChatTilesType) {
    const dispatch = useDispatch();

    const activeContact = useSelector(
        (state: RootState) => state.dashboard.activeContact
    );
    // const chatList = useSelector((state: RootState) => state.chat.chatList);
    const onClickHandler = async () => {
        dispatch(setSelectedChat({ chatId: chatId }));
        dispatch(setActiveContact({ phoneNumber: phoneNumber }));
    };
    return (
        <div
            className={`${activeContact === phoneNumber ? "bg-surface" : ""} hover:bg-surface text-foreground w-full cursor-pointer rounded-2xl px-2 py-1 shadow`}
            onClick={onClickHandler}
        >
            <div className="truncate text-base font-medium">
                {chatDisplayName}
            </div>
            <div className="truncate text-sm text-gray-500">{`${lastMessage}`}</div>
        </div>
    );
}
