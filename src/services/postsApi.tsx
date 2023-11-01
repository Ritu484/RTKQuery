import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostModal } from '../models/post.model';
export interface IAuthResponse {
    jwt: string;
    name: string;
    username: string;
    profile_name: string;
  }

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
    tagTypes: ['Post'],
    endpoints:(builder:any) => ({
       
        posts: builder.query({
            query: (num:number) => {
             //   console.log("fetching postsApis",num)
                return{
                    url: `posts?_limit=${num}`,
             method: 'GET'
                }
            },
            providesTags: ['Post'],
           }),
           post: builder.query({
            query: (id:number) => {
           //  console.log("ID:", id)
             return {
              url: `posts?_limit=${id}`,          
              method: 'GET'
             }
            }
           }),
           //add a post
           addPost: builder.mutation({
            query: (body:PostModal) => {
               // console.log("Create Post: ", newPost)
                return {
                 url: `posts`,
                 method: 'POST', 
                 body         
                }
               } ,
               invalidatesTags: ['Post'],
         
        }),
        //delete a post 
        deletePost: builder.mutation({
            query: (id:number) => {
               // console.log("Create Post: ", newPost)
                return {
                 url: `posts/${id}`,
                 method: 'DELETE',          
                }
               } ,
               invalidatesTags: ['Post'],
         
        }),
       //end of endpoints
    })
})

export const { usePostsQuery, usePostQuery, useAddPostMutation,useDeletePostMutation } = postsApi;