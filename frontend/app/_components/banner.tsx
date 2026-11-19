import Cart from './banner/cart';
import Link from 'next/link';
import Links from './banner/links';
import BannerMobile from './banner-mobile/banner-mobile';
import DropDown from './banner/dropdown';
export default function banner() {
  return (
    <>
      <nav className="z-25 hidden items-center justify-between px-4 pt-3 text-2xl lg:flex">
        <Link href={'/'} className="text-5xl">
          Company Logo
        </Link>
        <Links />
        <Cart />
        <DropDown />
      </nav>
      <BannerMobile />
    </>
  );
}
