import { baseQuery } from "@baseApi";
import Response from "@shared/types/response.type";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LoginBody,
  SignupBody,
  VerifySignupBody,
} from "@shared/types/auth.type";

export const authApi = createApi({
  reducerPath: "authApi", // optional: name in store
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<Response, SignupBody>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    verifyUser: builder.mutation<Response, VerifySignupBody>({
      query: (data) => ({
        url: "/verify-signup",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<Response, LoginBody>({
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
} = authApi;
