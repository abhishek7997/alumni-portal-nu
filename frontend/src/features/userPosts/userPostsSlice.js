// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit"
import {
  fetchPosts,
  deleteGeneralPost,
  updateGeneralPost,
} from "./userPostsActions"

const initialState = {
  loading: false,
  error: null,
  success: false,
  userPosts: [],
}

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.userPosts = []
      state.error = null
      state.loading = false
      state.success = false
    },
  },
  extraReducers: {
    // register user
    [fetchPosts.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.userPosts = payload.data
    },
    [fetchPosts.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [deleteGeneralPost.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [deleteGeneralPost.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      const post_id = parseInt(payload.data, 10)
      state.userPosts = state.userPosts.filter(
        (post) => parseInt(post.post_id, 10) !== post_id
      )
    },
    [deleteGeneralPost.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [updateGeneralPost.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [updateGeneralPost.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      const updatedPost = payload.data
      const postIndex = state.userPosts.findIndex(
        (post) => post.post_id === updatedPost.post_id
      )
      if (postIndex !== -1) {
        state.userPosts[postIndex] = updatedPost
      }
    },
    [updateGeneralPost.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { clearState } = userPostsSlice.actions

export default userPostsSlice.reducer
