'use client';
import { authClient } from '@/lib/auth/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const { data } = authClient.useSession();
  // console.log(data);

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
            <Link
              href={'/auth'}
              className="h-16 rounded-xl bg-primary px-7 py-2 font-bold text-black"
            >
              login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
