import Cart from './banner/banner-cart';
import Link from 'next/link';
import Links from './banner/banner-links';
import ProfileIcon from './banner/banner-profileIcon';
import BannerMobile from './banner-mobile/banner-mobile';
export default function banner() {
  return (
    <>
      <div className="z-25 hidden items-center justify-between px-4 pt-3 text-2xl lg:flex">
        <Link href={'/'} className="text-5xl">
          Company Logo
        </Link>
        <Links />
        <Cart />
        <ProfileIcon />
      </div>
      <BannerMobile />
    </>
  );
}
