"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ChatTiles from "@components/ChatTiles";
import { useInitialFetchQuery } from "@features/dashboard/dashboardApi";
import { firstLoad } from "@features/dashboard/dashboardSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ChatWindow from "@components/ChatWindow";

export default function Dashboard() {
  const { data, isLoading, error } = useInitialFetchQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(firstLoad({ dashboardState: data.data.messageRecords }));
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
    <div className="flex h-screen items-center justify-center text-black">
      {/* left chats */}
      <div className="flex h-full w-[20%] flex-col gap-2 bg-amber-400 px-2">
        <div className="px-2 text-lg">Chats</div>
        {/* Debug info */}
        <div className="bg-gray-100 p-2 text-xs">
          Selected: {selectedChat || "None"} | Messages:{" "}
          {selectedChatMessage.length}
        </div>
        {dashboardState.map((chatObj) => (
          <ChatTiles
            chatDisplayName={`${chatObj.isGroup ? chatObj.groupName : chatObj?.membersOfThisChat[0].userToWhichThisMembershipBelongTo.phoneNumber}`}
            lastMessage={chatObj.allMessagesOfThisChat[0].content}
            key={chatObj?.id}
            chatId={chatObj.id}
          />
        ))}
      </div>
      <div className="h-full w-1 bg-amber-200"></div>
      {/* Chat Window */}
      <div className="custom-scrollbar relative flex h-full w-[80%] flex-col-reverse overflow-y-scroll scroll-smooth bg-gray-300">
        <div className="flex h-12 max-h-28 w-full items-center bg-gray-400 py-10">
          <textarea
            className="flex max-h-24 w-[calc(100%-320px)] resize-none items-center overflow-y-scroll rounded-2xl bg-white px-4 wrap-anywhere focus:outline-none"
            placeholder="Type a message"
            name="messageInput"
            rows={2}
            // onInput={handleInput}
          />
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
        {selectedChat ? (
          <ChatWindow messageArr={selectedChatMessage} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            Select a chat to view messages
          </div>
        )}
      </div>
    </div>
  );
}
