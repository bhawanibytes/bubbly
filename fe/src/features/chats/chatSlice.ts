import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    MessageTableInsert,
    MessageTableSelect,
    fetchAllChatsAndMessages,
} from "@shared/types/response/messages.type";

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
        // set whole chatList usally on Reloads
        setChatList: (
            state,
            action: PayloadAction<{
                chatList: chatStateInterface["chatList"];
            }>
        ) => {
            const { chatList } = action.payload;
            state.chatList = chatList;
        },
        // add new chat to chatList in the end
        addNewChat: (
            state,
            action: PayloadAction<{
                newchat: chatStateInterface["chatList"][0];
            }>
        ) => {
            const { newchat } = action.payload;
            state.chatList.push(newchat);
        },

        // select active chat's chatId as Selected Chat
        setSelectedChat: (
            state,
            action: PayloadAction<{
                chatId: chatStateInterface["chatList"][0]["id"];
            }>
        ) => {
            const { chatId } = action.payload;
            state.selectedChatId = chatId;
        },

        // set Draft Message to State
        setDraftMessage: (
            state,
            action: PayloadAction<{
                draftMessage: string;
            }>
        ) => {
            const { draftMessage } = action.payload;
            state.draftMessage = draftMessage;
        },

        // add sent or recieved message to an specifc Chat that available in ChatList by filtering using a given chatId
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
    addNewChat,
} = chatSlice.actions;

export default chatSlice.reducer;
