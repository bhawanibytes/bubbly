// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api", // optional: name in store
  baseQuery: fetchBaseQuery({ baseUrl: "https://your-api.com" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for queries/mutations
export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation } =
  api;
