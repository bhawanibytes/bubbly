import { createSlice } from "@reduxjs/toolkit";
import { fetchAllChatsAndMessagesResponse } from "@shared/types/messages.type";

interface DashboardState {
  dashboardState: fetchAllChatsAndMessagesResponse[] | [];
  selectedChat: string;
}
const initialState: DashboardState = {
  dashboardState: [],
  selectedChat: "",  
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
