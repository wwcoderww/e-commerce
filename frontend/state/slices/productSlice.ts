// src/store/apiSlice.js
import { productType } from '@/types/productType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get all products
export const productsApi = createApi({
  reducerPath: 'getProducts',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<productType[], void>({
      query: () => 'products',
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<any, Partial<productType>>({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<any, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<any, productType>({
      query: (product) => {
        const { id, ...item } = product;
        return {
          url: `products/${id}`,
          method: 'PUT',
          body: item,
        };
      },
      invalidatesTags: ['Product'],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;
