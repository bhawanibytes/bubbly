import { DashboardStateType } from "@features/dashboard/dashboardSlice";
import ChatTiles from "@components/ChatTiles";
import ContactTiles from "./ContactTiles";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
type LocalDashboardStateType = DashboardStateType["dashboardState"];

function ChatSection({
    dashboardState,
}: {
    dashboardState: LocalDashboardStateType;
}) {
    const ContactMap = useSelector(
        (state: RootState) => state.dashboard.contacts
    );
    return (
        <>
            <div className="text-foreground mb-2 shrink-0 text-lg font-medium">
                Bubbly
            </div>

            <div className="bg-surface mb-2 flex h-8 items-center gap-2 rounded-3xl px-4">
                <Search className="text-foreground h-3 w-3 shrink-0" />
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    onChange={() => {}}
                />
            </div>
            <div className="bg-surface mb-2 h-0.5 w-full" />
            <div className="custom-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto pb-2">
                {dashboardState.map((chatObj) => (
                    <ChatTiles
                        chatDisplayName={`${chatObj.isGroup ? chatObj.groupName : chatObj?.membersOfThisChat[0].userToWhichThisMembershipBelongTo.phoneNumber}`}
                        lastMessage={chatObj.allMessagesOfThisChat[0].content}
                        key={chatObj?.id}
                        chatId={chatObj.id}
                    />
                ))}
                {!dashboardState.length && ContactMap ? (
                    <>
                        <div className="text-muted italic">
                            You have no chats, Talk or Invite Your Contacts to
                            Bubbly
                        </div>
                        {Object.entries(ContactMap).map(([key, value]) => (
                            <ContactTiles
                                contactName={value}
                                message={"Hey there, I am using Bubbly"}
                                key={key}
                                phoneNumber={key}
                            />
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default ChatSection;
