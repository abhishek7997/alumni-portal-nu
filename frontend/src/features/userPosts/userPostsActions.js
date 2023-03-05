import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// userAction.js
export const fetchPosts = createAsyncThunk(
  // action type string
  "userPosts/fetchPosts",
  // callback function
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/posts/general_posts/")
      return response.data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const deleteGeneralPost = createAsyncThunk(
  // action type string
  "userPosts/deleteGeneralPost",
  // callback function
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/posts/general_posts/${postId}`
      )
      return response.data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const updateGeneralPost = createAsyncThunk(
  "posts/updateGeneralPost",
  async (data, { rejectWithValue }) => {
    try {
      const post_id = parseInt(data.post_id)
      const response = await axios.patch(
        `/api/v1/posts/general_posts/${post_id}`,
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
