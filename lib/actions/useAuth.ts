import { authClient } from '../auth-client';

export async function loginWithEmail(email: string, password: string) {
  const { data: response, error } = await authClient.signIn.email({
    email,
    password: password,
  });
  if (response && response.token) {
    localStorage.setItem('better-auth.session_token', response.token);
    return { success: true };
  }
  return { success: false, error: response || error };
}

export async function createAccount(email: string, password: string) {
  const { data: response, error } = await authClient.signUp.email({
    email,
    password,
    name: email,
    role: '',
  });
  if (response && response.token) {
    localStorage.setItem('better-auth.session_token', response.token);
    return { success: true };
  }
  return { success: false, error: response || error };
}
