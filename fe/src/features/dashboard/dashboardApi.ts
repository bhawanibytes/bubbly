import { baseQuery } from "@baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchAllChatsAndMessages } from "@shared/types/response/messages.type";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi", // optional: name in store
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        initialFetch: builder.query<fetchAllChatsAndMessages, void>({
            query: () => "/all-chat-message",
        }),
    }),
});

export const { useInitialFetchQuery } = dashboardApi;
