// src/store/apiSlice.js
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSupabaseClient } from '@/lib/supabase/client';
import { productType } from '@/types/productType';

const supabase = createSupabaseClient();

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query<productType[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from('allProducts').select('*');

        if (error) return { error };

        return { data };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
