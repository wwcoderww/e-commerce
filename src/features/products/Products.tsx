'use client';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import ProductCard from './components/ProductCard';
import ProductOverlay from './components/ProductOverlay';
import { SearchIcon } from 'lucide-react';

export default function Products() {
  const [data, setData] = useState<Product[] | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col px-2">
      <div className="flex w-full items-center justify-center gap-2 px-6 pt-25 pb-28">
        <SearchIcon size={50} />
        <input
          type="text"
          className="w-7/12 rounded-xl border-2 border-primary bg-primary/10 px-3 py-1.5 text-2xl text-white placeholder-white/80 focus:outline-none"
          placeholder="Search"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-12 pb-20">
        {data.map((product) => (
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
