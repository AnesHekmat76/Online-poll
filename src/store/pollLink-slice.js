import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const pollLinkState = createSlice({
  name: "pollLink",
  initialState,
  reducers: {
    setPollLinkState(state, action) {
      state.message = action.payload;
    },
  },
});

export const pollLinkAction = pollLinkState.actions;
export const pollLinkReducer = pollLinkState.reducer;
