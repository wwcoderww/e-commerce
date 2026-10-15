'use client';

import Image from 'next/image';
import { useState } from 'react';
import MobileMenu from './banner-mobile-menu';

export default function BannerMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50 lg:hidden">
      <div className="flex flex-col items-end">
        <Image
          src="assets/menu.svg"
          alt="Mobile Banner"
          width={75}
          height={75}
          className={`eas-in-out-300 transform cursor-pointer text-white transition-transform ${isOpen ? `rotate-90` : `rotate-0`}`}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}
