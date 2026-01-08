import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@features/auth/authSlice";
import { authApi } from "@features/auth/authApi";
import { dashboardApi } from "@features/dashboard/dashboardApi";
import dashboardReducer from "@features/dashboard/dashboardSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    dashboard: dashboardReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(dashboardApi.middleware),
});

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
