'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { hydrateCart, setUserId } from './slices/cartSlice';
import { authClient } from '@/lib/auth/auth-client';
import migrateCart from '@/lib/auth/actions/migrateCart';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user.id ?? null;

  useEffect(() => {
    if (isPending) return;

    store.dispatch(setUserId(userId));

    if (!userId) {
      try {
        const saved = localStorage.getItem('cart');
        store.dispatch(hydrateCart(saved ? JSON.parse(saved) : []));
      } catch {
        localStorage.removeItem('cart');
        store.dispatch(hydrateCart([]));
      }
      return;
    }

    migrateCart(userId).catch((error) => {
      console.error('Failed to sync user cart:', error);
    });
  }, [userId, isPending]);

  return <Provider store={store}>{children}</Provider>;
}
