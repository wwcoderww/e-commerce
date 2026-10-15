'use client';
import { useCheckRole } from '@/hooks/useCheckRole';
import { signOut } from '@/lib/auth/actions/useAuth';
import Link from 'next/link';

type mobileMenuProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function MobileMenu({ setIsOpen }: mobileMenuProps) {
  const isSignedIn = useCheckRole();
  return (
    <>
      <div
        className="fixed inset-0 z-100"
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className="absolute top-full z-101 w-48 rounded-xl border border-zinc-800 bg-black/80 text-center text-lg text-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.8)] backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col divide-y-2 p-4">
          <Link onClick={() => setIsOpen(false)} href={'/'} className="py-2">
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href={'/products'}
            className="py-2"
          >
            Products
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href={'/about'}
            className="py-2"
          >
            About
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href={'/contact'}
            className="py-2"
          >
            Contact
          </Link>
          {isSignedIn ? (
            <div
              className="py-2 hover:cursor-pointer"
              onClick={() => signOut()}
            >
              Sign out
            </div>
          ) : (
            <Link
              onClick={() => setIsOpen(false)}
              href={'/auth'}
              className="py-2"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
