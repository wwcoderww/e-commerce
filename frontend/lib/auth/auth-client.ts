// frontend/lib/auth-client.ts
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export const authClient = createAuthClient({
  baseURL: `${BACKEND_URL}/auth`,
  plugins: [
    adminClient(),
    inferAdditionalFields({
      user: {
        role: { type: 'string' },
      },
    }),
  ],
  fetchOptions: {
    auth: {
      type: 'Bearer',
      token: () => localStorage.getItem('better-auth.session_token') || '',
      credentials: 'include',
    },
    // 2. Automatically capture and save the token on successful login
    onSuccess: (ctx) => {
      const token = ctx.response.headers.get('set-auth-token');
      if (token) {
        localStorage.setItem('better-auth.session_token', token);
      }
    },
  },
});
