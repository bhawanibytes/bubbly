import { setSelectedChat } from "@/features/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";

export interface ChatTilesType {
  chatDisplayName: string;
  lastMessage: string | null;
  chatId: string;
}

export default function ChatTiles({
  chatDisplayName,
  lastMessage,
  chatId
}: ChatTilesType) {
  const dispatch = useDispatch();

  return (
    <div
      className="min-w-[80%] cursor-pointer rounded-2xl bg-white px-2 py-1 shadow"
      onClick={() => {
        dispatch(setSelectedChat({ chatId: chatId }));
        // console.log(`selected: ${chatId}`);
      }}
    >
      <div className="truncate text-base font-medium text-gray-500">
        {`${chatDisplayName}`}
      </div>
      <div className="truncate text-sm text-gray-500">{`${lastMessage}`}</div>
    </div>
  );
}
