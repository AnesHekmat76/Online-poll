import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal-slice";
import { alertReducer } from "./alert-slice";

const store = configureStore({
  reducer: { modal: modalReducer, alert: alertReducer },
});

export default store;
