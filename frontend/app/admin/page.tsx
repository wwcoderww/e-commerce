// app/admin/page.tsx
import { Suspense } from 'react';
import DashboardBrowser from './_components/dashboard-browser';
import LoadingSpinner from '@/components/loadingSpinner';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardBrowser />
    </Suspense>
  );
}
