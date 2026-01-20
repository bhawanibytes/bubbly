import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
import Button from "./Button";
import { ContactMainContent } from "./ContactMainContent";

export const ChatMainContent = () => {
    const contactIntegration = useSelector(
        (state: RootState) => state.dashboard.contacts
    );
    const selectedChat = useSelector(
        (state: RootState) => state.chat.selectedChatId
    );
    const chatList = useSelector((state: RootState) => state.chat.chatList);
    const activeContact = useSelector(
        (state: RootState) => state.dashboard.activeContact
    );
    const contactMap = useSelector(
        (state: RootState) => state.dashboard.contacts
    );
    const selectedChatMessage = useMemo(() => {
        console.log("🔍 Selected Chat ID:", selectedChat);
        console.log("🔍 Selected Number:", activeContact);
        console.log("📦 Chat List:", chatList);

        if (!selectedChat) {
            console.log("⚠️ No chat selected");
            return [];
        }

        const chat = chatList.find((obj) => obj.id === selectedChat);
        console.log("💬 Found Chat:", chat);
        console.log("📨 Messages:", chat?.allMessagesOfThisChat);

        return chat?.allMessagesOfThisChat || [];
    }, [chatList, selectedChat, activeContact]);
    return contactIntegration && Object.keys(contactIntegration).length ? (
        selectedChat ? (
            <ChatWindow
                messageArr={selectedChatMessage}
                contactName={
                    contactMap ? contactMap[activeContact] : activeContact
                }
            />
        ) : activeContact.length ? (
            // if contact integration there but no chat is selected and some contact selected
            <ContactMainContent />
        ) : (
            // if contact integration there but no chat is selected and some contact selected
            <div className="bg-background text-muted flex h-full w-full items-center justify-center">
                Select a chat to view messages
            </div>
        )
    ) : (
        // if no contact integration is there
        <div className="bg-background text-muted flex h-full w-full flex-col items-center justify-center">
            You do not have any contacts please import your contact using a
            google account
            {/* please integrate your contacts using your google account */}
            <Button
                className={`mt-5 w-fit rounded-lg px-4 py-0 text-base font-normal`}
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/google/auth`}
            >
                Import Contacts{" "}
            </Button>
        </div>
    );
};
