'use client';
import { useGetProductsQuery } from '@/state/slices/productSlice';
import { productType } from '@/types/productType';
import { useState } from 'react';
import ProductCard from '../../components/product/ProductCard';
import ProductOverlay from '../../components/product/ProductOverlay';
import ProductSearch from '../../components/product/ProductSearch';

export default function Products() {
  const [selected, setSelected] = useState<productType | null>(null);
  const [search, setSearch] = useState<string>('');

  const { data, error } = useGetProductsQuery(undefined, {
    pollingInterval: 10000,
  });

  const searchData = data?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Loading
  if (!data && !error) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center text-center text-8xl">
        Loading...
      </div>
    );
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
