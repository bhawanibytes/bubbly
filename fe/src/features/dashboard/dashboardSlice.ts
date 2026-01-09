import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchAllChatsAndMessagesResponse,
    MessageTableInsert,
    MessageTableSelect,
} from "@shared/types/messages.type";
import type { VerticleMenu } from "@sections/VerticalNavMenu";

export interface StateMessageType extends MessageTableSelect {
    senderOfThisMessage: { phoneNumber: string };
}

export interface DashboardStateType {
    ActiveMenu: VerticleMenu;
    dashboardState: fetchAllChatsAndMessagesResponse[] | [];
    selectedChat: string;
    draftMessage: string;
    contacts: Record<string, string> | null;
    contactIntegration: boolean;
    searchActive: boolean;
}
const initialState: DashboardStateType = {
    ActiveMenu: "chat",
    dashboardState: [],
    selectedChat: "",
    draftMessage: "",
    contacts: {},
    contactIntegration: false,
    searchActive: false,
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
                messageArr[indexOfTempMessage] = messageFromDb as any;
            }
        },
        updateContactIntegration: (
            state,
            action: PayloadAction<{
                contactIntegrationStatus: boolean;
            }>
        ) => {
            const { contactIntegrationStatus } = action.payload;
            state.contactIntegration = contactIntegrationStatus;
        },
        setContacts: (
            state,
            action: PayloadAction<{
                contactRecord: Record<string, string>;
            }>
        ) => {
            const { contactRecord } = action.payload;
            state.contacts = contactRecord;
        },
        setActiveMenu: (
            state,
            action: PayloadAction<{ selectedMenu: VerticleMenu }>
        ) => {
            const { selectedMenu } = action.payload;
            state.ActiveMenu = selectedMenu;
        },
        setSearchStatus: (
            state,
            action: PayloadAction<{
                search: boolean;
            }>
        ) => {
            const { search } = action.payload;
            state.searchActive = search;
        },
    },
});

export const {
    setDashboardState,
    setSelectedChat,
    setDraftMessage,
    addMessageToState,
    updateMessageInState,
    updateContactIntegration,
    setContacts,
    setActiveMenu,
    setSearchStatus,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
