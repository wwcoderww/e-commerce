'use client';
import LoadingSpinner from '@/components/loadingSpinner';
import { useGetProductsQuery } from '@/state/api/productApi';
import { productType } from '@/types/productType';
import { useState } from 'react';
import ProductCard from './_components/card';
import ProductOverlay from './_components/overlay';
import ProductSearch from './_components/search';
import useFilterLinks, { filterBy } from './_hooks/useFilterLinks';

export default function Products() {
  const [selected, setSelected] = useState<productType | null>(null);
  const [search, setSearch] = useState<string>('');
  const [filterBy, setFilterBy] = useState<filterBy>('nameaz');

  const { data, error, isLoading } = useGetProductsQuery(undefined, {
    pollingInterval: 60000,
  });
  // Data
  const filteredLinks = useFilterLinks(data, search, filterBy);
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
      <ProductSearch setSearch={setSearch} setFilterBy={setFilterBy} />
      <div className="flex flex-wrap justify-center gap-12 pb-20">
        {filteredLinks?.map((product) => (
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
