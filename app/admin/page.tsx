// app/admin/page.tsx
import { Suspense } from 'react';
import AdminDashboard from './_components/admin-dashboard';
import LoadingSpinner from '@/components/loadingSpinner';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminDashboard />
    </Suspense>
  );
}
