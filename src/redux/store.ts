import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

interface UIState {
  location: string;
  isLocationModalOpen: boolean;
}

const initialState: UIState = {
  location: 'ঢাকা',
  isLocationModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    toggleLocationModal: (state) => {
      state.isLocationModalOpen = !state.isLocationModalOpen;
    },
  },
});

export const { setLocation, toggleLocationModal } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
