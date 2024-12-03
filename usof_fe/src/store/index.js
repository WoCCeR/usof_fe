import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlise from "./postSlise";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postSlise,
  },
});
