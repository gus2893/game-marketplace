import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../interfaces';

export const apiSlice = createApi({
  reducerPath: 'Marketplace Service',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser, string>({
      query: (id) => `/users/id/${id}`,
    }),
    // getJokeByCategory: builder.query<IJoke, string>({
    //   query: (category: string) => `/random?category=${category}`,
    // }),
    // searchJoke: builder.query<IJoke, string>({
    //   query: (searchQuery: string) => `/search?query=${searchQuery}`,
    //   providesTags: ['Joke'],
    //   transformResponse: (resp: any) => {
    //     return resp.result[randomIntFromInterval(0, resp.total - 1)];
    //   },
    // }),
  }),
});

export const { useLazyGetUserQuery } = apiSlice;
