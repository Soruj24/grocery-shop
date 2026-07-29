import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppNotification {
  _id: string;
  type: "order" | "product" | "alert" | "user" | "system" | "promotion";
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  items: AppNotification[];
  unreadCount: number;
  loading: boolean;
}

const initialState: NotificationState = {
  items: [],
  unreadCount: 0,
  loading: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<AppNotification[]>) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      state.items.unshift(action.payload);
      if (!action.payload.read) state.unreadCount += 1;
    },
    markRead: (state, action: PayloadAction<string>) => {
      const n = state.items.find((n) => n._id === action.payload);
      if (n && !n.read) {
        n.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllRead: (state) => {
      state.items.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const n = state.items.find((n) => n._id === action.payload);
      state.items = state.items.filter((n) => n._id !== action.payload);
      if (n && !n.read) state.unreadCount = Math.max(0, state.unreadCount - 1);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markRead,
  markAllRead,
  removeNotification,
  setLoading,
} = notificationSlice.actions;
export default notificationSlice.reducer;
