'use client';
import { MoveRight } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import CheckoutTable from '../checkout/_components/checkout-table';
import fetchHistory, { PurchaseItem } from './_actions/fetchHistory';
import History from './_components/history';
import Search from './_components/search';
import { usePathname, useSearchParams } from 'next/navigation';

function HistoryContent() {
  const [products, setProducts] = useState<PurchaseItem[] | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const deliveryStatus = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle historyId param
  useEffect(() => {
    const handleParams = async () => {
      const historyId = searchParams.get('historyId');

      if (!historyId) return;

      const results = await fetchHistory(historyId);

      if (!results) return;

      const { historyData, purchaseData } = results;
      setDeliveryDate(historyData.deliveryDate || 'Unknown');
      setProducts(purchaseData);
    };
    handleParams();
  }, []);

  // Handle Scroll on display products change
  useEffect(() => {
    if (products) {
      // Params
      const params = new URLSearchParams(searchParams.toString());
      params.set('historyId', products[0].historyId);
      window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
      // Scroll effect
      deliveryStatus.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }
  }, [products]);

  return (
    <div className="pb-12">
      <Search setDeliveryDate={setDeliveryDate} setProducts={setProducts} />
      {products && (
        <>
          <div
            className="flex items-center justify-evenly py-24 text-lg sm:text-3xl"
            ref={deliveryStatus}
          >
            <p>Ordered</p>
            <MoveRight />
            <p className="opacity-25">Shipped</p>
            <MoveRight />
            <p className="opacity-25">Delivered!</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 py-10">
            <h1 className="text-4xl">
              Estimated Delivery Date: {deliveryDate}
            </h1>
            <p className="text-base">{products[0].historyId}</p>
          </div>
          <CheckoutTable items={products} />
        </>
      )}
      <History setProducts={setProducts} setDeliveryDate={setDeliveryDate} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <HistoryContent />
    </Suspense>
  );
}
