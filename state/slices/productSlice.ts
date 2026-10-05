// src/store/apiSlice.js
import { productType } from '@/types/productType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'getProducts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://e-commerce-backend-wnhs.onrender.com',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<productType[], void>({
      query: () => 'api/products',
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
