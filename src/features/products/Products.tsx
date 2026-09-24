'use client';
import { Suspense, useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import type { Product } from '../../types/Product';

export default function Products() {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(data);

  return (
    <div className="flex flex-wrap justify-center gap-8">
      <Suspense fallback={<div>Loading...</div>}>
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Suspense>
    </div>
  );
}
