import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import cartReducer, {
  addOne,
  adjustQuantity,
  clearCart,
  deleteItem,
  delOne,
  newItem,
} from './slices/cartSlice';
import { productsApi } from './slices/productSlice';

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
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
  },
});

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(cartListenerMiddleware.middleware)
      .concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
