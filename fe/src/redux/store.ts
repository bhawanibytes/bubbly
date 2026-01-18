import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@features/auth/authApi";
import authReducer from "@features/auth/authSlice";
import { dashboardApi } from "@features/dashboard/dashboardApi";
import dashboardReducer from "@features/dashboard/dashboardSlice";
import chatReducer from "@features/chats/chatSlice";
import { chatApi } from "@features/chats/chatApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        dashboard: dashboardReducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        chat: chatReducer,
        [chatApi.reducerPath]: chatApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(dashboardApi.middleware)
            .concat(chatApi.middleware),
});

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
