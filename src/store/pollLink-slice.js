import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isDisplayed: false,
};

const pollLinkState = createSlice({
  name: "pollLink",
  initialState,
  reducers: {
    showPollLinkPage(state, action) {
      state.message = action.payload;
      state.isDisplayed = true;
    },
    hidePollLinkPage() {
      return initialState;
    },
  },
});

export const pollLinkAction = pollLinkState.actions;
export const pollLinkReducer = pollLinkState.reducer;
