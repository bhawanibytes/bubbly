import { baseQuery } from "@baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { SendMessageBody } from "@shared/types/body/message.type";
import { SendDmResponse } from "@shared/types/response/messages.type";
import { CreateDmChatBody } from "@shared/types/body/chat.type";
import { CreateDmChatResponse } from "@shared/types/response/chats.type";
import { UserExistsBody } from "@shared/types/body/user.type";
import { UserExistsResponse } from "@shared/types/response/user.type";

export const chatApi = createApi({
    reducerPath: "chatApi", // optional: name in store
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        sendDm: builder.mutation<SendDmResponse, SendMessageBody>({
            query: (data) => ({
                url: "/send-dm",
                method: "POST",
                body: data,
            }),
        }),

        // creates dm chat and send message on it.
        createDmChat: builder.mutation<CreateDmChatResponse, CreateDmChatBody>({
            query: (data) => ({
                url: "/create-dm-and-message",
                method: "POST",
                body: data,
            }),
        }),

        isUserAvailable: builder.mutation<UserExistsResponse, UserExistsBody>({
            query: (data) => ({
                url: "/user/available",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useSendDmMutation,
    useCreateDmChatMutation,
    useIsUserAvailableMutation,
} = chatApi;
