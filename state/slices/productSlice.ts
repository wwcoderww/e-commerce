// src/store/apiSlice.js
import { productType } from '@/types/productType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get all products
export const productsApi = createApi({
  reducerPath: 'getProducts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://e-commerce-backend-wnhs.onrender.com',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<productType[], void>({
      query: () => 'api/products',
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<any, Partial<productType>>({
      query: (product) => ({
        url: 'api/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<any, number>({
      query: (id) => ({
        url: `api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApi;
