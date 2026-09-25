import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const localStorageCart = () => {
  // Guard check: prevents Next.js server builds from crashing
  if (typeof window === 'undefined') return undefined;

  const savedCart = localStorage.getItem('shopping_cart');
  return savedCart ? JSON.parse(savedCart) : undefined;
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: localStorageCart() || [],
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
