import { createSlice } from "@reduxjs/toolkit";

let isLoggedIn = false;
const initialToken = localStorage.getItem("token");
if (initialToken) {
  isLoggedIn = true;
}

const initialState = {
  token: initialToken,
  isLoggedIn: isLoggedIn,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.isLoggedIn = true;
    },
    logoutHandler(state) {
      localStorage.removeItem("token");
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
