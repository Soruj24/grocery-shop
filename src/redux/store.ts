import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
