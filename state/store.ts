import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import { cartMiddleware } from './middleware/cartMiddleware';
import { productsApi } from './slices/productSlice';

// For preloaded state / local storage
const localStorageCart = () => {
  // Guard check: prevents Next.js server builds from crashing
  if (typeof window === 'undefined') return undefined;

  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : undefined;
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  preloadedState: {
    cart: localStorageCart(),
  },
  middleware: (getDefaultMiddleware) =>
    // Updates localstorage with each action
    getDefaultMiddleware().concat(cartMiddleware, productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
