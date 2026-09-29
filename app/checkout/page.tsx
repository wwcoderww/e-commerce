'use client';
import CheckoutButton from '@/components/checkout/CheckoutButton';
import CheckoutPayment from '@/components/checkout/CheckoutPayment';
import CheckoutTable from '@/components/checkout/CheckoutTable';
import List from '@/components/checkout/List';
import { listCart } from '@/state/slices/cartSlice';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function page() {
  const cart = useSelector(listCart());
  return (
    <div className="py-36">
      {cart?.length ? (
        <div className="mx-auto max-w-8/12">
          <List cart={cart} />
          <CheckoutButton />
          <CheckoutTable cart={cart} />
          <CheckoutPayment />
        </div>
      ) : (
        <div className="fixed inset-0 z-10 flex items-center justify-center text-center">
          <div className="flex flex-col gap-16">
            <div className="text-8xl">Your cart is empty...!</div>
            <Link className="text-5xl underline" href={'/products'}>
              view products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
