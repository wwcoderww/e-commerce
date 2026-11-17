import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import { cartApi } from './api/cartApi';
import cartReducer, {
  addOne,
  adjustQuantity,
  clearCart,
  deleteItem,
  delOne,
  newItem,
} from './slices/cartSlice';

const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(
    addOne,
    delOne,
    newItem,
    adjustQuantity,
    clearCart,
    deleteItem,
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    localStorage.setItem('cart', JSON.stringify(state.cart.items));

    if (!state.cart.userId) return;
    // If newItem
    if (newItem.match(action)) {
      listenerApi.dispatch(
        cartApi.endpoints.postCart.initiate({
          userId: state.cart.userId,
          productId: action.payload.id,
        }),
      );
    }
    // If addOne or delOne
    if (addOne.match(action) || delOne.match(action)) {
      const updatedItem = state.cart.items.find(
        (i) => i.id === action.payload.id,
      );
      listenerApi.dispatch(
        cartApi.endpoints.putCart.initiate({
          userId: state.cart.userId,
          productId: action.payload.id,
          quantity: updatedItem?.quantity,
        }),
      );
    }
    // If deleteItem
    if (deleteItem.match(action)) {
      listenerApi.dispatch(
        cartApi.endpoints.deleteItem.initiate({
          userId: state.cart.userId,
          productId: action.payload.id,
        }),
      );
    }
    //If deleteCart
    if (clearCart.match(action)) {
      listenerApi.dispatch(
        cartApi.endpoints.deleteCart.initiate(state.cart.userId),
      );
    }
  },
});

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(cartListenerMiddleware.middleware)
      .concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
