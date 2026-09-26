'use client';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import ProductCard from '../../components/product/ProductCard';
import ProductOverlay from '../../components/product/ProductOverlay';
import ProductSearch from '../../components/product/ProductSearch';

export default function Products() {
  const [data, setData] = useState<Product[] | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const filteredData = data?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (!data) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-center text-8xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col px-2">
      <ProductSearch setSearch={setSearch} />
      <div className="flex flex-wrap justify-center gap-12 pb-20">
        {filteredData?.map((product) => (
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
