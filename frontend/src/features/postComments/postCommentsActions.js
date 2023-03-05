import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPostComments = createAsyncThunk(
  "postComments/fetchPostComments",
  async ({ post_id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/posts/post_comments/${post_id}`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const addPostComment = createAsyncThunk(
  "postComments/addPostComment",
  async (data, { rejectWithValue }) => {
    try {
      console.log(JSON.stringify(data))
      const response = await axios.post(
        "/api/v1/posts/post_comments/create",
        data
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
