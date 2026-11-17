'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { hydrateCart, setUserId } from './slices/cartSlice';
import { authClient } from '@/lib/auth/auth-client';

interface ReduxProviderProps {
  children: React.ReactNode;
}

const userId = (await authClient.getSession()).data?.user.id;

export function ReduxProvider({ children }: ReduxProviderProps) {
  if (userId) store.dispatch(setUserId(userId));
  useEffect(() => {
    // Cart local storage
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
