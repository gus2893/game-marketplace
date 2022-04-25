import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICreateItem,
  ICreateUser,
  ICredentials,
  IItem,
  IItemTransfer,
  IResponseBody,
  IUser,
} from '../../interfaces';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'Marketplace Service',
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUser, ICredentials>({
      query: (body) => ({
        url: `/users/login`,
        method: 'POST',
        body,
      }),
    }),
    addUser: builder.mutation<IUser, ICreateUser>({
      query: (body) => ({
        url: `/users/create`,
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query<IUser, string>({
      query: (id) => `/users/id/${id}`,
    }),
    getItems: builder.query<IItem[], void>({
      query: () => `/items/sale`,
    }),
    getItemById: builder.query<IItem, string>({
      query: (id) => `/items/id/${id}`,
    }),
    getItemByUserId: builder.query<IItem[], string>({
      query: (id) => `/items/user/${id}`,
    }),
    addItem: builder.mutation<IResponseBody, ICreateItem>({
      query: (body) => ({
        url: `/items/create`,
        method: 'POST',
        body,
      }),
    }),
    transferItem: builder.mutation<IResponseBody, IItemTransfer>({
      query: ({ body, id }) => ({
        url: `/items/transfer/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
    editItem: builder.mutation<IItem, IItem>({
      query: (body) => ({
        url: `/items/id/${body.item_id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useAddItemMutation,
  useLazyGetItemsQuery,
  useGetItemsQuery,
  useLazyGetItemByIdQuery,
  useTransferItemMutation,
  useEditItemMutation,
  useLoginUserMutation,
  useLazyGetItemByUserIdQuery,
  useAddUserMutation,
  useGetItemByUserIdQuery,
} = apiSlice;
