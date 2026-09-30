import Image from 'next/image';
import Cart from './Cart';
import Links from './Links';
import Link from 'next/link';
import ProfileIcon from './ProfileIcon';
export default function banner() {
  return (
    <div className="z-25 flex items-center justify-between px-4 pt-3 text-2xl">
      <Link href={'/'} className="text-5xl">
        Company Logo
      </Link>
      <Links />
      <Cart />
      <ProfileIcon />
    </div>
  );
}
