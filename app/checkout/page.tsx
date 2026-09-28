'use client';
import CheckoutButton from '@/components/checkout/CheckoutButton';
import CheckoutTable from '@/components/checkout/CheckoutTable';
import List from '@/components/checkout/List';
import { listCart } from '@/state/slices/cartSlice';
import { useSelector } from 'react-redux';

export default function page() {
  const cart = useSelector(listCart());
  return (
    <div className="py-36">
      <div className="mx-auto max-w-8/12">
        <List cart={cart} />
        <CheckoutButton />
        <CheckoutTable cart={cart} />
      </div>
    </div>
  );
}
