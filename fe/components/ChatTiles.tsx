import { selectChat } from "@/features/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";

interface ChatTilesType {
  chatId: string;
  lastMessage: string | null;
}

export default function ChatTiles({ chatId, lastMessage }: ChatTilesType) {
  const dispatch = useDispatch();

  return (
    <div
      className="min-w-[80%] cursor-pointer rounded-2xl px-2 py-1 shadow"
      onClick={() => {
        dispatch(selectChat({ chatId: chatId }));
        console.log(`selected: ${chatId}`);
      }}
    >
      <div className="truncate text-base font-medium text-gray-500">
        {`${chatId}`}
      </div>
      <div className="truncate text-sm text-gray-500">{`${lastMessage}`}</div>
    </div>
  );
}
