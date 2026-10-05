'use client';

import AllItems from '@/components/admin/AllItems';
import CreateItem from '@/components/admin/CreateItem';
import { useSearchParams, useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMode = searchParams.get('mode' || 'view');
  function changeParam(mode: 'add' | 'view') {
    const viewParam = new URLSearchParams(searchParams.toString());
    viewParam.set('mode', mode);
    router.push(`/admin?${viewParam.toString()}`);
  }

  return (
    <div className="flex">
      <div className="w-1/8">
        <div onClick={() => changeParam('view')}>Edit</div>
        <div onClick={() => changeParam('add')}>Create</div>
      </div>
      {currentMode === 'view' && <AllItems />}
      {currentMode === 'add' && <CreateItem />}
    </div>
  );
}
