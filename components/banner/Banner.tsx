import Image from 'next/image';
import Cart from './Cart';
import Links from './Links';
import Link from 'next/link';
import ProfileIcon from './ProfileIcon';
export default function banner() {
  return (
    <div className="z-25 hidden items-center justify-between px-4 pt-3 text-2xl lg:flex">
      <Link href={'/'} className="text-5xl">
        Company Logo
      </Link>
      <Links />
      <Cart />
      <ProfileIcon />
    </div>
  );
}
