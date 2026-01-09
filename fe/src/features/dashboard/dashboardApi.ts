import { baseQuery } from "@baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchAllChatsAndMessages } from "@shared/types/controllerResponse/messages.type";
import {
    sendDmResponseType,
    SendMessageBodyType,
} from "@shared/types/messages.type";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi", // optional: name in store
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        initialFetch: builder.query<fetchAllChatsAndMessages, void>({
            query: () => "/all-chat-message",
        }),
        sendDm: builder.mutation<sendDmResponseType, SendMessageBodyType>({
            query: (data) => ({
                url: "/send-dm",
                method: "POST",
                body: data,
            }),
        }),

        //  Todo here
        fetch: builder.mutation<sendDmResponseType, SendMessageBodyType>({
            query: (data) => ({
                url: "/send-dm",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useInitialFetchQuery, useSendDmMutation } = dashboardApi;
