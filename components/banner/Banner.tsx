import Image from 'next/image';
import Cart from './Cart';
import Links from './Links';
import Link from 'next/link';
export default function banner() {
  return (
    <div className="z-25 flex items-center justify-between px-4 pt-3 text-2xl">
      <Link href={'/'} className="text-5xl">
        Company Name
      </Link>
      <Links />
      <Cart />
      <div className="flex w-12 cursor-pointer items-center justify-center">
        <Image
          src="assets/userIcon.svg"
          className="cursor-pointer bg-primary mask-[url('/assets/userIcon.svg')] mask-contain mask-no-repeat"
          alt="User Profile"
          width={42}
          height={42}
        />
      </div>
    </div>
  );
}
