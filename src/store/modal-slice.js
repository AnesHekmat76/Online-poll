import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  content: "",
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action) {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.handleYes = action.payload.handleYes;
      state.isOpen = true;
    },
    closeModal(state) {
      return initialState;
    },
  },
});

export const modalAction = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
