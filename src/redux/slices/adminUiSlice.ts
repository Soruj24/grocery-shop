import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  open: boolean;
  type: "create" | "edit" | "delete" | "view" | null;
  data: Record<string, unknown> | null;
}

interface AdminUiState {
  sidebarCollapsed: boolean;
  modals: Record<string, ModalState>;
  selectedIds: string[];
}

const initialState: AdminUiState = {
  sidebarCollapsed: false,
  modals: {},
  selectedIds: [],
};

const adminUiSlice = createSlice({
  name: "adminUi",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    openModal: (
      state,
      action: PayloadAction<{
        key: string;
        type: ModalState["type"];
        data?: Record<string, unknown>;
      }>
    ) => {
      state.modals[action.payload.key] = {
        open: true,
        type: action.payload.type,
        data: action.payload.data ?? null,
      };
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = { open: false, type: null, data: null };
    },
    toggleSelection: (state, action: PayloadAction<string>) => {
      const idx = state.selectedIds.indexOf(action.payload);
      if (idx >= 0) state.selectedIds.splice(idx, 1);
      else state.selectedIds.push(action.payload);
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { toggleSidebar, openModal, closeModal, toggleSelection, clearSelection } =
  adminUiSlice.actions;
export default adminUiSlice.reducer;
