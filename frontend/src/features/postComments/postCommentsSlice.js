import { createSlice } from "@reduxjs/toolkit"
import { fetchPostComments, addPostComment } from "./postCommentsActions"

const initialState = {
  loading: false,
  error: null,
  success: false,
  postComments: [],
}

const postCommentsSlice = createSlice({
  name: "postComments",
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
    [fetchPostComments.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [fetchPostComments.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.postComments = payload.data
    },
    [fetchPostComments.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [addPostComment.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.postComments.unshift(payload.data)
    },
  },
})

export const { clearState } = postCommentsSlice.actions

export default postCommentsSlice.reducer
