import { baseQuery } from "@baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import Response from "@shared/types/response.type";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi", // optional: name in store
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    initialFetch: builder.query<Response, void>({
      query: () => "/all-chat-message",
    }),
  }),
});

export const { useInitialFetchQuery } = dashboardApi;
