'use client';
import { signOut } from '@/lib/auth/actions/useAuth';
import { authClient } from '@/lib/auth/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const { data } = authClient.useSession();

  function handleSignOut() {
    signOut();
    toast.success('Signed out');
  }

  return (
    <div className="flex w-12 cursor-pointer items-center justify-center">
      <Image
        src="assets/userIcon.svg"
        className="cursor-pointer bg-primary mask-[url('/assets/userIcon.svg')] mask-contain mask-no-repeat"
        alt="User Profile"
        width={42}
        height={42}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div
          className="fixed inset-0 z-75 flex cursor-default justify-end"
          onClick={() => setOpen(false)}
        >
          <div className="relative top-15 z-100 m-4">
            {!data && (
              <Link
                href={'/auth'}
                className="rounded-xl bg-primary px-7 py-2 font-bold text-black"
              >
                login
              </Link>
            )}
            {data && (
              <div
                onClick={() => handleSignOut()}
                className="rounded-xl bg-primary px-7 py-2 font-bold text-black"
              >
                Sign Out
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
