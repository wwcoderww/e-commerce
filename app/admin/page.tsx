'use client';
export const dynamic = 'force-dynamic';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AllItems from './_components/admin-allItems';
import EditItem from './_components/admin-editItem';

const selectClass = 'bg-primary/40 opacity-100';
const labelClass = 'pr-10 pl-1 opacity-80 hover:opacity-100 cursor-pointer';

export default function page() {
  // Router Variables
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentMode = searchParams.get('mode') || 'view';
  // Handle Click
  function changeParam(mode: 'add' | 'view') {
    const viewParam = new URLSearchParams(searchParams.toString());
    viewParam.set('mode', mode);
    router.push(`${pathname}?${viewParam.toString()}`);
  }

  return (
    <div className="flex divide-x-2 pt-8 text-xl">
      {/* Left Column */}
      <div className="">
        {/* Button Edit */}
        <div
          onClick={() => changeParam('view')}
          className={`${currentMode === 'view' && selectClass} ${labelClass}`}
        >
          Edit
        </div>
        {/* Button Create */}
        <div
          onClick={() => changeParam('add')}
          className={`${currentMode === 'add' && selectClass} ${labelClass}`}
        >
          Create
        </div>
        {/* Middle Column */}
      </div>
      {currentMode === 'view' && <AllItems />}
      {currentMode === 'add' && <EditItem />}
    </div>
  );
}
