import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authorizationStatus",
  initialState: {
    userData: undefined
  },
  reducers: {
    setUser(state, action){
      state.userData = action.payload;
      localStorage.setItem("isAuth", "true");
    },
    removeUser(state, action){
      state.userData = null;
      localStorage.setItem("isAuth", "false");
    }
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
