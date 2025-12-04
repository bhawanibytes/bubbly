"use client";

import { useInitialFetchQuery } from "@features/dashboard/dashboardApi";
import { setDashboardState } from "@features/dashboard/dashboardSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ChatWindow from "@components/ChatWindow";
import ChatTilesSection from "@components/ChatTilesSection";

export default function Dashboard() {
  const { data, isLoading, error } = useInitialFetchQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setDashboardState({ dashboardState: data.data.messageRecords }));
      localStorage.setItem("userNumber", data.data.userNumber);
    }
  }, [data, dispatch]);
  const dashboardState = useSelector(
    (state: RootState) => state.dashboard.dashboardState
  );
  const selectedChat = useSelector(
    (state: RootState) => state.dashboard.selectedChat
  );
  // const userId = useSelector((state: RootState) => state.auth.userId);
  // console.log(`userPage: ${userId}`);
  // if (userId != "") console.log(`userPage with check: ${userId}`);
  // Use useMemo to memoize and add debugging
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
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error:", error); // Debug log
    return <div>Error loading dashboard: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="flex h-screen w-screen text-black">
      {/* Left Chat Section */}
      <ChatTilesSection dashboardState={dashboardState} />
      {/* Section's Vertical Divider */}
      {/* <div className="h-full w-0 bg-amber-200"></div> */}
      {/* Right Side Chat Window Section*/}
      {selectedChat ? (
        <ChatWindow messageArr={selectedChatMessage} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-400">
          Select a chat to view messages
        </div>
      )}
    </div>
  );
}
