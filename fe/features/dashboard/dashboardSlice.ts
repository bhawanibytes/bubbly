import { createSlice } from "@reduxjs/toolkit";
import { fetchAllChatsAndMessagesResponse } from "@shared/types/messages.type";

interface DashboardState {
  dashboardState: fetchAllChatsAndMessagesResponse[] | [];
  selectedChat: string;
  userId: string | null;
}
const initialState: DashboardState = {
  dashboardState: [],
  selectedChat: "",
  userId: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    firstLoad: (state, action) => {
      const { dashboardState } = action.payload;
      state.dashboardState = dashboardState;
    },
    selectChat: (state, action) => {
      const { chatId } = action.payload;
      state.selectedChat = chatId;
    },
  },
});

export const { firstLoad, selectChat } = dashboardSlice.actions;
export default dashboardSlice.reducer;
