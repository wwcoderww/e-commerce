// frontend/lib/auth-client.ts
import { betterAuth } from 'better-auth';
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { admin } from 'better-auth/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [
    adminClient(),
    inferAdditionalFields({
      user: {
        role: { type: 'string' },
      },
    }),
  ],
});

export const auth = betterAuth({
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
        input: false,
      },
    },
  },
  plugins: [admin()],
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
  },
});
