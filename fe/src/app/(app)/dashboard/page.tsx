"use client";

import { useInitialFetchQuery } from "@features/dashboard/dashboardApi";
import {
    setContacts,
    setDashboardState,
    updateContactIntegration,
} from "@features/dashboard/dashboardSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ChatWindow from "@components/ChatWindow";
import Button from "@components/Button";
import { VerticalNavMenu } from "@sections/VerticalNavMenu";
import { MenuContent } from "@sections/MenuContent";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useInitialFetchQuery();
    const dashboardState = useSelector(
        (state: RootState) => state.dashboard.dashboardState
    );
    const contactIntegration = useSelector(
        (state: RootState) => state.dashboard.contactIntegration
    );
    const selectedChat = useSelector(
        (state: RootState) => state.dashboard.selectedChat
    );
    // Update the dashboard state when data is fetched
    useEffect(() => {
        if (data) {
            dispatch(
                setDashboardState({ dashboardState: data.data.messageRecords })
            );
            dispatch(
                updateContactIntegration({
                    contactIntegrationStatus: data.data.contactIntergration,
                })
            );
            localStorage.setItem("userNumber", data.data.userNumber);
            localStorage.setItem(
                "contacts",
                JSON.stringify(data.data.contactRecords)
            );
            dispatch(
                setContacts({
                    contactRecord: data.data.contactRecords.contactMap,
                })
            );
        }
    }, [data, dispatch]);

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
    // Loading While Fetching Data
    if (isLoading) return <div>Loading...</div>;
    // Error Handling While Fetching Data
    if (error) {
        console.error("Error:", error); // Debug log
        return <div>Error loading dashboard: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="flex h-screen w-screen text-black">
            <VerticalNavMenu />

            {/* Left Chat Section */}
            <MenuContent />
            {/* Section's Vertical Divider */}
            <div className="bg-background/90 h-full w-0.5"></div>
            {/* Right Side Chat Window Section*/}
            {contactIntegration ? (
                selectedChat ? (
                    <ChatWindow messageArr={selectedChatMessage} />
                ) : (
                    <div className="bg-background text-muted flex h-full w-full items-center justify-center">
                        Select a chat to view messages
                    </div>
                )
            ) : (
                <div className="bg-background text-muted flex h-full w-full flex-col items-center justify-center">
                    You do not have any contacts please import your contact
                    using a google account
                    {/* please integrate your contacts using your google account */}
                    <Button
                        className={`mt-5 w-fit rounded-lg px-4 py-0 text-base font-normal`}
                        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/google/auth`}
                    >
                        {" "}
                        Import Contacts{" "}
                    </Button>
                </div>
            )}
        </div>
    );
}
