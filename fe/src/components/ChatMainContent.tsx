import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
import Button from "./Button";

export const ChatMainContent = () => {
    const contactIntegration = useSelector(
        (state: RootState) => state.dashboard.contactIntegration
    );
    const selectedChat = useSelector(
        (state: RootState) => state.dashboard.selectedChat
    );
    const dashboardState = useSelector(
        (state: RootState) => state.dashboard.dashboardState
    );
    const selectedChatMessage = useMemo(() => {
        console.log("🔍 Selected Chat ID:", selectedChat);
        console.log("📦 Dashboard State:", dashboardState);

        if (!selectedChat) {
            console.log("⚠️ No chat selected");
            return [];
        }

        const chat = dashboardState.find((obj) => obj.id === selectedChat);
        console.log("💬 Found Chat:", chat);
        console.log("📨 Messages:", chat?.allMessagesOfThisChat);

        return chat?.allMessagesOfThisChat || [];
    }, [dashboardState, selectedChat]);
    return contactIntegration ? (
        selectedChat ? (
            <ChatWindow messageArr={selectedChatMessage} />
        ) : (
            <div className="bg-background text-muted flex h-full w-full items-center justify-center">
                Select a chat to view messages
            </div>
        )
    ) : (
        <div className="bg-background text-muted flex h-full w-full flex-col items-center justify-center">
            You do not have any contacts please import your contact using a
            google account
            {/* please integrate your contacts using your google account */}
            <Button
                className={`mt-5 w-fit rounded-lg px-4 py-0 text-base font-normal`}
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/google/auth`}
            >
                {" "}
                Import Contacts{" "}
            </Button>
        </div>
    );
};
