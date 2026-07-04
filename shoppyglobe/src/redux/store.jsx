import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
     auth: authReducer,
  },
});