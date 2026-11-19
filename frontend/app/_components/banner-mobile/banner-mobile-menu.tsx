'use client';
import { useCheckRole } from '@/hooks/useCheckRole';
import { signOut } from '@/lib/auth/actions/useAuth';
import Link from 'next/link';

type mobileMenuProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const styleLinks = 'py-2 hover:bg-zinc-800 hover:cursor-pointer';

export default function MobileMenu({ setIsOpen }: mobileMenuProps) {
  const isSignedIn = useCheckRole();
  return (
    <>
      <div
        className="fixed inset-0 z-100"
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className="absolute top-full z-101 w-40 rounded-lg border border-primary/50 bg-zinc-900 text-center text-lg font-semibold text-primary/90 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col divide-y-2 divide-primary/30">
          <Link
            onClick={() => setIsOpen(false)}
            href={'/'}
            className={styleLinks}
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href={'/products'}
            className={styleLinks}
          >
            Products
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href={'/about'}
            className={styleLinks}
          >
            About
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href={'/contact'}
            className={styleLinks}
          >
            Contact
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href={'/history'}
            className={styleLinks}
          >
            History
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href={'/checkout'}
            className={styleLinks}
          >
            Checkout
          </Link>
          {isSignedIn ? (
            <div className={styleLinks} onClick={() => signOut()}>
              Sign out
            </div>
          ) : (
            <Link
              onClick={() => setIsOpen(false)}
              href={'/auth'}
              className={styleLinks}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
