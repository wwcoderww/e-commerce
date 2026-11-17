import { store } from '@/state/store';
import { authClient } from '../auth-client';
import migrateCart from './migrateCart';
import { setUserId } from '@/state/slices/cartSlice';

async function handleAuthRequest(restFunction: () => Promise<any>) {
  try {
    const { data: response, error } = await restFunction();
    // If success
    if (response && response.token) {
      store.dispatch(setUserId(response.user.id));
      migrateCart(response.user.id);
      return { success: true, response };
    }
    // Errors below
    if (error?.code) throw new Error(error.code);
  } catch (error: any) {
    return { success: false, error };
  }
  return { sucess: false, error: 'Unknown' };
}

export async function getAuthEmail(email: string, password: string) {
  return handleAuthRequest(() =>
    authClient.signIn.email({
      email,
      password,
    }),
  );
}

export async function postAuthEmail(email: string, password: string) {
  return handleAuthRequest(() =>
    authClient.signUp.email({
      email,
      password,
      name: email,
      role: '',
    }),
  );
}

export async function signOut() {
  store.dispatch(setUserId(null));
  return await authClient.signOut();
}
