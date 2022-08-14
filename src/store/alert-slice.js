import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisplayed: false,
  message: "",
  type: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.isDisplayed = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert() {
      return initialState;
    },
  },
});

export const alertAction = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
