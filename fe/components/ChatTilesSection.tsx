import { DashboardStateType } from "@features/dashboard/dashboardSlice";
import ChatTiles from "@components/ChatTiles";
type LocalDashboardStateType = DashboardStateType["dashboardState"];

function ChatTilesSection({
  dashboardState,
}: {
  dashboardState: LocalDashboardStateType;
}) {
  return (
    <div className="flex h-full w-[20%] flex-col bg-amber-400">
      <div className="shrink-0 px-4 py-3 text-lg font-semibold">Chats</div>
      {/* Debug info */}
      {/* <div className="bg-gray-100 p-2 text-xs">
              Selected: {selectedChat || "None"} | Messages:{" "}
              {selectedChatMessage.length}
            </div> */}
      <div className="custom-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2">
        {dashboardState.map((chatObj) => (
          <ChatTiles
            chatDisplayName={`${chatObj.isGroup ? chatObj.groupName : chatObj?.membersOfThisChat[0].userToWhichThisMembershipBelongTo.phoneNumber}`}
            lastMessage={chatObj.allMessagesOfThisChat[0].content}
            key={chatObj?.id}
            chatId={chatObj.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatTilesSection;
