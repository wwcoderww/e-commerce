'use client';
import Button from '@/components/button';
import { useEffect } from 'react';

type ErrorProps = {
  route: string;
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RouteError({ error, reset, route }: ErrorProps) {
  useEffect(() => {
    console.error(`/${route} hit Error.tsx:', error)`);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="text-2xl text-red-500">
        Something went wrong loading /{route}!
      </div>
      <p className="">{error.message || 'An unexpected error occurred.'}</p>
      <Button name="Retry" customClass="my-6" onClick={() => reset()} />
    </div>
  );
}
