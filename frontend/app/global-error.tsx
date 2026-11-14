'use client';

import Button from '@/components/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col items-center justify-center gap-4 bg-black text-white">
        <div className="text-2xl text-red-500">
          Something went wrong loading layout!
        </div>
        <p className="">{error.message || 'An unexpected error occurred.'}</p>
        <Button name="Retry" customClass="my-6" onClick={reset} />
      </body>
    </html>
  );
}
