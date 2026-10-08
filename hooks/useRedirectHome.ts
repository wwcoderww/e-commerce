import { authClient } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';

export function useRedirectHome() {
  const router = useRouter();
  const { data } = authClient.useSession();
  if (data) router.push('/');
}
