import { setSelectedChat } from "@/features/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";

export interface ChatTilesType {
    chatDisplayName: string;
    lastMessage: string | null;
    chatId: string;
    // dp: string | URL;
}

export default function ChatTiles({
    chatDisplayName,
    lastMessage,
    chatId,
    // dp,
}: ChatTilesType) {
    const dispatch = useDispatch();

    return (
        <div
            className="hover:bg-surface text-foreground w-full cursor-pointer rounded-2xl px-2 py-1 shadow"
            onClick={() => {
                dispatch(setSelectedChat({ chatId: chatId }));
                // console.log(`selected: ${chatId}`);
            }}
        >
            <div className="truncate text-base font-medium">
                {`${chatDisplayName}`}
            </div>
            <div className="truncate text-sm text-gray-500">{`${lastMessage}`}</div>
        </div>
    );
}
