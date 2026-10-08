import { authClient } from '../auth-client';

async function handleAuthRequest(restFunction: () => Promise<any>) {
  try {
    const { data: response, error } = await restFunction();
    // If success
    if (response && response.token) {
      // localStorage.setItem('better-auth.session_token', response.token);
      return { success: true };
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
