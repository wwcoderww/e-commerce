'use client';
import { useCheckRole } from '@/hooks/useCheckRole';
import useOutsideClick from '@/hooks/useOutsideClick';
import { signOut } from '@/lib/auth/actions/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const modalOptionStyle =
  'whitespace-nowrap text-center px-4 w-full py-2 hover:cursor-pointer hover:bg-zinc-700/60';

export default function DropDown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modal = useOutsideClick(() => setIsOpen(false));
  const role = useCheckRole();

  function handleSignOut() {
    signOut();
    toast.success('Signed out');
    router.push('/');
  }

  return (
    <div className="relative h-full" ref={modal}>
      <button className="h-full" onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="assets/userIcon.svg"
          className="cursor-pointer bg-primary mask-[url('/assets/userIcon.svg')] mask-contain mask-no-repeat"
          alt="User Profile"
          width={42}
          height={42}
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 flex flex-col divide-y divide-primary/20 overflow-hidden rounded-xl border border-primary/40 bg-zinc-800 text-lg shadow-md"
          onClick={() => setIsOpen(false)}
        >
          {role ? (
            <button
              type="button"
              className={modalOptionStyle}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <Link href={'/auth'} className={modalOptionStyle}>
              Sign In
            </Link>
          )}
          <Link href={'/history'} className={modalOptionStyle}>
            History
          </Link>
          {role === 'admin' && (
            <Link href={'/admin'} className={modalOptionStyle}>
              Admin Panel
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
