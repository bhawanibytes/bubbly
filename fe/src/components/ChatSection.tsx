import ChatTiles from "@components/ChatTiles";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function ChatSection() {
    const ContactMap = useSelector(
        (state: RootState) => state.dashboard.contacts
    );
    const chatList = useSelector((state: RootState) => state.chat.chatList);
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
                {chatList.map((chatObj) => (
                    <ChatTiles
                        chatDisplayName={`${chatObj.isGroup ? chatObj.groupName : ContactMap ? ContactMap[chatObj?.membersOfThisChat[0].userToWhichThisMembershipBelongTo.phoneNumber] : chatObj?.membersOfThisChat[0].userToWhichThisMembershipBelongTo.phoneNumber}`}
                        lastMessage={`${chatObj.allMessagesOfThisChat[0] ? chatObj.allMessagesOfThisChat[0].content : "Hey there, I am using Bubbly"}`}
                        key={chatObj?.id}
                        chatId={chatObj.id}
                        phoneNumber={
                            chatObj.isGroup
                                ? ""
                                : chatObj.membersOfThisChat[0] // Todo : here we are just picking first membership, we should pick the membership that don't has contactnumber same as the user who is logged in the bubbly
                                      .userToWhichThisMembershipBelongTo
                                      .phoneNumber
                        }
                    />
                ))}
                {!chatList.length &&
                ContactMap &&
                Object.keys(ContactMap).length ? (
                    <>
                        <div className="text-muted italic">
                            You have no chats, Talk or Invite Your Contacts to
                            Bubbly
                        </div>
                        {Object.entries(ContactMap).map(([key, value]) => (
                            <ChatTiles
                                chatDisplayName={value}
                                lastMessage={"Hey there, I am using bubbly"}
                                key={key}
                                phoneNumber={key}
                                chatId={""}
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
