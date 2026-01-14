import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    MessageTableInsert,
    MessageTableSelect,
} from "@shared/types/messages.type";
import { fetchAllChatsAndMessages } from "@shared/types/controllerResponse/messages.type";

export interface StateMessageType extends MessageTableSelect {
    senderOfThisMessage: { phoneNumber: string };
}

export interface chatStateInterface {
    selectedChatId: string;
    draftMessage: string;
    chatList: fetchAllChatsAndMessages["data"]["chatList"];
}

const initialState: chatStateInterface = {
    chatList: [],
    selectedChatId: "",
    draftMessage: "",
};

export const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setChatList: (state, action) => {
            const { chatList } = action.payload;
            state.chatList = chatList;
        },
        setSelectedChat: (state, action) => {
            const { chatId } = action.payload;
            state.selectedChatId = chatId;
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

            const messageArr = state.chatList.find(
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
            const messageArr = state.chatList.find(
                (obj) => obj.id === messageFromDb.chatId
            )?.allMessagesOfThisChat;
            const indexOfTempMessage =
                messageArr?.findIndex((message) => message.id === tempId) || -1;
            if (indexOfTempMessage !== -1 && messageArr) {
                messageArr[indexOfTempMessage] = messageFromDb as any;
            }
        },
    },
});

export const {
    setChatList,
    setSelectedChat,
    setDraftMessage,
    addMessageToState,
    updateMessageInState,
} = chatSlice.actions;

export default chatSlice.reducer;
