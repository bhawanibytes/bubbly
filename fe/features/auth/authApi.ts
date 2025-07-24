import { baseQuery } from "@/lib/api";
import { LoginBody, SignupBody, VerifySignupBody } from "@/types/types.auth";
import { Result } from "@/types/types.res";
import { createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api", // optional: name in store
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<Result, SignupBody>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    verifyUser: builder.mutation<Result, VerifySignupBody>({
      query: (data) => ({
        url: "/verify-signup",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<Result, LoginBody>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
} = api;
