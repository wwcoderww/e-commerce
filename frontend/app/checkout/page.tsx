'use client';
import { listCart } from '@/state/slices/cartSlice';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import List from './_components/checkout-list';
import ClearCart from './_components/checkout-btn-clearCart';
import CheckoutTable from './_components/checkout-table';
import CheckoutPayment from './_components/checkout-payment';

export default function page() {
  const cart = useSelector(listCart());
  return (
    <div className="py-12 sm:py-36">
      <div className="flex justify-center pb-3 text-lg sm:hidden">
        Tap image for more details
      </div>
      {cart?.length ? (
        <div className="mx-auto max-w-11/12 lg:max-w-8/12">
          <List cart={cart} />
          <ClearCart />
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
