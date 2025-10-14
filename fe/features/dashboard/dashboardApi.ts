import { baseQuery } from "@baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import Response from "@shared/types/response.type";
import {
  sendDmResponseType,
  SendMessageBodyType,
} from "@shared/types/messages.type";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi", // optional: name in store
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    initialFetch: builder.query<Response, void>({
      query: () => "/all-chat-message",
    }),
    sendDm: builder.mutation<sendDmResponseType, SendMessageBodyType>({
      query: (data) => ({
        url: "/send-dm",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useInitialFetchQuery, useSendDmMutation } = dashboardApi;
