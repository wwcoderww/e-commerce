'use client';
import { useCheckRole } from '@/hooks/useCheckRole';
import { useRedirectHome } from '@/hooks/useRedirectHome';
import { signOut } from '@/lib/auth/actions/useAuth';
import { authClient } from '@/lib/auth/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfileIcon() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const role = useCheckRole();

  function handleSignOut() {
    signOut();
    toast.success('Signed out');
    router.push('/');
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
          {/* Login button */}
          <div className="relative top-15 z-100 m-4 text-center">
            {!role && (
              <Link
                href={'/auth'}
                className="rounded-xl bg-primary px-7 py-2 font-bold text-black"
              >
                login
              </Link>
            )}
            {/* Sign out */}
            {role && (
              <div
                onClick={() => handleSignOut()}
                className="mb-2 rounded-xl bg-primary px-7 py-2 font-bold text-black hover:cursor-pointer"
              >
                Sign Out
              </div>
            )}
            {role === 'admin' && (
              // Admin button
              <Link
                href={'/admin'}
                className="rounded-xl bg-primary px-7 py-2 font-bold text-black"
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
