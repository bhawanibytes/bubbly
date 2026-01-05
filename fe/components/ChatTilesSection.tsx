import { DashboardStateType } from "@features/dashboard/dashboardSlice";
import ChatTiles from "@components/ChatTiles";
type LocalDashboardStateType = DashboardStateType["dashboardState"];
type ContactIntegrationType = DashboardStateType["contactIntegration"];

function ChatTilesSection({
    dashboardState,
    contactIntegration,
}: {
    dashboardState: LocalDashboardStateType;
    contactIntegration: ContactIntegrationType;
}) {
    return (
        <div
            className={`flex h-full ${contactIntegration ? "w-[20%]" : "w-0"} flex-col bg-amber-400`}
        >
            <div className="shrink-0 px-4 py-3 text-lg font-semibold">
                Chats
            </div>

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
