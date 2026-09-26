import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '../store';
export const cartMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof action === 'object' && action !== null && 'type' in action) {
    if ((action.type as string).startsWith('cart/')) {
      const fullState = store.getState() as RootState;

      if (fullState.cart) {
        const updatedCartItems = fullState.cart;
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      }
    }
  }

  return result;
};
