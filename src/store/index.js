import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal-slice";
import { alertReducer } from "./alert-slice";
import { authReducer } from "./auth-slice";
import { pollLinkReducer } from "./pollLink-slice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    alert: alertReducer,
    auth: authReducer,
    pollLink: pollLinkReducer,
  },
});

export default store;
