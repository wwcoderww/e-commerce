import { productType } from '@/types/productType';
import { baseApi } from './baseApi';

function reformatFormData(product: Partial<productType>) {
  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value && typeof value === 'object' && 'size' in value) {
        formData.append(key, value as any);
      } else {
        formData.append(key, String(value));
      }
    }
  });
  return formData;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<productType[], void>({
      query: () => 'products',
      providesTags: ['Product'],
    }),
    getProductById: builder.query<productType, number>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation<any, Partial<productType>>({
      query: (product) => {
        const formData = reformatFormData(product);
        return {
          url: 'products',
          method: 'POST',
          body: formData,
        };
      },
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
        const formData = reformatFormData(product);
        return {
          url: `products/${product.id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
