"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

interface PostsResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `posts?limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
