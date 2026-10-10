import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRedirectHome(check: boolean = true) {
  const router = useRouter();

  useEffect(() => {
    if (check) router.push('/');
  }, [check, router]);
}
