import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllChatsAndMessagesResponse,
  MessageTableInsert,
  MessageTableSelect,
} from "@shared/types/messages.type";

export interface StateMessageType extends MessageTableSelect {
  senderOfThisMessage: { phoneNumber: string };
}

export interface DashboardStateType {
  dashboardState: fetchAllChatsAndMessagesResponse[] | [];
  selectedChat: string;
  draftMessage: string;
}
const initialState: DashboardStateType = {
  dashboardState: [],
  selectedChat: "",
  draftMessage: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardState: (state, action) => {
      const { dashboardState } = action.payload;
      state.dashboardState = dashboardState;
    },
    setSelectedChat: (state, action) => {
      const { chatId } = action.payload;
      state.selectedChat = chatId;
    },
    setDraftMessage: (state, action) => {
      const { draftMessage } = action.payload;
      state.draftMessage = draftMessage;
    },
    addMessageToState: (
      state,
      action: PayloadAction<{
        chatId: string;
        messageObj: MessageTableInsert;
      }>
    ) => {
      const { messageObj } = action.payload;

      const messageArr = state.dashboardState.find(
        (obj) => obj.id === messageObj.chatId
      )?.allMessagesOfThisChat;
      //@ts-expect-error ...
      messageArr?.push(messageObj);
    },
    // Replace temporary message with real DB message
    updateMessageInState: (
      state,
      action: PayloadAction<{
        tempId: string;
        messageFromDb: StateMessageType;
      }>
    ) => {
      const { tempId, messageFromDb } = action.payload;
      const messageArr = state.dashboardState.find(
        (obj) => obj.id === messageFromDb.chatId
      )?.allMessagesOfThisChat;
      const indexOfTempMessage =
        messageArr?.findIndex((message) => message.id === tempId) || -1;
      if (indexOfTempMessage !== -1 && messageArr) {
        messageArr[indexOfTempMessage] = messageFromDb;
      }
    },
  },
});

export const {
  setDashboardState,
  setSelectedChat,
  setDraftMessage,
  addMessageToState,
  updateMessageInState,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
