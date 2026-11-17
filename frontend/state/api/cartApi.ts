import { cartItemType } from '@/types/cartItemType';
import { baseApi } from './baseApi';

type CartPayloadType = {
  userId: string;
  productId: string;
  quantity?: number;
};

function syncDataReformat(userId: string, cart: cartItemType[]) {
  return cart.map((item) => ({
    userId: userId,
    itemId: item.id,
    quantity: item.quantity,
  }));
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartById: builder.query<any, string>({
      query: (id) => `cart/${id}`,
      transformResponse: (response: { success: string; data: [] }) =>
        response.data ?? [],
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
    syncCart: builder.mutation<any, { userId: string; cart: cartItemType[] }>({
      query: ({ userId, cart }) => {
        return {
          url: 'cart/sync',
          method: 'POST',
          body: {
            userId: userId,
            cart: syncDataReformat(userId, cart),
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
