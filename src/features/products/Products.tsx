'use client';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import ProductCard from './components/ProductCard';
import ProductOverlay from './components/ProductOverlay';

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
    <div className="flex flex-wrap justify-center gap-12 py-20">
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
  );
}
