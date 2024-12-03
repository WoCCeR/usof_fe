import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "updatePost",
  initialState: {
    shouldUpdatePosts: false,
  },
  reducers: {
    updatePosts(state) {
      state.shouldUpdatePosts = true;
    },
    postUpdated(state) {
      state.shouldUpdatePosts = false;
    },
  },
});

export const { updatePosts, postUpdated } = postSlice.actions;

export default postSlice.reducer;
