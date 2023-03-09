import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"

export const connectionsSlice = createApi({
  reducerPath: "api/v1/",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/" }),
  credentials: "include",

  endpoints: (builder) => ({
    getOthers: builder.query({
      query: () => "/users/alumnus/others",
    }),
    getCurrentUserDetails: builder.query({
      query: () => "/users/alumnus/",
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts/general_posts/create",
        method: "post",
        body: data,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          credentials: "include",
        },
      }),
    }),
    getPostByPostId: builder.query({
      query: (post_id) => `/posts/general_posts/${post_id}`,
    }),
    getPostCommentsByPostId: builder.query({
      query: (post_id) => `posts/post_comments/${post_id}`,
    }),
    getUserByUserId: builder.query({
      query: (user_id) => `/users/alumnus/${user_id}`,
    }),
    getPostsByUserId: builder.query({
      query: (user_id) => `/posts/general_posts/user/${user_id}`,
    }),
  }),
})

export const {
  useGetOthersQuery,
  useGetCurrentUserDetailsQuery,
  useCreatePostMutation,
  useGetPostByPostIdQuery,
  useGetPostCommentsByPostIdQuery,
  useGetUserByUserIdQuery,
  useGetPostsByUserIdQuery,
} = connectionsSlice
