import { baseApi } from './baseApi';

type CartPayloadType = {
  userId: string;
  productId: string;
  quantity?: number;
};

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartById: builder.query<any, string>({
      query: (id) => `cart/${id}`,
      providesTags: ['Cart'],
    }),
    postCart: builder.mutation<any, CartPayloadType>({
      query: ({ userId, productId }) => {
        return {
          url: 'cart',
          method: 'POST',
          body: {
            userId,
            productId,
          },
        };
      },
      invalidatesTags: ['Cart'],
    }),
    deleteItem: builder.mutation<any, CartPayloadType>({
      query: ({ userId, productId }) => {
        return {
          url: 'cart',
          method: 'DELETE',
          body: {
            userId,
            productId,
          },
        };
      },
      invalidatesTags: ['Cart'],
    }),
    deleteCart: builder.mutation<any, string>({
      query: (userId) => {
        return {
          url: 'cart',
          method: 'DELETE',
          body: {
            userId,
          },
        };
      },
      invalidatesTags: ['Cart'],
    }),
    putCart: builder.mutation<any, CartPayloadType>({
      query: ({ userId, productId, quantity }) => {
        return {
          url: 'cart',
          method: 'PUT',
          body: {
            userId,
            productId,
            quantity,
          },
        };
      },
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartByIdQuery,
  usePostCartMutation,
  usePutCartMutation,
  useDeleteItemMutation,
  useDeleteCartMutation,
} = cartApi;
