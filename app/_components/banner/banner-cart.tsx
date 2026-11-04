'use client';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { cartSize } from '@/state/slices/cartSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Cart() {
  const [isMounted, setMounted] = useState<boolean>(false);
  const total = useSelector(cartSize());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href={'/checkout'}
      className="flex cursor-pointer items-center gap-1 pr-4"
    >
      {isMounted && total > 0 && <div className="mb-1 text-4xl">({total})</div>}
      <ShoppingCart size={40} />
    </Link>
  );
}
