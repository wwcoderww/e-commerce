'use client';
import List from '@/components/checkout/List';
import { listCart } from '@/state/slices/cartSlice';
import { useSelector } from 'react-redux';

export default function page() {
  const cart = useSelector(listCart());
  return (
    <div className="py-20">
      <List cart={cart} />
    </div>
  );
}
