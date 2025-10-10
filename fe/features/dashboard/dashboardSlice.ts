import { createSlice } from "@reduxjs/toolkit";
import { fetchAllChatsAndMessagesResponse } from "@shared/types/messages.type";

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
  },
});

export const { setDashboardState, setSelectedChat, setDraftMessage } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
