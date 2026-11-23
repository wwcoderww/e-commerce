'use client';
import { MoveRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CheckoutTable from '../checkout/_components/checkout-table';
import { PurchaseItem } from './_actions/fetchHistory';
import History from './_components/history';
import Search from './_components/search';

export default function page() {
  const [products, setProducts] = useState<PurchaseItem[] | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<string>('');

  const deliveryStatus = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (products) {
      deliveryStatus.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [products]);

  return (
    <div className="pb-12">
      <Search setDeliveryDate={setDeliveryDate} setProducts={setProducts} />
      {products && (
        <>
          <div
            className="flex justify-evenly py-24 text-3xl"
            ref={deliveryStatus}
          >
            <p>Ordered</p>
            <MoveRight />
            <p className="opacity-25">Shipped</p>
            <MoveRight />
            <p className="opacity-25">Delivered!</p>
          </div>
          <h1 className="flex justify-center py-10 text-4xl">
            Estimated Delivery Date: {deliveryDate}
          </h1>
          <CheckoutTable items={products} />
        </>
      )}
      <History setProducts={setProducts} />
    </div>
  );
}
