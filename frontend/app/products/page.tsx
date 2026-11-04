'use client';
import { useGetProductsQuery } from '@/state/slices/productSlice';
import { productType } from '@/types/productType';
import { useState } from 'react';
import LoadingSpinner from '@/components/loadingSpinner';
import ProductSearch from './_components/products-search';
import ProductCard from './_components/products-card';
import ProductOverlay from './_components/products-overlay';

export default function Products() {
  const [selected, setSelected] = useState<productType | null>(null);
  const [search, setSearch] = useState<string>('');

  const { data, error, isLoading } = useGetProductsQuery(undefined, {
    pollingInterval: 10000,
  });

  const searchData = data?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Loading
  if (isLoading) {
    return <LoadingSpinner />;
  }
  // Error
  if (error) {
    console.log(error);
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center text-center text-8xl">
        ERROR. Check console or refresh
      </div>
    );
  }

  return (
    <div className="flex flex-col px-2">
      <ProductSearch setSearch={setSearch} />
      <div className="flex flex-wrap justify-center gap-12 pb-20">
        {searchData?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setSelected={setSelected}
          />
        ))}
        {selected && (
          <ProductOverlay setSelected={setSelected} selected={selected} />
        )}
      </div>
    </div>
  );
}
