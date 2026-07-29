import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import adminUiReducer from "./slices/adminUiSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    adminUi: adminUiReducer,
    notifications: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
