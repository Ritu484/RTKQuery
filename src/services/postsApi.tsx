import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PostModal} from '../models/post.model';
import {BASE_URL} from '../constants';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  tagTypes: ['Post'],
  endpoints: (builder: any) => ({
    posts: builder.query({
      query: (num: number) => {
        return {
          url: `posts?_limit=${num}`,
          method: 'GET',
        };
      },
      providesTags: ['Post'],
    }),
    addPost: builder.mutation({
      query: (body: PostModal) => {
        return {
          url: `posts`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation({
      query: (id: number) => {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  usePostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
} = postsApi;
