'use client';
import RouteError from '@/components/routeErrors';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return <RouteError route="admin" error={error} reset={reset} />;
}
