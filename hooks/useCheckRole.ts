import { authClient } from '@/lib/auth/auth-client';

export function useCheckRole(): string | undefined {
  const { data } = authClient.useSession();
  return data?.user.role;
}
