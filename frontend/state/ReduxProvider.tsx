'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { hydrateCart } from './slices/cartSlice';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        store.dispatch(hydrateCart(JSON.parse(saved)));
      }
    } catch {
      localStorage.removeItem('cart');
    }
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
